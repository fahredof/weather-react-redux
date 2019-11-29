//export const inc = () => ({ type: 'INC' });

const fetchMainCity = (payload) => {
    return {
        type: 'FETCH_MAIN_CITY',
        payload
    };
};

const cleanMainCity = () => {
    return {
        type: 'CLEAN_MAIN_CITY'
    };
};

/*const fetchCurrentCity = (payload) => {
    return {
        type: 'FETCH_CURRENT_CITY',
        payload
    };
};*/

const fetchFavoriteCity = (cityId, payload) => {
    return {
        type: 'FETCH_FAVORITE_CITY',
        cityId,
        payload
    };
};

const deleteFavoriteCity = (cityId) => {
    return {
        type: 'DELETE_FAVORITE_CITY',
        cityId
    };
};

const cleanFavoriteCity = () => {
    return {
        type: 'CLEAN_FAVORITE_CITY'
    };
};

export const check = () => ({type: 'CHECK'});

export {
    fetchMainCity,
    cleanMainCity,
    fetchFavoriteCity,
    deleteFavoriteCity,
    cleanFavoriteCity
}