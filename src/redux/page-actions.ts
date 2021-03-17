import axios from "axios";

export const FETCH_ITEMS_COUNT_SUCCESS = "FETCH_ITEMS_COUNT_SUCCESS";
export const FETCH_CAUGHT_ITEMS_COUNT_SUCCESS = "FETCH_CAUGHT_ITEMS_COUNT_SUCCESS";
export const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
export const SET_ITEMS_LIMIT_PER_PAGE = "SET_ITEMS_LIMIT_PER_PAGE";

export const setCurrentPage = (page: number) => {
    return ({
        type: SET_CURRENT_PAGE,
        payload: page
    })
}

export const setItemsLimit = (limit: number) => {
    return ({
        type: SET_ITEMS_LIMIT_PER_PAGE,
        payload: limit
    })
}

export const fetchItemsCount = () => {
    return (dispatch: any) => {
        axios.get('http://localhost:3000/creatures')
            .then(res => {
                dispatch({
                    type: FETCH_ITEMS_COUNT_SUCCESS,
                    payload: res.data.length,
                })
            });
    }
}

export const fetchCaughtItemsCount = () => {
    return (dispatch: any) => {
        axios.get('http://localhost:3000/captures?_expand=creature')
            .then(res => {
                dispatch({
                    type: FETCH_CAUGHT_ITEMS_COUNT_SUCCESS,
                    payload: res.data.length,
                })
            });
    }
}