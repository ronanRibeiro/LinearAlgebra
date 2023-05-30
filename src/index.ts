import { Matrix2d } from "./models/matrix2d.js";
import { Matrix3d } from "./models/matrix3d.js";
import { Vector2d } from "./models/vector2d.js";
import { Vector3d } from "./models/vector3d.js";
import { Matrix2dService } from "./services/matrix2d.Services.js";
import { Matrix3dService } from "./services/matrix3d.Services.js";
import { Vector2dService } from "./services/vector2d.Services.js";
import { Vector3dService } from "./services/vector3d.Services.js";

let vectorOperation2d = new Vector2dService();
let v0: Vector2d = {x: 1, y: 3};
let v1: Vector2d = {x: 2, y: 4};

/*
//Vector 2D Tests
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
*/

let vectorOperation3d = new Vector3dService();
let v2: Vector3d = {x: 1, y: 4, z: 3};
let v3: Vector3d = {x: 2, y: 5, z: 2};

/*
//Vector3D Tests
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
*/

let matrix2dService = new Matrix2dService();
let m1: Matrix2d = {x: [3, 6], y: [-4, 8]};
let m2: Matrix2d = {x: [1, 0], y: [0, 1]};

/*
//Matrix 2d Tests
Matrix2dService.toString(m1);
console.log('');
Matrix2dService.toString(Matrix2dService.add(m1, m2));
console.log('');
Matrix2dService.toString(Matrix2dService.minus(m1, m2));
console.log('');
Matrix2dService.toString(Matrix2dService.byScalar(m1, 2));
console.log('');
Matrix2dService.toString(Matrix2dService.multiplication(m1, m2));
console.log('');
Matrix2dService.toString(Matrix2dService.minor(m1));
console.log('');
Matrix2dService.toString(Matrix2dService.cofactor(m1));
console.log('');
Matrix2dService.toString(Matrix2dService.adjoint(m1));
console.log('');
Matrix2dService.toString(Matrix2dService.transpose(m1));
console.log('');
console.log(Matrix2dService.determinant(m1));
console.log('');
Matrix2dService.toString(Matrix2dService.inverse(m1));
*/

let matrix3dService = new Matrix3dService();
let m3: Matrix3d = {x: [2, -1, 3], y: [0, 5, 2], z: [1, -1, -2]};
let m4: Matrix3d = {x: [1, 0, 0], y: [0, 1, 0], z: [0, 0, 1]};

//Matrix 3d Tests
matrix3dService.toString(m3);
console.log('');
matrix3dService.toString(matrix3dService.add(m3, m4));
console.log('');
matrix3dService.toString(matrix3dService.minus(m3, m4));
console.log('');
matrix3dService.toString(matrix3dService.byScalar(m3, 2));
console.log('');
matrix3dService.toString(matrix3dService.multiplication(m3, m4));
console.log('');
matrix3dService.toString(matrix3dService.minor(m3));
console.log('');
matrix3dService.toString(matrix3dService.cofactor(m3));
console.log('');
matrix3dService.toString(matrix3dService.adjoint(m3));
console.log('');
matrix3dService.toString(matrix3dService.transpose(m3));
console.log('');
console.log(matrix3dService.determinant(m3));
console.log('');
matrix3dService.toString(matrix3dService.inverse(m3));





