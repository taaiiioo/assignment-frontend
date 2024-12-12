<template>
  <div>
    <h2>Hi welcome to our site</h2>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin" autocomplete="off">
      <div>
        <label for="username">Username:</label>
        <input 
          type="text" 
          v-model="username" 
          id="username" 
          autocomplete="off" 
          placeholder="Enter your username" 
          required 
        />
      </div>
      <div>
        <label for="password">Password:</label>
        <input 
          type="password" 
          v-model="password" 
          id="password" 
          autocomplete="new-password" 
          placeholder="Enter your password" 
          required 
        />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  mounted() {
    // Clear the input fields when the component is mounted
    this.clearFields();
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post("http://localhost:3000/login", {
          username: this.username,
          password: this.password,
        });

        if (response.status === 200) {
          // Store the user ID and token in localStorage
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("token", response.data.token);

          // Redirect to the dashboard
          this.$router.push("/dashboard");
        }
      } catch (error) {
        console.error("Login failed:", error);
        alert("Invalid username or password");
      }
    },
    clearFields() {
      // Ensure fields are empty
      this.username = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  color: #333;
}
form {
  margin-top: 20px;
}
label {
  font-weight: bold;
}
input {
  padding: 0.5rem;
  margin: 0.5rem 0;
  width: 100%;
}
button {
  padding: 0.5rem 1rem;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}
button:hover {
  background-color: #45a049;
}
</style>
