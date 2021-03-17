import {PokemonType} from "../../interfaces";
import "./PokemonCard.css";
import React from "react";

export function PokemonCard(props: PokemonType): any {
    let pictureSrc: string = `http://localhost:4001/assets/pokemons/${props.id}.png`;
    return (
        <img src={pictureSrc} alt={props.name} className={"pokemon_img"}/>
    )
}
