import {features} from "../data/countries.json";
import data from "../data/countries_covid_data.json";
// import legendItemsCCases from "../entities/LegendItems";

class LoadCountriesTask{
    setState = null;
    mapCountries = features;

    load = (setState) => {
        this.setState = setState;
        for (let i = 0; i < this.mapCountries.length; i++) {
            const mapCountry = this.mapCountries[i];
            const covidCountry = data.find((covidCountry) => covidCountry.iso3 === mapCountry.properties.ISO_A3)            
            mapCountry.properties.confirmed = 0;
            mapCountry.properties.population = 0;
            mapCountry.properties.fatalities = 0;
            mapCountry.properties.recovered = 0;
            mapCountry.properties.active = 0;
            mapCountry.properties.incidentRate = 0.0;
            mapCountry.properties.peopleTested = 0;
            mapCountry.properties.peopleHospitalized = 0;
            mapCountry.properties.mortalityRate = 0;

            if(covidCountry != null){
                mapCountry.properties.confirmed = Number(covidCountry.latest.confirmed);
                mapCountry.properties.population = Number(covidCountry.population);
                mapCountry.properties.fatalities = Number(covidCountry.latest.deaths);
                mapCountry.properties.recovered = Number(covidCountry.latest.recovered);
                mapCountry.properties.active = Number(covidCountry.latest.active);
                mapCountry.properties.incidentRate = Number(covidCountry.latest.incident_rate);
                mapCountry.properties.peopleTested = Number(covidCountry.latest.people_tested);
                mapCountry.properties.peopleHospitalized = Number(covidCountry.latest.people_hospitalized);
                mapCountry.properties.mortalityRate = Number(covidCountry.latest.mortality_rate);
            }
        }
        this.setState(this.mapCountries);
    };
}

export default LoadCountriesTask;