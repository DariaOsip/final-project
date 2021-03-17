import {PokemonType, Reducers} from "../../interfaces";
import {setCurrentPage} from "../../redux/page-actions";
import * as React from "react";
import {Gallery} from "../gallery/Gallery";
import {connect} from "react-redux";
import {handleClick} from "../gallery/HandleClick";
import "./Page.css"
import {PagePagination} from "./PagePagination";
import {PaginationDropdown} from "./PaginationDropdown";

interface PagePropsType {
    pokemons: Array<PokemonType>
    currentPage: number
    limit: number
    allItemsCount: number
    linkPrefix: string
    setCurrentPage: (page: number) => void
    setItemsLimit: (limit: number) => void
    fetchPokemons: (page: number, limit: number) => void
    fetchItemsCount: () => void
}

class Page extends React.Component<PagePropsType, any> {

    fetchPokemons(currentPage: number) {
        const limit = this.props.limit;
        this.props.fetchPokemons(currentPage, limit);
    }

    fetchItemsCount() {
        this.props.fetchItemsCount();
    }

    componentDidMount() {
        this.fetchPokemons(1);
        this.fetchItemsCount();
    }

    onCatchClick(pokemon: PokemonType) {
        const currentPage = this.props.currentPage;
        handleClick(pokemon)
            .then(_ => {
                this.fetchPokemons(currentPage);
                this.fetchItemsCount();
            })
    }

    render() {
        const {
            limit,
            currentPage,
            fetchPokemons,
            fetchItemsCount,
            pokemons,
            allItemsCount,
            setCurrentPage,
            setItemsLimit
        } = this.props;
        return (
            <div className={"page"}>
                <PagePagination limit={limit} currentPage={currentPage}
                                allItemsCount={allItemsCount} fetchPokemons={fetchPokemons}
                                fetchItemsCount={fetchItemsCount}
                                setCurrentPage={setCurrentPage}
                />
                <PaginationDropdown currentPage={currentPage} limit={limit}
                                    onSelect={setItemsLimit} fetchPokemons={fetchPokemons}/>

                <Gallery pokemons={pokemons} linkPrefix={this.props.linkPrefix}
                         onClick={(pokemon: PokemonType) => this.onCatchClick(pokemon)}/>

            </div>
        )
    }
}

const mapState = (store: Reducers) => {
    return {
        pokemons: store.loadPokemons.pokemons,
        currentPage: store.pageReducers.currentPage,
        limit: store.pageReducers.limit,
        allItemsCount: store.pageReducers.allItemsCount,
    }
}
const mapDispatch = (dispatch: any) => {
    return {
        setCurrentPage: (page: number) => dispatch(setCurrentPage(page)),
    }
}
export default connect(mapState, mapDispatch)(Page);