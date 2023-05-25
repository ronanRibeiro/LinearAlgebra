"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vector_controller_js_1 = require("./controllers/vector-controller.js");
const vector_js_1 = require("./models/vector.js");
const vectorA = new vector_js_1.Vector(1, -7);
const vectorB = new vector_js_1.Vector(5, 2);
let vectorOperation = new vector_controller_js_1.vectorController();
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
//# sourceMappingURL=index.js.map