# Ocean Trash Detection

A web application that visualizes existing ocean trash locations detected by machine learning and allows users to upload satellite images to detect the presence of trash.

## Features

- **Visualization of Trash Data**: Displays pre-determined trash data points on a Cesium globe, representing locations where trash has been detected.
- **Image Upload and Detection**: Users can upload satellite images of oceans, and the application uses a machine learning model to detect if there is trash in the images.
- **Real-time Data Fetching**: Fetches and displays the 15 most recent marine pollution reports from NOAA's Marine Pollution Surveillance.

## Technologies Used

- **CesiumJS**: For 3D globe visualization.
- **TensorFlow.js**: For running machine learning models in the browser.
- **MobileNet Model**: Pre-trained image classification model used for detecting trash.
- **JavaScript (ES6)**: Core scripting language used in the project.
- **NOAA Data Integration**: Incorporates data from NOAA's Marine Pollution Surveillance Reports.

## Setup and Usage

1. **Clone the Repository**

   ```bash
   git clone https://github.com/OfficialMarvin/ML-Ocean-Trash-Detection.git
