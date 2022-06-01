<template>
	<input
		class="input"
		:type="type"
		:name="name"
		:placeholder="placeholder"
		:value='modelValue'
		v-maska="maskConvert"
		@input='$emit("update:modelValue", $event.target.value)'
		@maska="$emit('mask', $event.target.dataset.maskRawValue)"
	>
</template>

<script>
import { defineComponent } from 'vue';
import { maska } from 'maska';

export default defineComponent({
	name: 'app-input',
	emits: ['update:modelValue', 'mask'],
	props: {
		type: {
			type: String,
			default: 'text',
		},
		name: {
			type: String,
			default: '',
		},
		placeholder: {
			type: String,
			default: '',
		},
		mask: {
			type: String,
			default: '',
		},
		modelValue: {
			type: String,
		},
	},
	computed: {
		maskConvert() {
			return this.mask ? this.mask : '';
		},
	},
	directives: {
		maska,
	},
});
</script>

<style lang="scss" scoped>
@import '@/assets/css/modules/var';

.input {
	padding: 15px;
	border: 1px solid $primary;
	color: $bodyText;
	outline: none;

	&::placeholder {
		color: rgba($bodyText, .6);
	}

	&:focus {
		box-shadow: 0 0 0 0.15rem rgba(13, 110, 253, .25);
	}
}
</style>
