import { s } from "./Slider.style"
import {Animated, Easing, Image, Text, TouchableOpacity, View} from "react-native";

import arrow from "../../assets/images/arrow.png"
import {useState} from "react";
export function Slider({onPress}) {


	return (
		<View style={s.container}>
			<Text style={s.text}>Glisser pour voyager</Text>
			<TouchableOpacity onPress={onPress}>
				<Image style={s.image} source={arrow}/>
			</TouchableOpacity>
		</View>
	)
}