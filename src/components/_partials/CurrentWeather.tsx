import { Image, StyleSheet, Text, View } from "react-native";
import { APIResponse, Api } from "../../data/Api";
import { formatDescription, getTemperatureUnitSymbol } from "../../Helper";
import { IconDownRightArrow, IconUpRightArrow } from "../Icons";

type CurrentWeatherProps = {
    weather: APIResponse;
}

export const CurrentWeather = (props: CurrentWeatherProps) => {
    return (
        <View style={styles.container}>
            <Text style={styles.description}>{props.weather.city.name}</Text>
            <View style={styles.currentTemp}>
                <Text style={styles.temperature}>{props.weather.list[0].main.temp.toFixed(0)}</Text>
                <Text style={styles.currentTempUnit}>{getTemperatureUnitSymbol()}</Text>
            </View>
            <Image
                style={styles.icon}
                source={{ uri: Api.getWeatherIconUrl(props.weather.list[0].weather[0].icon) }}
            />
            <Text style={styles.description}>{formatDescription(props.weather.list[0].weather[0].description)}</Text>
            <MinMaxTemperature min={props.weather.list[0].main.temp_min} max={props.weather.list[0].main.temp_max} />
        </View>
    );
}

const MinMaxTemperature = (props: { min: number, max: number }) => {
    return (
        <View style={styles.minMaxTemperature}>
            <View style={styles.minMaxTempStat}>
                <IconDownRightArrow color="#fff" />
                <Text style={styles.minMaxTemperatureText}>{props.min}{getTemperatureUnitSymbol()}</Text>
            </View>
            <View style={styles.minMaxTempStat}>
                <IconUpRightArrow color="#fff" />
                <Text style={styles.minMaxTemperatureText}>{props.max}{getTemperatureUnitSymbol()}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({ 
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    currentTemp: {
        display: "flex",
        flexDirection: "row",
        height: "auto"
    },
    currentTempUnit: {
        fontSize: 20,
        color: "#fff",
    },
    temperature: {
        fontSize: 48,
        fontWeight: 'bold',
        color: "#fff",
    },
    description: {
        fontSize: 24,
        color: "#fff",
    },
    icon: {
        width: 100,
        height: 100,
        marginVertical: -20,
    },
    minMaxTemperature: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        gap: 20,
    },
    minMaxTempStat: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    minMaxTemperatureText: {
        fontSize: 16,
        color: "#fff",
    },
});