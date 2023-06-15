import { Matrix3d } from "../models/matrix3d.js";
import { Vector3d } from "../models/vector3d.js";
import { MathService } from "./math.Service.js";
import { Matrix2dService } from "./matrix2d.Service.js";
import { Vector3dService } from "./vector3d.Service.js";

export class Matrix3dService {

    constructor(
        private matrix2dService: Matrix2dService,
        private vector3dService: Vector3dService,
        private mathService: MathService
    ){}

    static instance() {
        const instance = new Matrix3dService (
            Matrix2dService.instance(),
            Vector3dService.instance(),
            MathService.instance()
        );

        return instance;
    }

    //Standard Matrices
    readonly nullMx: Matrix3d = {
        a11: 0, a12: 0, a13: 0,
        a21: 0, a22: 0, a23: 0,
        a31: 0, a32: 0, a33: 0
    };
    readonly idMx: Matrix3d = {
        a11: 1, a12: 0, a13: 0,
        a21: 0, a22: 1, a23: 0,
        a31: 0, a32: 0, a33: 1
    };

    //Get Rows and Columns
    public getRow(m0: Matrix3d): Vector3d[] {
        return [{ x: m0.a11, y: m0.a12, z: m0.a13 },
        { x: m0.a21, y: m0.a22, z: m0.a23 },
        { x: m0.a31, y: m0.a32, z: m0.a33 },
        ];
    }

    public getCol(m0: Matrix3d): Vector3d[] {
        return [{ x: m0.a11, y: m0.a21, z: m0.a31 },
        { x: m0.a12, y: m0.a22, z: m0.a32 },
        { x: m0.a13, y: m0.a23, z: m0.a33 },
        ];
    }

    //Basic Operations
    public add(m0: Matrix3d, m1: Matrix3d): Matrix3d {
        let m2: Matrix3d = {
            a11: m0.a11 + m1.a11,
            a12: m0.a12 + m1.a12,
            a13: m0.a13 + m1.a13,
            a21: m0.a21 + m1.a21,
            a22: m0.a22 + m1.a22,
            a23: m0.a23 + m1.a23,
            a31: m0.a13 + m1.a13,
            a32: m0.a23 + m1.a23,
            a33: m0.a33 + m1.a33
        }
        return m2;
    }

    public minus(m0: Matrix3d, m1: Matrix3d): Matrix3d {
        let m2: Matrix3d = {
            a11: m0.a11 - m1.a11,
            a12: m0.a12 - m1.a12,
            a13: m0.a13 - m1.a13,
            a21: m0.a21 - m1.a21,
            a22: m0.a22 - m1.a22,
            a23: m0.a23 - m1.a23,
            a31: m0.a13 - m1.a13,
            a32: m0.a23 - m1.a23,
            a33: m0.a33 - m1.a33
        }
        return m2;
    }

    public byScalar(m0: Matrix3d, s: number): Matrix3d {
        let m2: Matrix3d = {
            a11: m0.a11 * s,
            a12: m0.a12 * s,
            a13: m0.a13 * s,
            a21: m0.a21 * s,
            a22: m0.a22 * s,
            a23: m0.a23 * s,
            a31: m0.a31 * s,
            a32: m0.a32 * s,
            a33: m0.a33 * s
        }
        return m2;
    }

    public multiplication(m0: Matrix3d, m1: Matrix3d): Matrix3d {
        let m2: Matrix3d = {
            a11: m0.a11 * m1.a11 + m0.a12 * m1.a21 + m0.a13 * m1.a31,
            a12: m0.a11 * m1.a12 + m0.a12 * m1.a22 + m0.a13 * m1.a32,
            a13: m0.a11 * m1.a13 + m0.a12 * m1.a23 + m0.a13 * m1.a33,
            a21: m0.a21 * m1.a11 + m0.a22 * m1.a21 + m0.a23 * m1.a31,
            a22: m0.a21 * m1.a12 + m0.a22 * m1.a22 + m0.a23 * m1.a32,
            a23: m0.a21 * m1.a13 + m0.a22 * m1.a23 + m0.a23 * m1.a33,
            a31: m0.a31 * m1.a11 + m0.a32 * m1.a21 + m0.a33 * m1.a31,
            a32: m0.a31 * m1.a12 + m0.a32 * m1.a22 + m0.a33 * m1.a32,
            a33: m0.a31 * m1.a13 + m0.a32 * m1.a23 + m0.a33 * m1.a33
        }
        return m2;
    }

