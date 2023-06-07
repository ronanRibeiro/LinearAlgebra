import { Matrix2d } from "./models/matrix2d.js";
import { Matrix3d } from "./models/matrix3d.js";
import { Vector2d } from "./models/vector2d.js";
import { Vector3d } from "./models/vector3d.js";
import { Matrix2dService } from "./services/matrix2d.Service.js";
import { Matrix3dService } from "./services/matrix3d.Service.js";
import { Vector2dService } from "./services/vector2d.Service.js";
import { Vector3dService } from "./services/vector3d.Service.js";

let vector2dService = new Vector2dService();
let v1: Vector2d = {x: 1, y: 2};
let v2: Vector2d = {x: 3, y: 4};

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

let vector3dService = new Vector3dService();
let v3: Vector3d = {x: 1, y: 4, z: 3};
let v4: Vector3d = {x: 2, y: 5, z: 2};

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


//------------------------------------------------------------------------------------

/*
//Matrix 2x2
let matrix2dService = new Matrix2dService();
let m1: Matrix2d = {a11: 5, a12: 3, a21: 1, a22: 3};
let m2: Matrix2d = {a11: 2, a12: 3, a21: 5, a22: 6};

//Tests
console.log('Methods tests of a Matrix 2x2');
console.log('Satandard Matrices:');
console.log('Null Matrix:');
matrix2dService.toString(matrix2dService.nullMx);
console.log('Identity Matrix:');
matrix2dService.toString(matrix2dService.idMx);
console.log('Test Matrix 1:');
matrix2dService.toString(m1);
console.log('Test Matrix 2:');
matrix2dService.toString(m2);
console.log('-------------------------------');
console.log('Rows of Test Matrix 1:');
matrix2dService.getRow(m1).forEach(vector2dService.toString)
console.log('Columns of Test Matrix 1:');
matrix2dService.getCol(m1).forEach(vector2dService.toString)
console.log('-------------------------------');
console.log('Basic Operations:');
console.log('Sum:');
matrix2dService.toString(matrix2dService.add(m1, m2));
console.log('Subtraction:');
matrix2dService.toString(matrix2dService.minus(m1, m2));
console.log('Multiplication by Scalar(2):');
matrix2dService.toString(matrix2dService.byScalar(m1, 2));
console.log('Multiplication:');
matrix2dService.toString(matrix2dService.multiplication(m1, m2));
console.log('Division:');
matrix2dService.toString(matrix2dService.division(m1, m2));
console.log('Power (2):');
matrix2dService.toString(matrix2dService.power(m1, 2));
console.log('Exponential:');
matrix2dService.toString(matrix2dService.exponential(m1));
console.log('-------------------------------');
console.log('Other Operations:');
console.log('Minor:');
matrix2dService.toString(matrix2dService.minor(m1));
console.log('Cofactor:');
matrix2dService.toString(matrix2dService.cofactor(m1));
console.log('Transpose:');
matrix2dService.toString(matrix2dService.transpose(m1));
console.log('Adjoint:');
matrix2dService.toString(matrix2dService.adjoint(m1));
console.log('Determinant:');
console.log(matrix2dService.determinant(m1));
console.log('')
console.log('Inverse:');
matrix2dService.toString(matrix2dService.inverse(m1));
console.log('Pseudoinverse:');
matrix2dService.toString(matrix2dService.pseudoinverse(m1));
console.log('Trace:');
console.log(matrix2dService.trace(m1));
console.log('')
console.log('Rank:');
console.log(matrix2dService.rank(m1));
console.log('-------------------------------');
console.log('Vector Operations:');
console.log('Vector Example:');
vector2dService.toString(v1);
console.log('Multiplication Matrix by Vector:');
vector2dService.toString(matrix2dService.byVector(m1,v1));
console.log('-------------------------------');
console.log('Spaces:');
//console.log('Row Spaces:');
//console.log('Column Spaces:');
console.log('Null Spaces:');
vector2dService.toString(matrix2dService.nullSpace(m1));
console.log('-------------------------------');
console.log('Eigenvalues and Eigenvectors:');
console.log('Polynomal Characteristc:');
matrix2dService.chaPoly(m1);
console.log('Eigenvalues:');
let n1: number[] = matrix2dService.eigenvalue(m1);
console.log(n1[0] + ' ' + n1[1]);
console.log('Eigenvectors:');
matrix2dService.eigenvector(m1).forEach(vector2dService.toString);
console.log('-------------------------------');
console.log('Transformations:');
console.log('Transition:');
matrix2dService.toString(matrix2dService.transition(m1,m2));
console.log('Reduced Row Echelon Form:');
matrix2dService.toString(matrix2dService.rreForm(m1));
console.log('LU decomposition:');
matrix2dService.luDecomposition(m1).forEach(matrix2dService.toString);
console.log('Diagonalize:');
matrix2dService.diagonalize(m1).forEach(matrix2dService.toString);
console.log('QR Factorization:');
matrix2dService.qrFactorization(m1).forEach(matrix2dService.toString);
console.log('SVD Decomposition:');
matrix2dService.svdDec(m1).forEach(matrix2dService.toString);

*/


