import React from 'react';
import {Item} from './Item'
import './Gallery.css';
import {PokemonType} from "../../interfaces";

export interface GalleryProps {
    pokemons: PokemonType[]
    onClick: (pokemon: PokemonType) => void
    linkPrefix: string
}

export function Gallery(props: GalleryProps) {

    if (props.pokemons) {
        return (
            <section className={"gallery"}>
                {props.pokemons.map((pokemon: PokemonType, i: number) => {
                    return <Item key={i} pokemon={pokemon} linkPrefix={props.linkPrefix}
                                 onClick={() => props.onClick(pokemon)}/>
                })}
            </section>
        );
    }
    return <></>
}

