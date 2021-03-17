import axios from 'axios';
import {ActionType, CaptureType, PokemonType} from "../interfaces";

export const FETCH_CAUGHT_POKEMONS = 'FETCH_POKEMON';
export const FETCH_POKEMONS = 'FETCH_POKEMON';
export const FETCH_POKEMONS_SUCCESS = 'FETCH_POKEMON_SUCCESS';
export const FETCH_POKEMONS_ERROR = 'FETCH_POKEMON_ERROR';



export const fetchPokemons = (page: number, limit: number) => {
    return (dispatch: (action: ActionType) => void) => {
        dispatch({
            type: FETCH_POKEMONS
        })
        axios.get(`http://localhost:3000/creatures?_embed=captures&_page=${page}&_limit=${limit}`)
            .then(res => {
                dispatch({
                    type: FETCH_POKEMONS_SUCCESS,
                    payload: res.data.map((pokemon: PokemonType) => ({
                        id: pokemon.id,
                        name: pokemon.name,
                        captureDate: pokemon.captures[0]?.captureDate
                    })),
                })
            })
            .catch(error => {
                dispatch({
                    type: FETCH_POKEMONS_ERROR,
                    payload: error
                })
            })
    }
}

export const fetchCaughtPokemons = (page: number, limit: number) => {
    return (dispatch: (action: ActionType) => void) => {
        dispatch({
            type: FETCH_CAUGHT_POKEMONS
        })
        axios.get(`http://localhost:3000/captures?_expand=creature&_page=${page}&_limit=${limit}`)
            .then(res => {
                dispatch({
                    type: FETCH_POKEMONS_SUCCESS,
                    payload: res.data.map((capture: CaptureType) => ({
                        id: capture.creatureId,
                        name: capture.name,
                        captureDate: capture.captureDate
                    })),
                })
            })
            .catch(error => {
                dispatch({
                    type: FETCH_POKEMONS_ERROR,
                    payload: error
                })
            })
    }
}

