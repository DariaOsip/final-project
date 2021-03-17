import React from 'react';
import {Link} from 'react-router-dom';
import './Item.css';
import {PokemonType} from "../../interfaces";
import {CatchButton} from "./CatchButton";
import {PokemonCard} from "./PokemonCard";

export interface ItemPropsType {
    pokemon: PokemonType
    onClick: () => void
    linkPrefix: string
}

export function Item(props: ItemPropsType): JSX.Element {
    const {name, id} = props.pokemon;
    const upperedName: string = name[0].toUpperCase() + name.slice(1);
    return (
        <div className={"gallery_item"}>
            <Link to={props.linkPrefix + `/${id}`}><PokemonCard id={id} name={name}/></Link>
            <p className={"gallery_item__name"}>{upperedName}</p>
            <CatchButton pokemon={props.pokemon} onClick={props.onClick}/>
        </div>
    );
}

