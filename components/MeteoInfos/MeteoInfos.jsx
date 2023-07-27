import {s} from "./MeteoInfos.style"
import {Image, Text, View} from "react-native";
import rain from "../../assets/images/rain.png"
import Ionicons from "@expo/vector-icons/Ionicons";

export function MeteoInfos({temperature, interpretation}) {
    return (
        <>
            <Text style={s.temperature_text}>{temperature}°</Text>
            <View style={s.container}>
                <Ionicons style={s.image} size={20} name={interpretation.image}/>
                <Text style={s.weather_text}>{interpretation.label}</Text>
            </View>
        </>
    )
}