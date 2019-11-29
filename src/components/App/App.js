import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './App.css';

import { fetchByCity, fetchByCoordinates } from '../../utils/fetchWeather.js';
import { getCoordinates } from '../../utils/getCoordinates.js';
import { parseData} from '../../utils/parseData';

import Header from '../Header/Header';
import DefaultWeather from "../DefaultWeather/DefaultWeather";
import DetailWeather from '../DetailWeather/DetailWeather';
import FavoritesCities from "../FavoritesCities/FavoritesCities";

const App = (props) => {

    const {
        apiKey, defaultWeather, favoritesCities,
        fetchMainCity, cleanMainCity,
        fetchCurrentCity,
        fetchFavoriteCity, deleteFavoriteCity, cleanFavoriteCity,
        check
    } = props;

    //API functions

    const getDefaultWeather = async () => {
        let data = parseData(await fetchByCity(apiKey, defaultWeather));
        fetchMainCity(data);
    };

    const getWeatherByCoordinates = async (position) => {
        let latCor = position.coords.latitude;
        let lonCor = position.coords.longitude;
        let data = parseData(await fetchByCoordinates(apiKey, latCor, lonCor));
        fetchCurrentCity(data);
    };

    const getWeather = () => {
        cleanMainCity();
        getCoordinates(getWeatherByCoordinates, getDefaultWeather);
    };

    getWeather();

    const getWeatherByName = async (cityId, cityName) => {
        let data = parseData(await fetchByCity(apiKey, cityName));
        //cleanFavoriteCity();
        fetchFavoriteCity(cityId, data);
        //console.log(data);
        check();
        //console.log(favoritesCities);
    };

    const deleteCity = (cityId) => {
        deleteFavoriteCity(cityId);
    };

    return (
        <div className="body">
            <Header
                updateGeolocation={getWeather}
            />
            <DefaultWeather />
            <DetailWeather />
            {favoritesCities.map((city, cityId) => (
                <FavoritesCities
                    id={cityId}
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

export default connect(mapStateToProps, actions)(App);