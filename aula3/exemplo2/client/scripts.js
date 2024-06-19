const apiUrl = 'http://localhost:3001';

function getStock() {
    const symbol = document.getElementById('symbol').value;
    fetch(`${apiUrl}/stock/${symbol}`)
        .then(response => response.json())
        .then(data => displayStockData(data))
        .catch(error => displayError(error));
}

function displayStockData(data) {
    const stockDataDiv = document.getElementById('stockData');
    stockDataDiv.innerHTML = '';  // Clear previous data

    if (data.history) {
        const table = document.createElement('table');
        table.innerHTML = `
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                    <th>Volume</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        `;

        const tbody = table.querySelector('tbody');

        for (const [date, stock] of Object.entries(data.history)) {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${date}</td>
                <td>${stock.open}</td>
                <td>${stock.high}</td>
                <td>${stock.low}</td>
                <td>${stock.close}</td>
                <td>${stock.volume}</td>
            `;
            tbody.appendChild(row);
        }

        stockDataDiv.appendChild(table);
    } else {
        stockDataDiv.textContent = 'No data available';
    }
}

function displayError(error) {
    document.getElementById('stockData').textContent = `Error: ${error.message}`;
}
