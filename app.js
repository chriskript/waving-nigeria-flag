// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 10;

// Renderer setup
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Responsive resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Load Nigerian flag texture with error handling
const loadingManager = new THREE.LoadingManager();
const textureLoader = new THREE.TextureLoader(loadingManager);
const flagTexture = textureLoader.load('nigeria-flag.png', undefined, undefined, () => {
    console.error('Failed to load texture');
});

// Flag geometry (using BufferGeometry for better performance)
const geometry = new THREE.PlaneBufferGeometry(5, 3, 7, 3);

// Custom vertex shader for waving effect
const vertexShader = `
    uniform float time;
    varying vec2 vUv;
    void main() {
        vUv = uv;
        vec3 pos = position;

        // Calculate how far the vertex is from the left edge (where the flag is attached to the pole)
        float distanceFromLeft = length(pos.x + 2.5);

        // Apply waving effect with some randomness
        pos.z += sin(pos.x * 10.0 + time) * 0.5 * (1.0 - distanceFromLeft * 0.1);
        pos.z += cos(pos.y * 5.0 + time * 0.5) * 0.2 * (0.1 - distanceFromLeft * 0.5);

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
`;

// Custom fragment shader to render the flag texture
const fragmentShader = `
    varying vec2 vUv;
    uniform sampler2D flagTexture;
    void main() {
        gl_FragColor = texture2D(flagTexture, vUv);
    }
`;

// Shader material for waving flag effect
const flagMaterial = new THREE.ShaderMaterial({
    uniforms: {
        time: { value: 0.0 },
        flagTexture: { value: flagTexture }
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide
});

// Create the mesh for the flag with shader material
const flag = new THREE.Mesh(geometry, flagMaterial);
flag.position.x = 0; // Align flag relative to the pole
flag.position.y = 2.7; // Attach the flag from the top of the pole
scene.add(flag);

// Create a cylinder geometry for the flagpole
const poleGeometry = new THREE.CylinderGeometry(0.1, 0.1, 9, 32);
const poleMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 }); // Set pole color to silver
const pole = new THREE.Mesh(poleGeometry, poleMaterial);
pole.position.x = -2.5; // Move the pole to the left side
pole.position.y = 0; // Center the pole vertically
scene.add(pole);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Update the time uniform for the waving effect
    flagMaterial.uniforms.time.value = performance.now() * 0.001;

    renderer.render(scene, camera);
}

animate();
