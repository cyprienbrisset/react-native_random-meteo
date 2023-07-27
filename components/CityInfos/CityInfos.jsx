import { s } from "./CityInfos.style"
import {Text, View} from "react-native";
export function CityInfos({location, infos}) {
	return (
		<View style={s.container}>
			<Text style={s.city}>{location}</Text>
			<Text style={s.infos}>{infos}</Text>
		</View>
	)
}