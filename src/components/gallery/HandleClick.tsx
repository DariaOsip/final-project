import axios from "axios";
import {PokemonType} from "../../interfaces";

export function handleClick(pokemon: PokemonType): Promise<any> {
    const payload = {
        creatureId: pokemon.id,
        id: pokemon.id,
        name: pokemon.name,
        captureDate: (new Date()).toLocaleDateString(),
    }
    return axios.post(`http://localhost:3000/captures`, payload);
}

