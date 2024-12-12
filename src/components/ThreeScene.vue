<template>
	<div id="three-container" ref="container"></div>
  </template>
  
  <script>
  import * as THREE from "three";
  import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
  
  export default {
	props: {
	  onLiveUpdate: {
		type: Function,
		required: true,
	  },
	},
	mounted() {
	  const container = this.$refs.container;
	  if (!container) {
		console.error("Container not found");
		return;
	  }
  
	  // Scene, Camera, Renderer
	  const scene = new THREE.Scene();
	  const camera = new THREE.PerspectiveCamera(
		75,
		container.offsetWidth / container.offsetHeight,
		0.1,
		1000
	  );
	  const renderer = new THREE.WebGLRenderer({ antialias: true });
	  renderer.setSize(container.offsetWidth, container.offsetHeight);
	  container.appendChild(renderer.domElement);
  
	  // Cube
	  const geometry = new THREE.BoxGeometry();
	  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
	  const cube = new THREE.Mesh(geometry, material);
	  scene.add(cube);
  
	  // Light (optional)
	  const light = new THREE.DirectionalLight(0xffffff, 1);
	  light.position.set(0, 5, 5).normalize();
	  scene.add(light);
  
	  // Initial camera position
	  camera.position.set(0, 0, 5);
  
	  // OrbitControls
	  const controls = new OrbitControls(camera, renderer.domElement);
	  controls.enablePan = true;
	  controls.screenSpacePanning = true;
	  controls.enableDamping = true;
	  controls.dampingFactor = 0.1;
	  controls.zoomSpeed = 1.0;
	  controls.maxDistance = 10;
	  controls.minDistance = 2;
	  //rotation speed 
	  controls.rotateSpeed = 0.9;
  
	  // Get the userId (you might store this in Vuex or localStorage)
	  const userId = localStorage.getItem("userId"); // Adjust based on where you store userId
  
	  // Load the saved state from localStorage based on userId
	  const key = `orbitControlsState_${userId}`;
	  const savedState = JSON.parse(localStorage.getItem(key));
	  if (savedState) {
		const cameraPosition = savedState.cameraPosition || { x: 0, y: 0, z: 5 };
		const controlsTarget = savedState.controlsTarget || { x: 0, y: 0, z: 0 };
  
		camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
		controls.target.set(controlsTarget.x, controlsTarget.y, controlsTarget.z);
		controls.update();
	  }
  
	  // Save OrbitControls state to localStorage for the user
	  const saveOrbitControlsState = () => {
		const stateToSave = {
		  cameraPosition: {
			x: camera.position.x,
			y: camera.position.y,
			z: camera.position.z,
		  },
		  controlsTarget: {
			x: controls.target.x,
			y: controls.target.y,
			z: controls.target.z,
		  },
		};
  
		localStorage.setItem(key, JSON.stringify(stateToSave));
	  };
  
	  // Track live updates
	  controls.addEventListener("change", () => {
		saveOrbitControlsState(); // Save state on every change
  
		this.onLiveUpdate({
		  zoom: parseFloat((10 - camera.position.z).toFixed(2)),
		  panX: parseFloat(camera.position.x.toFixed(2)),
		  panY: parseFloat(camera.position.y.toFixed(2)),
		  rotation: parseFloat(
			THREE.MathUtils.radToDeg(new THREE.Euler().setFromQuaternion(camera.quaternion, "YXZ").y).toFixed(2)
		  ),
		});
	  });
  
	  // Animation loop
	  const animate = () => {
		requestAnimationFrame(animate);
		controls.update();
		renderer.render(scene, camera);
	  };
  
	  animate();
  
	  // Handle resizing
	  window.addEventListener("resize", () => {
		camera.aspect = container.clientWidth / container.offsetHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(container.clientWidth, container.offsetHeight);
	  });
  
	  // Expose save function to parent
	  this.saveOrbitControlsState = saveOrbitControlsState;
	},
  };
  </script>
  
  <style>
  #three-container {
	width: 100%;
	height: 400px;
	background: #000;
  }
  </style>
