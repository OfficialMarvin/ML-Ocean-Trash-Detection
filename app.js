// Set your Cesium Ion access token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ODdmYWY4YS03YTkyLTQwMDItOTA4NS03NjYyYzZkZmIwZjQiLCJpZCI6MjEwNzU3LCJpYXQiOjE3MTM5MDEwMDZ9.GtddF-irwAKEQicIpodHs2swDkMZsWN98rjUG2JqVJM';

// Create a new Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});

// Function to add a point to the Cesium globe
function addPoint(latitude, longitude, date, concentration) {
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
        point: {
            pixelSize: 10,
            color: Cesium.Color.RED,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 2
        },
        description: `Date: ${date}<br>Concentration: ${concentration} /km^2`
    });
}

// Hardcoded trash data points
const trashData = [
    { date: '9/1/2010', latitude: 19.9432, longitude: -64.5649, concentration: 58102.96 },
    { date: '9/1/2010', latitude: 20.2173, longitude: -64.3828, concentration: 6639.79 },
    { date: '9/1/2010', latitude: 20.4521, longitude: -64.1968, concentration: 15246.71 },
    { date: '10/1/2010', latitude: 21.1293, longitude: -63.8333, concentration: 5347.35 },
    { date: '10/1/2010', latitude: 21.4730, longitude: -63.5899, concentration: 4090.58 },
    { date: '10/1/2010', latitude: 21.7367, longitude: -63.4227, concentration: 44914.59 },
    { date: '11/1/2010', latitude: 22.1500, longitude: -63.1474, concentration: 17324.82 },
    { date: '11/1/2010', latitude: 22.8418, longitude: -62.7592, concentration: 10467.48 },
    { date: '12/1/2010', latitude: 24.3576, longitude: -62.8129, concentration: 7434.53 },
    { date: '12/1/2010', latitude: 24.3576, longitude: -62.8129, concentration: 0.00 },
    { date: '13/01/2010', latitude: 24.7657, longitude: -62.7221, concentration: 377.59 },
    { date: '13/01/2010', latitude: 25.3751, longitude: -62.4785, concentration: 3126.56 },
    { date: '13/01/2010', latitude: 25.5607, longitude: -62.4387, concentration: 428395.48 },
    { date: '14/01/2010', latitude: 26.0914, longitude: -61.7168, concentration: 0.00 },
    { date: '15/01/2010', latitude: 29.2490, longitude: -62.9857, concentration: 4682.38 },
    { date: '15/01/2010', latitude: 29.7453, longitude: -63.2167, concentration: 3020.74 },
    { date: '16/01/2010', latitude: 30.5477, longitude: -63.7064, concentration: 31985.11 },
    { date: '17/01/2010', latitude: 31.1813, longitude: -64.0147, concentration: 1173.82 },
    { date: '17/01/2010', latitude: 31.5350, longitude: -64.2677, concentration: 9953.75 },
    { date: '18/01/2010', latitude: 31.9644, longitude: -64.5448, concentration: 4082.42 },
    { date: '28/01/2010', latitude: 32.3200, longitude: -64.4322, concentration: 6826.00 },
    { date: '28/01/2010', latitude: 32.0790, longitude: -64.6316, concentration: 0.00 },
    { date: '29/01/2010', latitude: 31.5865, longitude: -62.7727, concentration: 2757.70 },
    { date: '29/01/2010', latitude: 31.2001, longitude: -62.0368, concentration: 0.00 },
    { date: '30/01/2010', latitude: 30.8735, longitude: -61.3126, concentration: 5454.11 },
    { date: '31/01/2010', latitude: 30.0730, longitude: -58.7081, concentration: 3346.84 },
    { date: '31/01/2010', latitude: 30.0730, longitude: -58.7081, concentration: 619.79 },
    { date: '1/2/2010', latitude: 29.6835, longitude: -56.6993, concentration: 434.88 },
    { date: '2/2/2010', latitude: 29.5392, longitude: -54.9628, concentration: 2727.05 },
    { date: '2/2/2010', latitude: 29.2797, longitude: -53.6117, concentration: 31002.30 },
    { date: '3/2/2010', latitude: 28.9070, longitude: -51.8931, concentration: 2680.58 },
    { date: '3/2/2010', latitude: 28.7729, longitude: -51.0777, concentration: 43126.42 },
    { date: '3/2/2010', latitude: 28.5522, longitude: -50.1026, concentration: 1431.70 },
    { date: '9/2/2010', latitude: 35.6729, longitude: -35.0237, concentration: 3151.26 },
    { date: '9/2/2010', latitude: 36.2937, longitude: -33.3888, concentration: 1163.54 },
    { date: '28/08/2010', latitude: -23.4996, longitude: -39.2757, concentration: 13612.36 },
    { date: '29/08/2010', latitude: -23.7290, longitude: -37.4867, concentration: 2142.69 },
    { date: '29/08/2010', latitude: -23.8868, longitude: -36.6933, concentration: 1080.87 },
    { date: '30/08/2010', latitude: -24.1104, longitude: -33.9573, concentration: 17251.58 },
    { date: '31/08/2010', latitude: -23.0308, longitude: -30.8532, concentration: 8264.64 },
    { date: '1/9/2010', latitude: -22.2970, longitude: -29.2472, concentration: 1051.23 },
    { date: '2/9/2010', latitude: -20.8268, longitude: -28.2509, concentration: 1313.45 },
    { date: '2/9/2010', latitude: -19.7983, longitude: -27.3385, concentration: 1868.85 },
    { date: '3/9/2010', latitude: -18.6150, longitude: -26.1638, concentration: 194.67 },
    { date: '3/9/2010', latitude: -17.8870, longitude: -25.0860, concentration: 1816.80 },
    { date: '4/9/2010', latitude: -16.9837, longitude: -23.7325, concentration: 1968.85 },
    { date: '4/9/2010', latitude: -16.2435, longitude: -22.5333, concentration: 1006.30 }
];

// Add the hardcoded trash data points to the Cesium globe
trashData.forEach(data => {
    addPoint(data.latitude, data.longitude, data.date, data.concentration);
});

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
            addPoint(latitude, longitude, imageDate, '');

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

    folderUpload.addEventListener('change', async () => {
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
                    addPoint(parseFloat(latitude), parseFloat(longitude), date, '');
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
