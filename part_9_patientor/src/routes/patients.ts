import express from 'express';
import toNewPatient from '../utils';
import { getEntriesWithNoSSN, addEntry, getPatientById } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = getEntriesWithNoSSN();
  res.send(result);
});

router.get('/:id', (req, res) => {
const result = getPatientById(req.params.id);
res.send(result);
});

router.post('/', (req, res) => {
//const { name, dateOfBirth, ssn, gender, occupation } = req.body; 
const newEntry = toNewPatient(req.body);

const result = addEntry(newEntry);

  res.json(result);
});

export default router;