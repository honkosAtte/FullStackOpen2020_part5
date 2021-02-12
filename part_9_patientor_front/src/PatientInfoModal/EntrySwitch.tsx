import React from "react";

import { Entry, EntryType } from "../types";

import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthCareEntry from "./OccupationalHealthCareEntry";

/**
 * Helper for exhaustive type checking
 */
export const assertNever = (entry: Entry) => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(entry)}`
  );
};

const EntrySwitch: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case EntryType.HealthCheck:
      return <HealthCheckEntry entry={entry} />
    case EntryType.OccupationalHealthCare:
      return <OccupationalHealthCareEntry entry={entry} />
    case EntryType.Hospital:
      return <HospitalEntry entry={entry} />
    default:
      return assertNever(entry);
  }
};

export default EntrySwitch;