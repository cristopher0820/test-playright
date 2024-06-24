// utils/generateStudentData.ts
import { faker } from '@faker-js/faker';
import { StudentInfo } from '../utils/types';
import { format } from 'date-fns'


export function generateStudentData(): StudentInfo {
    const dateOfBirthObject = faker.date.past(30, '2000-01-01');
    const dateOfBirth = format(dateOfBirthObject, 'MM/dd/yyyy');
    return {
        email: faker.internet.email(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        gender: faker.name.sex(),
        dateOfBirth: dateOfBirth,
        countryOfBirth: faker.address.country(),
        countryOfCitizenship: faker.address.country()
    };
}
