import { component$, useComputed$, useSignal, useTask$ } from "@builder.io/qwik";

interface Props {
	id: number | string;
	size?: number; //? indica que el prop es opcional
	backImage?: boolean;
	isVisible?:boolean;
}

export const PokemonImage = component$(
	({ 
		id, 
		size = 200, 
		backImage = false ,
		isVisible=true
	}: Props) => {

		const imageLoad = useSignal(false);

		useTask$(({ track }) => {
			track(() => id);
			imageLoad.value = false;
		});

		const imageUrl=useComputed$(()=>{
			if (id==='') return '';
			
			return (backImage)
			? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/${id}.png`
			: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
		})

		return (
			<div
				class="flex items-center justify-center"
				style={{ width: `${size}px`, height: `${size}px` }}
			>
				{!imageLoad.value && <span>Cargando...</span>}
				
				<img
					src={ imageUrl.value }
					alt="Pokemon Sprite"
					width={size}
					height={size}
					onLoad$={() => {
						//setTimeout(() => {
							imageLoad.value = true;
						//}, 2000);
					}}
					class={[{
						'hidden':!imageLoad.value,
						'brightness-0':!isVisible,
					},'transition-all']}
				/>
			</div>
		);
	},
);
