import { Vector2d } from "../models/vector2d.js";

export class Vector2dService {

    static instance() {
        const instance = new Vector2dService();
        return instance;
    }

    readonly nullVector = { x: 0, y: 0 };

    //Properties
    public length(v0: Vector2d): number {
        return Math.sqrt(Math.pow(v0.x, 2) + Math.pow(v0.y, 2));
    }

    public angle(v0: Vector2d, v1: Vector2d): number {
        //Angle in RAD
        return Math.acos(this.dotProduct(v0, v1) / (this.length(v0) * this.length(v1)));
    }

    //Basic Operations
    public add(v0: Vector2d, v1: Vector2d): Vector2d {
        const v2 = {
            x: v0.x + v1.x,
            y: v0.y + v1.y
        };
        return v2;
    }

    public minus(v0: Vector2d, v1: Vector2d): Vector2d {
        const v2 = {
            x: v0.x - v1.x,
            y: v0.y - v1.y
        };
        return v2;
    }

    public byScalar(v0: Vector2d, scalar: number): Vector2d {
        const v2 = {
            x: v0.x * scalar,
            y: v0.y * scalar
        };
        return v2;
    }

    public dotProduct(v0: Vector2d, v1: Vector2d): number {
        return v0.x * v1.x + v0.y * v1.y;
    }

    public crossProduct(v0: Vector2d, v1: Vector2d): number {
        return v0.x * v1.y - v0.y * v1.x;
    }

    public scalarProj(v0: Vector2d, v1: Vector2d): number {
        //scalar projection
        return this.dotProduct(v0, v1) / this.length(v0);
    }

    public vectorProj(v0: Vector2d, v1: Vector2d): Vector2d {
        //vector projection
        return this.byScalar(v0, this.dotProduct(v0, v1) / Math.pow(this.length(v0), 2));
    }

    public unit(v0: Vector2d): Vector2d {
        //unit vector
        return this.byScalar(v0, 1 / this.length(v0));
    }

    public gramSchmidt(v0: Vector2d, v1: Vector2d): Vector2d[] {
        //return a set of unit perpendicular vectors
        //For R2 can only be 2 vectors
        //u1 = v1
        //u2 = v2 - vp(u1)v2
        return [this.unit(v0), this.unit(this.minus(v1, this.vectorProj(this.unit(v0), v1)))];
    }

    //Utils
    public toString(v0: Vector2d): void {
        console.log(`${v0.x}, ${v0.y}`);
    }

}