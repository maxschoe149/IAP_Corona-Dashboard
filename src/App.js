import React, { useState, useEffect } from 'react';
import './App.css';
import TopRow from "./components/TopRow";
import InfoPanel from "./components/InfoPanel";
import LoadingMap from "./components/LoadingMap";
import CovidMap from "./components/CovidMap";
import MapSelectionButtons from "./components/MapSelectionButtons";
import LoadCountriesTask from "./tasks/LoadCountriesTask";
import buildLegends from "./tasks/BuildLegendsTask";
import LoadEuropeTask from "./tasks/LoadEuropeTask.js";
import EuropeCovidMap from "./components/EuropeCovidMap";
import Charts from "./components/Charts";

// TODO: 
// Flexbox statt Float
// Code für Präsentation auskommentieren
// DropdownMenü Einträge sollten etwas tun oder entfernt werden
// Nicht benötigte MapSelectionButtons entfernen
// Coronadaten für Regions einlesen
// Zugriff für Weltdaten überprüfen (veraltet?)
// Anpassung für mobile Geräte
// Generelles Styling überarbeiten
// Map-Translation: Gebietsnamen übersetzen?
// Map/Legend Anpassungen: Tilelayer-OSM? Farbkorrektur aufgrund von Transparenz?


// import { useAlert } from 'react-alert'

const App = () => {
    // views are the different categories of data we want to display
    const views = ["Cumulative Cases", "New Cases(21 Days)", "7-Day-Incidence", "ICU-Occupancy", "Cumulative Fatalities", "Testing Rate", "Vaccinated Population"];
    // countries for the world focus
    const [countries, setCountries] = useState([]);
    // "countries" aka regions for the regional focus
    const [europeCountries, setEuropeCountries] = useState([]);
    // hook to display the correct (map)legend for the active view
    const [activeLegend, setActiveLegend] = useState(views[0]);
    // hook to display the correct (map)focus: world/regions
    const [activeFocus, setActiveFocus] = useState("World");
    // hook to display the correct Date for the UpdatePanel
    const [lastUpdate, setLastUpdate] = useState();
    const [activeLanguage, setActiveLanguage] = useState("English");

    //Building the legends for the world focus
    const legends = buildLegends(
        views,
        // These numbers are arbitrary, but the coloured map looks cool.
        [5_000_000, 500_000, 500, 100, 100_000, 500_000, 500_000]
    );
    //Doing the same for the region focus, with slightly different values though
    const regionLegends = buildLegends(
        views,
        [200_000, 20_000, 150, 100, 10_000, 50_000, 50_000])
    /* -------------------------------------------------
    * Tassias Code : 
    * -------------------------------------------------- */
    // Sate um nachzuvollziehen, welche Country auf der CovidMap ausgewählt wurde
    const [activeCountry, setActiveCountry] = useState("World");
    // State um die kompletten Daten der API zu speichern (ohne Formatierung für die CovidMap) für die Charts
    const [completeData, setCompleteData] = useState();//{World:[]}
    const [countryList,setcountryList] = useState();
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [selectedCountries,setSelectedCountries] = useState([{ value: 'World', label: 'World'}]);
    const [WorldData, setWorldData] = useState([]);
    // const alert = useAlert()

    //Function to load the Geo- & Coronadata for both focuses
    const load = () => {
        const loadCountriesTask = new LoadCountriesTask();
        loadCountriesTask.load(setCountries, setLastUpdate, setCompleteData);
        const loadEuropeTask = new LoadEuropeTask();
        loadEuropeTask.load(setEuropeCountries);
    };

    useEffect(load, []);
      
    return (
        <div className="page">
            <TopRow lastUpdate={lastUpdate} activeFocus={activeFocus} setActiveFocus={setActiveFocus} activeLanguage={activeLanguage}/>
            <div style={{height:"90%", width:"100%", display:"flex", flexDirection:"row"}}>
                <InfoPanel legends={legends} active={activeLegend} activeLanguage={activeLanguage} setActiveLanguage={setActiveLanguage}/>
                <div style={{height:"100%", flexBasis:"70%", flexGrow:"2", display:"flex", flexDirection:"column"}}>
                    {/* This div is only there to fix a visual glitch when changing focus */}
                    <div style={{flexGrow:"16", flexBasis:"80%", width:"100%", display:"flex"}}>
                        {/* Depending on the activeFocus either the CovidMap or the EuropeCovidMap is displayed. */}
                        {activeFocus === "World" ? (countries.length === 0 ? (
                            // If the background loading of the data is not quite done yet, display a loading symbol.
                           <LoadingMap/>
                        ) : (<>
                                <CovidMap countries={countries} legends={legends} active={activeLegend} activeLanguage={activeLanguage} setActiveCountry={setActiveCountry}/>
                            </>
                        )) : (europeCountries.length === 0 ? (
                           <LoadingMap/>
                        ) : (<>
                                <EuropeCovidMap regions={europeCountries} legends={regionLegends} active={activeLegend} activeLanguage={activeLanguage}/>
                            </>
                        ))}
                    </div>
                    <MapSelectionButtons active={activeLegend} setActiveLegend={setActiveLegend} views={views} activeLanguage={activeLanguage}/>
                </div>
            </div>
            
            {/* <Charts  activeLegend={activeLegend} activeCountry={activeCountry} completeData={completeData} lastUpdate={lastUpdate}
                startDate={startDate} setStartDate={setStartDate} endDate={endDate} setEndDate={setEndDate}
                countryList={countryList} setcountryList={setcountryList} 
                selectedCountries={selectedCountries} setSelectedCountries={setSelectedCountries} WorldData={WorldData} setWorldData={setWorldData}
                alert={alert}/> */}
        </div>
    );
};

export default App;
