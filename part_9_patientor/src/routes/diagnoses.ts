import express from 'express';
import { getEntries } from '../services/diagnoseService';

const router = express.Router();

router.get('/', (_req, res) => {
  const result = getEntries();
  console.log('resultt', result);
  res.send(result);
});

// router.post('/', (_req, res) => {
//   res.send('Saving a diagnose!');
// })

export default router;
