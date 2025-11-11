// script.js (Leaflet version)

// === Map setup ===
const map = L.map('map').setView([-25, 134.5], 3);

// Thêm tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// === Sidebar navigation ===
function showSection(section) {
    const formContainer = document.getElementById('formContainer');
    if(section === 'newFlight') {
        formContainer.style.display = 'block';
    } else {
        formContainer.style.display = 'none';
    }
}

// === Simple login (demo) ===
function login() {
    const user = prompt("Enter username:");
    if(user) {
        localStorage.setItem('user', user);
        alert("Logged in as " + user);
    }
}

// === Flight routes storage ===
let flightLayer = null;

// === Handle new flight form ===
document.getElementById('flightForm').addEventListener('submit', async function(e){
    e.preventDefault();

    // Lấy dữ liệu form
    const dep = document.getElementById('departure').value;
    const arr = document.getElementById('arrival').value;
    const flightNum = document.getElementById('flightNumber').value;
    const aircraft = document.getElementById('aircraft').value;
    const airlines = document.getElementById('airlines').value;
    const file = document.getElementById('flightFile').files[0];

    // Nếu có file JS, đọc nội dung (demo)
    if(file) {
        const content = await file.text();
        console.log('Flight JS content:', content);
        // eval(content); // Cẩn thận khi dùng eval
    }

    // Demo: vẽ route từ Sydney -> Singapore (có thể thay bằng API hoặc input coord)
    const depCoord = [-33.9, 151.2]; // [lat, lon]
    const arrCoord = [1.36, 103.99];

    // Nếu đã có layer, remove trước
    if(flightLayer) map.removeLayer(flightLayer);

    // Tạo polyline route
    flightLayer = L.polyline([depCoord, arrCoord], {color: '#FF4136', weight: 4}).addTo(map);

    // Zoom vừa đủ để thấy route
    map.fitBounds(flightLayer.getBounds());

    alert(`Flight added: ${flightNum}`);
});
