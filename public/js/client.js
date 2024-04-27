// public/js/client.js

// Function to start webcam feed and perform real-time object detection
async function startWebcamAndDetectObjects() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        videoElement.srcObject = stream;

        // Load YOLOv8 model
        const model = await tf.loadGraphModel('model/yolov8n_custom.pt');

        // Perform real-time object detection
        setInterval(async () => {
            const predictions = await detectObjects(model, videoElement);
            displayPredictions(predictions);
        }, 1000); // Adjust the interval as needed
    } catch (error) {
        console.error('Error accessing webcam or loading model:', error);
    }
}

// Function to perform object detection on a video frame
async function detectObjects(model, videoElement) {
    const img = tf.browser.fromPixels(videoElement);
    const resized = tf.image.resizeBilinear(img, [416, 416]);
    const expanded = resized.expandDims(0);
    const predictions = await model.executeAsync(expanded);
    return predictions;
}

// Function to display predictions (bounding boxes and class names) on the video feed
function displayPredictions(predictions) {
    const canvas = document.getElementById('outputCanvas');
    const ctx = canvas.getContext('2d');

    // Process predictions here and draw bounding boxes
    // Modify this function according to the output format of your YOLOv8 model
}

// Get video element
const videoElement = document.getElementById('webcamVideo');

// Start webcam and perform real-time object detection when the page loads
window.onload = function () {
    startWebcamAndDetectObjects();
};
