function convertToRoman(num) {
    //I, V, X, L, C, D, and M, standing respectively for 1, 5, 10, 50, 100, 500, and 1,000
    let roman = "";
  
    let digit = count => {
      let result = "";
      for (let i = 0; i < count; i++) result += "I";
      return result;
    };
    let quad = () => {
      return digit(1) + quin();
    };
    let quin = () => {
      return "V";
    };
    let deca = () => {
      return "X";
    };
    let viginti = () => {
      return deca() + deca();
    };
    let quinquaginta = () => {
      return "L";
    };
    let centum = () => {
      return "C";
    };
    let quingenti = () => {
      return "D";
    };
    let mille = () => {
      return "M";
    };
  
    //Single Digit Evaluation
    let singleEval = singleDigit => {
      if (singleDigit > 0 && singleDigit < 4)
        //1-3
        return digit(singleDigit);
      if (singleDigit === 4)
        //4
        return quad();
      if (singleDigit === 5)
        //5
        return quin();
      if (singleDigit > 5 && singleDigit < 9)
        //6-8
        return quin() + digit(singleDigit - 5);
      if (singleDigit === 9)
        //9
        return digit(1) + deca();
    };
  
    //Double Digit Evaluation
    let doubleEval = doubleDigit => {
      let tenIndex = parseInt(doubleDigit.toString().split("")[0] + 0);
      let tenEval = val => {
        if (val === 10) return deca(); // is 10?
        if (val === 20) return viginti(); //is 20?
        if (val === 30) return viginti() + deca();
        if (val === 40) return deca() + quinquaginta();
        if (val === 50) return quinquaginta();
        if (val === 60) return quinquaginta() + deca();
        if (val === 70) return quinquaginta() + viginti();
        if (val === 80) return quinquaginta() + viginti() + deca();
        if (val === 90) return deca() + centum();
      };
  
      if (doubleDigit - tenIndex === 0) doubleDigit = tenEval(tenIndex);
      else doubleDigit = tenEval(tenIndex) + singleEval(doubleDigit - tenIndex);
  
      return doubleDigit;
    };
  
    //Triple Digit Evaluation
    let tripleEval = tripleDigit => {
      let hundredIndex = parseInt(tripleDigit.toString().split("")[0] + 0 + 0);
      let hundredEval = val => {
        if (val === 100) return centum();
        if (val === 200) return centum() + centum();
        if (val === 300) return centum() + centum() + centum();
        if (val === 400) return centum() + quingenti();
        if (val === 500) return quingenti();
        if (val === 600) return quingenti() + centum();
        if (val === 700) return quingenti() + centum() + centum();
        if (val === 800) return quingenti() + centum() + centum() + centum();
        if (val === 900) return centum() + mille();
      };
  
      if (tripleDigit - hundredIndex === 0)
        tripleDigit = hundredEval(hundredIndex);
      else if (tripleDigit - hundredIndex < 10)
        tripleDigit =
          hundredEval(hundredIndex) + singleEval(tripleDigit - hundredIndex);
      else
        tripleDigit =
          hundredEval(hundredIndex) + doubleEval(tripleDigit - hundredIndex);
  
      return tripleDigit;
    };
  
    //Quadruple Digit Evaluation
    let quadEval = quadDigit => {
      let thousandIndex = parseInt(num.toString().split("")[0] + 0 + 0 + 0);
      let count = parseInt(num.toString().split("")[0]);
      let thousandEval = val => {
        let thousandCount = "";
        for (let index = 0; index < count; index++) thousandCount += mille();
        return thousandCount;
      };
  
      if (quadDigit - thousandIndex === 0) quadDigit = thousandEval(thousandIndex);
      else if (quadDigit - thousandIndex < 10)
        quadDigit = thousandEval(thousandIndex) + singleEval(quadDigit - thousandIndex);
      else if (quadDigit - thousandIndex >= 10 && quadDigit - thousandIndex < 100)
        quadDigit = thousandEval(thousandIndex) + doubleEval(quadDigit - thousandIndex);
      else if (quadDigit - thousandIndex >= 100 && quadDigit - thousandIndex < 1000)
        quadDigit = thousandEval(thousandIndex) + tripleEval(quadDigit - thousandIndex);
  
      return quadDigit;
    };
  
    if (num > 0 && num < 10)
      //If single digit between 0 and 10
      roman = singleEval(num);
  
    if (num >= 10 && num < 100)
      //If between 10 and 100
      roman = doubleEval(num);
  
    if (num >= 100 && num < 1000)
      //If between 100 and 1,000
      roman = tripleEval(num);
  
    if (num >= 1000 && num < 10000)
      //If between 1,000 and 10,000
      roman = quadEval(num);
  
    return roman;
  }
  
  console.log(convertToRoman(3999));