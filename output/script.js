// การจัดการอัปโหลดไฟล์
document.getElementById('uploadForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    const formData = new FormData(this);
    document.getElementById('loading').style.display = 'block';

    try {
        const response = await fetch('/analyze', { method: 'POST', body: formData });
        const data = await response.json();
        document.getElementById('loading').style.display = 'none';
        updateResults(data);
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('loading').style.display = 'none';
        alert('An error occurred. Please try again.');
    }
});

// อัปเดตผลลัพธ์ในหน้า
function updateResults(data) {
    const resultsContainer = document.querySelector('#results tbody');
    resultsContainer.innerHTML = '';

    if (data && data.count2_results) {
        data.count2_results.forEach(result => {
            const row = `
                <tr>
                    <td>${result['Frame'] || '-'}</td>
                    <td>${result['Running Gait Cycle'] || '-'}</td>
                    <td>${result['Sub Phase'] || '-'}</td>
                    <td>${result['% Cycle'] || '-'}</td>
                    <td>${result['Trunk Lean'] || '-'}</td>
                    <td>${result['Front Knee Angle'] || '-'}</td>
                    <td>${result['Back Knee Angle'] || '-'}</td>
                    <td>${result['Front Hip Angle'] || '-'}</td>
                    <td>${result['Angle Each Body %'] || '-'}</td>
                    <td>${result['Result'] || '-'}</td>
                </tr>`;
            resultsContainer.innerHTML += row;
        });

        updateBoard(data);
    } else {
        alert('No valid data received.');
    }
}

// อัปเดต Result Board
function updateBoard(data) {
    document.getElementById('cycleCount').textContent = data.cycleCount || '-';
    document.getElementById('trunkLeanValue').textContent = data.trunkLeanValue || '-';
    document.getElementById('trunkLeanPercentage').textContent = data.trunkLeanPercentage || '-';
    document.getElementById('trunkLeanRes').textContent = data.trunkLeanRes || '-';
    document.getElementById('frontKneeValue').textContent = data.frontKneeValue || '-';
    document.getElementById('frontKneePercentage').textContent = data.frontKneePercentage || '-';
    document.getElementById('frontKneeRes').textContent = data.frontKneeRes || '-';
    document.getElementById('backKneeValue').textContent = data.backKneeValue || '-';
    document.getElementById('backKneePercentage').textContent = data.backKneePercentage || '-';
    document.getElementById('backKneeRes').textContent = data.backKneeRes || '-';
    document.getElementById('hipValue').textContent = data.hipValue || '-';
    document.getElementById('hipPercentage').textContent = data.hipPercentage || '-';
    document.getElementById('hipRes').textContent = data.hipRes || '-';
    document.getElementById('angleScore').textContent = `${data.angleScore || 0}%`;
    document.getElementById('angleRes').textContent = data.angleRes || '-';

    renderChart([
        parseFloat(data.GoodPercentage || 0),
        parseFloat(data.SatisfactoryPercentage || 0),
        parseFloat(data["Should ImprovePercentage"] || 0),
    ]);
}

// วาดกราฟ Chart.js
function renderChart(chartData) {
    const ctx = document.getElementById('resultChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Good', 'Satisfactory', 'Should Improve'],
            datasets: [
                {
                    data: chartData,
                    backgroundColor: ['green', 'yellow', 'red'],
                },
            ],
        },
        options: { responsive: true },
    });
}

// ปุ่มเลื่อนหน้า
function toggleScroll() {
    const button = document.getElementById('scrollButton');
    const scrollToTop = window.scrollY > 0;
    if (scrollToTop) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        button.textContent = '↓';
    } else {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        button.textContent = '↑';
    }
}
