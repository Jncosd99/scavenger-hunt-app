console.log("Scavenger Hunt App Initialized");

let hunts = JSON.parse(localStorage.getItem("hunts")) || [];

window.onload = function() {
    const adminButton = document.createElement("button");
    adminButton.className = "uiverse";
    adminButton.innerHTML = `<div class="wrapper"><span>Admin Login</span><div class="circle circle-1"></div><div class="circle circle-2"></div><div class="circle circle-3"></div><div class="circle circle-4"></div><div class="circle circle-5"></div><div class="circle circle-6"></div><div class="circle circle-7"></div><div class="circle circle-8"></div><div class="circle circle-9"></div><div class="circle circle-10"></div><div class="circle circle-11"></div><div class="circle circle-12"></div></div>`;
    adminButton.style.display = "none";
    adminButton.style.marginTop = "20px";
    document.body.appendChild(adminButton);

    // Secret command to reveal admin button (PC: Ctrl+Alt+R)
    document.addEventListener("keydown", function(e) {
        if (e.key === "r" && e.ctrlKey && e.altKey) {
            adminButton.style.display = "block";
        }
    });

    // Long-press reveal for Android
    const headerImage = document.getElementById("headerImage");
    let pressTimer;
    headerImage.addEventListener("touchstart", function(e) {
        pressTimer = setTimeout(() => {
            adminButton.style.display = "block";
        }, 1000);
        e.preventDefault();
    });
    headerImage.addEventListener("touchend", function() {
        clearTimeout(pressTimer);
    });
    headerImage.addEventListener("touchmove", function() {
        clearTimeout(pressTimer);
    });

    adminButton.addEventListener("click", function() {
        const adminKey = prompt("Enter Admin Key:");
        if (adminKey === "asdfghjkl;") {
            document.getElementById("createHuntButton").style.display = "block";
        } else {
            alert("Incorrect Admin Key!");
        }
    });

    // Dynamic statistic cards
    const statCards = document.getElementById("statCards");
    function updateStats() {
        const locationCount = hunts.length;
        const activeHunters = 5;
        const totalUsers = 10;
        statCards.innerHTML = `
            <div class="stat-card"><span style="color: teal; font-size: 24px;">📍</span><br><strong>${locationCount}</strong><br><span style="font-size: 14px;">Locations</span></div>
            <div class="stat-card"><span style="color: blue; font-size: 24px;">📷</span><br><strong>${activeHunters}</strong><br><span style="font-size: 14px;">Active Hunters</span></div>
            <div class="stat-card"><span style="font-size: 24px;">👥</span><br><strong>${totalUsers}</strong><br><span style="font-size: 14px;">Total Users</span></div>
        `;
    }
    updateStats();

    // Add modal content to DOM on load
    const modal = document.createElement("div");
    modal.id = "modal";
    modal.innerHTML = `
        <div id="modal-content">
            <span class="close">X</span>
            <h2>Create New Hunt</h2>
            <form id="createHuntForm">
                <input type="text" id="huntName" placeholder="Hunt Name" required><br>
                <textarea id="huntDescription" placeholder="Description" required></textarea><br>
                <input type="text" id="huntLocation" placeholder="Location (e.g., Downtown Houston, TX)" required><br>
                <label class="camera-input" for="huntImage">📷 Take Photo<input type="file" id="huntImage" accept="image/*" capture="camera"></label><br>
                <button type="submit" class="uiverse"><div class="wrapper"><span>Create Hunt</span><div class="circle circle-1"></div><div class="circle circle-2"></div><div class="circle circle-3"></div><div class="circle circle-4"></div><div class="circle circle-5"></div><div class="circle circle-6"></div><div class="circle circle-7"></div><div class="circle circle-8"></div><div class="circle circle-9"></div><div class="circle circle-10"></div><div class="circle circle-11"></div><div class="circle circle-12"></div></div></button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    // Create Hunt Modal
    const createHuntButton = document.getElementById("createHuntButton");
    createHuntButton.addEventListener("click", function() {
        console.log("Create Hunt button clicked"); // Debug log
        modal.style.display = "block";
        document.getElementById("huntName").value = "";
        document.getElementById("huntDescription").value = "";
        document.getElementById("huntLocation").value = "";
        document.getElementById("huntImage").value = "";
    });

    document.querySelector("#modal-content .close").addEventListener("click", function() {
        console.log("Modal closed via X"); // Debug log
        modal.style.display = "none";
    });

    document.getElementById("createHuntForm").addEventListener("submit", function(e) {
        e.preventDefault();
        console.log("Form submitted"); // Debug log
        const name = document.getElementById("huntName").value;
        const description = document.getElementById("huntDescription").value;
        const location = document.getElementById("huntLocation").value;
        const imageInput = document.getElementById("huntImage");
        let imageSrc = null;
        if (imageInput.files && imageInput.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                console.log("Image loaded, creating card"); // Debug log
                imageSrc = e.target.result;
                createHuntCard(name, description, location, imageSrc);
                modal.style.display = "none";
                updateStats();
            };
            reader.readAsDataURL(imageInput.files[0]);
        } else {
            console.log("No image, creating card"); // Debug log
            createHuntCard(name, description, location, imageSrc);
            modal.style.display = "none";
            updateStats();
        }
        console.log("Form processing complete"); // Debug log
    });
};

function createHuntCard(name, description, location, imageSrc) {
    const huntCards = document.getElementById("huntCards");
    const huntId = Date.now().toString();
    hunts.push({ id: huntId, name, description, location, image: imageSrc, items: [], rating: 0 });
    localStorage.setItem("hunts", JSON.stringify(hunts));
    const card = document.createElement("div");
    card.className = "hunt-card";
    card.innerHTML = `
        <div style="height: 200px; overflow: hidden;">
            ${imageSrc ? `<img src="${imageSrc}" alt="Hunt image for ${name}" style="width: 100%; height: 100%; object-fit: cover;">` : '<div style="width: 100%; height: 100%; background-color: #f0f0f0; display: flex; align-items: center; justify-content: center;">Placeholder</div>'}
        </div>
        <h3 style="margin: 10px 0;">${name}</h3>
        <p style="margin: 5px 0; font-size: 14px;">${description}</p>
        <p style="margin: 5px 0; font-size: 14px;">📍 ${location}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
            <button class="start-button uiverse" data-hunt="${huntId}"><div class="wrapper"><span>Start Hunt</span><div class="circle circle-1"></div><div class="circle circle-2"></div><div class="circle circle-3"></div><div class="circle circle-4"></div><div class="circle circle-5"></div><div class="circle circle-6"></div><div class="circle circle-7"></div><div class="circle circle-8"></div><div class="circle circle-9"></div><div class="circle circle-10"></div><div class="circle circle-11"></div><div class="circle circle-12"></div></div></button>
            <button class="add-to-button uiverse" data-hunt="${huntId}"><div class="wrapper"><span>Add to</span><div class="circle circle-1"></div><div class="circle circle-2"></div><div class="circle circle-3"></div><div class="circle circle-4"></div><div class="circle circle-5"></div><div class="circle circle-6"></div><div class="circle circle-7"></div><div class="circle circle-8"></div><div class="circle circle-9"></div><div class="circle circle-10"></div><div class="circle circle-11"></div><div class="circle circle-12"></div></div></button>
            <span>⭐ ${hunts.find(h => h.id === huntId).rating}</span>
        </div>
    `;
    huntCards.appendChild(card);
}

// Add to button functionality using event delegation with debug
document.getElementById("huntCards").addEventListener("click", function(e) {
    console.log("Click detected on huntCards, target:", e.target); // Debug log
    if (e.target.classList.contains("add-to-button")) {
        console.log("Add to button clicked for hunt:", e.target.getAttribute("data-hunt")); // Debug log
        const huntId = e.target.getAttribute("data-hunt");
        const input = document.createElement("input");
        input.type = "file";
        input.accept = "image/*";
        input.capture = "camera";
        input.click();
        input.onchange = function() {
            console.log("Camera input changed"); // Debug log
            const reader = new FileReader();
            reader.onload = function(e) {
                console.log("Image loaded for new item"); // Debug log
                const hunt = hunts.find(h => h.id === huntId);
                if (hunt) {
                    if (!hunt.items) hunt.items = [];
                    hunt.items.push({ image: e.target.result, found: false });
                    localStorage.setItem("hunts", JSON.stringify(hunts));
                    console.log("New item added to hunt:", huntId); // Debug log
                }
            };
            reader.readAsDataURL(input.files[0]);
        };
    }
});