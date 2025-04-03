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
