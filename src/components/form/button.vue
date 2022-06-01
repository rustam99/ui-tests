<template>
	<button :type="type" class="button" :class="[filledClass, sizeClass, modClass, iconClass]">
		<span class="button__icon" v-if="icon">
			<slot></slot>
		</span>
		<span class="button__text">{{ label }}</span>
	</button>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'app-button',
	props: {
		type: {
			type: String,
			default: 'button',
			validator: value => ['button', 'submit', 'reset'].includes(value),
		},
		label: {
			type: String,
			default: 'Сохранить',
		},
		size: {
			type: String,
			default: 'medium',
			validator: value => ['small', 'medium', 'large'].includes(value),
		},
		filled: {
			type: Boolean,
			default: false,
		},
		mod: {
			type: String,
			default: 'primary',
			validator: value => ['primary', 'success', 'danger'].includes(value),
		},
		icon: {
			type: Boolean,
			default: false,
		},
	},
	computed: {
		filledClass() {
			return { 'button_filled': this.filled };
		},
		sizeClass() {
			return {
				'button_small': this.size === 'small',
				'button_medium': this.size === 'medium',
				'button_large': this.size === 'large',
			};
		},
		modClass() {
			return {
				'button_primary': this.mod === 'primary',
				'button_success': this.mod === 'success',
				'button_danger': this.mod === 'danger',
			};
		},
		iconClass() {
			return { 'button_icon': this.icon };
		},
	},
});
</script>

<style lang="scss" scoped>
.button {
	border: 1px solid currentColor;
	background-color: transparent;

	&_small {
		padding: 5px 10px;
		font-size: 1rem;
	}

	&_medium {
		padding: 10px 20px;
		font-size: 1.125rem;
	}

	&_large {
		padding: 15px 30px;
		font-size: 1.3rem;
	}

	&_primary {
		color: dodgerblue;

		&:focus {
			box-shadow: 0 0 0 .15em rgba(dodgerblue, .25);
		}
	}

	&_success {
		color: limegreen;

		&:focus {
			box-shadow: 0 0 0 .15em rgba(limegreen, .25);
		}
	}

	&_danger {
		color: crimson;

		&:focus {
			box-shadow: 0 0 0 .15em rgba(crimson, .25);
		}
	}

	&_filled.button_primary {
		background-color: dodgerblue;
		color: #f5f5f5;
	}

	&_filled.button_success {
		background-color: limegreen;
		color: #f5f5f5;
	}

	&_filled.button_danger {
		background-color: crimson;
		color: #f5f5f5;
	}

	&_icon {
		display: inline-flex;
		align-items: center;
	}

	&__icon {
		max-width: 30px;
		min-width: 30px;
		margin-right: 10px;
	}

	&:focus {
		outline: none;
	}
}
</style>
