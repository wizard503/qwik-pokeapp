import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: import.meta.env.PUBLIC_OPEN_AI_KEY,
	dangerouslyAllowBrowser: true
});

export const getFuncFactAboutPokemon = async (pokemonName: string):Promise<string> => {

	const response = await openai.completions.create({
		model: "gpt-4.1",
		prompt: `Escribe datos interesantes del pokemon ${pokemonName}.`,
		temperature: 0.7,
		max_tokens: 60,
		top_p: 1.0,
		frequency_penalty: 0.0,
		presence_penalty: 0.0,
	})

	console.log(response)

	return 'Temporal';
}