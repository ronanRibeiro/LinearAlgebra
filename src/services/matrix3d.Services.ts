import { Matrix3d } from "../models/matrix3d.js";

export class Matrix3dService {

    public add(m0: Matrix3d, m1: Matrix3d): Matrix3d {
        let m2: Matrix3d = { x: [0, 0, 0], y: [0, 0, 0], z: [0, 0, 0]};

        m2.x[0] = m0.x[0] + m1.x[0];
        m2.x[1] = m0.x[1] + m1.x[1];
        m2.x[2] = m0.x[2] + m1.x[2];
        m2.y[0] = m0.y[0] + m1.y[0];
        m2.y[1] = m0.y[1] + m1.y[1];
        m2.y[2] = m0.y[2] + m1.y[2];
        m2.z[0] = m0.z[0] + m1.z[0];
        m2.z[1] = m0.z[1] + m1.z[1];
        m2.z[2] = m0.z[2] + m1.z[2];
        
        return m2;
    }

    public minus(m0: Matrix3d, m1: Matrix3d): Matrix3d {
        let m2: Matrix3d = { x: [0, 0, 0], y: [0, 0, 0], z: [0, 0, 0]};

        m2.x[0] = m0.x[0] - m1.x[0];
        m2.x[1] = m0.x[1] - m1.x[1];
        m2.x[2] = m0.x[2] - m1.x[2];
        m2.y[0] = m0.y[0] - m1.y[0];
        m2.y[1] = m0.y[1] - m1.y[1];
        m2.y[2] = m0.y[2] - m1.y[2];
        m2.z[0] = m0.z[0] - m1.z[0];
        m2.z[1] = m0.z[1] - m1.z[1];
        m2.z[2] = m0.z[2] - m1.z[2];

        return m2;
    }

    public byScalar(m0: Matrix3d, s: number): Matrix3d {
        let m2: Matrix3d = { x: [0, 0, 0], y: [0, 0, 0], z: [0, 0, 0]};

        m2.x[0] = m0.x[0] * s;
        m2.x[1] = m0.x[1] * s;
        m2.x[2] = m0.x[2] * s;
        m2.y[0] = m0.y[0] * s;
        m2.y[1] = m0.y[1] * s;
        m2.y[2] = m0.y[2] * s;
        m2.z[0] = m0.z[0] * s;
        m2.z[1] = m0.z[1] * s;
        m2.z[2] = m0.z[2] * s;

        return m2;
    }

    public multiplication(m0: Matrix3d, m1: Matrix3d): Matrix3d {
        let m2: Matrix3d = { x: [0, 0, 0], y: [0, 0, 0], z: [0, 0, 0]};

        m2.x[0] = m0.x[0] * m1.x[0] + m0.x[1] * m1.y[0] + m0.x[2] * m1.z[0];
        m2.x[1] = m0.x[0] * m1.x[1] + m0.x[1] * m1.y[1] + m0.x[2] * m1.z[1];
        m2.x[2] = m0.x[0] * m1.x[2] + m0.x[1] * m1.y[2] + m0.x[2] * m1.z[2];
        m2.y[0] = m0.y[0] * m1.x[0] + m0.y[1] * m1.y[0] + m0.y[2] * m1.z[0];
        m2.y[1] = m0.y[0] * m1.x[1] + m0.y[1] * m1.y[1] + m0.y[2] * m1.z[1];
        m2.y[2] = m0.y[0] * m1.x[2] + m0.y[1] * m1.y[2] + m0.y[2] * m1.z[2];
        m2.z[0] = m0.z[0] * m1.x[0] + m0.z[1] * m1.y[0] + m0.z[2] * m1.z[0];
        m2.z[1] = m0.z[0] * m1.x[1] + m0.z[1] * m1.y[1] + m0.z[2] * m1.z[1];
        m2.z[2] = m0.z[0] * m1.x[2] + m0.z[1] * m1.y[2] + m0.z[2] * m1.z[2];

        return m2;
    }

    public minor(m0: Matrix3d): Matrix3d {
        let m1: Matrix3d = { x: [0, 0, 0], y: [0, 0, 0], z: [0, 0, 0]};

        m1.x[0] = m0.y[1] * m0.z[2] - m0.z[1] * m0.y[2];
        m1.x[1] = m0.y[0] * m0.z[2] - m0.z[0] * m0.y[2];
        m1.x[2] = m0.y[0] * m0.z[1] - m0.z[0] * m0.y[1];
        m1.y[0] = m0.x[1] * m0.z[2] - m0.z[1] * m0.x[2];
        m1.y[1] = m0.x[0] * m0.z[2] - m0.z[0] * m0.x[2];
        m1.y[2] = m0.x[0] * m0.z[1] - m0.z[0] * m0.x[1];
        m1.z[0] = m0.x[1] * m0.y[2] - m0.y[1] * m0.x[2];
        m1.z[1] = m0.x[0] * m0.y[2] - m0.y[0] * m0.x[2];
        m1.z[2] = m0.x[0] * m0.y[1] - m0.y[0] * m0.x[1];

        return m1;
    }

    public cofactor(m0: Matrix3d): Matrix3d {
        let m1: Matrix3d = this.minor(m0);

        m1.x[1] = -m1.x[1];
        m1.y[0] = -m1.y[0];
        m1.y[2] = -m1.y[2];
        m1.z[1] = -m1.z[1];

        return m1;
    }      

    public transpose(m0: Matrix3d): Matrix3d {
        let m1: Matrix3d = { x: [0, 0, 0], y: [0, 0, 0], z: [0, 0, 0]};

        m1.x[0] = m0.x[0];
        m1.x[1] = m0.y[0];
        m1.x[2] = m0.z[0];
        m1.y[0] = m0.x[1];
        m1.y[1] = m0.y[1];
        m1.y[2] = m0.z[1];
        m1.z[0] = m0.x[2];
        m1.z[1] = m0.y[2];
        m1.z[2] = m0.z[2];

        return m1;
    }

    public adjoint(m0: Matrix3d): Matrix3d {
        let m1: Matrix3d = this.transpose(this.cofactor(m0));

        return m1;
    }

    public determinant(m0: Matrix3d): number {
        let d: number =   m0.x[0] * m0.y[1] * m0.z[2]
                        + m0.x[1] * m0.y[2] * m0.z[0]
                        + m0.x[2] * m0.y[0] * m0.z[1]
                        - m0.x[2] * m0.y[1] * m0.z[0]
                        - m0.x[0] * m0.y[2] * m0.z[1]
                        - m0.x[1] * m0.y[0] * m0.z[2];

        return d;
    }
    
    public inverse(m0: Matrix3d): Matrix3d {
        let m1 = this.byScalar(this.adjoint(m0),1/this.determinant(m0));

        return m1;
    }    

    public toString(m0: Matrix3d): void {
        console.log(m0.x.join(' '));
        console.log(m0.y.join(' '));
        console.log(m0.z.join(' '));
    }

}
