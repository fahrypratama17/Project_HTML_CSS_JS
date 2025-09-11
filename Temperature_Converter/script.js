function convertTemp() {
    const inputTemp = parseFloat(document.getElementById('inputTemp').value);
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;

    if (isNaN(inputTemp)) {
        document.getElementById('result').textContent = "Please enter a valid number";
        return;
    }

    let celcius;
    // Convert input to Celcius First
    switch(fromUnit)  {
        case 'celcius': celcius = inputTemp; break;
        case 'fahrenheit': celcius = (inputTemp - 32) * 5/9; break;
        case 'kelvin': celcius = inputTemp - 273.15; break;
    }

    // Convert from Celcius to target unit
    let result;
    switch(toUnit) {
        case 'celcius': result = celcius; break;
        case 'fahrenheit': result = (celcius * 9/5) + 32; break;
        case 'kelvin': result = celcius + 273.15; break; 
    }

    document.getElementById('result').textContent = `${inputTemp}° ${fromUnit.charAt(0).toUpperCase()} = ${result.toFixed(2)}° ${toUnit.charAt(0).toUpperCase()}`;
}