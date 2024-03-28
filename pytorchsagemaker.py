import sagemaker
from sagemaker import image_uris, model_uris, script_uris
from sagemaker.estimator import Estimator
from sagemaker.predictor import Predictor
from sagemaker.utils import name_from_base
import boto3
import json

# Set up SageMaker session and roles
sagemaker_session = sagemaker.Session()
aws_role = sagemaker.get_execution_role()
aws_region = boto3.Session().region_name

# Specify the pre-trained model
model_id = "tensorflow-od1-ssd-resnet50-v1-fpn-640x640-coco17-tpu-8"
model_version = "*"

# Retrieve the inference docker container uri
deploy_image_uri = image_uris.retrieve(
    region=None,
    framework=None,  
    image_scope="inference",
    model_id=model_id,
    model_version=model_version,
    instance_type="ml.m5.xlarge"
)

# Retrieve the inference script uri
deploy_source_uri = script_uris.retrieve(
    model_id=model_id, 
    model_version=model_version, 
    script_scope="inference"
)

# Retrieve the pre-trained model uri
base_model_uri = model_uris.retrieve(
    model_id=model_id, 
    model_version=model_version,
    model_scope="inference"
)

# Create the SageMaker model instance
model_name = name_from_base(f"ocean-trash-detection-{model_id}")
model = sagemaker.model.Model(
    image_uri=deploy_image_uri,
    source_dir=deploy_source_uri,
    model_data=base_model_uri,
    entry_point="inference.py",
    role=aws_role,
    predictor_cls=Predictor,
    name=model_name,
)

# Create endpoint and deploy the model
endpoint_name = name_from_base(f"ocean-trash-detection-endpoint-{model_id}")
model.deploy(
    initial_instance_count=1, 
    instance_type="ml.m5.xlarge",
    endpoint_name=endpoint_name
)

# Specify S3 bucket and prefix where satellite ocean images are stored
bucket_name = "your-bucket-name"
prefix = "path/to/satellite/images/"

# Function to preprocess image and make prediction
def detect_trash(image_file):
    with open(image_file, "rb") as file:
        img_bytes = file.read()
    
    query_response = model.predict(
        img_bytes,
        {
            "ContentType": "application/x-image",
            "Accept": "application/json"
        }
    )
    
    model_predictions = json.loads(query_response)
    normalized_boxes = model_predictions["normalized_boxes"]
    classes = model_predictions["classes"]
    
    return len(normalized_boxes) > 0

# Iterate through images in S3 bucket and detect trash
s3_client = boto3.client("s3")
result = s3_client.list_objects(Bucket=bucket_name, Prefix=prefix)

for content in result.get("Contents", []):
    image_file = content.get("Key")
    if image_file.endswith(".jpg") or image_file.endswith(".png"):
        tmp_file = f"/tmp/{image_file.split('/')[-1]}"
        s3_client.download_file(bucket_name, image_file, tmp_file)
        has_trash = detect_trash(tmp_file)
        print(f"Image: {image_file}, Contains Trash: {has_trash}")

# Delete the endpoint and model
model.delete_model()
model.delete_endpoint()