    public division(m0: Matrix3d, m1: Matrix3d): Matrix3d {
        return this.multiplication(m0, this.inverse(m1));
    }

    public power(m0: Matrix3d, n: number): Matrix3d {
        let m1 = this.idMx;
        for (let i = 0; i < n; i++) {
            m1 = this.multiplication(m1, m0);
        }
        return m1;
    }

    public exponential(m0: Matrix3d): Matrix3d {
        let m1: Matrix3d[] = this.diagonalize(m0);
        m1[1].a11 = Math.pow(Math.E, m1[1].a11);
        m1[1].a22 = Math.pow(Math.E, m1[1].a22);
        m1[1].a33 = Math.pow(Math.E, m1[1].a33);

        return this.multiplication(m1[0], this.multiplication(m1[1], this.inverse(m1[0])));
    }

    //Outras Operações
    public minor(m0: Matrix3d): Matrix3d {
        let m1: Matrix3d = {
            a11: this.matrix2dService.determinant({ a11: m0.a22, a12: m0.a23, a21: m0.a32, a22: m0.a33 }),
            a12: this.matrix2dService.determinant({ a11: m0.a21, a12: m0.a23, a21: m0.a31, a22: m0.a33 }),
            a13: this.matrix2dService.determinant({ a11: m0.a21, a12: m0.a22, a21: m0.a31, a22: m0.a32 }),
            a21: this.matrix2dService.determinant({ a11: m0.a12, a12: m0.a13, a21: m0.a32, a22: m0.a33 }),
            a22: this.matrix2dService.determinant({ a11: m0.a11, a12: m0.a13, a21: m0.a31, a22: m0.a33 }),
            a23: this.matrix2dService.determinant({ a11: m0.a11, a12: m0.a12, a21: m0.a31, a22: m0.a32 }),
            a31: this.matrix2dService.determinant({ a11: m0.a12, a12: m0.a13, a21: m0.a22, a22: m0.a23 }),
            a32: this.matrix2dService.determinant({ a11: m0.a11, a12: m0.a13, a21: m0.a21, a22: m0.a23 }),
            a33: this.matrix2dService.determinant({ a11: m0.a11, a12: m0.a12, a21: m0.a21, a22: m0.a22 })
        }
        return m1;
    }

    public cofactor(m0: Matrix3d): Matrix3d {
        let m1: Matrix3d = this.minor(m0);

        m1.a12 = -m1.a12;
        m1.a21 = -m1.a21;
        m1.a23 = -m1.a23;
        m1.a32 = -m1.a32;

        return m1;
    }

    public transpose(m0: Matrix3d): Matrix3d {
        let m1: Matrix3d = {
            a11: m0.a11,
            a12: m0.a21,
            a13: m0.a31,
            a21: m0.a12,
            a22: m0.a22,
            a23: m0.a32,
            a31: m0.a13,
            a32: m0.a23,
            a33: m0.a33
        }
        return m1;
    }

    public adjoint(m0: Matrix3d): Matrix3d {
        let m1: Matrix3d = this.transpose(this.cofactor(m0));
        return m1;
    }

    public determinant(m0: Matrix3d): number {
        return m0.a11 * m0.a22 * m0.a33 +
            m0.a12 * m0.a23 * m0.a31 +
            m0.a13 * m0.a21 * m0.a32 -
            m0.a31 * m0.a22 * m0.a13 -
            m0.a32 * m0.a23 * m0.a11 -
            m0.a33 * m0.a21 * m0.a12;
    }

    public inverse(m0: Matrix3d): Matrix3d {
        let m1 = this.byScalar(this.adjoint(m0), 1 / this.determinant(m0));
        return m1;
    }

    public pseudoinverse(m0: Matrix3d): Matrix3d {
        return this.multiplication(
            this.transpose(m0),
            this.inverse(this.multiplication(m0, this.transpose(m0))));
    }

    public trace(m0: Matrix3d): number {
        return m0.a11 + m0.a22 + m0.a33;
    }

    public rank(m0: Matrix3d): number {
        let m1: Matrix3d = this.rreForm(m0);
        let n = 3;
        if (this.mathService.isAlmostEqual(m1.a11, 0) && this.mathService.isAlmostEqual(m1.a12, 0) && this.mathService.isAlmostEqual(m1.a13, 0)) {
            n = n - 1;
        } else if (this.mathService.isAlmostEqual(m1.a21, 0) && this.mathService.isAlmostEqual(m1.a22, 0) && this.mathService.isAlmostEqual(m1.a23, 0)) {
            n = n - 1;
        } else if (this.mathService.isAlmostEqual(m1.a31, 0) && this.mathService.isAlmostEqual(m1.a32, 0) && this.mathService.isAlmostEqual(m1.a33, 0)) {
            n = n - 1;
        }
        return n
    }

