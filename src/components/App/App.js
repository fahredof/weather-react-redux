import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import './App.css';

import { fetchByCity, fetchByCoordinates } from '../../utils/fetchWeather.js';
import { getCoordinates } from '../../utils/getCoordinates.js';
import { parseData } from '../../utils/parseData';
import { saveToLocalStorage} from '../../utils/saveToLocalStorage';

import Header from '../Header/Header';
import DefaultWeather from '../DefaultWeather/DefaultWeather';
import DetailWeather from '../DetailWeather/DetailWeather';
import FavoritesCities from '../FavoritesCities/FavoritesCities';

const App = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const [locStoage, setLocStorage] = useState([]);
    const {
        apiKey, defaultWeather, favoritesCities,
        fetchMainCity, cleanMainCity,
        fetchFavoriteCity, deleteFavoriteCity, addToLocalState,
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
        fetchMainCity(data);
    };

    const getWeather = () => {
        cleanMainCity();
        getCoordinates(getWeatherByCoordinates, getDefaultWeather);
    };

    getWeather();

    const getWeatherByName = async (cityId, cityName) => {
        let data = parseData(await fetchByCity(apiKey, cityName));
        fetchFavoriteCity(cityId, data);
    };
    /// ??????
    const addToLocalStore = async (apiKey, cityName) => {
        let data = parseData(await fetchByCity(apiKey, cityName));
        return data;
    };

    const deleteCity = (cityId) => {
        deleteFavoriteCity(cityId);
    };

    const getLocalState = () => {
        const state = JSON.parse( localStorage.getItem('state') );
        if (state === null)
            return null;
        const citiesQueue = state.cities.map( (city) => city.city );
        return citiesQueue;
    };

    useEffect(() => {
        if(!isLoading)
            saveToLocalStorage(favoritesCities);
    }, [favoritesCities, isLoading]);

    useEffect(() => {
        if(isLoading){
            const ls = getLocalState();
            if (ls)
                ls.map((cityName, i) => {
                    if(cityName){
                        console.log(cityName);
                        getWeatherByName(i + 1, cityName);}
                });
            setIsLoading(false);
        }
    }, [isLoading]);

    return (
        <div className='body'>
            <Header
                updateGeolocation={getWeather}
            />
            <DefaultWeather />
            <DetailWeather />
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

export default connect(mapStateToProps, actions)(App);