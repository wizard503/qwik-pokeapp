import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemons/pokemon-image';
import { usePokemonGame } from "~/hooks/use-pokemon-game";

export const usePokemonId=routeLoader$<number>(({params,redirect})=>{
	
	const id= Number(params.id);
	if( isNaN(id) )redirect(301,'/');
	if( id<=0)redirect(301,'/');
	if( id>1000)redirect(301,'/');

	return id;
})
export default component$(() => {

	const {isPokemonVisible,showBackImage,toogleFromBack,toogleVisible}=usePokemonGame()

	const pokemonId=usePokemonId();

	return(
		<>
			<span class="text-5xl">Pokemon: {pokemonId}</span>
			
			<PokemonImage 
				id={pokemonId.value}
				isVisible={isPokemonVisible.value}
				backImage={showBackImage.value}
			/>

			<div class="mt-2">
				<button onClick$={toogleFromBack} class="btn btn-primary mr-2">Voltear</button>
				<button onClick$={toogleVisible} class="btn btn-primary ">{isPokemonVisible.value?"Ocultar":"Mostrar"}</button>
			</div>
		</>
	)
});