const errorsCode = {
	required: 'Поле обязательное',
	incorrectFormat: 'Неверный формат поля',
	minLength: 'Минимальное кол-во символов',
	maxLength: 'Максимальное кол-во символов',
};

export default {
	email: [
		{
			name: 'empty',
			text: errorsCode.required,
		},
		{
			name: 'invalid',
			text: errorsCode.incorrectFormat,
		},
	],
	phone: [
		{
			name: 'empty',
			text: errorsCode.required,
		},
		{
			name: 'invalid',
			text: errorsCode.incorrectFormat,
		},
	],
	username: [
		{
			name: 'empty',
			text: errorsCode.required,
		},
		{
			name: 'minLength',
			text: `${errorsCode.minLength} 3`,
		},
		{
			name: 'maxLength',
			text: `${errorsCode.maxLength} 1000`,
		},
	],
	address: [
		{
			name: 'empty',
			text: errorsCode.required,
		},
		{
			name: 'minLength',
			text: `${errorsCode.minLength} 5`,
		},
	],
};
