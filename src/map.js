(function() {
    const lat = document.querySelector('#lat').value || -16.4059247;
    const lng = document.querySelector('#lng').value || -71.5325414;
    const map = L.map('map').setView([lat, lng], 8);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // pin marker
    var marker = new L.marker([lat, lng], {
        draggable: true,
        autoPan: true
    }).addTo(map);

    // detect pin's move
    marker.on('moveend', function(e){
        marker = e.target;
        const pos = marker.getLatLng();
        map.panTo(new L.LatLng(pos.lat, pos.lng));

        document.querySelector('#lat').value = pos.lat;
        document.querySelector('#lng').value = pos.lng;
    });
})()