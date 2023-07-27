import axios from "axios";

export class WikipediaApi {
    static async fetchCityInfo(city) {
        try {
            const url = 'https://fr.wikipedia.org/w/api.php';
            const params = {
                action: 'query',
                titles: city,
                prop: 'extracts',
                exintro: true,
                explaintext: true,
                format: 'json'
            };
            const data = ((await axios.get(url, {params})).data)
            const pageId = Object.keys(data.query.pages)[0];
            return data.query.pages[pageId].extract.toString().slice(0,200).concat('...')

        } catch (e) {
            throw "Pas d'informations trouvée"
        }
    }
}
