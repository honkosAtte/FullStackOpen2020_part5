import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

interface ReqBody {
    "daily_exercises": Array<number>,
    "target": number
}

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
        const weight = Number(req.query.weight);
        const height = Number(req.query.height);

        if (isNaN(weight) || isNaN(height)) {
            return res.send({error: "malformatted parameters"});
        }
        const bmi = calculateBmi(height, weight);
            
        const result = {
            weight: weight,
            height: height,
            bmi: bmi
        };
        return res.send(result);
   });
  
app.post('/exercises', (req, res) => {
    const body = req.body as ReqBody;
    console.log('booody', body);


    if (body.daily_exercises === undefined || body.target === undefined) {
        return res.send({error: "parameters missing"});
    }

    const days = body.daily_exercises;
    const target = body.target;

    if (days.some(n => isNaN(n)) || isNaN(target)) {
        return res.send({error: "malformatted parameters"});
    }

    const result = calculateExercises(days);

    return res.send(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});