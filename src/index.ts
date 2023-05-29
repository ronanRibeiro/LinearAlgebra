import { Vector2d } from "./models/vector2d.js";
import { Vector3d } from "./models/vector3d.js";
import { Vector2dService } from "./services/vector2d.Services.js";
import { Vector3dService } from "./services/vector3d.Services.js";

let vectorOperation2d = new Vector2dService ();
let v0: Vector2d = {x: 1, y: 3};
let v1: Vector2d = {x: 2, y: 4};

let vectorOperation3d = new Vector3dService ();
let v2: Vector3d = {x: 1, y: 4, z: 3};
let v3: Vector3d = {x: 2, y: 5, z: 2};

//2D Tests
console.log(`Basic operations of 2d Vectors.`);
console.log('');
console.log(`Addition of ${vectorOperation2d.toString(v0)} and ${vectorOperation2d.toString(v1)}:`);
console.log(`${vectorOperation2d.toString(vectorOperation2d.add(v0, v1))}`);
console.log('');
console.log(`Subtraction of${vectorOperation2d.toString(v0)} e ${vectorOperation2d.toString(v1)}:`);
console.log(`${vectorOperation2d.toString(vectorOperation2d.minus(v0, v1))}`);
console.log('');
console.log(`Product of ${vectorOperation2d.toString(v0)} by Scalar 3 :`);
console.log(`${vectorOperation2d.toString(vectorOperation2d.byScalar(v0, 3))}`);
console.log('');
console.log(`Dot Product of ${vectorOperation2d.toString(v0)} and ${vectorOperation2d.toString(v1)}:`);
console.log(`${vectorOperation2d.dotProduct(v0, v1)}`);
console.log('');
console.log(`Cross Product of ${vectorOperation2d.toString(v0)} and ${vectorOperation2d.toString(v1)}:`);
console.log(`${vectorOperation2d.crossProduct(v0, v1)}`);
console.log('');
//3D Tests
console.log('--------------------------------------------------------------------------------------------');
console.log('');
console.log(`Basic operations of 3d Vectors.`);
console.log('');
console.log(`Addition of ${vectorOperation3d.toString(v2)} and ${vectorOperation3d.toString(v3)}:`);
console.log(`${vectorOperation3d.toString(vectorOperation3d.add(v2, v3))}`);
console.log('');
console.log(`Subtraction of ${vectorOperation3d.toString(v2)} and ${vectorOperation3d.toString(v3)}:`);
console.log(`${vectorOperation3d.toString(vectorOperation3d.minus(v2, v3))}`);
console.log('');
console.log(`Product of ${vectorOperation3d.toString(v2)} by Scalar 3 :`);
console.log(`${vectorOperation3d.toString(vectorOperation3d.byScalar(v2, 3))}`);
console.log('');
console.log(`Dot Product of ${vectorOperation3d.toString(v2)} and ${vectorOperation3d.toString(v3)}:`);
console.log(`${vectorOperation3d.dotProduct(v2, v3)}`);
console.log('');
console.log(`Cross Product of ${vectorOperation3d.toString(v2)} and ${vectorOperation3d.toString(v3)}:`);
console.log(`${vectorOperation3d.toString(vectorOperation3d.crossProduct(v2, v3))}`);