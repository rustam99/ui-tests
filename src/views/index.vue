<template>
	<div class="sign-up">
		<h2 class="sign-up__title title">Регистрация</h2>
		<form class="sign-up__form form">
			<form-field
				label="Имя"
				mod="icons"
				v-model="username"
				:input-config="{ placeholder: 'Введите Имя', name: 'name' }"
				:valid-function="usernameValid"
				:errors="errorsFields.username"
				:status-for-validation="validationStatus">
			</form-field>
			<form-field
				label="Адрес"
				mod="icons"
				v-model="address"
				:input-config="{ placeholder: 'Введите адрес', name: 'address' }"
				:valid-function="addressValid"
				:errors="errorsFields.address"
				:status-for-validation="validationStatus">
			</form-field>
			<div class="form__row">
				<form-field
					label="E-mail"
					mod="icons"
					validate="email"
					v-model="email"
					:input-config="{ placeholder: 'Введите email', type: 'email', name: 'email' }"
					:errors="errorsFields.email"
					:statusForValidation="validationStatus">
				</form-field>
				<form-field
					label="Телефон"
					mod="icons"
					validate="phone"
					@mask="maskInput"
					:input-config="{ placeholder: 'Введите телефон', type: 'tel', name: 'phone' }"
					:errors="errorsFields.phone"
					:statusForValidation="validationStatus">
				</form-field>
			</div>
			<app-button class="form__button" mod="success" label="Отправить" @click="submit"></app-button>
		</form>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import appButton from '@/components/form/button.vue';
import formField from '@/components/form/form-field.vue';
import errors from '@/utils/form/errors';

export default defineComponent({
	name: 'indexMain',
	data: () => ({
		username: '',
		address: '',
		email: '',
		phone: '',
		validationStatus: false,
		errorsFields: {
			username: errors.username,
			address: errors.address,
			email: errors.email,
			phone: errors.phone,
		},
	}),
	methods: {
		submit() {
			this.validationStatus = true;
		},
		maskInput(rawValue) {
			this.phone = rawValue;
		},
		usernameValid(value) {
			if (value && value.length < 3) {
				return { valid: false, error: 'minLength' };
			}

			if (value && value.length > 1000) {
				return { valid: false, error: 'maxLength' };
			}

			return { valid: true };
		},
		addressValid(value) {
			if (value && value.length < 5) {
				return { valid: false, error: 'minLength' };
			}

			return { valid: true };
		},
	},
	components: {
		appButton,
		formField,
	},
});
</script>

<style lang="scss" scoped>
@import '@/assets/css/components/form';

.sign-up {
	&__form {
		max-width: 450px;
	}
}
</style>
