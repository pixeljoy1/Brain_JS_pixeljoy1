const AllGames = {
    "Rock-Paper": "Paper",
    "Paper-Rock": "Paper",
    "Rock-Scissors": "Rock",
    "Scissors-Rock": "Rock",
    "Paper-Scissors": "Scissors",
    "Scissors-Paper": "Scissors"
};

// 0=Rock, 1= Paper 2=Scissors
const possibleValues = [0, 1, 2];

var gameStats=0;

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

console.log(stats);

fetchstats = JSON.stringify(stats);
fetchJSON = JSON.parse(fetchstats);
  if(Math.round(fetchJSON.error)==0)
document.getElementById('gameStats').innerHTML= "AI trainingData success, #iterations: "+ fetchJSON.iterations;
else {
  document.getElementById('gameStats').innerHTML= "AI trainingData failed";
}

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

//GRACEFUL FADES
function fadeDIV(obj) {
  let element = document.getElementById(obj);
  element.style.opacity = 100;
  }


function playGame(){
      // change the button label
      // FADE IN GAME STATS
      fadeDIV("result");
      fadeDIV("input");


      var div = document.getElementById("input");

      //document.getElementById('result')

      document.getElementById("playBtn").innerHTML = "Keep unleashing 🤞";
      document.getElementById('gameStats').innerHTML = "Game number: "+ ++gameStats;
      const [value1, value2] = generateUniqueValues();
      console.log(value1+"-"+value2);

      //-----

      //STEP3- PLAY THE GAME, and fetch the result
      const gametype = value1+"-"+value2;
      const move = value1+"-"+value2;  // Example move
      var emoji1, emoji2 = new String();
      if(value1=="Rock") emoji1 = "🪨";
      if(value1=="Paper") emoji1 = "📄";
      if(value1=="Scissors") emoji1 = "✂️";
      if(value2=="Rock") emoji2 = "🪨";
      if(value2=="Paper") emoji2 = "📄";
      if(value2=="Scissors") emoji2 = "✂️";

      const jsonObject = { [move]: 1 };
      net.run(jsonObject);
      document.getElementById('input').innerHTML = "Random selections given to AI: "+ emoji1 +" vs. "+emoji2;
      const res = net.run(jsonObject);


      // RESULTS and WINNER
      console.log(res);
      result = JSON.stringify(res);
      resJSON = JSON.parse(result);
      const rockScore = Math.round(resJSON.Rock);
      const paperScore = Math.round(resJSON.Paper);
      const scissorsScore = Math.round(resJSON.Scissors);
      if(rockScore==1)winner="🪨";
      if(paperScore==1)winner="📄";
      if(scissorsScore==1)winner="✂️";
      document.getElementById('result').innerHTML = "And the winner is: "+winner;

      }
// END Game

//first time flow
const [value1, value2] = generateUniqueValues();
console.log(value1+"-"+value2);


//-----





// END