//------------------------------------------------------------------------------------
let matrix3dService = Matrix3dService.instance();
let m3: Matrix3d = {
    a11: 1, a12: 2, a13: -3,
    a21: 4, a22: 5, a23: 6,
    a31: 7, a32: -8, a33: 9
};
let m4: Matrix3d = {
    a11: 2, a12: 4, a13: 7,
    a21: 2, a22: 8, a23: 4,
    a31: 3, a32: 5, a33: 2
};

/*
//Tests
console.log('Methods tests of a Matrix 3x3');
console.log('Satandard Matrices:');
console.log('Null Matrix:');
matrix3dService.toString(matrix3dService.nullMx);
console.log('Identity Matrix:');
matrix3dService.toString(matrix3dService.idMx);
console.log('Test Matrix 1:');
matrix3dService.toString(m3);
console.log('Test Matrix 2:');
matrix3dService.toString(m4);
console.log('-------------------------------');
console.log('Rows of Test Matrix 1:');
matrix3dService.getRow(m3).forEach(vector3dService.toString)
console.log('Columns of Test Matrix 1:');
matrix3dService.getCol(m3).forEach(vector3dService.toString)
console.log('-------------------------------');
console.log('Basic Operations:');
console.log('Sum:');
matrix3dService.toString(matrix3dService.add(m3, m4));
console.log('Subtraction:');
matrix3dService.toString(matrix3dService.minus(m3, m4));
console.log('Multiplication by Scalar(2):');
matrix3dService.toString(matrix3dService.byScalar(m3, 2));
console.log('Multiplication:');
matrix3dService.toString(matrix3dService.multiplication(m3, m4));
console.log('Division:');
//matrix3dService.toString(matrix3dService.division(m3, m4));
console.log('Power (2):');
matrix3dService.toString(matrix3dService.power(m3, 2));
console.log('Exponential:');
//matrix3dService.toString(matrix3dService.exponential(m3));
console.log('-------------------------------');
console.log('Other Operations:');
console.log('Minor:');
matrix3dService.toString(matrix3dService.minor(m3));
console.log('Cofactor:');
matrix3dService.toString(matrix3dService.cofactor(m3));
console.log('Transpose:');
matrix3dService.toString(matrix3dService.transpose(m3));
console.log('Adjoint:');
matrix3dService.toString(matrix3dService.adjoint(m3));
console.log('Determinant:');
console.log(matrix3dService.determinant(m3));
console.log('')
console.log('Inverse:');
matrix3dService.toString(matrix3dService.inverse(m3));
console.log('Pseudoinverse:');
matrix3dService.toString(matrix3dService.pseudoinverse(m3));
console.log('Trace:');
console.log(matrix3dService.trace(m3));
console.log('')
console.log('Rank:');
//console.log(matrix3dService.rank(m3));
console.log('-------------------------------');
console.log('Vector Operations:');
console.log('Vector Example:');
vector3dService.toString(v3);
console.log('Multiplication Matrix by Vector:');
vector3dService.toString(matrix3dService.byVector(m3,v3));
console.log('-------------------------------');
console.log('Spaces:');
//console.log('Row Spaces:');
//console.log('Column Spaces:');
console.log('Null Spaces:');
//vector3dService.toString(matrix3dService.nullSpace(m3));
console.log('-------------------------------');
console.log('Eigenvalues and Eigenvectors:');
console.log('Polynomal Characteristc:');
matrix3dService.chaPoly(m3);
console.log('Eigenvalues:');
let n2: number[] = matrix3dService.eigenvalue(m3);
console.log(n2[0] + ' ' + n2[1]);
console.log('Eigenvectors:');
//matrix3dService.eigenvector(m3).forEach(vector3dService.toString);
console.log('-------------------------------');
console.log('Transformations:');
console.log('Transition:');
matrix3dService.toString(matrix3dService.transition(m3,m4));
console.log('Reduced Row Echelon Form:');
matrix3dService.toString(matrix3dService.rreForm(m3));
console.log('LU decomposition:');
matrix3dService.luDecomposition(m3).forEach(matrix3dService.toString);
console.log('Diagonalize:');
matrix3dService.diagonalize(m3).forEach(matrix3dService.toString);
console.log('QR Factorization:');
matrix3dService.qrFactorization(m3).forEach(matrix3dService.toString);
console.log('SVD Decomposition:');
matrix3dService.svdDec(m3).forEach(matrix3dService.toString);
*/
console.log(1)
console.log(matrix3dService.eigenvalue(m3));