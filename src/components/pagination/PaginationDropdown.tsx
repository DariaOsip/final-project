import React, {ChangeEvent} from "react";
import "./PaginationDropdown.css";

interface DropdownButtonLimitType {
    onSelect: (limit: number) => void
    fetchPokemons: (currentPage: number, limit: number) => void
    currentPage: number
    limit: number
}

export function PaginationDropdown(props: DropdownButtonLimitType) {

    const options = [10, 20, 30];

    const optionsElements = options.map((o: number, i: number) => {
        return (<option key={i} value={o}>{o}</option>)
    })

    return (
        <label className={"drop"}>{"Choose quantity of pokemons per page  "}
            <select defaultValue={props.limit} name="limit" id="limit-select" onChange={(e) => handleSelect(e)}>
                {optionsElements}
            </select></label>
    )

    function handleSelect(e: ChangeEvent<HTMLSelectElement>) {
        const newLimit = Number(e.target.value);
        props.onSelect(newLimit);
        props.fetchPokemons(props.currentPage, newLimit)
    }
}