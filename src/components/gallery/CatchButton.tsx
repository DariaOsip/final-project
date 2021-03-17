import {Button} from "react-bootstrap";
import React from "react";
import {CaptureType, PokemonType} from "../../interfaces";

interface ItemPropsType {
    pokemon: PokemonType | CaptureType
    onClick: () => void
}

export function CatchButton(props: ItemPropsType): JSX.Element {
    return (props.pokemon.captureDate
            ? <Button onClick={props.onClick} variant="danger" block disabled>CAUGHT!</Button>
            : <Button onClick={props.onClick} variant="success" block>CATCH!</Button>

    )
}