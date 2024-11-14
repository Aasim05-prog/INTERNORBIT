function convertTemperature() {
    const value = parseInt(document.getElementById('tempValue').value);
    const unit = document.getElementById('unitSelect').value;
    let celsius, fahrenheit, kelvin;
    if (isNaN(value)) {
        document.getElementById('result').innerHTML = "Please enter a valid number.";
        return;
    }

    if (unit === 'Celsius') {
        fahrenheit = (value * 9/5) + 32;
        kelvin = value + 273.15;
    } else if (unit === 'Fahrenheit') {
        celsius = (value - 32) * 5/9;
        kelvin = (value - 32) * 5/9 + 273.15;
    } else if (unit === 'Kelvin') {
        celsius = value - 273.15;
        fahrenheit = (value - 273.15) * 9/5 + 32;
    }

    let resultText = `Converted temperature from ${unit}:\n`;
    if (unit === 'Celsius') {
        resultText += `Fahrenheit: ${fahrenheit.toFixed(2)} °F\nKelvin: ${kelvin.toFixed(2)} K`;
    } else if (unit === 'Fahrenheit') {
        resultText += `Celsius: ${celsius.toFixed(2)} °C\nKelvin: ${kelvin.toFixed(2)} K`;
    } else if (unit === 'Kelvin') {
        resultText += `Celsius: ${celsius.toFixed(2)} °C\nFahrenheit: ${fahrenheit.toFixed(2)} °F`;
    }

    document.getElementById('result').innerHTML = resultText.replace(/\n/g, '<br>');
}
