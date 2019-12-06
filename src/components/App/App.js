import React, {useEffect, useState} from "react";
import {connect} from "react-redux";

import {
    weatherFetchDataByName,
    weatherFetchDataByCoordinates,
    fetchFavoriteCity,
    deleteFavoriteCity} from "../../actions/index"

import {getCoordinates} from "../../utils/getCoordinates.js";
import {saveToLocalStorage} from "../../utils/saveToLocalStorage";

import "./App.css";
import Header from "../Header";
import DefaultWeather from "../DefaultWeather";
import DetailWeather from "../DetailWeather";
import FavoritesCities from "../FavoritesCities";

const App = (props) => {
    const [isLoading, setIsLoading] = useState(true);

    const {
        apiKey, defaultWeather, favoritesCities,
        deleteFavoriteCity, fetchByCityName,
        fetchByCoordinates, fetchFavoriteCityByName
    } = props;

    const getDefaultWeather = async () => {
        fetchByCityName(apiKey, defaultWeather);
    };

    const getWeatherByCoordinates = async (position) => {
        let latCor = position.coords.latitude;
        let lonCor = position.coords.longitude;
        fetchByCoordinates(apiKey, latCor, lonCor);
    };

    const getWeather = () => {
        getCoordinates(getWeatherByCoordinates, getDefaultWeather);
    };

    getWeather();

    const getWeatherByName = async (cityId, cityName) => {
        fetchFavoriteCityByName(cityId, apiKey, cityName);
    };

    const deleteCity = (cityId) => {
        deleteFavoriteCity(cityId);
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

const mapDispatchToProps = (dispatch) => {
    return {
        fetchByCityName: (apiKey, defaultWeather) => dispatch(weatherFetchDataByName(apiKey, defaultWeather)),
        fetchByCoordinates: (apiKey, latCor, lonCor) => dispatch(weatherFetchDataByCoordinates(apiKey, latCor, lonCor)),
        fetchFavoriteCityByName: (cityId, apiKey, cityName) => dispatch(fetchFavoriteCity(cityId, apiKey, cityName)),
        deleteFavoriteCity: (cityId) => dispatch(deleteFavoriteCity(cityId))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);