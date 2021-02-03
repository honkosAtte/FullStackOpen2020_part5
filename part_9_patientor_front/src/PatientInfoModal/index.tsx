import React, { useEffect } from 'react';
import { useStateValue, setUpdatePatient, setDiagnosesList } from '../state';
// import { Modal, Segment } from 'semantic-ui-react';
import { Diagnosis, Patient } from '../types';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from '../constants';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';


const genderIconOps = {
  male: { name: "mars" as "mars", color: "grey" as "grey" },
  female: { name: "venus" as "venus", color: "grey" as "grey" },
  other: { name: "genderless" as "genderless", color: "grey" as "grey" },
};

const PatientInfoPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const patient = patients[id];
  useEffect(() => {
    const fetchDiagnosesList = async () => {
      try {
        const { data: diagnosesListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setDiagnosesList(diagnosesListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (Object.values(diagnoses).length < 1) {
      fetchDiagnosesList();
    }

    if (Object.values(patients).find(row => row.id === id)?.ssn) {
      return;
    }
    const getPatientWithSsnInfo = async () => {
      try {
        const { data: oldPatient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`);
        dispatch(setUpdatePatient(oldPatient));
      } catch (error) {
        console.error('Something went wrong');
      }
    };
    getPatientWithSsnInfo();
  }, [dispatch, diagnoses, id, patients]);

  return (
    <>
      {patient ? <>  <h3>{patient.name} <Icon {...genderIconOps[patient.gender]} /></h3>
        <p>gender: {patient.gender}</p>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <div>
          <h4>entries</h4>
          {patient.entries.map(entry =>
            <ul key={entry.id}>{entry.date} <i>{entry.description}</i>
              {entry.diagnosisCodes?.map(code => <ul key={code}>{Object.values(diagnoses).filter(row => row.code === code).map(row => <li key={row.name}>{row.code} {row.name}</li>)}</ul>)}</ul>
          )

          }
        </div>

      </> : <p>PATIENT NOT FOUND</p>}

    </>
  );
}

export default PatientInfoPage;
