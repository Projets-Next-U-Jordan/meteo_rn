import { APIResponse, APIResponseItem } from "./data/Api";

enum Units {
    Metric = 'metric',
    Imperial = 'imperial',
}

enum TemperatureUnit {
    Celsius = '°C',
    Fahrenheit = '°F',
    Kelvin = 'K',
}

enum SpeedUnit {
    MetersPerSecond = 'm/s',
    MilesPerHour = 'mph',
}

const temperatureUnit = Units.Metric; // Change this to Units.Imperial for Imperial units
const speedUnit = Units.Metric; // Change this to Units.Imperial for Imperial units

export const getTemperatureUnitSymbol = (unit: Units=Units.Metric): string => {
    switch (unit) {
        case Units.Metric:
            return TemperatureUnit.Celsius;
        case Units.Imperial:
            return TemperatureUnit.Fahrenheit;
        default:
            return '';
    }
};

export const getSpeedUnitSymbol = (unit: Units=Units.Metric): string => {
    switch (unit) {
        case Units.Metric:
            return SpeedUnit.MetersPerSecond;
        case Units.Imperial:
            return SpeedUnit.MilesPerHour;
        default:
            return '';
    }
};

const getAverage = (values: number[]): number => {
    const sum = values.reduce((a, b) => a + b, 0);
    const average = sum / values.length;
    const roundedAverage = Number(average.toFixed(2)); // Round the average to 2 decimal places
    return roundedAverage;
}

export const getTodaysAverageCloudiness = (weather:APIResponseItem[]): number => {
    const values = weather.map(item => item.clouds.all);
    return getAverage(values);
}

export const getTodaysAverageWind = (weather:APIResponseItem[]): number => {
    const values = weather.map(item => item.wind.speed);
    return getAverage(values);
}

export const getTodaysAverageHumidity = (weather:APIResponseItem[]): number => {
    const values = weather.map(item => item.main.humidity);
    return getAverage(values);
}

export const formatDescription = (description: string): string => {
    const words = description.split(" ");

    for (let i = 0; i < words.length; i++) {
        words[i] = words[i][0].toUpperCase() + words[i].substr(1);
    }
    return words.join(" ");
}

export const formatTime = (time: string): string => {
    const date = new Date(time);
    return date.toLocaleDateString('fr-FR', { hour: 'numeric', minute: 'numeric' });
}