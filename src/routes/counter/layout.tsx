import { Slot,component$ } from '@builder.io/qwik';
import { Link } from '@builder.io/qwik-city';

export default component$(() => {
	return (
		<div class="flex flex-col items-center justify-center mt-10">
			<Slot/>
			<Link href='/' class="mt-10">
			Regresar
			</Link>
		</div>
	)
});