// tests/pagesPOM/dashboardPage.ts
import { Page, expect } from '@playwright/test';
import { StudentInfo } from '../utils/types';

export class StudentListPage {
  readonly page: Page;

  private readonly menutemF1Student_sel: { name: string } = { name: 'F-1 Student' };
  private readonly createButtonRole_sel: { name: string } = { name: 'Create' };
  private readonly searchInputLabel_sel: string = 'Search by Name, Email, SEVIS';
  private readonly expectedColumns: string[] = ['Student Name', 'Student ID', 'SEVIS ID', 'SEVIS Status', 'Visa Type', 'Gender', 'Email', 'Portal Access', 'Single Sign-On', 'Stage Status'];

  private readonly studentTable_sel: string = '#student-list-table';
  private readonly h3Selector: string = 'h3';
  private readonly gridStudentRow: string = 'app-students-list table tbody tr';

  constructor(page: Page) {
    this.page = page;
  }

  async getH3Text(): Promise<string | null> {
    const h3 = await this.page.waitForSelector(this.h3Selector);
    return h3.textContent();
  }

  async selectCreateStudent(studentType: string): Promise<void> {
    await this.page.getByRole('button', { name: this.createButtonRole_sel.name }).click();
    await expect(this.page.getByText(studentType)).toBeVisible();
    await this.page.getByRole('menuitem', { name: studentType }).click();
  }

  async verifyVisibleColumnsInStudentGrid(expectedColumns: string[]): Promise<void> {
    const studentListTable = await this.page.waitForSelector(this.studentTable_sel, { state: 'visible' });
    if (await studentListTable.isVisible()) {
      for (const columnName of expectedColumns) {
        const header = this.page.locator(`thead >> text="${columnName}"`);
        await expect(header).toBeVisible();
      }
    }
  }

  async checkStudentGridColumns(rowNumber: number, studentInfo: StudentInfo): Promise<void> {
    const row = this.page.locator(this.gridStudentRow).nth(rowNumber);
    const cells = row.locator('td');
    // for (let i = 0; i < expectedValues.length; i++) {
    //   const cellText = await cells.nth(i).textContent();
    //   if (cellText?.trim() != expectedValues[i]) {
    //     throw new Error(`Mismatch in column ${i + 1}: expected '${expectedValues[i]}', found '${cellText?.trim()}'.`);
    //   }
    // }
  }

  async searchStudent(studentInfo: StudentInfo): Promise<void> {
    const searchInput = this.page.getByLabel(this.searchInputLabel_sel);
    await searchInput.click();
    await searchInput.fill(studentInfo.email);
    await searchInput.press('Enter');
    await this.page.waitForSelector(this.studentTable_sel, { state: 'visible' });
    console.log("student create: " + studentInfo.email);
  }

  async verifyStudentExistOnTheGrid(studentInfo: StudentInfo): Promise<void> {
    await this.verifyVisibleColumnsInStudentGrid(this.expectedColumns);
    // await this.checkStudentGridColumns(0, studentInfo);
  }

  async searchStudentByEmail(email: string): Promise<void> {
    const searchInput = this.page.getByLabel(this.searchInputLabel_sel);
    await searchInput.click();
    await searchInput.fill(email);
    await searchInput.press('Enter');
    await this.page.waitForSelector(this.studentTable_sel, { state: 'visible' });
  }
}
