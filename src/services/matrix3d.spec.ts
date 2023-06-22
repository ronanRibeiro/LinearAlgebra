import { Matrix3d } from "src/models/matrix3d";
import { Matrix3dService } from "./matrix3d.Service";
import { Vector3d } from "src/models/vector3d";
import { Vector3dService } from "./vector3d.Service";

describe('matrix3d.Service.ts', function () {
    let m3dService: Matrix3dService;
    let v3dService: Vector3dService;

    let m1: Matrix3d = {
        a11: 1, a12: 2, a13: 3,
            a21: 4, a22: 5, a23: 6,
            a31: 7, a32: 8, a33: 9
    };

    let m2: Matrix3d = {
        a11: 1, a12: -2, a13: 3,
        a21: -5, a22: 3, a23: 1,
        a31: 7, a32: -7, a33: 2
    };

    let m3: Matrix3d = {
        a11: 2, a12: 3, a13: -4,
        a21: 4, a22: 2, a23: 2,
        a31: 6, a32: 3, a33: 1
    };

    beforeEach(function () {
        m3dService = Matrix3dService.instance();
        v3dService = Vector3dService.instance();
    })

    it('should return rows of the matrix as an array of vectors', function () {
        expect(m3dService.getRow(m1)).toEqual([{x: 1, y: 2, z: 3}, {x: 4, y: 5, z: 6}, {x: 7, y: 8, z: 9}]);
        expect(m3dService.getRow(m2)).toEqual([{x: 1, y: -2, z: 3}, {x: -5, y: 3, z: 1}, {x: 7, y: -7, z: 2}]);
    })

    it('should return cols of the matrix as an array of vectors', function () {
        expect(m3dService.getCol(m1)).toEqual([{x: 1, y: 4, z: 7}, {x: 2, y: 5, z: 8}, {x: 3, y: 6, z: 9}]);
        expect(m3dService.getCol(m2)).toEqual([{x: 1, y: -5, z: 7}, {x: -2, y: 3, z: -7}, {x: 3, y: 1, z: 2}]);
    })

    it('should return the sum of the matrices', function () {
        expect(m3dService.add(m1,m2)).toEqual({
            a11: 2, a12: 0, a13: 6,
            a21: -1, a22: 8, a23: 7,
            a31: 14, a32: 1, a33: 11
        });
    })

    it('should return the subtraction of the matrices', function () {
        expect(m3dService.minus(m1,m2)).toEqual({
            a11: 0, a12: 4, a13: 0,
            a21: 9, a22: 2, a23: 5,
            a31: 0, a32: 15, a33: 7
        });
    })

    it('should return the multiplication of the a matrix by a sclar', function () {
        expect(m3dService.byScalar(m1,3)).toEqual({
            a11: 3, a12: 6, a13: 9,
            a21: 12, a22: 15, a23: 18,
            a31: 21, a32: 24, a33: 27
        });        
    })

    it('should return the multiplication of the a matrix by other', function () {
        expect(m3dService.multiplication(m1,m2)).toEqual({
            a11: 12, a12: -17, a13: 11,
            a21: 21, a22: -35, a23: 29,
            a31: 30, a32: -53, a33: 47
        });  
    })

    it('should return the division of the a matrix by other', function () {    
        expect(m3dService.division(m1,m3)).toEqual({
            a11: 0.75, a12: 4.5625, a13: -3.125,
            a21: 1.5, a22: 8.875, a23: -5.75,
            a31: 2.25, a32: 13.1875, a33: -8.375
        });  
    })

    it('should return the power of the a matrix by a coefficient', function () {
        expect(m3dService.power(m1,0)).toEqual({
            a11: 1, a12: 0, a13: 0,
            a21: 0, a22: 1, a23: 0,
            a31: 0, a32: 0, a33: 1
        });
        expect(m3dService.power(m1,1)).toEqual({
            a11: 1, a12: 2, a13: 3,
            a21: 4, a22: 5, a23: 6,
            a31: 7, a32: 8, a33: 9
        }); 
        expect(m3dService.power(m1,2)).toEqual({
            a11: 30, a12: 36, a13: 42,
            a21: 66, a22: 81, a23: 96,
            a31: 102, a32: 126, a33: 150
        }); 
    })

    it('should return the exponential of a matrix', function () {
        let m3: Matrix3d = m3dService.exponential(m1);
        expect(m3.a11).toBeCloseTo(1118906.69941, 4);
        expect(m3.a12).toBeCloseTo(1374815.06293, 4);
        expect(m3.a13).toBeCloseTo(1630724.42645, 4);
        expect(m3.a21).toBeCloseTo(2533881.04189, 4);
        expect(m3.a22).toBeCloseTo(3113415.03138, 4);
        expect(m3.a23).toBeCloseTo(3692947.02086, 4);
        expect(m3.a31).toBeCloseTo(3948856.38438, 4);
        expect(m3.a32).toBeCloseTo(4852012.99982, 4);
        expect(m3.a33).toBeCloseTo(5755170.61526, 4);
    })

    it('should return minor matrix', function () {
        expect(m3dService.minor(m1)).toEqual({
            a11: -3, a12: -6, a13: -3,
            a21: -6, a22: -12, a23: -6,
            a31: -3, a32: -6, a33: -3
        });
    })

    it('should return the cofactor matrix', function () {
        expect(m3dService.cofactor(m1)).toEqual({
            a11: -3, a12: 6, a13: -3,
            a21: 6, a22: -12, a23: 6,
            a31: -3, a32: 6, a33: -3
        });
    })

    it('should return the transpose matrix', function () {
        expect(m3dService.transpose(m1)).toEqual({
            a11: 1, a12: 4, a13: 7,
            a21: 2, a22: 5, a23: 8,
            a31: 3, a32: 6, a33: 9
        });
    })

    it('should return the adjoint matrix', function () {
        expect(m3dService.adjoint(m1)).toEqual({
            a11: -3, a12: 6, a13: -3,
            a21: 6, a22: -12, a23: 6,
            a31: -3, a32: 6, a33: -3
        });
    })

    it('should return the determinant of a matrix', function () {
        expect(m3dService.determinant(m1)).toBe(0);
        expect(m3dService.determinant(m2)).toBe(21);
        expect(m3dService.determinant(m3)).toBe(16);
    })

    it('should return the inverse matrix', function () {
        expect(m3dService.inverse(m3)).toEqual({
            a11: -0.25, a12: -0.9375, a13: 0.875,
            a21: 0.5, a22: 1.625, a23: -1.25,
            a31: 0, a32: 0.75, a33: -0.5
        });        
    })

    it('should return the pseudoinverse matrix', function () {
        expect(m3dService.pseudoinverse(m3)).toEqual({
            a11: -0.25, a12: -0.9375, a13: 0.875,
            a21: 0.5, a22: 1.625, a23: -1.25,
            a31: 0, a32: 0.75, a33: -0.5
        }); 
    })

    it('should return the trace of a matrix', function () {
        expect(m3dService.trace(m1)).toBe(15);
        expect(m3dService.trace(m2)).toBe(6);
        expect(m3dService.trace(m3)).toBe(5);
    })

    it('should return the rank of a matrix', function () {
        expect(m3dService.rank(m1)).toBe(2);
        expect(m3dService.rank(m2)).toBe(3);
        expect(m3dService.rank(m3)).toBe(3);        
    })

    it('should return the solution of a linear system', function () {
        let v: Vector3d = {x: 2, y: 3, z: 4 }
        let m: Matrix3d  = {
            a11: 1, a12: 3, a13: -4,
            a21: 2, a22: 2, a23: 5,
            a31: 3, a32: 1, a33: 3
        }
        expect(m3dService.systemEquation(m,v)).toEqual([5/4, 1/4, 0]);    
    })

    it('should return the multiplication of the a matrix by a vector', function () {
        let v: Vector3d = {x: 2, y: -3, z: 0};
        expect(m3dService.productByVector(m1, v)).toEqual({x: -4, y: -7, z: -10});
        expect(m3dService.productByVector(m2, v)).toEqual({x: 8, y: -19, z: 35});
        expect(m3dService.productByVector(m3, v)).toEqual({x: -5, y: 2, z: 3});
    })

    it('should return the null space of a matrix', function () {
        expect(m3dService.nullSpace(m1)).toEqual({x: 1, y: -2, z: 1});
        expect(m3dService.nullSpace(m2)).toEqual({x: 0, y: 0, z: 0});
    })

    it('should return the characteristic polynomial', function () {
        spyOn(console, 'log');
        m3dService.chaPoly(m1);
        expect(console.log).toHaveBeenCalledWith('-λ³ + 15λ² + 18λ + 0');
        m3dService.chaPoly(m2);
        expect(console.log).toHaveBeenCalledWith('-λ³ + 6λ² + 13λ + 21');
        m3dService.chaPoly(m3);
        expect(console.log).toHaveBeenCalledWith('-λ³ + 5λ² - 14λ + 16');
    })

    it('should return an array with the eigenvalues', function () {
        let e: number[] = m3dService.eigenvalue(m1)
        expect(e[0]).toBeCloseTo(-1.11684, 4);
        expect(e[1]).toBeCloseTo(16.11684, 4);
        expect(e[2]).toBeCloseTo(0, 4);
    })

    it('should return an array with the eigenvectors', function () {
        let e: Vector3d[] = m3dService.eigenvector(m1)
        let n: number[] = m3dService.eigenvalue(m1);

        expect(e[0].x).toBeCloseTo(-1.28334, 4);
        expect(e[0].y).toBeCloseTo(-0.14167, 4);
        expect(e[0].z).toBeCloseTo(1, 4);
        expect(e[1].x).toBeCloseTo(0.28334, 4);
        expect(e[1].y).toBeCloseTo(0.64167, 4);
        expect(e[1].z).toBeCloseTo(1, 4);
        expect(e[2].x).toBeCloseTo(1, 4);
        expect(e[2].y).toBeCloseTo(-2, 4);
        expect(e[2].z).toBeCloseTo(1, 4);
    })

    it('should return the transition matrix', function () {
        expect(m3dService.transition(m1,m3)).toEqual({
            a11: 2.125, a12: 1.8125, a13: 1.5,
            a21: -1.75, a22: -0.875, a23: 0,
            a31: -0.5, a32: -0.25, a33: 0
        }); 
    })

    it('should return the Reduced Row Echelon Form matrix', function () {
        expect(m3dService.rreForm(m1)).toEqual({
            a11: 1, a12: 0, a13: -1,
            a21: 0, a22: 1, a23: 2,
            a31: 0, a32: 0, a33: 0
        });
        expect(m3dService.rreForm(m2)).toEqual({
            a11: 1, a12: 0, a13: 0,
            a21: 0, a22: 1, a23: 0,
            a31: 0, a32: 0, a33: 1
        });
    })

    it('should return the LU Decomposition Matrix (Lower and Upper)', function () {
        let m: Matrix3d[] = m3dService.luDecomposition(m1)
        //ML
        expect(m[0]).toEqual({
            a11: 1, a12: 0, a13: 0,
            a21: 4, a22: 1, a23: 0,
            a31: 7, a32: 2, a33: 1
        });
        //MU
        expect(m[1]).toEqual({
            a11: 1, a12: 2, a13: 3,
            a21: 0, a22: -3, a23: -6,
            a31: 0, a32: 0, a33: 0
        });
    })

    it('should return the Diagonalize Matrix (Matrix P and Matrix D)', function () {
        let x: Matrix3d[] = m3dService.diagonalize(m1)

        //MP
        expect(x[0].a11).toBeCloseTo(-1.28334, 4);
        expect(x[0].a12).toBeCloseTo(0.28334, 4);
        expect(x[0].a13).toBeCloseTo(1, 4);
        expect(x[0].a21).toBeCloseTo(-0.14167, 4);
        expect(x[0].a22).toBeCloseTo(0.64167, 4);
        expect(x[0].a23).toBeCloseTo(-2, 4);
        expect(x[0].a31).toBeCloseTo(1, 4);
        expect(x[0].a32).toBeCloseTo(1, 4);
        expect(x[0].a33).toBeCloseTo(1, 4);
        //MD
        expect(x[1].a11).toBeCloseTo(-1.11684, 4);
        expect(x[1].a12).toBeCloseTo(0, 4);
        expect(x[1].a13).toBeCloseTo(0, 4);
        expect(x[1].a21).toBeCloseTo(0, 4);
        expect(x[1].a22).toBeCloseTo(16.11684, 4);
        expect(x[1].a23).toBeCloseTo(0, 4);
        expect(x[1].a31).toBeCloseTo(0, 4);
        expect(x[1].a32).toBeCloseTo(0, 4);
        expect(x[1].a33).toBeCloseTo(0, 4);
    })

    it('should return the QR Factorization Matrix (Matrix Q and Matrix R)', function () {
        let m: Matrix3d[] = m3dService.qrFactorization(m1)

        //MQ
        expect(m[0].a11).toBeCloseTo(0.12309, 4);
        expect(m[0].a12).toBeCloseTo(0.90453, 4);
        expect(m[0].a13).toBeCloseTo(0.40824, 4);
        expect(m[0].a21).toBeCloseTo(0.49236, 4);
        expect(m[0].a22).toBeCloseTo(0.30151, 4);
        expect(m[0].a23).toBeCloseTo(-0.81649, 4);
        expect(m[0].a31).toBeCloseTo(0.86164, 4);
        expect(m[0].a32).toBeCloseTo(-0.30151, 4);
        expect(m[0].a33).toBeCloseTo(0.40824, 4);
        //MR
        expect(m[1].a11).toBeCloseTo(8.12403, 4);
        expect(m[1].a12).toBeCloseTo(9.60113, 4);
        expect(m[1].a13).toBeCloseTo(11.07823, 4);
        expect(m[1].a21).toBeCloseTo(0, 4);
        expect(m[1].a22).toBeCloseTo(0.90453, 4);
        expect(m[1].a23).toBeCloseTo(1.80906, 4);
        expect(m[1].a31).toBeCloseTo(0, 4);
        expect(m[1].a32).toBeCloseTo(0, 4);
        expect(m[1].a33).toBeCloseTo(0, 4);
    })

    it('should return the SVD Decomposition Matrix (Matrix U, Matrix S and Matrix V)', function () {
        let m: Matrix3d[] = m3dService.svdDec(m1)
        //MU
        expect(m[0].a11).toBeCloseTo(-0.88723, 4);
        expect(m[0].a12).toBeCloseTo(0.21483, 4);
        expect(m[0].a13).toBeCloseTo(0.40824, 4);
        expect(m[0].a21).toBeCloseTo(-0.24964, 4);
        expect(m[0].a22).toBeCloseTo(0.52058, 4);
        expect(m[0].a23).toBeCloseTo(-0.81649, 4);
        expect(m[0].a31).toBeCloseTo(0.38794, 4);
        expect(m[0].a32).toBeCloseTo(0.82633, 4);
        expect(m[0].a33).toBeCloseTo(0.40824, 4);
        //MS
        expect(m[1].a11).toBeCloseTo(1.06836, 4);
        expect(m[1].a12).toBeCloseTo(0, 4);
        expect(m[1].a13).toBeCloseTo(0, 4);
        expect(m[1].a21).toBeCloseTo(0, 4);
        expect(m[1].a22).toBeCloseTo(16.84810, 4);
        expect(m[1].a23).toBeCloseTo(0, 4);
        expect(m[1].a31).toBeCloseTo(0, 4);
        expect(m[1].a32).toBeCloseTo(0, 4);
        expect(m[1].a33).toBeCloseTo(0, 4);
        //MV
        expect(m[2].a11).toBeCloseTo(0.77669, 4);
        expect(m[2].a12).toBeCloseTo(0.47967, 4);
        expect(m[2].a13).toBeCloseTo(0.40824, 4);
        expect(m[2].a21).toBeCloseTo(0.07568, 4);
        expect(m[2].a22).toBeCloseTo(0.57236, 4);
        expect(m[2].a23).toBeCloseTo(-0.81649, 4);
        expect(m[2].a31).toBeCloseTo(-0.62531, 4);
        expect(m[2].a32).toBeCloseTo(0.66506, 4);
        expect(m[2].a33).toBeCloseTo(0.40824, 4);
    })

    //Utils
    it('should return the information of the Matrix as a console.log string', function () {
        spyOn(console, 'log');
        m3dService.toString(m1);
        expect(console.log).toHaveBeenCalledWith('1 2 3');
        expect(console.log).toHaveBeenCalledWith('4 5 6');
        expect(console.log).toHaveBeenCalledWith('7 8 9');
        expect(console.log).toHaveBeenCalledWith('');
    })

})