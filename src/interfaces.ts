export interface PokemonType {
    id: number
    name: string
    captureDate?: Date
    captures?: CaptureType[]
}


export interface ActionType {
    type: string
    payload?: any
}
export interface CaptureType {
    id: number
    name: string
    creatureId: number
    captureDate: Date
    creature?: PokemonType
}
export interface StateType {
    pokemons: PokemonType[]
}

export interface PageState {
    currentPage: number
    limit: number
    allItemsCount: number
}

export interface Reducers {
    loadPokemons: StateType,
    pageReducers?: PageState,
}



