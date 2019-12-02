const fetchMainCity = (payload) => {
    return {
        type: "FETCH_MAIN_CITY",
        payload
    };
};

const cleanMainCity = () => {
    return {
        type: "CLEAN_MAIN_CITY"
    };
};

const fetchFavoriteCity = (cityId, payload) => {
    return {
        type: "FETCH_FAVORITE_CITY",
        cityId,
        payload
    };
};

const deleteFavoriteCity = (cityId) => {
    return {
        type: "DELETE_FAVORITE_CITY",
        cityId
    };
};

const cleanFavoriteCity = () => {
    return {
        type: "CLEAN_FAVORITE_CITY"
    };
};

export const fetchByNameSuccess = (data) => {
    return {
        type: "FETCH_BY_CITY_DATA",
        data
    };
};

/*export function fetchByName (apiKey, cityName) {
    return (dispatch) => {
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                return response;
            })
            .then(response => response.json())
            .then(data => dispatch(fetchByNameSuccess(data)))
        }
};*/

export async function fetchByName(api_key, city) {
    return async (dispatch) => {
        const response =
            await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`);
        let dataByCity;
        if (response.ok) {
            dataByCity = await response.json();
            console.log("jfjffjfjfjjfjfjfjfjf");
        } else {
            dataByCity = {error: "The server responded with a status of " + response.status}
        }
        dispatch(fetchByNameSuccess(dataByCity));
    }

}



export {
    fetchMainCity,
    cleanMainCity,
    fetchFavoriteCity,
    deleteFavoriteCity,
    cleanFavoriteCity
};