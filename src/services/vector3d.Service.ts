import { Vector3d } from "../models/vector3d.js";
import { MathService } from "./math.Service.js";

export class Vector3dService {

    static instance() {
        const instance = new Vector3dService ();
        return instance;
    }

    readonly nullVector = { x: 0, y: 0, z: 0 };
    mathService: MathService;

    constructor() {
        this.mathService = new MathService();
    }

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

    public length(v0: Vector3d): number {
        return Math.sqrt(Math.pow(v0.x, 2) + Math.pow(v0.y, 2) + Math.pow(v0.z, 2));
    }

    public angle(v0: Vector3d, v1: Vector3d): number {
        return Math.acos(this.dotProduct(v0, v1) / (this.length(v0) * this.length(v1)));
    }

    public scalarProj(v0: Vector3d, v1: Vector3d): number {
        return this.dotProduct(v0, v1) / this.length(v0);
    }

    public vectorProj(v0: Vector3d, v1: Vector3d): Vector3d {
        return this.byScalar(v0, this.dotProduct(v0, v1) / Math.pow(this.length(v0), 2));
    }

    public unit(v0: Vector3d): Vector3d {
        return this.byScalar(v0, 1 / this.length(v0));
    }

    public gramSchmidt(v: Vector3d[]): Vector3d[] {
        let v1: Vector3d;
        let vu: Vector3d[] = [];
        let ve: Vector3d[] = [];
        for (let i: number = 0; i < v.length; i++) {
            v1 = v[i];
            for (let j: number = 0; j < i; j++) {
                v1 = this.minus(v1,this.vectorProj(this.unit(vu[j]),v[i]));
            }
            vu[i] = v1;
            if(this.mathService.isAlmostEqual(vu[i].x,0)) {
                vu[i].x = 0;
            }
            if(this.mathService.isAlmostEqual(vu[i].y,0)) {
                vu[i].y = 0;
            }
            if(this.mathService.isAlmostEqual(vu[i].z,0)) {
                vu[i].z = 0;
            }
            if (!(vu[i].x == 0 && vu[i].y == 0 && vu[i].z == 0)) {
                v1 = this.unit(v1)
            }
            ve[i] = v1;
        }
        return ve;
    }

    //Utils
    public toString(v0: Vector3d): void {
        console.log(`${v0.x}, ${v0.y}, ${v0.z}`);
    }


    

}