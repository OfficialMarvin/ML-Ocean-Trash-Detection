// Set your Cesium Ion access token
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ODdmYWY4YS03YTkyLTQwMDItOTA4NS03NjYyYzZkZmIwZjQiLCJpZCI6MjEwNzU3LCJpYXQiOjE3MTM5MDEwMDZ9.GtddF-irwAKEQicIpodHs2swDkMZsWN98rjUG2JqVJM';

// Create a new Cesium Viewer
const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});

// Function to add a point to the Cesium globe
function addPoint(latitude, longitude, imageSrc) {
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
        billboard: {
            image: imageSrc,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND
        }
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
            addPoint(latitude, longitude, 'https://www.cesium.com/docs/tutorials/images/assets/cesium-balloon.png');

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