    //Vector Operations
    public productByVector(m: Matrix3d, v: Vector3d): Vector3d {
        return {
            x: m.a11 * v.x + m.a12 * v.y + m.a13 * v.z,
            y: m.a21 * v.x + m.a22 * v.y + m.a23 * v.z,
            z: m.a31 * v.x + m.a32 * v.y + m.a33 * v.z
        };
    }

    //Spaces

    //rowSpace

    //colSpace

    public nullSpace(m0: Matrix3d): Vector3d {
        m0 = this.rreForm(m0);

        let v: Vector3d = { x: 0, y: 0, z: 0 };
        if (this.mathService.isAlmostEqual(m0.a11, 1) &&
            this.mathService.isAlmostEqual(m0.a12, 0) &&
            this.mathService.isAlmostEqual(m0.a13, 0) &&
            this.mathService.isAlmostEqual(m0.a21, 0) &&
            this.mathService.isAlmostEqual(m0.a22, 1) &&
            this.mathService.isAlmostEqual(m0.a23, 0) &&
            this.mathService.isAlmostEqual(m0.a31, 0) &&
            this.mathService.isAlmostEqual(m0.a32, 0) &&
            this.mathService.isAlmostEqual(m0.a33, 1)) {
            v = { x: 0, y: 0, z: 0 };
        } else {
            v = { x: -m0.a12 / m0.a11, y: 1, z: 1 };
        }

        return v;
    }


    //Eingevalues and Eingenvectors
    public chaPoly(m0: Matrix3d): void {
        let b: number = m0.a11 + m0.a22 + m0.a33;
        let c: number = m0.a13 * m0.a31 + m0.a23 * m0.a32 + m0.a12 * m0.a21 - m0.a11 * m0.a33 - m0.a11 * m0.a22 - m0.a22 * m0.a33;
        let d: number = this.determinant(m0);


        if (b > 0) {
            if (c > 0) {
                if (d > 0) {
                    console.log(`-λ³ + ${Math.abs(b)}λ² + ${Math.abs(c)}λ + ${Math.abs(d)}`);
                } else {
                    console.log(`-λ³ + ${Math.abs(b)}λ² + ${Math.abs(c)}λ - ${Math.abs(d)}`);
                }
            } else {
                if (d > 0) {
                    console.log(`-λ³ + ${Math.abs(b)}λ² - ${Math.abs(c)}λ + ${Math.abs(d)}`);
                } else {
                    console.log(`-λ³ + ${Math.abs(b)}λ² - ${Math.abs(c)}λ - ${Math.abs(d)}`);
                }
            }
        } else {
            if (c > 0) {
                if (d > 0) {
                    console.log(`-λ³ - ${Math.abs(b)}λ² + ${Math.abs(c)}λ + ${Math.abs(d)}`);
                } else {
                    console.log(`-λ³ - ${Math.abs(b)}λ² + ${Math.abs(c)}λ - ${Math.abs(d)}`);
                }
            } else {
                if (d > 0) {
                    console.log(`-λ³ - ${Math.abs(b)}λ² - ${Math.abs(c)}λ + ${Math.abs(d)}`);
                } else {
                    console.log(`-λ³ - ${Math.abs(b)}λ² - ${Math.abs(c)}λ - ${Math.abs(d)}`);
                }
            }
        }

    }

    public eigenvalue(m0: Matrix3d): number[] {
        let a = -1;
        let b: number = m0.a11 + m0.a22 + m0.a33;
        let c: number = m0.a13 * m0.a13 + m0.a23 * m0.a32 + m0.a12 * m0.a21 - m0.a11 * m0.a33 - m0.a11 * m0.a22 - m0.a22 * m0.a33;
        let d: number = this.determinant(m0);

        return this.mathService.cubicEquation(a, b, c, d);
    }

