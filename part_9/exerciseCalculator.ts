interface Results { 
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number 
};

    const parseArgumentsArray = (args: Array<string>): Array<number> => {
        if (args.length < 3) throw new Error('Not enough arguments');
        console.log('nolla', Number(0))
        const arguments = args.slice(2);
        console.log('arguments', arguments);
        const argumentsAreNumbers = arguments.every(n => !isNaN(Number(n)));
        console.log('argumentsAreNumbers', argumentsAreNumbers);
       
        if (argumentsAreNumbers) {
            let days = Array<number>();
            arguments.forEach(number => days.push(Number(number)));
          return days;
        } else {
          throw new Error('Provided values were not numbers!');
        }
      }
      
//const hardCodedWeekHours = [3, 0, 2, 4.5, 0, 3, 1];

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
        const hoursGivenByUser = parseArgumentsArray(process.argv);

        console.log(calculateExercises(hoursGivenByUser))
      } catch (e) {
        console.log('Error, something bad happened, message: ', e.message);
      }