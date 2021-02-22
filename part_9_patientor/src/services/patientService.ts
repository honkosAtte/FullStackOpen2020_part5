import crypto from 'crypto';

import patientEntries from '../data/patientsdata';
import { Patient, PublicPatient, NewPatient, NewEntry, Entry } from '../types';

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


export const addPatient = ( newPatient: NewPatient ) : Patient => {

    const result = {
       id: crypto.randomBytes(20).toString('hex'),
        ...newPatient
   };
   console.log('onko id', result);
    patients = patients.concat(result);

    return result;
};

export const addEntryForPatient = (patient: Patient, newEntry: NewEntry): Patient => {
    const entry: Entry = { ...newEntry, id: crypto.randomBytes(20).toString('hex') };
    const updatedPatient = { ...patient, entries: patient.entries.concat(entry) };
    
    patients = patients.map((patient) =>
      patient.id === updatedPatient.id ? updatedPatient : patient
    );
  
    return updatedPatient;
  };
  
  