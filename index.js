const AllGames = {
    "Rock-Paper": "Paper",
    "Paper-Rock": "Paper",
    "Rock-Scissors": "Rock",
    "Scissors-Rock": "Rock",
    "Paper-Scissors": "Scissors",
    "Scissors-Paper": "Scissors"
};

const possibleValues = [0, 1, 2];
var gameNum=0;

// input: { Monday, Tuesday, Wednesday, etc. }
// output: { Restaurant1, Restaurant2 }

const trainingData = [];

for (let gameType in AllGames) {
    const winner = AllGames[gameType];
    trainingData.push({
        input: { [gameType]: 1 },
        output: { [winner]:1 }
    });
}
//STEP 0- train the neuralnet
//-----
const net = new brain.NeuralNetwork({ hiddenLayers: [3] });
const stats = net.train(trainingData);

//-----

//step 2- generate a gameType

function generateUniqueValues() {

  const randomValues = [];

  while (randomValues.length < 2) {
    const randomIndex = Math.floor(Math.random() * possibleValues.length);
    const randomValue = possibleValues[randomIndex];

    if (!randomValues.includes(randomValue)) {
      randomValues.push(randomValue);
    }
  }

  return randomValues.map(value => {
    if (value === 0) return "Rock";
    if (value === 1) return "Paper";
    if (value === 2) return "Scissors";
  });
}

function playGame(){
      //alert(1);
      document.getElementById('gameNum').innerHTML = "Game-number: "+ ++gameNum;

      const [value1, value2] = generateUniqueValues();
      console.log(value1+"-"+value2);

      //-----

      //STEP3- PLAY THE GAME, and fetch the result
      const gametype = value1+"-"+value2;
      const move = value1+"-"+value2;  // Example move
      const jsonObject = { [move]: 1 };

      net.run(jsonObject);
      document.getElementById('input').innerHTML = "Random game generated: "+gametype;
      const res = net.run(jsonObject);


      // RESULTS and WINNER
      console.log(res);
      result = JSON.stringify(res);
      resJSON = JSON.parse(result);
      const rockScore = Math.round(resJSON.Rock);
      const paperScore = Math.round(resJSON.Paper);
      const scissorsScore = Math.round(resJSON.Scissors);
      if(rockScore==1)winner="Rock";
      if(paperScore==1)winner="Paper";
      if(scissorsScore==1)winner="Scissors";
      document.getElementById('result').innerHTML = "And the winner is: "+winner;

      }
// END Game

//first time flow
const [value1, value2] = generateUniqueValues();
console.log(value1+"-"+value2);

//-----





// END
