import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import { APIResponse, Api } from "../../data/Api";
import { formatTime, getTemperatureUnitSymbol } from "../../Helper";

type ForecastProps = {
    forecast: APIResponse;
}

export const Forecast = (props: ForecastProps) => {
    return (
        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
            {props.forecast.list.slice(1).map((item, index) => (
                <ForecastItem key={index} item={item} />
            ))}
        </ScrollView>
    );
}

const ForecastItem = (props: { item: any }) => {
    return (
        <View style={styles.forecastItem}>
            <Image
                style={styles.icon}
                source={{ uri: Api.getWeatherIconUrl(props.item.weather[0].icon) }}
            />
            <Text style={{color: "#fff"}}>{props.item.main.temp}{getTemperatureUnitSymbol()}</Text>
            <Text style={{color: "#fff"}}>{formatTime(props.item.dt_txt)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        gap: 20,
        padding: 20,
        overflow: 'scroll',
    },
    forecastItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'space-around',
    },
    icon: {
        width: 50,
        height: 50,
    },
});