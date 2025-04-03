// Add an event listener to handle form submission
document.getElementById('uploadForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent page refresh
    const formData = new FormData(this);

    // Check if a file is selected
    if (!formData.has('file') || formData.get('file').size === 0) {
        alert('Please select a file before uploading!');
        return;
    }

    // Send the form data to the server for analysis
    fetch('/analyze', {
        method: 'POST',
        body: formData
    })
        .then(response => {
            // Check if the response is ok (status 200)
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json(); // Parse JSON response
        })
        .then(data => {
            // Clear previous result table content
            const resultsContainer = document.querySelector('#results tbody');
            resultsContainer.innerHTML = '';

            // If summary data exists, update the summary board
            if ('summary' in data) {
                updateSummaryBoard(data.summary);

                // If chart data is present, render the result chart
                if (data.chartData) {
                    renderChart(data.chartData);
                }
            } else if ('error' in data) {
                // Display error message if error is in the response
                alert(`Error: ${data.error}`);
            }
        })
        .catch(error => {
            // Handle any errors that occur during fetch
            console.error('Error:', error);
            alert('An error occurred while analyzing. Please try again.');
        });
});

// Function to update the summary board with data from the server
function updateSummaryBoard(summary) {
    // Helper function to update individual fields by ID
    const updateField = (id, value) => {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    };

    // Update the summary fields based on the summary data received
    updateField('cycleCount', summary.cycleCount || 'N/A');
    updateField('trunkLeanValue', summary.trunkLeanValue || 'N/A');
    updateField('trunkLeanPercentage', `${summary.trunkLeanPercentage || 0}%`);
    updateField('trunkLeanRes', summary.trunkLeanRes || 'N/A');

    updateField('frontKneeValue', summary.frontKneeValue || 'N/A');
    updateField('frontKneePercentage', `${summary.frontKneePercentage || 0}%`);
    updateField('frontKneeRes', summary.frontKneeRes || 'N/A');

    updateField('backKneeValue', summary.backKneeValue || 'N/A');
    updateField('backKneePercentage', `${summary.backKneePercentage || 0}%`);
    updateField('backKneeRes', summary.backKneeRes || 'N/A');

    updateField('hipValue', summary.hipValue || 'N/A');
    updateField('hipPercentage', `${summary.hipPercentage || 0}%`);
    updateField('hipRes', summary.hipRes || 'N/A');

    updateField('angleScore', `${summary.angleScore || 0}`);
    updateField('angleRes', summary.angleRes || 'N/A');

    // Display the overall result chart data
    updateField('GoodScore', summary.GoodScore || 'N/A');
    updateField('GoodPercentage', `${summary.GoodPercentage || 0}%`);
    updateField('SatisfactoryScore', summary.SatisfactoryScore || 'N/A');
    updateField('SatisfactoryPercentage', `${summary.SatisfactoryPercentage || 0}%`);
    updateField('ShouldImproveScore', summary.ShouldImproveScore || 'N/A');
    updateField('ShouldImprovePercentage', `${summary.ShouldImprovePercentage || 0}%`);
    updateField('resultChart', `Good: ${summary.GoodPercentage || 0}% Satisfactory: ${summary.SatisfactoryPercentage || 0}% Should Improve: ${summary.ShouldImprovePercentage || 0}%`);
}

// Function to render the result chart (pie chart)
function renderChart(chartData) {
    const chartElement = document.getElementById('resultChart');
    if (!chartElement) {
        console.error('Canvas element for chart not found');
        return;
    }

    const ctx = chartElement.getContext('2d'); // Get the 2D drawing context
    new Chart(ctx, {
        type: 'pie', // Pie chart type
        data: {
            labels: ['Good', 'Satisfactory', 'Should Improve'], // Data labels
            datasets: [{
                data: chartData, // Data for each segment
                backgroundColor: ['green', 'yellow', 'red'] // Colors for the segments
            }]
        },
        options: {
            responsive: true, // Make the chart responsive
            plugins: {
                legend: {
                    position: 'top' // Place the legend at the top
                }
            }
        }
    });
}
