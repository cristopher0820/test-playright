import { Page, expect } from '@playwright/test';

export class StudentProfilePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToStudentProfile(): Promise<void> {
        // Implementación necesaria
    }

    async navigateToRequestsTab(studentToBeSearched: string): Promise<void> {
        console.log('creado: ', studentToBeSearched);
    }
}
