document.addEventListener('DOMContentLoaded', () => {
    const WEB_APP_URL = 'YOUR_WEB_APP_URL'; // <-- GANTIKAN DENGAN URL WEB APP ANDA

    // --- Logik untuk Halaman Utama (index.html) ---
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const resultTable = document.getElementById('resultTable')?.getElementsByTagName('tbody')[0];

    if (searchBtn) {
        searchBtn.addEventListener('click', performSearch);
    }

    function performSearch() {
        const query = searchInput.value.toLowerCase();
        if (!query) return;

        fetch(`${WEB_APP_URL}?action=getData`)
            .then(response => response.json())
            .then(data => {
                const filteredData = data.filter(item =>
                    item.No_Kenderaan.toLowerCase().includes(query) ||
                    item.No_Siri_Stiker.toLowerCase().includes(query) ||
                    item.No_Unit_Blok.toLowerCase().includes(query)
                );
                displayResults(filteredData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                displayError();
            });
    }

    function displayResults(data) {
        resultTable.innerHTML = ''; // Kosongkan hasil carian lama

        if (data.length > 0) {
            data.forEach(item => {
                const row = resultTable.insertRow();
                const noUnitBlokParts = (item.No_Unit_Blok || '').split(' Unit ');
                row.innerHTML = `
                    <td>${item.No_Siri_Stiker || ''}</td>
                    <td>${item.No_Kenderaan || ''}</td>
                    <td>${noUnitBlokParts[0] || ''}</td>
                    <td>${noUnitBlokParts[1] || ''}</td>
                    <td>${item.No_Fon || ''}</td>
                `;
            });
        } else {
            const row = resultTable.insertRow();
            const cell = row.insertCell();
            cell.colSpan = 5;
            cell.textContent = 'Tiada data ditemui.';
            cell.style.textAlign = 'center';
        }
    }

    function displayError() {
        resultTable.innerHTML = '';
        const row = resultTable.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 5;
        cell.textContent = 'Gagal memuatkan data. Sila pastikan URL Web App adalah betul.';
        cell.style.textAlign = 'center';
        cell.style.color = 'red';
    }

    // --- Logik untuk Halaman Admin (admin.html) ---
    const loginContainer = document.getElementById('loginContainer');
    const adminPanel = document.getElementById('adminPanel');
    const loginBtn = document.getElementById('loginBtn');
    const passwordInput = document.getElementById('password');
    const vehicleForm = document.getElementById('vehicleForm');

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            if (passwordInput.value === 'admin123') { // Kata laluan simple
                loginContainer.style.display = 'none';
                adminPanel.style.display = 'block';
            } else {
                alert('Kata laluan salah!');
            }
        });
    }

    if (vehicleForm) {
        vehicleForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const formData = {
                No_Kenderaan: document.getElementById('noKenderaan').value,
                Jenis_Kenderaan: document.getElementById('jenisKenderaan').value,
                No_Unit_Blok: document.getElementById('noUnitBlok').value,
                Status_Owner: document.getElementById('statusOwner').value,
                No_Siri_Stiker: document.getElementById('noSiriStiker').value,
                Tarikh_Keluar_Stiker: document.getElementById('tarikhKeluarStiker').value,
                Tempoh_Stiker: document.getElementById('tempohStiker').value,
                No_Fon: document.getElementById('noFon').value,
                '2nd_Contact': document.getElementById('contactPerson').value,
                No_Fon_2nd_Contact: document.getElementById('noFonContactPerson').value,
                Yuran_Maintenance: document.getElementById('yuranMaintenance').value,
                Catatan: document.getElementById('catatan').value,
            };

            fetch(`${WEB_APP_URL}?action=addData`, {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'text/plain;charset=utf-8', // Diperlukan oleh Google Apps Script
                },
            })
            .then(response => response.json())
            .then(result => {
                if (result.status === 'success') {
                    alert('Data berjaya ditambah!');
                    vehicleForm.reset();
                } else {
                    alert('Gagal menambah data: ' + result.message);
                }
            })
            .catch(error => {
                console.error('Error submitting data:', error);
                alert('Gagal menghantar data. Sila semak console log dan pastikan URL Web App adalah betul.');
            });
        });
    }
});
