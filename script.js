async function fetchDataAndPopulateTable(semester) {
    try {
        const response = await fetch('semester.json');
        const data = await response.json();

        // Memperbarui judul semester
        const semesterHeader = document.getElementById('semesterHeader');
        semesterHeader.innerText = semester === 'all' ? 'Semua Semester' : `Semester ${semester}`;

        const semesterData = semester === 'all' ? getAllSemesterData(data) : data.SEMESTER[semester];

        const tableBody = document.getElementById('semesterTableBody');
        tableBody.innerHTML = ''; // Menghapus isi tabel sebelum menambahkan yang baru

        let totalSKS = 0; // Menyimpan total SKS

        semesterData.forEach((matakuliah, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${matakuliah.Kode}</td>
                <td>${matakuliah.MATAKULIAH}</td>
                <td>${matakuliah.Jenis}</td>
                <td>${matakuliah.SKS}</td>
            `;
            tableBody.appendChild(row);

            // Menambahkan SKS matakuliah ke total SKS
            totalSKS += parseInt(matakuliah.SKS, 10);
        });

        // Menampilkan total SKS di bagian paling bawah tabel
        const totalSKSElement = document.getElementById('totalSKS');
        totalSKSElement.innerText = `Total SKS: ${totalSKS}`;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Fungsi untuk mendapatkan semua data semester
function getAllSemesterData(data) {
    const allSemesterData = [];
    for (const semesterKey in data.SEMESTER) {
        allSemesterData.push(...data.SEMESTER[semesterKey]);
    }
    return allSemesterData;
}

document.addEventListener('DOMContentLoaded', () => {
    // Ganti '1' dengan semester yang ingin ditampilkan secara default
    const defaultSemester = '1';

    fetchDataAndPopulateTable(defaultSemester);
});