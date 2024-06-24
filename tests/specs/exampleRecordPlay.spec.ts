import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://caseywindhorst-isss-test.terradotta.com/');
    await page.getByRole('link', { name: 'LOGIN' }).click();
    await page.getByLabel('Username', { exact: true }).click();
    await page.getByLabel('Username', { exact: true }).fill('casey.richey@terradotta.com');
    await page.getByLabel('Password', { exact: true }).click();
    await page.getByLabel('Password', { exact: true }).fill('Test123!');
    await page.getByLabel('Login').click();
    await page.goto('https://caseywindhorst-isss-test.terradotta.com/index.cfm?FuseAction=Portal.Home');
    await page.getByRole('button', { name: 'SEVIS Admin' }).click();
    await page.getByRole('link', { name: 'ISSS Student' }).click();
    await page.goto('https://caseywindhorst-isss-test.terradotta.com/index.cfm?FuseAction=SEVIS.ISSSStudentList#/students-list');
    await page.goto('https://caseywindhorst-isss-test.terradotta.com/index.cfm?FuseAction=SEVIS.ISSSStudentList#/students-list?columnSize=');
    await page.goto('https://caseywindhorst-isss-test.terradotta.com/index.cfm?FuseAction=SEVIS.ISSSStudentList#/students-list?columnSize=&filters=reinstatement:0;includeArchivedStudents:0');
    await page.goto('https://caseywindhorst-isss-test.terradotta.com/index.cfm?FuseAction=SEVIS.ISSSStudentList#/students-list?columnSize=&filters=reinstatement:0;includeArchivedStudents:0&pagination=pageSize:25;pageIndex:0');
    await page.goto('https://caseywindhorst-isss-test.terradotta.com/index.cfm?FuseAction=SEVIS.ISSSStudentList#/students-list?columnSize=&filters=reinstatement:0;includeArchivedStudents:0&pagination=pageSize:25;pageIndex:0&sorting=direction:asc;active:user_last_name');
    await expect(page.getByRole('heading', { name: 'International Student Admin' })).toBeVisible();
    await expect(page.getByRole('heading')).toContainText('International Student Admin');
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByRole('menuitem', { name: 'F-1 Student' }).click();
    await expect(page.getByRole('heading', { name: 'Create F-1 Student' })).toBeVisible();
    await expect(page.locator('h2')).toContainText('Create F-1 Student');
    await page.getByRole('button', { name: 'Apply F-1 Template' }).click();
    await expect(page.getByText('Select Template')).toBeVisible();
    await expect(page.locator('#mat-dialog-title-0')).toContainText('Select Template');
    await page.getByRole('cell', { name: 'Casey Demo - Spring' }).click();
    await page.getByLabel('User Name *').click();
    await page.getByLabel('User Name *').fill('aquiusuario@qa.com');
    await page.getByLabel('Last Name *').click();
    await page.getByLabel('Last Name *').fill('aquilastne@qa.com');
    await page.getByLabel('Gender').getByText('Gender').click();
    await page.getByText('Male', { exact: true }).click();
    await page.getByLabel('Date of Birth (MM/DD/YYYY) *').click();
    await page.getByLabel('Date of Birth (MM/DD/YYYY) *').fill('01/01/1981');
    await page.getByLabel('Date of Birth (MM/DD/YYYY) *').press('Tab');
    await page.getByLabel('City of Birth').click();
    await page.getByLabel('City of Birth').fill('Porto');
    await page.locator('#custom-mat-select-id-0').getByRole('button').click();
    await page.getByLabel('Search').click();
    await page.getByLabel('Search').fill('portugal');
    await page.getByLabel('Search').press('Enter');
    await page.getByRole('option', { name: 'PORTUGAL' }).locator('span').click();
    await page.locator('#custom-mat-select-id-2').getByRole('button').click();
    await page.getByLabel('Search').fill('portu');
    await page.getByRole('option', { name: 'PORTUGAL' }).locator('span').click();
    await expect(page.locator('#contactInformation')).toContainText('Contact Information');
    await page.getByLabel('Email Address *').click();
    await page.getByLabel('Email Address *').fill('aquiusuario@qa.com');
    await page.getByLabel('Email Address *').press('Tab');
    await page.locator('.mat-checkbox-inner-container').first().click();
    await page.locator('#mat-input-32').click();
    await page.locator('#mat-input-32').fill('adrre nno');
    await page.locator('#mat-input-32').press('Tab');
    await page.locator('#mat-input-33').fill('arer');
    await page.locator('#mat-input-34').click();
    await page.locator('#mat-input-34').fill('Porto');
    await page.locator('#custom-mat-select-id-7').getByRole('button').click();
    await page.getByLabel('Search').fill('');
    await page.getByRole('option', { name: 'Alabama' }).locator('span').click();
    await page.locator('#mat-input-35').click();
    await page.locator('#mat-input-35').fill('23456');
    await page.locator('#mat-input-35').press('Tab');
    await page.locator('#mat-input-36').fill('qausa@qa.com');
    await page.locator('#custom-mat-select-id-8').getByRole('button').click();
    await page.getByRole('option', { name: 'Alabama' }).locator('span').click();
    await page.locator('#mat-input-38').click();
    await page.locator('#mat-input-38').fill('ny');
    await page.locator('#mat-input-38').press('Tab');
    await expect(page.getByText('Dependent InformationNo')).toBeVisible();
    await expect(page.locator('#dependentInformation')).toContainText('Dependent Information');
    await page.getByLabel('Add dependent').click();
    await page.locator('#mat-input-72').click();
    await page.locator('#mat-input-72').fill('dependeaaa');
    await page.locator('#mat-input-72').press('Tab');
    await page.getByLabel('Relation').locator('div').nth(3).click();
    await page.getByRole('option', { name: 'Spouse' }).click();
    await page.getByLabel('Spouse').press('Tab');
    await page.getByLabel('Email Address', { exact: true }).fill('depende@qa.com');
    await page.getByLabel('Gender', { exact: true }).getByText('Gender').click();
    await page.getByText('Female').click();
    await page.getByLabel('Date of Birth *').click();
    await page.getByLabel('Date of Birth *').fill('01/01/1981');
    await page.getByLabel('Date of Birth *').press('Tab');
    // await page.getByText('arrow_back Back to List save').click();

});