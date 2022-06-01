<template>
	<label class="form-field" :class="[iconsClass, errorClass]">
		<span class="form-field__text">{{ label }}</span>
		<app-input
			@input="$emit('update:modelValue', value)"
			@mask="onMask"
			v-model="value"
			:type="inputConfig.type"
			:placeholder="inputConfig.placeholder"
			:name="inputConfig.name"
			:mask="validate === 'phone' ? phoneMask : ''">
		</app-input>
		<span class="form-field__error" v-if="needValidate">{{ errorText }}</span>
	</label>
</template>

<script>
import { defineComponent } from 'vue';
import appInput from '@/components/form/input.vue';
import isValidEmail from '@/utils/form/isValidEmail';
import { mask, isValidPhone } from '@/utils/form/isValidPhone';

const validation = (value, validFunc) => {
	if (value === '') {
		return { status: false, error: 'empty' };
	}

	const isValid = validFunc(value);

	if (isValid) return { status: true };

	return { status: false, error: 'invalid' };
};

export default defineComponent({
	name: 'form-field',
	emits: ['update:modelValue', 'mask'],
	props: {
		label: {
			type: String,
			default: '',
		},
		inputConfig: {
			type: Object,
			default: () => ({
				type: 'text',
				placeholder: '',
				name: '',
			}),
		},
		mod: {
			type: String,
			default: 'none',
			validator: value => ['intNumber', 'floatNumber', 'icons', 'none'].includes(value),
		},
		validate: {
			type: String,
			default: 'none',
			validator: value => ['phone', 'email', 'none'].includes(value),
		},
		validFunction: {
			type: Function,
			default: () => 'default',
		},
		errors: {
			type: Array,
			default: () => ([{ name: 'empty', text: '' }, { name: 'invalid', text: '' }]),
			validator: array => array.every(field => {
				if (!(field instanceof Object)) {
					return false;
				}

				return Object.prototype.hasOwnProperty.call(field, 'name')
					&& Object.prototype.hasOwnProperty.call(field, 'text');
			}),
		},
		statusForValidation: {
			type: Boolean,
			default: true,
		},
		modelValue: {
			type: String,
		},
	},
	data: () => ({
		value: '',
		rawValue: '',
		phoneMask: mask,
	}),
	methods: {
		onMask(maskRawValue) {
			this.rawValue = maskRawValue;

			this.$emit('mask', maskRawValue);
		},
	},
	computed: {
		iconsClass() {
			return { 'form-field_icons': this.mod === 'icons' };
		},
		errorClass() {
			return {
				'error': this.statusForValidation && !this.valid.status,
				'valid': this.statusForValidation && this.valid.status,
			};
		},
		needValidate() {
			return this.statusForValidation && (this.validate !== 'none' || this.validFunction() !== 'default');
		},
		errorText() {
			if (Object.prototype.hasOwnProperty.call(this.valid, 'error')) {
				const errorIndex = this.errors.findIndex(error => error.name === this.valid.error);

				if (errorIndex >= 0) {
					return this.errors[errorIndex].text;
				}
			}

			return '';
		},
		valid() {
			if (this.validate === 'email') {
				return this.emailValidation;
			}

			if (this.validate === 'phone') {
				return this.phoneValidation;
			}

			if (this.validate === 'none') {
				return this.manualValidation;
			}

			return true;
		},
		emailValidation() {
			return validation(this.value, isValidEmail);
		},
		phoneValidation() {
			return validation(this.value, isValidPhone);
		},
		manualValidation() {
			if (this.value === '') {
				return { status: false, error: 'empty' };
			}

			const isValid = this.validFunction(this.value);

			if (isValid?.valid) return { status: true };

			return { status: false, error: isValid?.error };
		},
	},
	components: {
		appInput,
	},
});
</script>

<style lang="scss" scoped>
	@import '@/assets/css/modules/var';

	.form-field {
		display: inline-flex;
		flex-direction: column;
		width: 100%;

		&_icons.error {
			.input,
			.textarea {
				background-image: url('@/assets/icons/danger.svg');
				background-repeat: no-repeat;
				background-size: 20px;
				background-position: center right 20px;
			}
		}

		&_icons.valid {
			.input,
			.textarea {
				background-image: url('@/assets/icons/success.svg');
				background-repeat: no-repeat;
				background-size: 20px;
				background-position: center right 20px;
			}
		}

		&.error {
			.form-field__error {
				display: block;
			}
		}

		&__text {
			margin-bottom: 3px;
			font-size: 14px;
			color: rgba($bodyText, .6);
		}

		&__error {
			position: relative;
			margin-top: 15px;
			padding: 12px;
			animation: animate-in-vertical .3s ease forwards;
			font-size: 14px;
			color: $bodyText;
			background-color: #fdeceb;
			display: none;

			&:after {
				content: '';
				position: absolute;
				top: -11px;
				left: 30px;
				border-top: none;
				border-left: 15px solid transparent;
				border-right: 15px solid transparent;
				border-bottom: 11px solid #fdeceb;
			}
		}
	}

	@keyframes animate-in-vertical {
		from {
			opacity: 0;
			transform: translateY(50px);
		}
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}
</style>
