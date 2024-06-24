import { authTest } from './auth.fixtures';
import { StudentListPage } from '../pagesPOM/StudentListPage';
import { StudentProfilePage } from '../pagesPOM/StudentProfilePage';
import { Page } from '@playwright/test';
import { StudentInfo, DependentInfo } from '../utils/types';
import { generateStudentData } from '../utils/generateStudentData';
import { CreateStudentF1 } from '../pagesPOM/CreateStudentF1';

async function createF1Student(page: Page, studentInfo: StudentInfo): Promise<void> {
    const studentListPage = new StudentListPage(page);
    const createStudentPage = new CreateStudentF1(page);

    await studentListPage.selectCreateStudent('F-1 Student');
    await createStudentPage.checkHeaderText('Create F-1 Student');
    await createStudentPage.fillStudentForm(studentInfo);
    await createStudentPage.submitStudentForm();
}

async function searchStudent(page: Page, studentInfo: StudentInfo): Promise<void> {
    const studentListPage = new StudentListPage(page);
    await studentListPage.searchStudent(studentInfo);
}

async function createF1StudentDependent(page: Page, studentInfo: StudentInfo, dependentInfo: DependentInfo): Promise<void> {
    const studentListPage = new StudentListPage(page);
    const createStudentPage = new CreateStudentF1(page);

    await studentListPage.selectCreateStudent('F-1 Student');
    await createStudentPage.checkHeaderText('Create F-1 Student');
    await createStudentPage.fillStudentForm(studentInfo);
    await createStudentPage.createDependent(dependentInfo);
    await createStudentPage.submitStudentForm();
}

export const studentTest = authTest.extend<{
    studentCreator: {
        create: () => Promise<void>;
        search: () => Promise<void>;
        studentData: StudentInfo;
    };
    studentProfilePage: StudentProfilePage;
}>({
    studentCreator: async ({ page }, use) => {
        const studentData = generateStudentData();
        const create = async () => createF1Student(page, studentData);
        const search = async () => searchStudent(page, studentData);

        await use({ create, search, studentData });
    },
    studentProfilePage: async ({ page }, use) => {
        const studentProfilePage = new StudentProfilePage(page);
        await use(studentProfilePage);
    },
});

export const { expect } = studentTest;
