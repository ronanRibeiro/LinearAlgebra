import { Matrix2d } from "src/models/matrix2d";
import { Matrix2dService } from "./matrix2d.Service";
import { Vector2d } from "src/models/vector2d";

describe('matrix2d.Service.ts', function () {
    let m2dService: Matrix2dService;

    let m1: Matrix2d = {a11: 1, a12: 2, a21: 3, a22: 4};
    let m2: Matrix2d = {a11: 3, a12: 5, a21: 7, a22: 9};

    beforeEach(function () {
        m2dService = Matrix2dService.instance();
    })

    it('should return rows of the matrix as an array of vectors', function () {
        expect(m2dService.getRow(m1)).toEqual([{x: 1, y: 2}, {x: 3, y: 4}]);
        expect(m2dService.getRow(m2)).toEqual([{x: 3, y: 5}, {x: 7, y: 9}]);
    })

    it('should return cols of the matrix as an array of vectors', function () {
        expect(m2dService.getCol(m1)).toEqual([{x: 1, y: 3}, {x: 2, y: 4}]);
        expect(m2dService.getCol(m2)).toEqual([{x: 3, y: 7}, {x: 5, y: 9}]);
    })

    it('should return the sum of the matrices', function () {
        expect(m2dService.add(m1, m2)).toEqual({a11: 4, a12: 7, a21: 10, a22: 13});
    })

    it('should return the subtraction of the matrices', function () {
        expect(m2dService.minus(m1, m2)).toEqual({a11: -2, a12: -3, a21: -4, a22: -5});
    })

    it('should return the multiplication of the a matrix by a sclar', function () {
        expect(m2dService.byScalar(m1, 3)).toEqual({a11: 3, a12: 6, a21: 9, a22: 12});
    })

    it('should return the multiplication of the a matrix by other', function () {
        expect(m2dService.multiplication(m1, m2)).toEqual({a11: 17, a12: 23, a21: 37, a22: 51});
    })

    it('should return the division of the a matrix by other', function () {
        //The same as multiply by the inverse
        expect(m2dService.division(m1, m2)).toEqual({a11: 0.625, a12: -0.125, a21: 0.125, a22: 0.375});
    })

    it('should return the power of the a matrix by a coefficient', function () {
        expect(m2dService.power(m1, 0)).toEqual({a11: 1, a12: 0, a21: 0, a22: 1});
        expect(m2dService.power(m1, 1)).toEqual({a11: 1, a12: 2, a21: 3, a22: 4});
        expect(m2dService.power(m1, 2)).toEqual({a11: 7, a12: 10, a21: 15, a22: 22});
        expect(m2dService.power(m1, 3)).toEqual({a11: 37, a12: 54, a21: 81, a22: 118});
    })

    it('should return the exponential of a matrix', function () {
        let m: Matrix2d = m2dService.exponential(m1);
        expect(m.a11).toBeCloseTo(51.96895, 4);
        expect(m.a12).toBeCloseTo(74.73656, 4);
        expect(m.a21).toBeCloseTo(112.10484, 4);
        expect(m.a22).toBeCloseTo(164.07380, 4);
    })

    it('should return minor matrix', function () {
        expect(m2dService.minor(m1)).toEqual({a11: 4, a12: 3, a21: 2, a22: 1});
    })

    it('should return the cofactor matrix', function () {
        expect(m2dService.cofactor(m1)).toEqual({a11: 4, a12: -3, a21: -2, a22: 1});
    })

    it('should return the transpose matrix', function () {
        expect(m2dService.transpose(m1)).toEqual({a11: 1, a12: 3, a21: 2, a22: 4});
    })

    it('should return the adjoint matrix', function () {
        expect(m2dService.adjoint(m1)).toEqual({a11: 4, a12: -2, a21: -3, a22: 1});
    })

    it('should return the determinant of a matrix', function () {
        expect(m2dService.determinant(m1)).toBe(-2);
    })

    it('should return the inverse matrix', function () {
        let m2: Matrix2d = {a11: 2, a12: 4, a21: 1, a22: 2}
        expect(m2dService.inverse(m1)).toEqual({a11: -2, a12: 1, a21: 1.5, a22: -0.5});
        expect(function() { m2dService.inverse(m2) }).toThrowError();
    })

    it('should return the pseudoinverse matrix', function () {
        expect(m2dService.inverse(m1)).toEqual({a11: -2, a12: 1, a21: 1.5, a22: -0.5});
    })

    it('should return the trace of a matrix', function () {
        expect(m2dService.trace(m1)).toBe(5);
    })

    it('should return the rank of a matrix', function () {
        let m2: Matrix2d = {a11: 2, a12: 4, a21: 1, a22: 2}
        expect(m2dService.rank(m1)).toBe(2);
        expect(m2dService.rank(m2)).toBe(1);
    })

    it('should return the multiplication of the a matrix by a vector', function () {
        let v: Vector2d = {x:2, y:3}
        expect(m2dService.byVector(m1, v)).toEqual({x: 8, y: 18});
    })

    it('should return the null space of a matrix', function () {
        let m2: Matrix2d = {a11: 1, a12: 2, a21: 1, a22: 2}
        expect(m2dService.nullSpace(m1)).toEqual({x: 0, y: 0});
        expect(m2dService.nullSpace(m2)).toEqual({x: -2, y: 1});
    })

})

/*
    nullSpace(m0: Matrix2d): Vector2d
    chaPoly(m0: Matrix2d): void
    eigenvalue(m0: Matrix2d): number[]
    eigenvector(m0: Matrix2d): Vector2d[]
    transition(m0: Matrix2d, m1: Matrix2d): Matrix2d
    rreForm(m0: Matrix2d): Matrix2d
    luDecomposition(m0: Matrix2d): Matrix2d[]
    diagonalize(m0: Matrix2d): Matrix2d[]
    qrFactorization(m0: Matrix2d): Matrix2d[]
    svdDec(m0: Matrix2d): Matrix2d[]

*/