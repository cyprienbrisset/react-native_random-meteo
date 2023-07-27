import { s } from "./MeteoImage.style"
import {Image} from "react-native";

export function MeteoImage({interpretation}) {
	return (
		<Image style={s.image} source={interpretation.back_image}/>
	)
}