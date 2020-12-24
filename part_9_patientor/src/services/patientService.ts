import crypto from 'crypto';

import patientEntries from '../data/patientsdata';
import { Patient, PatientWithoutSSN, NewPatient } from '../types';

let patients: Patient[] = patientEntries;

export const getEntries = (): Patient[] => {
    return patients;
};

export const getEntriesWithNoSSN = (): PatientWithoutSSN[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
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