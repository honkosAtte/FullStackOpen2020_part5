export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};

// export type Patient = {
//     id: string,
//     name: string,
//     dateOfBirth: string,
//     ssn: string,
//     gender: Gender,
//     occupation: string
// };

export enum Gender {
    MALE = 'male', 
    FEMALE = 'female', 
    OTHER = 'other'
}

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;