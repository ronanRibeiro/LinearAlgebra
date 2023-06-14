import { Matrix2d } from "../models/matrix2d.js";
import { Vector2d } from "../models/vector2d.js";
import { MathService } from "./math.Service.js";
import { Vector2dService } from "./vector2d.Service.js";

export class Matrix2dService {

    constructor(
        private vector2dService: Vector2dService,
        private mathService: MathService
    ){}

    static instance() {
        const instance = new Matrix2dService (
            Vector2dService.instance(),
            MathService.instance()
        );
        return instance;
    }

    //Standard Matrices
    readonly nullMx: Matrix2d = { a11: 0, a12: 0, a21: 0, a22: 0 };
    readonly idMx: Matrix2d = { a11: 1, a12: 0, a21: 0, a22: 1 };

    //Get Rows and Columns
    public getRow(m0: Matrix2d): Vector2d[] {
        return [{ x: m0.a11, y: m0.a12 }, { x: m0.a21, y: m0.a22 }];
    }

    public getCol(m0: Matrix2d): Vector2d[] {
        return [{ x: m0.a11, y: m0.a21 }, { x: m0.a12, y: m0.a22 }];
    }

    //Basic Operations
    public add(m0: Matrix2d, m1: Matrix2d): Matrix2d {
        let m2: Matrix2d = {
            a11: m0.a11 + m1.a11,
            a12: m0.a12 + m1.a12,
            a21: m0.a21 + m1.a21,
            a22: m0.a22 + m1.a22
        }
        return m2;
    }

    public minus(m0: Matrix2d, m1: Matrix2d): Matrix2d {
        let m2: Matrix2d = {
            a11: m0.a11 - m1.a11,
            a12: m0.a12 - m1.a12,
            a21: m0.a21 - m1.a21,
            a22: m0.a22 - m1.a22
        }
        return m2;
    }

    public byScalar(m0: Matrix2d, s: number): Matrix2d {
        let m1: Matrix2d = {
            a11: m0.a11 * s,
            a12: m0.a12 * s,
            a21: m0.a21 * s,
            a22: m0.a22 * s
        }
        return m1;
    }

    public multiplication(m0: Matrix2d, m1: Matrix2d): Matrix2d {
        let m2: Matrix2d = {
            a11: m0.a11 * m1.a11 + m0.a12 * m1.a21,
            a12: m0.a11 * m1.a12 + m0.a12 * m1.a22,
            a21: m0.a21 * m1.a11 + m0.a22 * m1.a21,
            a22: m0.a21 * m1.a12 + m0.a22 * m1.a22
        }
        return m2;
    }

    public division(m0: Matrix2d, m1: Matrix2d): Matrix2d {
        return this.multiplication(m0, this.inverse(m1));
    }

    public power(m0: Matrix2d, n: number): Matrix2d {
        let m1 = this.idMx;
        for (let i = 0; i < n; i++) {
            m1 = this.multiplication(m1, m0);
        }
        return m1;
    }

    public exponential(m0: Matrix2d): Matrix2d {
        let m1: Matrix2d[] = this.diagonalize(m0);
        m1[1].a11 = Math.pow(Math.E, m1[1].a11);
        m1[1].a22 = Math.pow(Math.E, m1[1].a22);

        return this.multiplication(m1[0], this.multiplication(m1[1], this.inverse(m1[0])));
    }

    //Outras Operações
    public minor(m0: Matrix2d): Matrix2d {
        let m1: Matrix2d = {
            a11: m0.a22,
            a12: m0.a21,
            a21: m0.a12,
            a22: m0.a11
        }
        return m1;
    }

    public cofactor(m0: Matrix2d): Matrix2d {
        let m1: Matrix2d = this.minor(m0);

        m1.a12 = -m1.a12;
        m1.a21 = -m1.a21;

        return m1;
    }

    public transpose(m0: Matrix2d): Matrix2d {
        let m1: Matrix2d = {
            a11: m0.a11,
            a12: m0.a21,
            a21: m0.a12,
            a22: m0.a22
        }
        return m1;
    }

    public adjoint(m0: Matrix2d): Matrix2d {
        let m1 = this.transpose(this.cofactor(m0));
        return m1;
    }

