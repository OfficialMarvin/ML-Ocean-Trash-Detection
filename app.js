const viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: new Cesium.IonImageryProvider({ assetId: 2 }),
    baseLayerPicker: false,
    geocoder: false,
    homeButton: false,
    infoBox: false,
    sceneModePicker: false,
    selectionIndicator: false,
    timeline: false,
    navigationHelpButton: false,
    fullscreenButton: false
});

function addPoint(latitude, longitude, imageSrc) {
    viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(longitude, latitude),
        billboard: {
            image: imageSrc,
            width: 50,
            height: 50,
            scaleByDistance: new Cesium.NearFarScalar(1.5e2, 1.5, 1.5e7, 0.5)
        }
    });
}

// Example usage with placeholder image
addPoint(-33.865143, 151.209900, 'https://www.cesium.com/docs/tutorials/images/assets/cesium-balloon.png'); // Sydney position with example balloon image
