interface HeightAndWeight {
    height: number;
    weight: number;
  }
  
  const parseArguments = (args: Array<string>): HeightAndWeight => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        height: Number(args[2]),
        weight: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }
  
  const calculateBmi  = (height: number, weight: number) : string => {
    
    const heightDividedBy100 = height/100
    const bmi = weight / (heightDividedBy100 * heightDividedBy100)
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
    console.log(calculateBmi(180, 74))
  } catch (e) {
    console.log('Error, something bad happened, message: ', e.message);
  }