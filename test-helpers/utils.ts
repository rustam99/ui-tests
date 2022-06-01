const getRandomInt = (min: number, max: number): number => Math.random() * (max - min) + min;

const getString = (count: number): string => {
	if (!count || count > 10000) {
		throw new Error('Аргумент должен быть числом, не выше 10000');
	}

	const alphabet = 'abcdefghigklmnopqrstuvwxyz';
	let string = '';

	for (let i = 0; i < count; i += 1) {
		const index = getRandomInt(0, alphabet.length);

		string += alphabet[index];
	}

	return string;
};

export { getString, getRandomInt };
