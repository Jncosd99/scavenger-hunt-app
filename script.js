console.log("Scavenger Hunt App Initialized");

const ADMIN_KEY = "yourSecretKey"; // Replace with your chosen key
let isAdmin = false;

window.onload = function() {
    const adminKey = prompt("Enter Admin Key:");
    if (adminKey === ADMIN_KEY) {
        isAdmin = true;
        document.getElementById("adminPanel").style.display = "block";
    }
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
    }
});