        document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch('/analyze', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        const resultsContainer = document.querySelector('#results tbody');
        resultsContainer.innerHTML = '';

        if ('analysis_results' in data) {
            const results = data['analysis_results'];
            results.forEach(result => {
                const row = `
                    <tr>
                        <td>${result['Frame']}</td>
                        <td>${result['Running Gait Cycle']}</td>
                        <td>${result['Sub Phase']}</td>
                        <td>${result['% Cycle']}</td>
                        <td>${result['Trunk Lean']}</td>
                        <td>${result['Front Knee Angle']}</td>
                        <td>${result['Back Knee Angle']}</td>
                        <td>${result['Front Hip Angle']}</td>
                        <td>${result['Angle Each Body %']}</td>
                        <td>${result['Result']}</td>
                    </tr>`;
                resultsContainer.innerHTML += row;
            });
        } else if ('error' in data) {
            console.error('Error:', data['error']);
        }
    })
    .catch(error => console.error('Error:', error));
});