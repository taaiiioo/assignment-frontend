# WHAT IS APPLICATION ABOUT---

This project is a simple web application where users can view and manipulate a 3D (object) a cube 
with zoom, rotation, and position controls. User settings, such as zoom and rotation, are stored in
 the backend...

 # GITHUB---
 
git clone https://github.com/taaiiiyoo/assignment-frontend.git


# INSTALLATION TO RUN THE PROJECT ---

vue (vue.js frame work)

vite (As the build tool, using as bundler)

Three.js (To create the 3D model).

# SOME OTHER DEPENDENCIES FRO FRONTEBD ---
axious (Makes HTTP request)

veu-router( for routing in project)

vuex (for state management )

# WORKING OF EACH LIBERARY---

How the Frontend Works

Vue.js: Renders the login, settings panel, and 3D viewer.

Three.js: Provides interactive 3D rendering of the cube.

API Communication: Fetches and updates user settings through backend endpoints.

# RUNNING THE FRONTEND---

Start the Frontend----
1. open new terminal

2. Go to the frontend folder and then vue-frontend---

cd frontend
cd vue-frontend

3. Start the Vue development server:

npm run dev

Open your browser and visit http://localhost:5173 to use the app.

# USER FLOW WILL BE---


1. Login: Enter the credentials of a user pre-added to the database.


2. 3D Viewer: After logging in:

Rotate, zoom, or pan the cube.

Settings (rotation, zoom, position) automatically save as you interact with the cube.



3. Settings Panel: Open the settings panel to view or manually update saved settings.


4. Logout: Log out to clear session data. The cube’s last state is saved and restored upon re-login.
