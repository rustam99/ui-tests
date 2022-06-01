module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'@vue/airbnb',
		'@vue/typescript/recommended',
	],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-tabs': ['warn', { allowIndentationTabs: true }],
		'indent': ['error', 'tab'],
		'quote-props': 'off',
		'arrow-parens': ['warn', 'as-needed'],
		'vuejs-accessibility/label-has-for': 'off',
		'vuejs-accessibility/form-control-has-label': 'off',
		'import/no-extraneous-dependencies': 'off',
	},
};
