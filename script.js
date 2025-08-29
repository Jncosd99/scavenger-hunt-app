console.log("Scavenger Hunt App Initialized");

document.getElementById("startHunt").addEventListener("click", function() {
    document.getElementById("huntOptions").style.display = "block";
    this.style.display = "none";
});

document.querySelectorAll(".huntOption").forEach(button => {
    button.addEventListener("click", function() {
        const hunt = this.getAttribute("data-hunt");
        alert(`Starting ${hunt.charAt(0).toUpperCase() + hunt.slice(1)} Hunt!`);
        document.getElementById("huntOptions").style.display = "none";
        document.getElementById("cameraSection").style.display = "block";
        getLocation();
        updateHuntStatus(`Hunt started: ${hunt.charAt(0).toUpperCase() + hunt.slice(1)}`);
    });
});

document.getElementById("openCamera").addEventListener("click", function() {
    document.getElementById("uploadImage").style.display = "block";
    document.getElementById("uploadButton").style.display = "block";
    this.style.display = "none";
});

document.getElementById("uploadButton").addEventListener("click", function() {
    const input = document.getElementById("uploadImage");
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById("cameraPreview").innerHTML = `<img src="${e.target.result}" style="max-width: 100%; max-height: 100%;">`;
            updateHuntStatus("Photo uploaded!");
        };
        reader.readAsDataURL(input.files[0]);
    }
});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        document.getElementById("cameraPreview").innerText = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById("cameraPreview").innerText = `Latitude: ${position.coords.latitude}, Longitude: ${position.coords.longitude}`;
    updateHuntStatus("Location detected!");
}

function showError(error) {
    document.getElementById("cameraPreview").innerText = `Error: ${error.message}`;
}

function updateHuntStatus(message) {
    document.getElementById("huntStatus").innerText = message;
}