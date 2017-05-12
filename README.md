# stream-overlay
A dashboard and overlay to display data on a video stream. Overlays are customisable with HTML/CSS/JS and use socket.io to receive data from the dashboard.  

In lieu of a database solution, data pushed to the overlay can be modified via the HTML5 Web Storage API.

### Install
``npm install``  

### Environmental Variables
``OVERLAY_THEME`` defines which overlay theme to use

### Compile dashboard scripts via webpack
``npm run-script watch``

### Run the express server
``npm run-script server``

### Access the backend dashboard
``http://localhost:3000/dashboard``

### Access the frontend to overlay on your stream
``http://localhost:3000/overlay``
