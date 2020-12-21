import express from 'express';
import { calculateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
        const weight = Number(req.query.weight);
        const height = Number(req.query.height);

        if (isNaN(weight) || isNaN(height)) {
            return res.send({error: "malformatted parameters"})
        }
        const bmi = calculateBmi(height, weight)
            
        const result = {
            weight: weight,
            height: height,
            bmi: bmi
        }
        return res.send(result)    
   });

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});