    public eigenvector(m0: Matrix3d): Vector3d[] {
        let n: number[] = this.eigenvalue(m0);
        let m1: Matrix3d = {
            a11: m0.a11 - n[0], a12: m0.a12, a13: m0.a13,
            a21: m0.a21, a22: m0.a22 - n[0], a23: m0.a23,
            a31: m0.a31, a32: m0.a32, a33: m0.a33 - n[0]
        };
        let m2: Matrix3d = {
            a11: m0.a11 - n[1], a12: m0.a12, a13: m0.a13,
            a21: m0.a21, a22: m0.a22 - n[1], a23: m0.a23,
            a31: m0.a31, a32: m0.a32, a33: m0.a33 - n[1]
        };
        let m3: Matrix3d = {
            a11: m0.a11 - n[2], a12: m0.a12, a13: m0.a13,
            a21: m0.a21, a22: m0.a22 - n[2], a23: m0.a23,
            a31: m0.a31, a32: m0.a32, a33: m0.a33 - n[2]
        };
        return [this.nullSpace(m1), this.nullSpace(m2), this.nullSpace(m3)];
    }

    //Transformations
    public transition(m0: Matrix3d, m1: Matrix3d): Matrix3d {
        let r0: Vector3d[] = this.getRow(m0);
        let r1: Vector3d[] = this.getRow(m1);

        r0[0] = this.vector3dService.byScalar(r0[0], 1 / r1[0].x);
        r1[0] = this.vector3dService.byScalar(r1[0], 1 / r1[0].x);

        r0[1] = this.vector3dService.minus(r0[1], this.vector3dService.byScalar(r0[0], r1[1].x));
        r1[1] = this.vector3dService.minus(r1[1], this.vector3dService.byScalar(r1[0], r1[1].x));

        r0[2] = this.vector3dService.minus(r0[2], this.vector3dService.byScalar(r0[0], r1[2].x));
        r1[2] = this.vector3dService.minus(r1[2], this.vector3dService.byScalar(r1[0], r1[2].x));

        r0[1] = this.vector3dService.byScalar(r0[1], 1 / r1[1].y);
        r1[1] = this.vector3dService.byScalar(r1[1], 1 / r1[1].y);

        r0[0] = this.vector3dService.minus(r0[0], this.vector3dService.byScalar(r0[1], r1[0].y));
        r1[0] = this.vector3dService.minus(r1[0], this.vector3dService.byScalar(r1[1], r1[0].y));

        r0[2] = this.vector3dService.minus(r0[2], this.vector3dService.byScalar(r0[1], r1[2].y));
        r1[2] = this.vector3dService.minus(r1[2], this.vector3dService.byScalar(r1[1], r1[2].y));

        r0[2] = this.vector3dService.byScalar(r0[2], 1 / r1[2].z);
        r1[2] = this.vector3dService.byScalar(r1[2], 1 / r1[2].z);

        r0[0] = this.vector3dService.minus(r0[0], this.vector3dService.byScalar(r0[2], r1[0].z));
        r1[0] = this.vector3dService.minus(r1[0], this.vector3dService.byScalar(r1[2], r1[0].z));

        r0[1] = this.vector3dService.minus(r0[1], this.vector3dService.byScalar(r0[2], r1[1].z));
        r1[1] = this.vector3dService.minus(r1[1], this.vector3dService.byScalar(r1[2], r1[1].z));

        return {
            a11: r0[0].x, a12: r0[0].y, a13: r0[0].z,
            a21: r0[1].x, a22: r0[1].y, a23: r0[1].z,
            a31: r0[2].x, a32: r0[2].y, a33: r0[2].z
        };
    }
    
    public rreForm(m0: Matrix3d): Matrix3d {
        //Process through Gauss-Jordan Elimination method.
        let r: Vector3d[] = this.getRow(m0)

        r[0] = this.vector3dService.byScalar(r[0], 1 / r[0].x);
        r[1] = this.vector3dService.minus(r[1], this.vector3dService.byScalar(r[0], r[1].x));
        r[2] = this.vector3dService.minus(r[2], this.vector3dService.byScalar(r[0], r[2].x));

        if (!this.mathService.isAlmostEqual(r[1].y,0)) {
        r[1] = this.vector3dService.byScalar(r[1], 1 / r[1].y);
        r[0] = this.vector3dService.minus(r[0], this.vector3dService.byScalar(r[1], r[0].y));
        r[2] = this.vector3dService.minus(r[2], this.vector3dService.byScalar(r[1], r[2].y));
        }

        if (!this.mathService.isAlmostEqual(r[2].z,0)) {
        r[2] = this.vector3dService.byScalar(r[2], 1 / r[2].z);
        r[0] = this.vector3dService.minus(r[0], this.vector3dService.byScalar(r[2], r[0].z));
        r[1] = this.vector3dService.minus(r[1], this.vector3dService.byScalar(r[2], r[1].z));
        }

        return {
            a11: r[0].x, a12: r[0].y, a13: r[0].z,
            a21: r[1].x, a22: r[1].y, a23: r[1].z,
            a31: r[2].x, a32: r[2].y, a33: r[2].z
        };
    }

