import { Matrix2d } from "../models/matrix2d.js";
import { Row2d } from "../models/row2d.js";
import { Row2dService } from "./row2d.Service.js";

export class Matrix2dService {

    readonly nullMx: Matrix2d = { a11: 0, a12: 0, a21: 0, a22: 0 };
    readonly idMx: Matrix2d = { a11: 1, a12: 0, a21: 0, a22: 1 };

    row2dService: Row2dService;
    constructor() {
        this.row2dService = new Row2dService();
    }


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

    //Decompositions

    public luDecomposition(m0: Matrix2d): Matrix2d[] {
        let r0: Row2d = this.row2dService.minus(
            this.row2dService.row(m0, 2),
            this.row2dService.bySacalar(
                this.row2dService.row(m0, 1), m0.a21 / m0.a11));

        let mu: Matrix2d = { a11: m0.a11, a12: m0.a12, a21: r0.a11, a22: r0.a12 };
        let ml: Matrix2d = this.idMx;
        ml.a21 = m0.a21 / m0.a11;

        return [ml, mu];
    }




    public toString(m0: Matrix2d): void {
        console.log(m0.a11 + ', ' + m0.a12);
        console.log(m0.a21 + ', ' + m0.a22);
        console.log('');
        }

}
