<template>
	<div class="wrapper">
		<app-header></app-header>
		<div class="content">
			<div class="container">
				<router-view/>
			</div>
		</div>
		<app-footer></app-footer>
	</div>
</template>

<script>
import { defineComponent } from 'vue';
import appHeader from '@/components/header.vue';
import appFooter from '@/components/footer.vue';

export default defineComponent({
	components: {
		appHeader,
		appFooter,
	},
});
</script>
