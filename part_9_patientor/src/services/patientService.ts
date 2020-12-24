import crypto from 'crypto';

import patientData from '../data/patients.json';
import { Patient, PatientWithoutSSN } from '../types';

let patients: Patient[] = patientData;

export const getEntries = (): Patient[] => {
    return patients;
};

export const getEntriesWithNoSSN = (): PatientWithoutSSN[] => {
    return patients.map(({id, name, dateOfBirth, gender, occupation}) => ({id, name, dateOfBirth, gender, occupation}));
};


export const addEntry = ( name: string, dateOfBirth: string, ssn: string, gender: string, occupation: string ) : Patient => {

    const newPatient = {
       id: crypto.randomBytes(20).toString('hex'),
       name,
       dateOfBirth,       ssn,
       gender,
       occupation
   };
   
    patients = patients.concat(newPatient);

    return newPatient;
};