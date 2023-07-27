import {s} from "./App.style"
import {SafeAreaProvider, SafeAreaView} from "react-native-safe-area-context";
import {View} from "react-native";
import {MeteoInfos} from "./components/MeteoInfos/MeteoInfos";
import {LinearGradient} from "expo-linear-gradient";

import HKGrotesk from "./assets/fonts/HKGrotesk-Regular.otf"
import {useFonts} from "expo-font";
import {MeteoImage} from "./components/MeteoImage/MeteoImage";
import {CityInfos} from "./components/CityInfos/CityInfos";
import {Slider} from "./components/Slider/Slider";
import {useEffect, useState} from "react";
import {getCurrentPositionAsync, requestForegroundPermissionsAsync} from "expo-location";
import {MeteoAPI} from "./api/meteo.api";
import {getWeatherInterpretation} from "./services/meteo.service";
import {WikipediaApi} from "./api/wikipedia.api";

export default function App() {

    const [coords, setCoords] = useState()
    const [weather, setWeather] = useState()
    const [location, setLocation] = useState()
    const [color, setColor] = useState(["#FFE79A", "#FFFFFF"])
    const [infos, setInfos] = useState()

    const currentWeather = weather?.current_weather


    useEffect(() => {
        getUserCoords()
    }, []);

    useEffect(() => {
        if (coords){
            fetchWeather(coords)
            fetchLocalisation(coords)
            fetchCityInfo(coords)
        }
    }, [coords, location]);

    const [isFontLoaded] = useFonts({
        "HkGrotesk": HKGrotesk
    })

    async function getUserCoords(){
        let {status} = await requestForegroundPermissionsAsync()
        if (status === "granted"){
            const location = await getCurrentPositionAsync()
            setCoords(
                {lat: location.coords.latitude, lng: location.coords.longitude})
        } else {
            // Coordonnée de Paris
            setCoords({lat: "48.85", lng: "2.35"})
        }
    }

    async function fetchWeather(coordinates) {
        const weatherResponse = await MeteoAPI.fetchWeatherFromCoords(coordinates)
        setWeather(weatherResponse)
        setColor(getWeatherInterpretation(currentWeather.weathercode).color)
    }

    async function fetchLocalisation (coordinates) {
        try{
        const locationResponse = await MeteoAPI.fetchCityFromCoords(coordinates)
            setLocation(locationResponse)
        } catch (e) {
            setLocation("undefined")
        }
    }

    async function fetchCityInfo (coordinates) {
        try {
        const infoResponse = await WikipediaApi.fetchCityInfo(location)
            setInfos(infoResponse)
        } catch (e){
            setInfos(e)
        }
    }


    async function generateRandomLocation() {
        const coords =  await (MeteoAPI.fetchRandomCity())
        console.log(coords)
         setCoords(coords)
    }

    return (
        <LinearGradient style={{flex:1}} colors={color}>
            <SafeAreaProvider>
                {isFontLoaded && currentWeather ? <SafeAreaView style={[{flex: 1}, s.background]}>
                    <View style={s.image_container}>
                        <MeteoImage interpretation={getWeatherInterpretation(currentWeather.weathercode)}/>
                    </View>
                    <View style={s.weather_container}>
                        <MeteoInfos temperature={Math.round(currentWeather?.temperature)} interpretation={getWeatherInterpretation(currentWeather.weathercode)}/>
                    </View>
                    <View style={s.info_container}>
                        <CityInfos location={location} infos={infos}/>
                    </View>
                    <View style={s.slider}>
                        <Slider onPress={() => {
                            generateRandomLocation()
                        }}/>
                    </View>
                </SafeAreaView> : null}
            </SafeAreaProvider>
        </LinearGradient>
    );
}

