document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];

    if (file && file.type === 'text/plain') {
        const reader = new FileReader();

        reader.onload = function(e) {
            const text = e.target.result;
            processFileData(text);
        };

        reader.readAsText(file);
    } else {
        alert('Please upload a valid .txt file');
    }
});

function processFileData(text) {
    const humidity = [];
    const temperature = [];
    const soilMoisture = [];
    const nitrogen = [];
    const phosphorous = [];
    const potassium = [];

    const lines = text.split('\n');
    lines.forEach(line => {
        if (line.includes('Humidity')) {
            humidity.push(parseFloat(line.split(': ')[1].replace('%', '').trim()));
        } else if (line.includes('Temperature')) {
            temperature.push(parseFloat(line.split(': ')[1].replace('C', '').trim()));
        } else if (line.includes('Soil Moisture')) {
            soilMoisture.push(parseFloat(line.split(': ')[1].replace('%', '').trim()));
        } else if (line.includes('Nitrogen')) {
            nitrogen.push(parseFloat(line.split(': ')[1].replace('mg/kg', '').trim()));
        } else if (line.includes('Phosphorous')) {
            phosphorous.push(parseFloat(line.split(': ')[1].replace('mg/kg', '').trim()));
        } else if (line.includes('Potassium')) {
            potassium.push(parseFloat(line.split(': ')[1].replace('mg/kg', '').trim()));
        }
    });

    // Create table with the data
    const tableBody = document.getElementById('data-table').getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ''; // Clear previous data

    for (let i = 0; i < humidity.length; i++) {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = humidity[i];
        row.insertCell(1).textContent = temperature[i];
        row.insertCell(2).textContent = soilMoisture[i];
        row.insertCell(3).textContent = nitrogen[i];
        row.insertCell(4).textContent = phosphorous[i];
        row.insertCell(5).textContent = potassium[i];
    }

    // Calculate averages
    const averages = {
        humidity: calculateAverage(humidity),
        temperature: calculateAverage(temperature),
        soilMoisture: calculateAverage(soilMoisture),
        nitrogen: calculateAverage(nitrogen),
        phosphorous: calculateAverage(phosphorous),
        potassium: calculateAverage(potassium)
    };

    // Display averages
    document.getElementById('avg-humidity').textContent = averages.humidity.toFixed(2);
    document.getElementById('avg-temperature').textContent = averages.temperature.toFixed(2);
    document.getElementById('avg-soil-moisture').textContent = averages.soilMoisture.toFixed(2);
    document.getElementById('avg-nitrogen').textContent = averages.nitrogen.toFixed(2);
    document.getElementById('avg-phosphorous').textContent = averages.phosphorous.toFixed(2);
    document.getElementById('avg-potassium').textContent = averages.potassium.toFixed(2);

    // Show the results section and the download button
    document.getElementById('results').style.display = 'block';
    document.getElementById('download-btn').style.display = 'block';

    // Setup the download button
    document.getElementById('download-btn').onclick = function() {
        downloadExcel(humidity, temperature, soilMoisture, nitrogen, phosphorous, potassium, averages);
    };
}

function calculateAverage(values) {
    const sum = values.reduce((acc, value) => acc + value, 0);
    return sum / values.length || 0;
}

function downloadExcel(humidity, temperature, soilMoisture, nitrogen, phosphorous, potassium, averages) {
    const ws_data = [
        ["Humidity", "Temperature", "Soil Moisture", "Nitrogen", "Phosphorous", "Potassium"],
        ...humidity.map((_, index) => [
            humidity[index], 
            temperature[index], 
            soilMoisture[index], 
            nitrogen[index], 
            phosphorous[index], 
            potassium[index]
        ]),
        ["Averages", averages.humidity.toFixed(2), averages.temperature.toFixed(2), averages.soilMoisture.toFixed(2), averages.nitrogen.toFixed(2), averages.phosphorous.toFixed(2), averages.potassium.toFixed(2)]
    ];

    const ws = XLSX.utils.aoa_to_sheet(ws_data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");

    // Download the Excel file
    XLSX.writeFile(wb, "processed_data.xlsx");
}   