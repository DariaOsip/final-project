import React from 'react';
import './Navigation.css';
import {BrowserRouter as Router, Link, Redirect, Route} from "react-router-dom";
import {Nav, Navbar} from 'react-bootstrap/esm';
import Switch from "react-bootstrap/Switch";
import Page from "./Page";
import {fetchCaughtPokemons, fetchPokemons} from "../../redux/actions";
import {connect} from "react-redux";
import {fetchCaughtItemsCount, fetchItemsCount, setCurrentPage, setItemsLimit} from "../../redux/page-actions";
import PokemonProfile from "../gallery/PokemonProfile";

interface NavPropsType {
    fetchPokemons: (page: number, limit: number) => void
    fetchCaughtPokemons: (page: number, limit: number) => void
    fetchItemsCount: () => void
    fetchCaughtItemsCount: () => void
    setItemsLimit: (limit: number) => void
    setCurrentPage: (page: number) => void
}

class Navigation extends React.Component<NavPropsType, any> {
    render() {
        const logo = <a href={"/"} className={"logo"}>
            <span>P</span>
            <span><img src="http://localhost:4001/assets/logo.png" alt="o"/></span>
            <span>kedex</span>
        </a>
        return (
            <Router>
                <Navbar collapseOnSelect expand="md" variant="dark" fixed="top" className={"navbar"}>
                    <Navbar.Brand>{logo}</Navbar.Brand>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to="/" className={"navbar_item"}
                                  onClick={() => this.props.setCurrentPage(1)}>Home</Link>
                            <Link to="/caughtPokemons" className={"navbar_item"}
                                  onClick={() => this.props.setCurrentPage(1)}>Caught pokemons</Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    <Route path="/" exact component={() => (<Redirect to="/pokemons"/>)}/>
                    <Route path="/pokemons" exact>
                        <Page
                            setItemsLimit={this.props.setItemsLimit}
                            linkPrefix='/pokemons'
                            fetchPokemons={this.props.fetchPokemons}
                            fetchItemsCount={this.props.fetchItemsCount}/>
                    </Route>
                    <Route path="/caughtPokemons" exact>
                        <Page setItemsLimit={this.props.setItemsLimit}
                              linkPrefix='/caughtPokemons'
                              fetchPokemons={this.props.fetchCaughtPokemons}
                              fetchItemsCount={this.props.fetchCaughtItemsCount}/>
                    </Route>
                    <Route path="/:type/:id">
                        <PokemonProfile/>
                    </Route>
                </Switch>
            </Router>
        );
    }
}

const mapDispatch = (dispatch: any) => {
    return {
        fetchPokemons: (page: number, limit: number) => dispatch(fetchPokemons(page, limit)),
        fetchCaughtPokemons: (page: number, limit: number) => dispatch(fetchCaughtPokemons(page, limit)),
        fetchItemsCount: () => dispatch(fetchItemsCount()),
        fetchCaughtItemsCount: () => dispatch(fetchCaughtItemsCount()),
        setItemsLimit: (limit: number) => dispatch(setItemsLimit(limit)),
        setCurrentPage: (page: number) => dispatch(setCurrentPage(page)),
    }
}

export default connect(null, mapDispatch)(Navigation);