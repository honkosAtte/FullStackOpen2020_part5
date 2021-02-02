import React, { useEffect } from 'react';
import { useStateValue, setUpdatePatient } from '../state';
// import { Modal, Segment } from 'semantic-ui-react';
import { Patient } from '../types';
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
  const [{ patients }, dispatch] = useStateValue();
  let patient = patients[id];

  useEffect(() => {
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
    }
    getPatientWithSsnInfo()
  }, []);

  return (
    <>
      {patient ? <>  <h3>{patient.name} <Icon {...genderIconOps[patient.gender]} /></h3>
        <p>gender: {patient.gender}</p>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p></> : <p>PATIENT NOT FOUND</p>}

    </>
  );
}

export default PatientInfoPage;
