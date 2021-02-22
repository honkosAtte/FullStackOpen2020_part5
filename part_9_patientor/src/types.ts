export type Diagnose = {
    code: string;
    name: string;
    latin?: string;
};

interface BaseEntry {
  type: EntryType;
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface HealthCheckEntry extends BaseEntry {
  type: EntryType.HealthCheck;
  healthCheckRating: HealthCheckRating;
}

export interface Discharge  {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: EntryType.Hospital;
  discharge: Discharge;
}

export interface Sickleave  {
  startDate: string;
  endDate: string;
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: EntryType.OccupationalHealthCare;
  employerName: string;
  sickLeave?: Sickleave;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export enum Gender {
    Male = 'male', 
    Female = 'female', 
    Other = 'other'
}

export enum EntryType {
  Hospital = "Hospital",
  OccupationalHealthCare = "OccupationalHealthcare",
  HealthCheck = "HealthCheck"
}

export type PatientWithoutSSN = Omit<Patient, 'ssn'>;

export type NewPatient = Omit<Patient, 'id'>;

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >;

type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;

export type NewBaseEntry = Omit<Entry, "id">;

export type NewEntry = DistributiveOmit<Entry, "id">;