import { StyleSheet, Text, View } from "react-native";
import { IconCloudiness, IconHumidity, IconWind } from "../Icons";
import { getSpeedUnitSymbol, getTodaysAverageCloudiness, getTodaysAverageHumidity, getTodaysAverageWind } from "../../Helper";
import { APIResponse } from "../../data/Api";
import { useEffect, useState } from "react";

type StatsHeaderProps = {
    weather: APIResponse;
}

type StatsProp = {
    value: number;
}

export const StatsHeader = (props: StatsHeaderProps) => {

    const [cloudiness, setCloudiness] = useState<number>(0);
    const [wind, setWind] = useState<number>(0);
    const [humidity, setHumidity] = useState<number>(0);

    useEffect(() => {
        if (!props.weather) {
            return;
        }
        setCloudiness(getTodaysAverageCloudiness(props.weather.list));
        setWind(getTodaysAverageWind(props.weather.list));
        setHumidity(getTodaysAverageHumidity(props.weather.list));
    }, [props.weather]);

    return (
        <View style={styles.container}>
            <Cloudiness value={cloudiness} />
            <Wind value={wind} />
            <Humidity value={humidity} />
        </View>
    );
};

const Cloudiness = (props:StatsProp) => {
    return (
        <View style={styles.stat}>
            <IconCloudiness />
            <Text style={{color: "#fff"}}>{props.value}%</Text>
        </View>
    );
}

const Wind = (props:StatsProp) => {
    return (
        <View style={styles.stat}>
            <IconWind />
            <Text style={{color: "#fff"}}>{props.value}{getSpeedUnitSymbol()}</Text>
        </View>
    );
}

const Humidity = (props:StatsProp) => {
    return (
        <View style={styles.stat}>
            <IconHumidity />
            <Text style={{color: "#fff"}}>{props.value}%</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 20,
    },
    stat: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        flexGrow: 1,
    },
});