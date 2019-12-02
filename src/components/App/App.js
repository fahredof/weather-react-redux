import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import * as actions from "../../actions";
//import {fetchByName } from "../../actions";

import "./App.css";

import {fetchByCity, fetchByCoordinates} from "../../utils/fetchWeather.js";
import {getCoordinates} from "../../utils/getCoordinates.js";
import {parseData} from "../../utils/parseData";
import {saveToLocalStorage} from "../../utils/saveToLocalStorage";

import Header from "../Header";
import DefaultWeather from "../DefaultWeather";
import DetailWeather from "../DetailWeather";
import FavoritesCities from "../FavoritesCities";

const App = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const {
        apiKey, defaultWeather, favoritesCities,
        fetchMainCity, cleanMainCity,
        fetchFavoriteCity, deleteFavoriteCity,
        fetchByName
    } = props;

    //API functions

    const getDefaultWeather = async () => {
        let data = parseData(await fetchByCity(apiKey, defaultWeather));
        //fetchMainCity(data);
        fetchByName(apiKey, defaultWeather);
    };

    const getWeatherByCoordinates = async (position) => {
        let latCor = position.coords.latitude;
        let lonCor = position.coords.longitude;
        let data = parseData(await fetchByCoordinates(apiKey, latCor, lonCor));
        //fetchMainCity(data);
    };

    const getWeather = () => {
        //cleanMainCity();
        getCoordinates(getWeatherByCoordinates, getDefaultWeather);
    };

    getWeather();

    const getWeatherByName = async (cityId, cityName) => {
        let data = parseData(await fetchByCity(apiKey, cityName));
        //fetchFavoriteCity(cityId, data);
    };

    const deleteCity = (cityId) => {
        //deleteFavoriteCity(cityId);
    };

    const getLocalState = () => {
        const state = JSON.parse(localStorage.getItem("state"));
        if (state === null)
            return null;
        const citiesQueue = state.cities.map((city) => city.city);
        return citiesQueue;
    };

    useEffect(() => {
        if (!isLoading)
            saveToLocalStorage(favoritesCities);
    }, [favoritesCities, isLoading]);

    useEffect(() => {
        if (isLoading) {
            const ls = getLocalState();
            if (ls)
                ls.map((cityName, i) => {
                    if (cityName) {
                        getWeatherByName(i + 1, cityName);
                    }
                });
            setIsLoading(false);
        }
    }, [isLoading]);

    return (
        <div className="body">
            <Header
                updateGeolocation={getWeather}
            />
            <DefaultWeather/>
            <DetailWeather/>
            {favoritesCities.map((city, cityId) => (
                <FavoritesCities
                    id={cityId + 1}
                    key={cityId}
                    cityData={city}
                    getWeather={getWeatherByName}
                    deleteCity={deleteCity}
                />
            ))}
        </div>
    );
};

const mapStateToProps = ({apiKey, defaultWeather, favoritesCities}) => {
    return {
        apiKey,
        defaultWeather,
        favoritesCities
    };
};

/*const mapDispatchToProps = dispatch => {
    return {
        fetchData: (apiKey, nameCity) => {
            dispatch(fetchByName);
        }
    }
};*/

export default connect(mapStateToProps, actions)(App);