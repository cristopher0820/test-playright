// tests/fixtures/auth.fixtures.ts
import { test as baseTest, Page } from '@playwright/test';
import { LoginPage } from '../pagesPOM/loginPage';


type LoginConfig = {
  username: string;
  password: string;
  loginURL: string;
  dashboardURL: string;
}

const loginConfigSbx: LoginConfig = {
  username: process.env.USERNAME_CASEY ?? '',
  password: process.env.PASSWORD_CASEY ?? '',
  loginURL: process.env.BASE_URL_SBX ?? '',
  dashboardURL: process.env.DASHBOARD_URL_SBX ?? '',
}


const loginConfigOswald: LoginConfig = {
  username: process.env.USERNAME_CASEY ?? '',
  password: process.env.PASSWORD_CASEY ?? '',
  loginURL: process.env.BASE_URL_OSWALD ?? '',
  dashboardURL: process.env.DASHBOARD_URL_OSWALD ?? '',

};

const loginConfigDevOswald: LoginConfig = {
  username: process.env.USERNAME_CASEY ?? '',
  password: process.env.PASSWORD_CASEY ?? '',
  loginURL: process.env.BASE_URL_DEV_OSWALD ?? '',
  dashboardURL: process.env.DASHBOARD_URL_DEV_OSWALD ?? '',

};

export const authTest = baseTest.extend<{ page: Page }>({

  page: async ({ page }, use, testInfo) => {

    const projectName = testInfo.project.name;
    let config: LoginConfig;
    if (projectName === 'oswald') {
      config = loginConfigOswald
    } else if (projectName === 'devOswald') {
      config = loginConfigDevOswald
    } else {
      config = loginConfigSbx
    }

    const loginPage = new LoginPage(page, projectName === 'oswald' || projectName === 'devOswald');
    await loginPage.completeLoginProcess(config.username, config.password, config.dashboardURL)

    // const isOswald = testInfo.project.name === 'oswald';
    // const loginPage = new LoginPage(page, isOswald);
    // const config = isOswald ? loginConfigOswald : loginConfigSbx;
    // await loginPage.completeLoginProcess(config.username, config.password, config.dashboardURL);
    await use(page); // La página de inicio de sesión está disponible para las pruebas
  },
});

export const { expect } = authTest;
