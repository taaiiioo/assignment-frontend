<template>
  <div>
    <h1>Welcome to the Dashboard</h1>
    <p>Your user ID: {{ userId }}</p>

    <!-- Pass live update callback to ThreeScene -->
    <ThreeScene
      :onLiveUpdate="handleLiveUpdate"
      :userSettings="settings"
      :initialSettings="settings"
    />

    <p v-if="!settings">Loading settings...</p>

    <div v-else>
      <button @click="toggleSettingsPanel">
        {{ showSettingsPanel ? "Hide Settings" : "Get Settings" }}
      </button>

      <div v-if="showSettingsPanel">
        <h2>Your Settings</h2>
        <form @submit.prevent="handleUpdateSettings">
          <div>
            <label for="rotation">Rotation (degrees):</label>
            <input
              type="number"
              step="any"
              v-model="settings.rotation"
              id="rotation"
            />
          </div>
          <div>
            <label for="zoom">Zoom:</label>
            <input type="number" step="any" v-model="settings.zoom" id="zoom" />
          </div>
          <div>
            <label for="panX">Pan X:</label>
            <input type="number" step="any" v-model="settings.panX" id="panX" />
          </div>
          <div>
            <label for="panY">Pan Y:</label>
            <input type="number" step="any" v-model="settings.panY" id="panY" />
          </div>
          <button type="submit">Update Settings</button>
        </form>
      </div>
      <button @click="logout">Logout</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ThreeScene from "./ThreeScene.vue";

export default {
  components: { ThreeScene },
  data() {
    return {
      userId: null,
      settings: null,
      showSettingsPanel: false,
    };
  },
  mounted() {
    this.userId = localStorage.getItem("userId");
    if (!this.userId) {
      alert("Please log in first!");
      this.$router.push("/");
    } else {
      this.fetchUserSettings(); // Fetch settings when the component mounts
    }
  },
  methods: {
    // Fetch user settings based on the logged-in user ID
    async fetchUserSettings() {
      try {
        const response = await axios.get(
          `http://localhost:3000/settings?userId=${this.userId}`
        );
        if (response.data.settings) {
          this.settings = response.data.settings;
        }
      } catch (error) {
        console.error("Error fetching user settings:", error);
        alert("Failed to load settings.");
      }
    },
    handleLiveUpdate(liveSettings) {
      for (const key in liveSettings) {
        const value = liveSettings[key];
        this.settings[key] = value;
      }
    },
    async handleUpdateSettings() {
      try {
        // Send updated settings to the backend
        const response = await axios.put("http://localhost:3000/settings", {
          userId: this.userId,
          settings: this.settings,
        });
        if (response.status === 200) {
          alert("Settings updated successfully!");
        }
      } catch (error) {
        console.error("Error updating settings:", error);
        alert("Failed to update settings.");
      }
    },
    toggleSettingsPanel() {
      // Toggle the visibility of the settings panel
      this.showSettingsPanel = !this.showSettingsPanel;
      if (this.showSettingsPanel && !this.settings) {
        this.fetchUserSettings(); // Fetch settings when opening the panel
      }
    },
    logout() {
      // Logout and remove user ID from localStorage
      localStorage.removeItem("userId");
      this.$router.push("/"); // Redirect to login page
    },
  },
};
</script>
