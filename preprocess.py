import os
from osgeo import gdal

# Set the input and output directories
input_dir = "data/patches"
output_dir = "data/processed_images"

# Create the output directory if it doesn't exist
os.makedirs(output_dir, exist_ok=True)

# Iterate over the patches directory
for root, dirs, files in os.walk(input_dir):
    for file in files:
        if file.endswith("_CROP.tif"):
            # Get the base name of the patch
            base_name = file.split(".")[0]
            
            # Open the patch, classification mask, and confidence level mask
            patch_path = os.path.join(root, file)
            cl_path = os.path.join(root, base_name + "_cl.tif")
            conf_path = os.path.join(root, base_name + "_conf.tif")
            
            patch_ds = gdal.Open(patch_path)
            cl_ds = gdal.Open(cl_path)
            conf_ds = gdal.Open(conf_path)
            
            # Create a new RGBA dataset
            output_path = os.path.join(output_dir, base_name + ".png")
            driver = gdal.GetDriverByName("PNG")
            output_ds = driver.Create(output_path, patch_ds.RasterXSize, patch_ds.RasterYSize, 4)
            
            # Copy the RGB bands from the patch to the output dataset
            for i in range(1, 4):
                band = patch_ds.GetRasterBand(i)
                output_ds.GetRasterBand(i).WriteArray(band.ReadAsArray())
            
            # Copy the classification mask to the alpha band of the output dataset
            output_ds.GetRasterBand(4).WriteArray(cl_ds.ReadAsArray())
            
            # Copy the georeferencing information from the patch to the output dataset
            output_ds.SetProjection(patch_ds.GetProjection())
            output_ds.SetGeoTransform(patch_ds.GetGeoTransform())
            
            # Close the datasets
            patch_ds = None
            cl_ds = None
            conf_ds = None
            output_ds = None
