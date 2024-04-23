const viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: new Cesium.IonImageryProvider({ assetId: 2 }),
    baseLayerPicker: true // Enable the base layer picker for selecting imagery
});

function addPoint(latitude, longitude, imageSrc) {
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
        billboard: {
            image: imageSrc,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM, // Ensure the bottom of the image is at the point
            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND // Clamp billboards to the ground
        }
    });
}

// Example usage with placeholder image
addPoint(-33.865143, 151.209900, 'https://www.cesium.com/docs/tutorials/images/assets/cesium-balloon.png'); // Sydney position with example balloon image
