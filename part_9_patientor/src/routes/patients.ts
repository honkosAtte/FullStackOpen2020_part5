import express from 'express';
import  toNewPatient from '../utils';
import  { toNewEntry } from '../utils';
import { getEntriesWithNoSSN, addPatient, getPatientById, 
  addEntryForPatient 
} from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = getEntriesWithNoSSN();
  res.send(result);
});

router.get('/:id', (req, res) => {

const result = getPatientById(req.params.id);

if (result) {
  res.send(result);
} else {
  res.sendStatus(404);
}
});

router.post('/', (req, res) => {
  try {

    const newPatient = toNewPatient(req.body);
    const result = addPatient(newPatient);

  res.json(result);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }

});

router.post("/:id/entries", (req, res) => {
  const patient = getPatientById(req.params.id);
  if (patient) {
    try {
     const newEntry = toNewEntry(req.body);
     const updatedPatient = addEntryForPatient(patient, newEntry);
      
      //console.log('feilaako tämä', res.json(patient))
      //console.log('patient', patient)
      console.log('ei feilannut vielä')
      res.json(updatedPatient);
    } catch (e) {
      console.log('errorissa ollaan')
      res.status(400).send({ error: e.message });
    }
  } else {
    res.status(404).send({ error: "Sorry, a patient with this id does not exist" });
  }
});

export default router;