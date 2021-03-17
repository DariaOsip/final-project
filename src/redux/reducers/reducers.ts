import {FETCH_CAUGHT_POKEMONS, FETCH_POKEMONS, FETCH_POKEMONS_ERROR, FETCH_POKEMONS_SUCCESS,} from "../actions";
import {ActionType, PageState, StateType} from "../../interfaces";
import {
    FETCH_CAUGHT_ITEMS_COUNT_SUCCESS,
    FETCH_ITEMS_COUNT_SUCCESS,
    SET_CURRENT_PAGE,
    SET_ITEMS_LIMIT_PER_PAGE
} from "../page-actions";

const initialState: StateType = {
    pokemons: []
};

const pageInitialState: PageState = {
    currentPage: 1,
    limit: 30,
    allItemsCount: null,
}

export function loadPokemons(state = initialState, action: ActionType) {
    switch (action.type) {
        case FETCH_POKEMONS: {
            return {
                ...state,
                loadStatus: 'LOADING',
            }
        }
        case FETCH_CAUGHT_POKEMONS: {
            return {
                ...state,
                loadStatus: 'LOADING',
            }
        }
        case FETCH_POKEMONS_SUCCESS: {
            console.log(action);
            return {
                ...state,
                loadStatus: 'LOADED',
                pokemons: action.payload,
            }
        }
        case FETCH_POKEMONS_ERROR: {
            return {
                ...state,
                loadStatus: 'ERROR',
                error: action.payload,
            }
        }
        default:
            return state;
    }
}

export function pageReducers(state = pageInitialState, action: ActionType) {
    switch (action.type) {
        case SET_CURRENT_PAGE:
            return {...state, currentPage: action.payload}
        case SET_ITEMS_LIMIT_PER_PAGE:
            return {...state, limit: action.payload}
        case FETCH_ITEMS_COUNT_SUCCESS:
            return {...state, allItemsCount: action.payload}
        case FETCH_CAUGHT_ITEMS_COUNT_SUCCESS:
            return {...state, allItemsCount: action.payload}
        default:
            return state
    }
}