    public determinant(m0: Matrix2d): number {
        return m0.a11 * m0.a22 - m0.a12 * m0.a21;
    }

    public inverse(m0: Matrix2d): Matrix2d {
        let m1 = this.byScalar(this.adjoint(m0), 1 / this.determinant(m0));
        return m1;
    }

    public pseudoinverse(m0: Matrix2d): Matrix2d {
        return this.multiplication(
            this.transpose(m0),
            this.inverse(this.multiplication(m0, this.transpose(m0))));
    }

    public trace(m0: Matrix2d): number {
        return m0.a11 + m0.a22;
    }

    public rank(m0: Matrix2d): number {
        let m1: Matrix2d = this.rreForm(m0);
        let n = 2;
        if (this.mathService.isAlmostEqual(m1.a11, 0) && this.mathService.isAlmostEqual(m1.a12, 0)) {
            n = n - 1;
        } else if (this.mathService.isAlmostEqual(m1.a21, 0) && this.mathService.isAlmostEqual(m1.a22, 0)) {
            n = n - 1;
        }
        return n
    }

    //Vector Operations
    public byVector(m: Matrix2d, v: Vector2d): Vector2d {
        return { x: m.a11 * v.x + m.a12 * v.y, y: m.a21 * v.x + m.a22 * v.y };
    }

    //Spaces

    //rowSpace

    //colSpace

    public nullSpace(m0: Matrix2d): Vector2d {
        m0 = this.rreForm(m0);

        let v: Vector2d = { x: 0, y: 0 };
        if (this.mathService.isAlmostEqual(m0.a11, 1) &&
            this.mathService.isAlmostEqual(m0.a12, 0) &&
            this.mathService.isAlmostEqual(m0.a21, 0) &&
            this.mathService.isAlmostEqual(m0.a22, 1)) {
                v = { x: 0, y: 0 };
            } else {
                v = { x: -m0.a12 / m0.a11, y: 1 };
            }

        return v;
    }


    //Eingevalues and Eingenvectors
    public chaPoly(m0: Matrix2d): void {
        let b: number = m0.a11 + m0.a22;
        let c: number = this.determinant(m0);

        if (b > 0) {
            if (c > 0) {
                console.log(`λ² - ${b}λ + ${c}`);
            } else {
                c = -c;
                console.log(`λ² - ${b}λ - ${c}`);
            }
        } else {
            b = -b;
            if (c > 0) {
                console.log(`λ² + ${b}λ + ${c}`);
            } else {
                c = -c;
                console.log(`λ² + ${b}λ - ${c}`);
            }
        }
    }

    public eigenvalue(m0: Matrix2d): number[] {
        let b: number = -(m0.a11 + m0.a22);
        let c: number = this.determinant(m0);
        let x1: number = (-b + Math.sqrt(b * b - 4 * c)) / 2;
        let x2: number = (-b - Math.sqrt(b * b - 4 * c)) / 2;

        return [x1, x2];
    }

    public eigenvector(m0: Matrix2d): Vector2d[] {
        let n: number[] = this.eigenvalue(m0);
        let m1: Matrix2d = { a11: m0.a11 - n[0], a12: m0.a12, a21: m0.a21, a22: m0.a22 - n[0] };
        let m2: Matrix2d = { a11: m0.a11 - n[1], a12: m0.a12, a21: m0.a21, a22: m0.a22 - n[1] };

        return [this.nullSpace(m1), this.nullSpace(m2)];
    }


    //Transformations
    public transition(m0: Matrix2d, m1: Matrix2d): Matrix2d {
        let r0: Vector2d[] = this.getRow(m0);
        let r1: Vector2d[] = this.getRow(m1);

        r0[0] = this.vector2dService.byScalar(r0[0], 1 / r1[0].x);
        r1[0] = this.vector2dService.byScalar(r1[0], 1 / r1[0].x);

        r0[1] = this.vector2dService.minus(r0[1], this.vector2dService.byScalar(r0[0], r1[1].x));
        r1[1] = this.vector2dService.minus(r1[1], this.vector2dService.byScalar(r1[0], r1[1].x));

        r0[1] = this.vector2dService.byScalar(r0[1], 1 / r1[1].y);
        r1[1] = this.vector2dService.byScalar(r1[1], 1 / r1[1].y);

        r0[0] = this.vector2dService.minus(r0[0], this.vector2dService.byScalar(r0[1], r1[0].y));
        r1[0] = this.vector2dService.minus(r1[0], this.vector2dService.byScalar(r1[1], r1[0].y));

        return { a11: r0[0].x, a12: r0[0].y, a21: r0[1].x, a22: r0[1].y };
    }

