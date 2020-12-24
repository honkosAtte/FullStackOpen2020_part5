import patientData from '../data/patients.json';
import { Patient, PatientWithoutSSN } from '../types';

const patients: Patient[] = patientData;

export const getEntries = (): Patient[] => {
    return patients;
};

export const getEntriesWithNoSSN = (): PatientWithoutSSN[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};