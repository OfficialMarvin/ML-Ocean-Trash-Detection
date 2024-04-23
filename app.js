// Set your Cesium Ion access token here
Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI2ODdmYWY4YS03YTkyLTQwMDItOTA4NS03NjYyYzZkZmIwZjQiLCJpZCI6MjEwNzU3LCJpYXQiOjE3MTM5MDEwMDZ9.GtddF-irwAKEQicIpodHs2swDkMZsWN98rjUG2JqVJM';

const viewer = new Cesium.Viewer('cesiumContainer', {
    terrainProvider: Cesium.createWorldTerrain()
});

// Example point addition, replace image URL with your desired image
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

// Adding a sample point with an example image
addPoint(48.8584, 2.2945, 'https://www.cesium.com/docs/tutorials/images/assets/cesium-balloon.png'); // Eiffel Tower position with example image
