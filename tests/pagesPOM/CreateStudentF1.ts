import { Page, expect } from '@playwright/test';
import { DependentInfo, StudentInfo } from '../utils/types';

export class CreateStudentF1 {
    readonly page: Page;

    private readonly headerSelector: string = 'h2';
    private readonly selectorUserName: string = 'input[formcontrolname="user_name"]';
    private readonly selectorLastNameInput: string = 'input[formcontrolname="user_last_name"]';
    private readonly selectorGender: string = 'Gender';
    private readonly selectorDOB: string = 'Date of Birth (MM/DD/YYYY)';
    private readonly selectorContactEmail: string = 'input[formcontrolname="user_email"]';
    private readonly actionButtonRole: { name: string } = { name: 'Actions' };
    private readonly applyTemplateButtonRole: { name: string } = { name: 'Apply F-1 Template' };
    private readonly templatePopuHeader: string = 'Select Template';
    private readonly regressionTemplate: string = 'Regression';
    private readonly createButtonRole: { name: string } = { name: 'Create' };

    constructor(page: Page) {
        this.page = page;
    }

    private readonly userNameDivSelector: { selector: string, textPattern: RegExp, index: number } = {
        selector: 'div',
        textPattern: /^User Name \*$/,
        index: 2
    }

    async checkHeaderText(expectedText: string): Promise<void> {
        await expect(this.page.getByRole('heading', { name: expectedText })).toBeVisible();
        await expect(this.page.locator(this.headerSelector)).toContainText(expectedText);
    }

    async clickActionButton(): Promise<void> {
        await this.page.getByRole('button', { name: this.actionButtonRole.name }).click();
    }

    async fillStudentForm(studentInfo: StudentInfo): Promise<void> {
        await this.page.getByRole('button', { name: this.applyTemplateButtonRole.name }).click();
        await expect(this.page.getByText(this.templatePopuHeader)).toBeVisible();
        await this.page.getByRole('cell', { name: this.regressionTemplate }).first().click();

        const locatorUserName = this.page.locator(this.userNameDivSelector.selector);
        const filteredLocator = locatorUserName.filter({ hasText: this.userNameDivSelector.textPattern });
        await filteredLocator.nth(this.userNameDivSelector.index).click();

        await this.page.locator(this.selectorUserName).fill(studentInfo.email);
        await this.page.locator(this.selectorLastNameInput).fill(studentInfo.lastName);
        await this.page.getByLabel('Gender').getByText('Gender').click();
        await this.page.locator(`text=/^${studentInfo.gender}$/i`).click();
        await this.page.getByLabel(this.selectorDOB).fill(studentInfo.dateOfBirth);
        await this.page.locator(this.selectorContactEmail).scrollIntoViewIfNeeded();
        await this.page.locator(this.selectorContactEmail).click();
        await this.page.locator(this.selectorContactEmail).fill(studentInfo.email);
        await this.page.locator(this.selectorContactEmail).press('Tab');
    }

    async createDependent(dependentInfo: DependentInfo): Promise<void> {
        // Implementation needed
    }

    async submitStudentForm(): Promise<void> {
        await this.page.getByRole('button', { name: this.createButtonRole.name }).click();
    }
}
