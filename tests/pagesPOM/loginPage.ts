// Importamos Page y expect desde Playwright para tener el tipado y funcionalidades de Playwright.
import { Page, expect } from '@playwright/test';

// Definimos una clase llamada 'LoginPage' que representa la página de inicio de sesión.
export class LoginPage {
    // 'readonly page' es una propiedad de la clase que no podrá ser modificada después de ser inicializada.
    readonly page: Page;
    readonly isOswald: boolean;

    private readonly loginLinkRole: { name: string } = { name: 'LOGIN' }; // Storing the role and name as an object
    private readonly submitButtonRole: { name: string; role: string } = { name: 'Enter', role: 'button' };
    private readonly portalButtonRole: { name: string } = { name: 'Log in with Portal Account' };
    private readonly usernameLabel: string = 'Username';
    private readonly passwordLabel: string = 'Password';

    constructor(page: Page, isOswald: boolean) {
        this.page = page;
        this.isOswald = isOswald;
    }

    async goToLogin(): Promise<void> {
        await this.page.goto('/');
        const loginLink = await this.page.getByRole('link', { name: this.loginLinkRole.name });
        await expect(loginLink).toBeVisible();
        await loginLink.click();
    }

    async login(username: string, password: string): Promise<void> {
        if (this.isOswald) {
            await this.page.getByRole('button', { name: this.portalButtonRole.name }).click();
        }
        await this.page.getByLabel(this.usernameLabel, { exact: true }).fill(username);
        await this.page.getByLabel(this.usernameLabel, { exact: true }).press('Tab');
        await this.page.getByLabel(this.passwordLabel, { exact: true }).fill(password);
        await this.page.getByLabel(this.passwordLabel, { exact: true }).press('Enter');
    }

    async waitForSite(URL: string): Promise<void> {
        let retries = 3;
        for (let i = 0; i < retries; i++) {
            try {
                console.log('attempt: ' + i);
                await this.page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 80000 });
                break;
            } catch (error) {
                console.log('Retrying...');
            }
        }
    }

    async checkLoginAPIs(): Promise<void> {
        const loginResponse = await this.page.waitForResponse(response =>
            response.url().includes('/v3/authenticate/') && response.status() === 200
        );
        expect(loginResponse.status()).toBe(200);

        const sessionResponse = await this.page.waitForResponse(response =>
            response.url().includes('/api/session') && response.status() === 200
        );
        expect(sessionResponse.status()).toBe(200);

        const tokenResponse = await this.page.waitForResponse(response =>
            response.url().includes('/oauth2/token') && response.status() === 200
        );
        expect(tokenResponse.status()).toBe(200);
    }

    async completeLoginProcess(username: string, password: string, dashboardURL: string): Promise<void> {
        await this.goToLogin();
        await this.login(username, password);
        await this.waitForSite(dashboardURL);
    }
}
