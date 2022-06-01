import { expect, test } from '@playwright/test';
import pc from '../test-helpers/test.config';
import { getString } from '../test-helpers/utils';

test('Тестирования формы', async () => {
	const page = await pc();
	await page.goto('/');

	await test.step('Отправки пустой формы', async () => {
		await page.locator('.button').click();
		await expect.poll(async () => page.locator('.form-field__error').count()).toBe(4);
	});

	await test.step('Проверка поля имя', async () => {
		const input = await page.locator('.input[name="name"]');
		const button = await page.locator('.button');

		await input.click();
		await input.fill('a');

		await button.click();

		const error = page.locator('.input[name="name"] + .form-field__error');

		await expect(error).toHaveText('Минимальное кол-во символов 3');

		const thousandSymbols = getString(1001);

		await input.click();
		await input.fill(thousandSymbols);

		await expect(error).toHaveText('Максимальное кол-во символов 1000');

		await input.click();
		await input.fill('Some text');

		await expect(error).toBeHidden();
	});
});
