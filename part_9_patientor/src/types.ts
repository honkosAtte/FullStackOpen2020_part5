export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};

export type Patient = {
    id: string,
    name: string,
    dateOfBirth: string,
    ssn: string,
    gender: string,
    occupation: string
};

// enum Gender {
//     MALE, FEMALE, OTHER
// }

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;
