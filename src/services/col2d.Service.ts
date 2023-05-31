import { Col2d } from "../models/col2d.js";

export class Col2dService {

    readonly nullR: Col2d = { a11: 0, a21: 0 };

    public add(r0: Col2d, r1: Col2d): Col2d {
        let r2: Col2d = { a11: r0.a11 + r1.a11, a21: r0.a21 + r1.a21 };
        return r2;
    }

    public minus(r0: Col2d, r1: Col2d): Col2d {
        let r2: Col2d = { a11: r0.a11 - r1.a11, a21: r0.a21 - r1.a21 };
        return r2;
    }

    public bySacalar(r0: Col2d, s: number): Col2d {
        let r2: Col2d = { a11: r0.a11 * s, a21: r0.a21 * s };
        return r2;
    }

}