import { Matrix2d } from "../models/matrix2d.js";

export class Matrix2dService {

    public add(m0: Matrix2d, m1: Matrix2d): Matrix2d {
        let m2: Matrix2d = { x: [0, 0], y: [0, 0] };

        m2.x[0] = m0.x[0] + m1.x[0];
        m2.x[1] = m0.x[1] + m1.x[1];
        m2.y[0] = m0.y[0] + m1.y[0];
        m2.y[1] = m0.y[1] + m1.y[1];

        return m2;
    }

    public minus(m0: Matrix2d, m1: Matrix2d): Matrix2d {
        let m2: Matrix2d = { x: [0, 0], y: [0, 0] };

        m2.x[0] = m0.x[0] - m1.x[0];
        m2.x[1] = m0.x[1] - m1.x[1];
        m2.y[0] = m0.y[0] - m1.y[0];
        m2.y[1] = m0.y[1] - m1.y[1];

        return m2;
    }

    public byScalar(m0: Matrix2d, s: number): Matrix2d {
        let m2: Matrix2d = { x: [0, 0], y: [0, 0] };

        m2.x[0] = m0.x[0] * s;
        m2.x[1] = m0.x[1] * s;
        m2.y[0] = m0.y[0] * s;
        m2.y[1] = m0.y[1] * s;

        return m2;
    }

    public multiplication(m0: Matrix2d, m1: Matrix2d): Matrix2d {
        let m2: Matrix2d = { x: [0, 0], y: [0, 0] };

        m2.x[0] = m0.x[0] * m1.x[0] + m0.x[1] * m1.y[0];
        m2.x[1] = m0.x[0] * m1.x[1] + m0.x[1] * m1.y[1];
        m2.y[0] = m0.y[0] * m1.x[0] + m0.y[1] * m1.y[0];
        m2.y[1] = m0.y[0] * m1.x[1] + m0.y[1] * m1.y[1];

        return m2;
    }

    public minor(m0: Matrix2d): Matrix2d {
        let m1: Matrix2d = { x: [0, 0], y: [0, 0] };

        m1.x[0] = m0.y[1];
        m1.x[1] = m0.y[0];
        m1.y[0] = m0.x[1];
        m1.y[1] = m0.x[0];

        return m1;
    }

    public cofactor(m0: Matrix2d): Matrix2d {
        let m1 = this.minor(m0);

        m1.x[1] = -m1.x[1];
        m1.y[0] = -m1.y[0];

        return m1;
    }

    public transpose(m0: Matrix2d): Matrix2d {
        let m1: Matrix2d = { x: [0, 0], y: [0, 0] };

        m1.x[0] = m0.x[0];
        m1.x[1] = m0.y[0];
        m1.y[0] = m0.x[1];
        m1.y[1] = m0.y[1];

        return m1;
    }

    public adjoint(m0: Matrix2d): Matrix2d {
        let m1 = this.transpose(this.cofactor(m0));

        return m1;
    } 

    public determinant(m0: Matrix2d): number {
        let d: number = m0.x[0] * m0.y[1] - m0.x[1] * m0.y[0];

        return d;
    }

    public inverse(m0: Matrix2d): Matrix2d {
        let m1 = this.byScalar(this.adjoint(m0),1/this.determinant(m0));

        return m1;
    }

    public toString(m0: Matrix2d): void {
        console.log(m0.x.join(' '));
        console.log(m0.y.join(' '));
    }

}
