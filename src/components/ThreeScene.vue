<template>
  <div id="three-container" ref="container"></div>
</template>

<script>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  props: {
    userSettings: {
      type: Object,
      required: true,
    },
    onLiveUpdate: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      camera: null,
      controls: null,
    };
  },
  watch: {
    userSettings() {
      if (this.camera) {
        this.camera.position.set(
          this.userSettings.panX,
          this.userSettings.panY,
          10 - this.userSettings.zoom
        );

        this.controls.target.set(
          this.userSettings.controlX,
          this.userSettings.controlY,
          this.userSettings.controlZ
        );
      }
    },
  },
  async mounted() {
    const container = this.$refs.container;
    if (!container) {
      console.error("Container not found");
      return;
    }

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
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
    this.camera.position.set(0, 0, 5);

    // OrbitControls
    this.controls = new OrbitControls(this.camera, renderer.domElement);
    this.controls.enablePan = true;
    this.controls.screenSpacePanning = true;
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.1;
    this.controls.zoomSpeed = 1.0;
    this.controls.maxDistance = 10;
    this.controls.minDistance = 2;
    //rotation speed
    this.controls.rotateSpeed = 0.9;

    // Track live updates
    this.controls.addEventListener("change", (v) => {
      this.onLiveUpdate({
        zoom: parseFloat((10 - this.camera.position.z).toFixed(2)),
        panX: parseFloat(this.camera.position.x.toFixed(2)),
        panY: parseFloat(this.camera.position.y.toFixed(2)),
        rotation: this.camera.rotation.y,
        controlX: this.controls.target.x,
        controlY: this.controls.target.y,
        controlZ: this.controls.target.z,
      });
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      this.controls.update();
      renderer.render(scene, this.camera);
    };

    animate();

    // Handle resizing
    window.addEventListener("resize", () => {
      this.camera.aspect = container.clientWidth / container.offsetHeight;
      this.camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.offsetHeight);
    });
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
