import { vectorController } from "./controllers/vector-controller.js";
import { Vector } from "./models/vector.js";

const vectorA = new Vector (1, -7);
const vectorB = new Vector (5, 2);

let vectorOperation = new vectorController ();

console.log(vectorA.vectorToString());

let vectorC = vectorOperation.addVector(vectorA, vectorB);
console.log(vectorC.vectorToString());

vectorC = vectorOperation.minusVector(vectorA, vectorB);
console.log(vectorC.vectorToString());

vectorC = vectorOperation.vectorByScalar(vectorA, 3);
console.log(vectorC.vectorToString());

let numberA = vectorOperation.dotProduct(vectorA, vectorB);
console.log(numberA);

vectorC = vectorOperation.crossProduct(vectorA, vectorB);
console.log(vectorC.vectorToString());