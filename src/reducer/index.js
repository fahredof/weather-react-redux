const initialState = {
    apiKey: "f77919380546d1f6ef8015d53089ba0e",
    defaultWeather: "New York",
    mainCity: [],
    favoritesCities: [{}, {}, {}]
};

const reducer = (state = initialState, action) => {

    switch (action.type) {

        case "FETCH_MAIN_CITY":
            return {
                ...state,
                mainCity: action.payload
            };

        case "CLEAN_MAIN_CITY":
            return {
                ...state,
                mainCity: {}
            };

        case "FETCH_FAVORITE_CITY":
            let cities = [...state.favoritesCities];
            cities[action.cityId - 1] = action.payload;
            return {
                ...state,
                favoritesCities: cities
            };

        case "DELETE_FAVORITE_CITY":
            let city = [...state.favoritesCities];
            city[action.cityId] = {};
            return {
                ...state,
                favoritesCities: city
            };

        case "CLEAN_FAVORITE_CITY":
            return {
                ...state,
                favoritesCities: [{}, {}, {}]
            };

        case "FETCH_BY_CITY_DATA":
            return action.data;

        default:
            return state;
    }
};

export default reducer;