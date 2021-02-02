import crypto from 'crypto';

import patientEntries from '../data/patientsdata';
import { Patient, PublicPatient, NewPatient } from '../types';

let patients: Patient[] = patientEntries;

export const getEntries = (): Patient[] => {
    return patients;
};

export const getPatientById = (id: string): Patient => {
    const patient = patients.find(row => row.id === id);
    return patient as Patient;
}

export const getEntriesWithNoSSN = (): PublicPatient[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation, entries}) => ({id, name, dateOfBirth, gender, occupation, entries}));
};


export const addEntry = ( newPatient: NewPatient ) : Patient => {

    const result = {
       id: crypto.randomBytes(20).toString('hex'),
        ...newPatient
   };
   console.log('onko id', result);
    patients = patients.concat(result);

    return result;
};