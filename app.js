const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('globe').appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(ambientLight);
scene.add(directionalLight);

// Globe
const geometry = new THREE.SphereGeometry(5, 32, 32);
const material = new THREE.MeshPhongMaterial({
    color: 0xaaaaaa,
    specular: 0x333333,
    shininess: 15,
    map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/earth_atmos_2048.jpg')
});
const globe = new THREE.Mesh(geometry, material);
scene.add(globe);

camera.position.z = 15;

function addPoint(lat, lon, imageUrl) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -((5 + 0.1) * Math.sin(phi) * Math.cos(theta));
    const y = ((5 + 0.1) * Math.cos(phi));
    const z = (5 + 0.1) * Math.sin(phi) * Math.sin(theta);

    const texture = new THREE.TextureLoader().load(imageUrl);
    const material = new THREE.SpriteMaterial({ map: texture });
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(0.5, 0.5, 1); // Image size can be adjusted
    sprite.position.set(x, y, z);
    scene.add(sprite);
}

function animate() {
    requestAnimationFrame(animate);
    globe.rotation.y += 0.005;
    renderer.render(scene, camera);
}

animate();

// Example usage
addPoint(-33.865143, 151.209900, 'path_to_ocean_trash_image.jpg'); // Sydney position with example image