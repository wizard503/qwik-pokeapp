export interface PokemonListResponse {
	count:    number;
	next:     string;
	previous: string;
	results:  BasicPokemonInfo[];
}

export interface BasicPokemonInfo {
	name: string;
	url:  string;
}