    public luDecomposition(m0: Matrix3d): Matrix3d[] {
        let r: Vector3d[] = this.getRow(m0);
        let ml: Matrix3d = this.idMx;

        r[1] = this.vector3dService.minus(r[1], this.vector3dService.byScalar(r[0], m0.a21 / m0.a11));
        ml.a21 = m0.a21 / m0.a11;

        r[2] = this.vector3dService.minus(r[2], this.vector3dService.byScalar(r[0], m0.a31 / m0.a11));
        ml.a31 = m0.a31 / m0.a11;

        r[2] = this.vector3dService.minus(r[2], this.vector3dService.byScalar(r[1], m0.a32 / m0.a22));
        ml.a32 = m0.a32 / m0.a22;

        let mu: Matrix3d = {
            a11: r[0].x, a12: r[0].y, a13: r[0].z,
            a21: r[1].x, a22: r[1].y, a23: r[1].z,
            a31: r[2].x, a32: r[2].y, a33: r[2].z
        };

        return [ml, mu];
    }
 
    public diagonalize(m0: Matrix3d): Matrix3d[] {

        let eVec: Vector3d[] = this.eigenvector(m0);
        let eVal: number[] = this.eigenvalue(m0);

        let mp: Matrix3d = {
            a11: eVec[0].x, a12: eVec[1].x, a13: eVec[2].x,
            a21: eVec[0].y, a22: eVec[1].y, a23: eVec[2].y,
            a31: eVec[0].z, a32: eVec[1].z, a33: eVec[2].z
        }; 
        let md: Matrix3d = {
            a11: eVal[0], a12: 0, a13: 0,
            a21: 0, a22: eVal[1], a23: 0,
            a31: 0, a32: 0, a33: eVal[2]
        }; 

        return [mp, md];
    }

    public qrFactorization(m0: Matrix3d): Matrix3d[] {
        let v: Vector3d[] = this.getCol(m0);
        v = this.vector3dService.gramSchmidt(v[0], v[1], v[2]);

        let mq: Matrix3d = { 
                a11: v[0].x, a12: v[1].x, a13: v[2].x, 
                a21: v[0].y, a22: v[1].y, a23: v[2].y,
                a31: v[0].z, a32: v[1].z, a33: v[2].z
            } 
        let mr: Matrix3d = this.multiplication(this.transpose(mq), m0);

        return [mq, mr];
    }

    public svdDec(m0: Matrix3d): Matrix3d[] {
        let u: Vector3d[] = this.eigenvector(this.multiplication(m0, this.transpose(m0)));
        let n: number[] = this.eigenvalue(this.multiplication(m0, this.transpose(m0)));

        u[0] = this.vector3dService.unit(u[0]);
        u[1] = this.vector3dService.unit(u[1]);
        u[2] = this.vector3dService.unit(u[2]);

        let mu: Matrix3d = {
            a11: u[0].x, a12: u[1].x, a13: u[2].x,
            a21: u[0].y, a22: u[1].y, a23: u[2].y,
            a31: u[0].z, a32: u[1].z, a33: u[2].z
        }; 

        let ms: Matrix3d = {
            a11: Math.sqrt(n[0]), a12: 0, a13: 0,
            a21: 0, a22: Math.sqrt(n[1]), a23: 0,
            a31: 0, a32: 0, a33: Math.sqrt(n[2])
        }; 

        let v: Vector3d[] = [this.vector3dService.byScalar(this.productByVector(this.transpose(m0), u[0]), 1 / Math.sqrt(n[0])),
                             this.vector3dService.byScalar(this.productByVector(this.transpose(m0), u[1]), 1 / Math.sqrt(n[1])),
                             this.vector3dService.byScalar(this.productByVector(this.transpose(m0), u[2]), 1 / Math.sqrt(n[2]))];
        let mv: Matrix3d = {
            a11: v[0].x, a12: v[1].x, a13: v[2].x,
            a21: v[0].y, a22: v[1].y, a23: v[2].y,
            a31: v[0].z, a32: v[1].z, a33: v[2].z
        }; 

        return [mu, ms, mv];
    }

    //Utils
    public toString(m0: Matrix3d): void {
        console.log(m0.a11 + ' ' + m0.a12 + ' ' + m0.a13);
        console.log(m0.a21 + ' ' + m0.a22 + ' ' + m0.a23);
        console.log(m0.a31 + ' ' + m0.a32 + ' ' + m0.a33);
        console.log('');
    }

}
