import { Matrix2d } from "../models/matrix2d.js";
import { Row2d } from "../models/row2d.js";

export class Row2dService {

    readonly nullR: Row2d = { a11: 0, a12: 0 };

    public row(m0: Matrix2d, n: number): Row2d {
        let r1 = this.nullR;
        if (n - 1 === 0) {
            r1 = { a11: m0.a11, a12: m0.a12 };
        } else if (n - 1 === 1) {
            r1 = { a11: m0.a21, a12: m0.a22 };
        }
        return r1;
    }

    public add(r0: Row2d, r1: Row2d): Row2d {
        let r2: Row2d = { a11: r0.a11 + r1.a11, a12: r0.a12 + r1.a12 };
        return r2;
    }

    public minus(r0: Row2d, r1: Row2d): Row2d {
        let r2: Row2d = { a11: r0.a11 - r1.a11, a12: r0.a12 - r1.a12 };
        return r2;
    }

    public bySacalar(r0: Row2d, s: number): Row2d {
        let r2: Row2d = { a11: r0.a11 * s, a12: r0.a12 * s };
        return r2;
    }

}