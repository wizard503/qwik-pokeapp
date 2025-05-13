import { component$, Slot, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import type { PokemonGameState } from './pokemon-game.context';
import { PokemonGameContext } from './pokemon-game.context';
import type { PokemonListState } from './pokemon-list.context';
import { PokemonListContext } from './pokemon-list.context';

export const PokemonProvider = component$(() => {

	const pokemomGame= useStore<PokemonGameState>({
		pokemonId:4,
		isPokemonVisible: true,
		showBackImage:false,
	});
	
	const PokemonList = useStore<PokemonListState>({
		currentPage: 0,
		isLoading: false,
		pokemons: [],
	});
	
	useContextProvider(PokemonGameContext,pokemomGame);
	useContextProvider(PokemonListContext, PokemonList);

	useVisibleTask$(() => {
		if (localStorage.getItem('pokemon-game')) {
			const {isPokemonVisible=true,pokemonId=10,showBackImage=true} = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;
			pokemomGame.isPokemonVisible = isPokemonVisible;
			pokemomGame.pokemonId = pokemonId;
			pokemomGame.showBackImage = showBackImage;
		}
	});

	useVisibleTask$(({track}) => {
		track(()=>[pokemomGame.pokemonId, pokemomGame.isPokemonVisible, pokemomGame.showBackImage]);

		localStorage.setItem('pokemon-game', JSON.stringify(pokemomGame));
	});
	
	return <Slot />;
});

