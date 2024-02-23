let selectedImage;

// Check for browser compatibility with getUserMedia
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert('Your browser does not support camera access.');
}

// Event listener for selecting an image file
document.getElementById('inputImage').addEventListener('change', function (event) {
    selectedImage = event.target.files[0];
    processImage(selectedImage);
    document.getElementById('captureButtonCam').classList.add('hide');
    document.getElementById('inputImagei').classList.add('hide');
    document.getElementById('classifyButton').classList.add('hide');
    document.getElementById('classifyButton2').classList.remove('hide');
    document.getElementById('photoResultContainer').classList.remove('hide');
    // Event listener for classifying the image with classifyButton2
});

// Event listener for capturing from camera
document.getElementById('captureButtonCam').addEventListener('click', function () {
    document.getElementById('inputImagei').classList.add('hide');
    const video = document.getElementById('video');
    const canvas = document.getElementById('canvas');
    const captureButton = document.getElementById('captureButton');

    // Show the video element
    video.style.display = 'block';

    // Get user media
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
            video.srcObject = stream;
        })
        .catch(err => {
            console.error('Error accessing the camera:', err);
        });

    // Capture image from camera
    captureButton.addEventListener('click', () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageDataURL = canvas.toDataURL('image/png');
        // Show captureButton element initially
        displayCapturedImage(imageDataURL);
        stopVideoStream();
    });

    // Stop video stream
    function stopVideoStream() {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => {
            track.stop();
        });
        video.style.display = 'none'; // Hide the video element after stopping the stream
    }
    document.getElementById('captureButtonCam').classList.add('hide');
    document.getElementById('captureButton').classList.remove('hide');

    // Display captured image
    function displayCapturedImage(imageDataURL) {
        const img = new Image();
        img.src = imageDataURL;
        document.getElementById('canvas').classList.add('hide');
        document.getElementById('photoResultContainer').classList.remove('hide');
        document.getElementById('imagePreview').innerHTML = '';
        document.getElementById('imagePreview').appendChild(img);
        // You can also store the image in a variable if you want to process or save it
        // For example:
        selectedImage = imageDataURL;
        document.getElementById('captureButton').classList.add('hide');
        document.getElementById('classifyButton').classList.remove('hide');
        
    }
});

function processImage(imageFile) {
    const reader = new FileReader();
    reader.onload = function () {
        const img = new Image();
        img.onload = function () {
            // Display the captured image on the screen
            const imgElement = document.createElement('img');
            imgElement.src = reader.result;
            imgElement.id = 'capturedImageProcess'; // Assigning an ID to the image
            document.getElementById('photoResultContainer').classList.remove('hide');
            document.getElementById('imagePreview').innerHTML = '';
            document.getElementById('imagePreview').appendChild(imgElement);
        };
        img.src = reader.result;
    };
    reader.readAsDataURL(imageFile);
}



// Event listener for classifying the image
document.getElementById('classifyButton').addEventListener('click', function () {
    if (!selectedImage) {
        alert('Please select an image to classify.');
        return;
    }
    // Replace with your actual image classification function!
    // For example, you could use an API call or a machine learning model
    const isUgly = Math.random() < 0.5; // Placeholder classification

    const resultElement = document.getElementById('result');
    if (isUgly) {
        resultElement.textContent = 'You are ugly and you won.';
    } else {
        resultElement.textContent = 'You are beautiful and Please try next time.';
    }
});

// Function to classify the image
function classifyImage() {
    console.log("Classifying image...");
    const isUgly = Math.random() < 0.5; // Placeholder classification

    const resultElement = document.getElementById('result');
    console.log("Result Element:", resultElement); // Log result element to verify if it exists
    if (resultElement) {
        if (isUgly) {
            resultElement.textContent = 'You are ugly and you won.';
        } else {
            resultElement.textContent = 'You are beautiful and Please try next time.';
        }
    } else {
        console.error("Result element not found.");
    }
}

// Event listener for classifying the image with classifyButton2
document.getElementById('classifyButton2').addEventListener('click', function () {
    console.log("classifyButton2 clicked");
    classifyImage();
});

