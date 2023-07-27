import { StyleSheet} from "react-native";

export const s = StyleSheet.create({
    container: {
      flexDirection:"row",
        alignItems:"center"
    },

    temperature_text: {
        fontSize:100,
        color:"#1F3851",
        fontWeight:"bold",
        fontFamily:"HkGrotesk",
    },
    image: {
        marginLeft:7,
        width:20,
        height:20
    },
    weather_text : {
        marginLeft: 5,
        fontSize:20,
        fontFamily: "HkGrotesk",
        color: "#1F3851"
    }
})