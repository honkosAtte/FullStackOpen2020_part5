/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, EntryType, NewBaseEntry, HealthCheckRating, NewEntry, Discharge, Sickleave, Diagnose } from './types';

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: any): text is string => {
    return typeof text === 'string' || text instanceof String;
  };

const parseText = (text: any): string => {
    if (!text || !isString(text)) {
      // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
      throw new Error('Incorrect or missing text: ' + text);
    }
  
    return text;
  };

  const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
  };
  
  const parseDate = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
  };

  const isGender= (param: any): param is Gender => {
    return Object.values(Gender).includes(param);
  };

  const parseGender = (gender: any): Gender => {
    if (!gender || !isString(gender) || !isGender(gender)) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
  };

  const parseEntryType = (entry: any): Entry[] => {
  if (!entry) {
    return entry;
  }
    const e = entry as Entry[];
    e.map(entry => {
      if (!Object.values(EntryType).toString().includes(entry.type)) {
        throw new Error('Incorrect or missing type: ' + entry);
      }
    });


    return entry;
  };

const toNewPatient = (object: any): NewPatient => {
  return {
   name: parseText(object.name),
   dateOfBirth: parseDate(object.dateOfBirth),
   ssn: parseText(object.ssn),
   gender: parseGender(object.gender),
   occupation: parseText(object.occupation),
   entries: parseEntryType(object.entries)
  };
};


const parseTypeOfEntry = (entryType: any): EntryType => {
  if (!Object.values(EntryType).includes(entryType)) {
    throw new Error(`Incorrect or missing type: ${entryType || ""}`);
  }

  return entryType;
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntry = {
    type: parseTypeOfEntry(object.type),
    description: parseText(object.description),
    date: parseDate(object.date),
    specialist: parseText(object.specialist),
  };

  if (object.diagnosisCodes) {
    const temp = object.diagnosisCodes as Diagnose[];
    
    newBaseEntry.diagnosisCodes = parseDiagnosesCodes(temp);
  }

  return newBaseEntry;
};

const parseHealthCheckRating = (healthCheckRating: any): HealthCheckRating => {
  if (
    healthCheckRating === null ||
    healthCheckRating === undefined 
    // ||
    // !healthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      `Incorrect or missing health check rating: ${healthCheckRating || ""}`
    );
  }
  return healthCheckRating;
};

const parseSickLeave = (object: any): Sickleave => {
  if (!object) throw new Error("Missing sick leave");

  return {
    startDate: parseDate(object.startDate,),
    endDate: parseDate(object.endDate),
  };
};

const isItStrings = (param: any[]): param is string[] => {
  const hasNonString = param.some((item) => {
    return !isString(item);
  });

  return !hasNonString;
};

const parseDiagnosesCodes = (diagnosisCodes: any): Array<Diagnose["code"]> => {
  if (!Array.isArray(diagnosisCodes) || !isItStrings(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnoses");
  }

  return diagnosisCodes;
};

const parseDischarge = (object: any): Discharge => {
  if (!object) throw new Error("Missing discharge");

  return {
    date: parseText(object.date),
    criteria: parseText(object.criteria),
  };
};

export const toNewEntry = (object: any): NewEntry => {
  const newBaseEntry = toNewBaseEntry(object) as NewEntry;
  switch (newBaseEntry.type) {
    case EntryType.HealthCheck:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case EntryType.OccupationalHealthCare:
      const newEntry = {
        ...newBaseEntry,
        employerName: parseText(object.employerName),
      };

      if (object.sickLeave) {
        newEntry.sickLeave = parseSickLeave(object.sickLeave);
      } 
      return newEntry;
    case EntryType.Hospital:
      return { ...newBaseEntry, 
        discharge: parseDischarge(object.discharge) };
    default:
      return assertNever(newBaseEntry);
  }
};

export default toNewPatient;