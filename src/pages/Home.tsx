import { StyleSheet, View } from 'react-native';
import { Api, TimeOfDayGradient, APIResponse } from '../data/Api';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { LoadingSpinner } from '../components/_partials/LoadingSpinner';
import * as Location from 'expo-location';
import { StatsHeader } from '../components/_partials/StatsHeader';
import { CurrentWeather } from '../components/_partials/CurrentWeather';
import { Forecast } from '../components/_partials/Forecast';

export default function Home() {
  
  const [location, setLocation] = useState<Location.LocationObjectCoords | null>(null);
  const [weather, setWeather] = useState<APIResponse | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const location = await Api.getLocation();
      setLocation(location);
    }
    fetchData();
  }, []);

  useEffect(() => {
    if (location) {
      const fetchWeather = async () => {
        const weather = await Api.getWeather(location.latitude, location.longitude);
        setWeather(weather);
      }
      fetchWeather();
    }
  }, [location]);

  return ( 
    <LinearGradient
        colors={TimeOfDayGradient.getGradient(undefined)}
        style={styles.backgroundGradient}
    >
    {!weather && <LoadingSpinner />}
    {weather && (
        <>
            <StatsHeader weather={weather} />
            <CurrentWeather weather={weather} />
            <View
                style={{
                    borderBottomColor: 'white',
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    margin: 20,
                }}
            />
            <Forecast forecast={weather} />
        </>
    )}
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  backgroundGradient: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
  },
});
