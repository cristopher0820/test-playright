

import { authTest, expect as authExpect } from '../fixtures/auth.fixtures';
import { StudentListPage } from '../pagesPOM/StudentListPage';
import { StudentProfilePage } from '../pagesPOM/StudentProfilePage';

import { studentTest } from '../fixtures/student.fixture';



// Grouping related tests for the Dashboard page
//OK
authTest.describe('Dashboard Page Tests', () => {
  authTest('test with dashboard page', async ({ page }) => {
    const studentListPage = new StudentListPage(page);
    const h3Text = await studentListPage.getH3Text();
    authExpect(h3Text).toContain('International Student Admin');
  });
});

// Pruebas que requieren el perfil del estudiante configurado
studentTest.describe.only('Student Profile Tests', () => {
  studentTest('create a student', async ({ studentCreator, studentProfilePage, page }) => {
    studentTest.setTimeout(180000);

    await studentCreator.create();
    await studentCreator.search();

  });
});

studentTest.describe('Student Profile Tests', () => {
  studentTest('create a student with dependent', async ({ studentCreator, studentProfilePage, page }) => {
    studentTest.setTimeout(180000);

    // await studentCreator.createWithDependent();
    await studentCreator.search();

  });
});


// studentTest.describe.only('Student Profile Tests', () => {
//   studentTest('check actions', async ({ studentCreator, studentProfilePage, page }) => {
//     studentTest.setTimeout(180000);

//     const studentListPage = new StudentListPage(page);
//     // const h3Text = await studentListPage.getH3Text();
//     // authExpect(h3Text).toContain('International Student Admin');

//     await studentCreator.create();
//     await studentCreator.search();

//     // await studentListPage.searchStudentByemail('Darrel.Tillman@hotmail.com');
//     // await studentListPage.verifyStudentExistOnTheGrid(studentCreator.studentData);


//     // await studentProfilePage.navigateToRequestsTab(studentCreator.studentData.email);
//   });
// });
