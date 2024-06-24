export interface StudentInfo {
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    countryOfBirth: string;
    countryOfCitizenship: string;
}

export interface DependentInfo {
    email: string;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    countryOfBirth: string;
    countryOfCitizenship: string;
    relation: 'child' | 'spouse'
}