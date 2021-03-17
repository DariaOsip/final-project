import React from 'react';
import "./PokemonProfile.css"
import {Link, withRouter} from 'react-router-dom';
import {PokemonType} from "../../interfaces";
import axios from "axios";
import {PokemonCard} from "./PokemonCard";
import {CatchButton} from "./CatchButton";
import {handleClick} from "./HandleClick"


interface PokemonStateType {
    pokemon: PokemonType
}

class PokemonProfile extends React.Component<any, PokemonStateType> {

    constructor(props: any) {
        super(props);
        this.state = {
            pokemon: null
        }
    }

    componentDidMount() {
        const pokemonId = this.props.match.params.id;
        this.fetchPokemon(pokemonId);
    }

    fetchPokemon(id: number) {
        axios.get("http://localhost:3000/creatures/" + id + "?_embed=captures")
            .then(res => {
                    this.setState({
                        ...this.state,
                        pokemon: {
                            id: res.data.id,
                            name: res.data.name,
                            captureDate: res.data.captures[0]?.captureDate
                        }
                    })
                }
            )
    }

    onCatchClick(pokemon: PokemonType) {
        handleClick(pokemon)
            .then(_ => this.fetchPokemon(pokemon.id))
    }

    render() {
        if (!this.state.pokemon) {
            return <div>Sorry, but the pokemon was not found</div>
        }
        let status: string;
        let captureInfo: any;
        const {id, name, captureDate} = this.state.pokemon;
        if (captureDate) {
            status = "captured";
            captureInfo =
                <div>
                    <p className={"profile_info_title"}>Date of capture: </p>
                    <p>{captureDate}</p>
                </div>;
        } else {
            status = "free"
            captureInfo = <></>
        }
        return (

            <section className="pokemon_profile">
                <div className={"wrapper"}>
                    <PokemonCard id={id} name={name}/>
                    <CatchButton pokemon={this.state.pokemon} onClick={() => this.onCatchClick(this.state.pokemon)}/>
                </div>
                <div className="profile_info">
                    <div>
                        <span className={"profile_info_title"}>Id: </span>
                        <span>{id}</span>
                    </div>
                    <div>
                        <span className={"profile_info_title"}>Name: </span>
                        <span>{name[0].toUpperCase() + name.slice(1)}</span>
                    </div>
                    <div>
                        <span className={"profile_info_title"}>Status: </span>
                        <span>{status}</span>
                    </div>
                    {captureInfo}
                    <input type="button" value="Back" onClick={ () => history.go(-1)}/>
                </div>
            </section>
        )
    }
}

export default withRouter(PokemonProfile);
