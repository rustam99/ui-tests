import { chromium } from '@playwright/test';

const pageContext = async () => {
	const browser = await chromium.launch();
	const context = await browser.newContext({
		baseURL: 'http://localhost:8080',
		viewport: {
			width: 1920,
			height: 1080,
		},
	});

	return context.newPage();
};

export default pageContext;
