const staffMembers = ["Savita👩", "Sumantha👨", "Sumitra👧", "Bhargava🧔", "Ganapathy🧓"];
const  maintenanceTypeArr = ["Charging Cable Faults 🔌", "Power Supply Interruptions 🪫", "Communication and Network Problems 📶"];


// Helper function to generate a random integer within a range
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const dataset = [];
const dataNum = 50;

document.getElementById('tdata').innerHTML += "Training with "+dataNum+ " datapoints----------";

//GRACEFUL FADES
function fadeDIV(obj) {
  let element = document.getElementById(obj);
  element.style.opacity = 100;
  }

// Generating 50 random entries
for (let i = 0; i < dataNum; i++) {
  const maintenanceType = getRandomInt(1, 3); // 1: Charging Cable Faults, 2: Power Supply Interruptions, 3: Communication and Network Problems
  const staffIndex = getRandomInt(0, 4); // Index to select a random staff member

  const dataPoint = {
    input: {
      type: maintenanceType
    },
    output: {
      resolvedBy: staffIndex
    }
  };
  dataset.push(dataPoint);
  document.getElementById('tdata').innerHTML += " ErrorType:" + maintenanceTypeArr[maintenanceType] + " Handled by: " + staffMembers[staffIndex] ;
}

console.log(dataset);
  const net = new brain.NeuralNetwork();
  const trainingData = dataset.map(data => ({
    input: { type: data.input.type },
    output: { resolvedBy: staffMembers.indexOf(data.output.resolvedBy) }
  }));

  // Step 1: Train brain.js on the data
// show the trainingdata

  const res= net.train(trainingData);
  console.log(res);

  // Step 2: Run the neural network with the given error code
  function runNeuralNet(errorCode) {
    fadeDIV("result");
    fadeDIV("input");

    document.getElementById('input').innerHTML = "For the next maintenance type: "+ maintenanceTypeArr[errorCode-1] + " the AI suggests";

    const input = { type: errorCode };
    const output = net.run(input);
    var resolvedBy = output.resolvedBy;
    const arr = String(resolvedBy).split(".");
    var resolvedByIndex = arr[0];
    if(resolvedByIndex>0)resolvedByIndex--;

//console.log("resolvedByIndex "+resolvedByIndex);
    const technician = staffMembers[resolvedByIndex];
    document.getElementById('result').innerHTML = "The technician most likely to have solved the maximum number of incidents for error type"+ errorCode +"is: " +  technician;
    console.log("The technician most likely to have solved the maximum number of incidents for error type"+ errorCode +"is: " +  technician);
  }
