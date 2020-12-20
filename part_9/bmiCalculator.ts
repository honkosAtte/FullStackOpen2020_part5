interface MultiplyValues {
    value1: number;
    value2: number;
  }
  
  const parseArguments = (args: Array<string>): MultiplyValues => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  
  const calculateBmi  = (a: number, b: number) : string => {
    
    const divider = b/100
    const bmi = a / (divider * divider)
    console.log('bmi', bmi)
    if (bmi < 20) {
        return 'underweight'
    } else if (bmi >= 20 && bmi <=25) {
        return 'Normal (healthly weight)'
    } else {
        return 'overweight'
    }
  }
  
  try {
    //const { value1, value2 } = parseArguments(process.argv);
    //calculateBmi (value1, value2);
    console.log(calculateBmi(78,180))
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }