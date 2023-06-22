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

    it('should return the characteristic polynomial', function () {
        spyOn(console, 'log');
        let m2: Matrix2d = {a11: 2, a12: 2, a21: -2, a22: -2}
        m2dService.chaPolynomial(m2);
        expect(console.log).toHaveBeenCalledWith('λ² + 0λ + 0');
        let m3: Matrix2d = {a11: 2, a12: 3, a21: -2, a22: -2}
        m2dService.chaPolynomial(m3);
        expect(console.log).toHaveBeenCalledWith('λ² + 0λ + 2');
        let m4: Matrix2d = {a11: 2, a12: -3, a21: -2, a22: -2}
        m2dService.chaPolynomial(m4);
        expect(console.log).toHaveBeenCalledWith('λ² + 0λ - 10');
        let m5: Matrix2d = {a11: 1, a12: 1, a21: 2, a22: 2}
        m2dService.chaPolynomial(m5);
        expect(console.log).toHaveBeenCalledWith('λ² - 3λ + 0');
        let m6: Matrix2d = {a11: 2, a12: 1, a21: 1, a22: 3}
        m2dService.chaPolynomial(m6);
        expect(console.log).toHaveBeenCalledWith('λ² - 5λ + 5');
        m2dService.chaPolynomial(m1);
        expect(console.log).toHaveBeenCalledWith('λ² - 5λ - 2');
        let m7: Matrix2d = {a11: 1, a12: -1, a21: 3, a22: -3}
        m2dService.chaPolynomial(m7);
        expect(console.log).toHaveBeenCalledWith('λ² + 2λ + 0');
        let m8: Matrix2d = {a11: 1, a12: -1, a21: 5, a22: -3}
        m2dService.chaPolynomial(m8);
        expect(console.log).toHaveBeenCalledWith('λ² + 2λ + 2');
        let m9: Matrix2d = {a11: 1, a12: 2, a21: 2, a22: -3}
        m2dService.chaPolynomial(m9);
        expect(console.log).toHaveBeenCalledWith('λ² + 2λ - 7');
    })

    it('should return an array with the eigenvalues', function () {
        let r: number[] = m2dService.eigenvalue(m1)
        let m2: Matrix2d = {a11: 1, a12: 2, a21: 1, a22: 2};
        expect(r[0]).toBeCloseTo(5.37228, 4);
        expect(r[1]).toBeCloseTo(-0.37228, 4);
        expect(m2dService.eigenvalue(m2)).toEqual([3, 0]);
    })

    it('should return an array with the eigenvectors', function () {
        let r: Vector2d[] = m2dService.eigenvector(m1)
        let m2: Matrix2d = {a11: 1, a12: 2, a21: 1, a22: 2};
        expect(r[0].x).toBeCloseTo(0.45742, 4);
        expect(r[0].y).toBe(1);
        expect(r[1].x).toBeCloseTo(-1.45742, 4);
        expect(r[1].y).toBe(1);
        expect(m2dService.eigenvector(m2)).toEqual([{x: 1, y: 1}, {x: -2, y: 1}]);
    })

    it('should return the transition matrix', function () {
        let mt: Matrix2d = m2dService.transition(m1, m2);
        expect(mt.a11).toBeCloseTo(0.75, 4);
        expect(mt.a12).toBeCloseTo(0.25, 4);
        expect(mt.a21).toBeCloseTo(-0.25, 4);
        expect(mt.a22).toBeCloseTo(0.25, 4);
    })

    it('should return the Reduced Row Echelon Form matrix', function () {
        let m2: Matrix2d = {a11: 1, a12: 2, a21: 1, a22: 2};
        expect(m2dService.rreForm(m1)).toEqual(m2dService.idMx);
        expect(m2dService.rreForm(m2)).toEqual({a11: 1, a12: 2, a21: 0, a22: 0});
    })

    it('should return the LU Decomposition Matrix (Lower and Upper)', function () {
        let m: Matrix2d[] = m2dService.luDecomposition(m1);
        expect(m[0]).toEqual({a11: 1, a12: 0, a21: 3, a22: 1});
        expect(m[1]).toEqual({a11: 1, a12: 2, a21: 0, a22: -2});
    })

    it('should return the Diagonalize Matrix (Matrix P and Matrix D)', function () {
        let m: Matrix2d[] = m2dService.diagonalize(m1);
        //MP
        expect(m[0].a11).toBeCloseTo(0.45742, 4);
        expect(m[0].a12).toBeCloseTo(-1.45742, 4);
        expect(m[0].a21).toBe(1);
        expect(m[0].a22).toBe(1);
        //MD
        expect(m[1].a11).toBeCloseTo(5.37228, 4);
        expect(m[1].a12).toBe(0);
        expect(m[1].a21).toBe(0);
        expect(m[1].a22).toBeCloseTo(-0.37228, 4);
    })

    it('should return the QR Factorization Matrix (Matrix Q and Matrix R)', function () {
        let m: Matrix2d[] = m2dService.qrFactorization(m1);
        //MQ
        expect(m[0].a11).toBeCloseTo(0.31622, 4);
        expect(m[0].a12).toBeCloseTo(0.94868, 4);
        expect(m[0].a21).toBeCloseTo(0.94868, 4);
        expect(m[0].a22).toBeCloseTo(-0.31622, 4);
        //MR
        expect(m[1].a11).toBeCloseTo(3.16227, 4);
        expect(m[1].a12).toBeCloseTo(4.42718, 4);
        expect(m[1].a21).toBeCloseTo(0, 4);
        expect(m[1].a22).toBeCloseTo(0.63245, 4);
    })

    it('should return the SVD Decomposition Matrix (Matrix U, Matrix S and Matrix V', function () {
        let m: Matrix2d[] = m2dService.svdDec(m1);
        //MU
        expect(m[0].a11).toBeCloseTo(0.40455, 4);
        expect(m[0].a12).toBeCloseTo(-0.91451, 4);
        expect(m[0].a21).toBeCloseTo(0.91451, 4);
        expect(m[0].a22).toBeCloseTo(0.40455, 4);
        //MS
        expect(m[1].a11).toBeCloseTo(5.46498, 4);
        expect(m[1].a12).toBe(0);
        expect(m[1].a21).toBe(0);
        expect(m[1].a22).toBeCloseTo(0.36596, 4);
        //MV
        expect(m[2].a11).toBeCloseTo(0.57604, 4);
        expect(m[2].a12).toBeCloseTo(0.81741, 4);
        expect(m[2].a21).toBeCloseTo(0.81741, 4);
        expect(m[2].a22).toBeCloseTo(-0.57604, 4);
    })

    //Utils
    it('should return the information of the Matrix as a console.log string', function () {
        spyOn(console, 'log');
        m2dService.toString(m1);
        expect(console.log).toHaveBeenCalledWith('1 2');
        expect(console.log).toHaveBeenCalledWith('3 4');
        expect(console.log).toHaveBeenCalledWith('');
    })
})