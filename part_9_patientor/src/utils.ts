/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NewPatient, Gender, Entry, EntryType } from './types';


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

export default toNewPatient;