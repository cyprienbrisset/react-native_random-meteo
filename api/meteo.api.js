import axios from "axios";

export class MeteoAPI {
    static async fetchWeatherFromCoords(coords) {
        return (await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&daily=weathercode,temperature_2m_max,sunrise,sunset,windspeed_10m_max&timezone=auto&current_weather=true`)).data
    }

    static async fetchCityFromCoords(coords) {
        const { address } = (await axios.get(`https://nominatim.openstreetmap.org/reverse?lat=${coords.lat}&lon=${coords.lng}&format=json&language=fr`)).data
        const res = `${(address.city || address.village || address.town) + ' (' + address.county + ')'} `

        return res
    }

    static async fetchCoordsFromCity(city) {
        try {
            const {latitude: lat, longitude: lng} = (await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=fr&format=json`)).data.results[0]
            return {lat, lng}
        } catch (e) {
            throw "Pas de coordonnées trouvées pour la recherche : " + city
        }
    }

    static async fetchRandomCity() {
        try {
            const data = (await axios.get(`https://random-data-api.com/api/address/random_address`)).data
            return {lat: data.latitude, lng: data.longitude}
        } catch (e) {
            throw "Pas de coordonnées trouvées pour la recherche : " + city
        }
    }


}