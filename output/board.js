document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch('/analyze', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        // Clear table results (use for analysis_results)
        const resultsContainer = document.querySelector('#results tbody');
        resultsContainer.innerHTML = '';

        if ('summary' in data) {
            // Update Result Board with summary data
            const summary = data.summary;
            document.getElementById('cycleCount').textContent = summary.cycle;
            document.getElementById('trunkLeanValue').textContent = summary.trunkLean.value;
            document.getElementById('trunkLeanPercentage').textContent = `${summary.trunkLean.percentage}%`;
            document.getElementById('trunkLeanRes').textContent = summary.trunkLean.value;

            document.getElementById('frontKneeValue').textContent = summary.frontKnee.value;
            document.getElementById('frontKneePercentage').textContent = `${summary.frontKnee.percentage}%`;
            document.getElementById('frontKneeRes').textContent = summary.frontKnee.value;

            document.getElementById('backKneeValue').textContent = summary.backKnee.value;
            document.getElementById('backKneePercentage').textContent = `${summary.backKnee.percentage}%`;
            document.getElementById('backKneeRes').textContent = summary.backKnee.value;

            document.getElementById('hipValue').textContent = summary.hip.value;
            document.getElementById('hipPercentage').textContent = `${summary.hip.percentage}%`;
            document.getElementById('hipRes').textContent = summary.hip.value;

            document.getElementById('angleScore').textContent = `${summary.angleEachBody}%`;
            document.getElementById('angleRes').textContent = summary.angleEachBody;

            // Render chart
            renderChart(data.chartData);
        } else if ('error' in data) {
            console.error('Error:', data.error);
        }
    })
    .catch(error => console.error('Error:', error));
});

function renderChart(chartData) {
    const ctx = document.getElementById('resultChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Good', 'Satisfactory', 'Should Improve'],
            datasets: [{
                data: chartData,
                backgroundColor: ['green', 'yellow', 'red'],
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                }
            }
        }
    });
}
