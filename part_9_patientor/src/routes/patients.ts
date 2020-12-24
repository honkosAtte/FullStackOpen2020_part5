import express from 'express';
import { getEntriesWithNoSSN, addEntry } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = getEntriesWithNoSSN();
  console.log('resultt', result);
  res.send(result);
});

router.post('/', (req, res) => {
const { name, dateOfBirth, ssn, gender, occupation } = req.body;  
const newPatient = addEntry(name, dateOfBirth, ssn, gender, occupation);

  res.json(newPatient);
})

export default router;