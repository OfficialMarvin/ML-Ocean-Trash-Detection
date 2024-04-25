// Set your Cesium Ion access token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ODdmYWY4YS03YTkyLTQwMDItOTA4NS03NjYyYzZkZmIwZjQiLCJpZCI6MjEwNzU3LCJpYXQiOjE3MTM5MDEwMDZ9.GtddF-irwAKEQicIpodHs2swDkMZsWN98rjUG2JqVJM';

// Create a new Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});

// Function to add a point to the Cesium globe
function addPoint(latitude, longitude, imageSrc, date) {
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
        billboard: {
            image: imageSrc,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        },
        description: `Date: ${date}`
    });
}

// Fetch data from the provided URLs
fetch('https://www.ospo.noaa.gov/Products/ocean/marinepollution/')
    .then(response => response.text())
    .then(data => {
        // Parse the HTML content
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        // Find the 15 most recent reports
        const reports = doc.querySelectorAll('.reportCards .reportCard');
        for (let i = 0; i < 15; i++) {
            const report = reports[i];

            // Extract the report details
            const region = report.querySelector('.region').textContent;
            const imageDate = report.querySelector('.imageDate').textContent;
            const imageTime = report.querySelector('.imageTime').textContent;
            const dataSource = report.querySelector('.dataSource').textContent;
            const location = report.querySelector('.location').textContent;
            const area = parseFloat(report.querySelector('.area').textContent);
            const confidence = report.querySelector('.confidence').textContent;

            // Parse the location coordinates
            const [latitude, longitude] = location.split('/').map(coord => parseFloat(coord.trim().split(' ')[0]));

            // Add the point to the Cesium globe
            addPoint(latitude, longitude, 'https://www.cesium.com/docs/tutorials/images/assets/cesium-balloon.png', imageDate);

            console.log(`Region: ${region}`);
            console.log(`Image Date: ${imageDate}`);
            console.log(`Image Time: ${imageTime}`);
            console.log(`Data Source: ${dataSource}`);
            console.log(`Latitude: ${latitude}`);
            console.log(`Longitude: ${longitude}`);
            console.log(`Area: ${area} sq km`);
            console.log(`Confidence: ${confidence}`);
            console.log('---');
        }
    })
    .catch(error => console.error('Error fetching data:', error));

document.addEventListener('DOMContentLoaded', () => {
    const folderUpload = document.getElementById('folder-upload');
    const submitBtn = document.getElementById('submit-btn');
    const responseDisplay = document.getElementById('response-display');

    async function loadModel() {
        const modelUrl = 'https://storage.googleapis.com/tfjs-models/tfjs/mobilenet_v1_0.25_224/model.json';
        const model = await tf.loadGraphModel(modelUrl);
        return model;
    }

    async function classifyImage(model, imageElement, prompt) {
        const tensor = tf.browser.fromPixels(imageElement).resizeNearestNeighbor([224, 224]).toFloat().expandDims();
        const predictions = await model.predict(tensor).data();
        const top5 = Array.from(predictions)
            .map((p, i) => ({ probability: p, className: IMAGENET_CLASSES[i] }))
            .sort((a, b) => b.probability - a.probability)
            .slice(0, 5);

        const trashKeywords = ['plastic', 'trash', 'waste', 'garbage', 'litter'];
        const isTrash = top5.some(item => trashKeywords.some(keyword => item.className.toLowerCase().includes(keyword)));

        return { prompt, isTrash };
    }

    submitBtn.addEventListener('click', async () => {
        const files = folderUpload.files;

        if (!files.length) {
            alert('Please select a folder containing ocean satellite images.');
            return;
        }

        let trashCount = 0;
        let totalCount = 0;

        const model = await loadModel();

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const prompt = 'Is there trash in this ocean satellite image?';

            const imageElement = await createImageElement(file);
            const result = await classifyImage(model, imageElement, prompt);
            totalCount++;

            if (result.isTrash) {
                trashCount++;

                // Extract latitude and longitude from image metadata (assuming it exists)
                const latitude = imageElement.getAttribute('data-latitude');
                const longitude = imageElement.getAttribute('data-longitude');
                const date = imageElement.getAttribute('data-date');

                if (latitude && longitude) {
                    addPoint(parseFloat(latitude), parseFloat(longitude), URL.createObjectURL(file), date);
                }
            }
        }

        const trashPercentage = (trashCount / totalCount) * 100;
        responseDisplay.textContent = `Prompt: Is there trash in this ocean satellite image?\nPercentage of images with trash: ${trashPercentage.toFixed(2)}%`;
    });

    async function createImageElement(file) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = URL.createObjectURL(file);

            // Extract latitude, longitude, and date from image metadata (assuming it exists)
            const latitude = file.name.split('_')[0];
            const longitude = file.name.split('_')[1];
            const date = file.name.split('_')[2];

            img.setAttribute('data-latitude', latitude);
            img.setAttribute('data-longitude', longitude);
            img.setAttribute('data-date', date);
        });
    }
});
