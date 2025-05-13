import { Slot,component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import Navbar from '~/components/shared/navbar/navbar';

export const useCheckAuthCookie = routeLoader$(({cookie,redirect}) => {
	const message = cookie.get('message')
	;
	if (message) {
		console.log('Cookie message:', message);
		return;
	}

	redirect(302, '/login');
});

export default component$(() => {
	return (
	<>
		<Navbar/>
		<div class="flex flex-col items-center justify-center mt-10">
		<span class="text-5xl">Dashboard Layout</span>
		<Slot />
		</div>
	</>
	);
});