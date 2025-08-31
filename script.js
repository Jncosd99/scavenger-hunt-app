console.log("Scavenger Hunt App Initialized");

const ADMIN_KEY = "asdfghjkl;"; // New secure key
let isAdmin = false;

window.onload = function() {
    const adminButton = document.createElement("button");
    adminButton.textContent = "Admin Login";
    adminButton.style.display = "none"; // Hidden by default
    adminButton.style.padding = "10px";
    adminButton.style.backgroundColor = "#4CAF50";
    adminButton.style.color = "white";
    adminButton.style.border = "none";
    adminButton.style.borderRadius = "5px";
    adminButton.style.cursor = "pointer";
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
        }, 1000); // 1 second long press
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
        if (adminKey === ADMIN_KEY) {
            isAdmin = true;
            document.getElementById("adminPanel").style.display = "block";
        } else {
            alert("Incorrect Admin Key!");
        }
    });
};

function createHuntCard(name, description) {
    const huntCards = document.getElementById("huntCards");
    const card = document.createElement("div");
    card.className = "hunt-card";
    card.innerHTML = `
        <h3>${name}</h3>
        <p>${description}</p>
        <button class="start-button" data-hunt="${name.toLowerCase().replace(/\s+/g, '-')}" style="padding: 10px; background-color: #008CBA; color: white; border: none; border-radius: 5px; cursor: pointer;">Start</button>
    `;
    huntCards.appendChild(card);
}

document.getElementById("huntForm").addEventListener("submit", function(e) {
    e.preventDefault();
    if (isAdmin) {
        const name = document.getElementById("huntName").value;
        const description = document.getElementById("huntDescription").value;
        createHuntCard(name, description);
        this.reset();
    } else {
        alert("Admin access required!");
    }
});