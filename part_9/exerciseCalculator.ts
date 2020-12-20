

interface Results { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number };

    // const parseArguments = (args: Array<string>): HeightAndWeight => {
    //     if (args.length < 4) throw new Error('Not enough arguments');
    //     if (args.length > 4) throw new Error('Too many arguments');
      
    //     if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    //       return {
    //         height: Number(args[2]),
    //         weight: Number(args[3])
    //       }
    //     } else {
    //       throw new Error('Provided values were not numbers!');
    //     }
    //   }
      
const hardCodedWeekHours = [3, 0, 2, 4.5, 0, 3, 1];

      const calculateExercises  = (args: Array<number>): Results => {

        const sum = args.reduce((a, b) => a + b, 0);
        const avg = (sum / args.length) || 0;
    
        const result =  { 
                periodLength: args.length,
                trainingDays: args.filter(row => row !== 0).length,
                success: args.length > 3 ? false : true,
                rating: 2, // TODO: add logic for range 1-3
                ratingDescription: 'not too bad but could be better',
                target: 2,
                average: avg };
            return result;
      }
      
      try {
        console.log(calculateExercises(hardCodedWeekHours))
      } catch (e) {
        console.log('Error, something bad happened, message: ', e.message);
      }