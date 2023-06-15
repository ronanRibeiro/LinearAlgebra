import { Vector3d } from "../models/vector3d.js";
import { MathService } from "./math.Service";

export class Vector3dService {

    constructor(
        private mathService: MathService
    ) { }

    static instance() {
        const instance = new Vector3dService(
            MathService.instance()
        );
        return instance;
    }

    readonly nullVector = { x: 0, y: 0, z: 0 };

    //Properties
    public length(v0: Vector3d): number {
        return Math.sqrt(Math.pow(v0.x, 2) + Math.pow(v0.y, 2) + Math.pow(v0.z, 2));
    }

    public angle(v0: Vector3d, v1: Vector3d): number {
        //Angle in RAD
        return Math.acos(this.dotProduct(v0, v1) / (this.length(v0) * this.length(v1)));
    }

    //Basic Operations
    public add(v0: Vector3d, v1: Vector3d): Vector3d {
        const v2 = {
            x: v0.x + v1.x,
            y: v0.y + v1.y,
            z: v0.z + v1.z
        };
        return v2;
    }

    public minus(v0: Vector3d, v1: Vector3d): Vector3d {
        const v2 = {
            x: v0.x - v1.x,
            y: v0.y - v1.y,
            z: v0.z - v1.z
        };
        return v2;
    }

    public byScalar(v0: Vector3d, scalar: number): Vector3d {
        const v2 = {
            x: v0.x * scalar,
            y: v0.y * scalar,
            z: v0.z * scalar
        };
        return v2;
    }

    public dotProduct(v0: Vector3d, v1: Vector3d): number {
        return v0.x * v1.x + v0.y * v1.y + v0.z * v1.z;
    }

    public crossProduct(v0: Vector3d, v1: Vector3d): Vector3d {
        const v2 = {
            x: v0.y * v1.z - v0.z * v1.y,
            y: v0.z * v1.x - v0.x * v1.z,
            z: v0.x * v1.y - v0.y * v1.x
        };
        return v2;
    }

    public scalarProj(v0: Vector3d, v1: Vector3d): number {
        //scalar projection
        return this.dotProduct(v0, v1) / this.length(v0);
    }

    public vectorProj(v0: Vector3d, v1: Vector3d): Vector3d {
        //vector projection
        return this.byScalar(v0, this.dotProduct(v0, v1) / Math.pow(this.length(v0), 2));
    }

    public unit(v0: Vector3d): Vector3d {
        //unit vector
        return this.byScalar(v0, 1 / this.length(v0));
    }

    public gramSchmidt(v0: Vector3d, v1: Vector3d, v2: Vector3d): Vector3d[] {
        //return a set of unit perpendicular vectors
        //For R3 can only be 3 vectors
        //u1 = v1
        //u2 = v2 - vp(u1)v2
        //u3 = v3 - vp(u1)v3 - vp(u2)v3 --> u3 == v3 - (vp(u1)v3 + vp(u2)v3)
        let u0: Vector3d = v0;
        let u1: Vector3d = this.minus(v1, this.vectorProj(this.unit(u0), v1));
        let u2: Vector3d = this.minus(v2, this.add(this.vectorProj(this.unit(u0), v2), this.vectorProj(this.unit(u1), v2)));
        return [this.unit(u0), this.unit(u1), this.unit(u2)];
    }

    //Utils
    public toString(v0: Vector3d): void {
        console.log(`${v0.x}, ${v0.y}, ${v0.z}`);
    }

}