    public rreForm(m0: Matrix2d): Matrix2d {
        //Process through Gauss-Jordan Elimination method.
        let r: Vector2d[] = this.getRow(m0)

        r[0] = this.vector2dService.byScalar(r[0], 1 / r[0].x);
        r[1] = this.vector2dService.minus(r[1], this.vector2dService.byScalar(r[0], r[1].x));

        if (!this.mathService.isAlmostEqual(r[1].y,0)) {
            r[1] = this.vector2dService.byScalar(r[1], 1 / r[1].y);
            r[0] = this.vector2dService.minus(r[0], this.vector2dService.byScalar(r[1], r[0].y));
        }

        return { a11: r[0].x, a12: r[0].y, a21: r[1].x, a22: r[1].y };
    }

    public luDecomposition(m0: Matrix2d): Matrix2d[] {
        let r: Vector2d[] = this.getRow(m0);
        r[0] = this.vector2dService.minus(r[1], this.vector2dService.byScalar(r[0], m0.a21 / m0.a11));
        let mu: Matrix2d = { a11: m0.a11, a12: m0.a12, a21: r[0].x, a22: r[0].y };

        let ml: Matrix2d = this.idMx;
        ml.a21 = m0.a21 / m0.a11;

        return [ml, mu];
    }

    public diagonalize(m0: Matrix2d): Matrix2d[] {

        let eVec: Vector2d[] = this.eigenvector(m0);
        let eVal: number[] = this.eigenvalue(m0);

        let mp: Matrix2d = { a11: eVec[0].x, a12: eVec[1].x, a21: eVec[0].y, a22: eVec[1].y };
        let md: Matrix2d = { a11: eVal[0], a12: 0, a21: 0, a22: eVal[1] };

        return [mp, md];
    }

    public qrFactorization(m0: Matrix2d): Matrix2d[] {
        let v: Vector2d[] = this.getCol(m0);
        v = this.vector2dService.gramSchmidt(v[0], v[1]);

        let mq: Matrix2d = { a11: v[0].x, a12: v[1].x, a21: v[0].y, a22: v[1].y, };
        let mr: Matrix2d = this.multiplication(this.transpose(mq), m0);

        return [mq, mr];
    }

    public svdDec(m0: Matrix2d): Matrix2d[] {
        let u: Vector2d[] = this.eigenvector(this.multiplication(m0, this.transpose(m0)));
        let n: number[] = this.eigenvalue(this.multiplication(m0, this.transpose(m0)));


        u[0] = this.vector2dService.unit(u[0]);
        u[1] = this.vector2dService.unit(u[1]);
        let mu: Matrix2d = { a11: u[0].x, a12: u[1].x, a21: u[0].y, a22: u[1].y };

        let ms: Matrix2d = { a11: Math.sqrt(n[0]), a12: 0, a21: 0, a22: Math.sqrt(n[1]) };

        let v: Vector2d[] = [this.vector2dService.byScalar(this.byVector(this.transpose(m0), u[0]), 1 / Math.sqrt(n[0])),
        this.vector2dService.byScalar(this.byVector(this.transpose(m0), u[1]), 1 / Math.sqrt(n[1]))];
        let mv: Matrix2d = { a11: v[0].x, a12: v[1].x, a21: v[0].y, a22: v[1].y };

        return [mu, ms, mv];
    }

    //Utils
    public toString(m0: Matrix2d): void {
        console.log(m0.a11 + ' ' + m0.a12);
        console.log(m0.a21 + ' ' + m0.a22);
        console.log('');
    }

}
