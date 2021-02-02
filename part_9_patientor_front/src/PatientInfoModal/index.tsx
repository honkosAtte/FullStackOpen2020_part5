import React, { useEffect } from 'react';
import { useStateValue } from '../state';
// import { Modal, Segment } from 'semantic-ui-react';
import { Gender, Patient } from '../types';
import { useParams } from "react-router-dom";
import { apiBaseUrl } from '../constants';
import axios from 'axios';


interface Props {
  patient: Patient;
}

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
        dispatch({ type: "GET_PATIENT_BY_ID", payload: oldPatient as Patient });
      } catch (error) {
        console.error('Something went wrong');
      }
    }
    getPatientWithSsnInfo()
  }, []);

  return (
    <>
      {patient ? <>  <h3>{patient.name} </h3>
        <p>gender: {patient.gender}</p>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p></> : <p>PATIENT NOT FOUND</p>}

    </>
  );
}

export default PatientInfoPage;
