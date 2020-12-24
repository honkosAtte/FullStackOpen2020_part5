import express from 'express';
import { getEntriesWithNoSSN } from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = getEntriesWithNoSSN();
  console.log('resultt', result);
  res.send(result);
});

// router.post('/', (_req, res) => {
//   res.send('Saving a patient!');
// })

export default router;