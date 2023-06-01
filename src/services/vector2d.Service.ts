import { Vector2d } from "../models/vector2d.js";

export class Vector2dService {

    readonly nullVector = {x: 0, y: 0};

    //Basic Operations
    public add(v0: Vector2d, v1: Vector2d): Vector2d {
        const v2 = {
            x: v0.x + v1.x,
            y: v0.y + v1.y};
        return v2;
    }

    public minus(v0: Vector2d, v1: Vector2d): Vector2d { 
        const v2 = {
            x: v0.x - v1.x, 
            y: v0.y - v1.y};
        return v2;
    }

    public byScalar(v0: Vector2d, scalar: number): Vector2d { 
        const v2 = {
            x: v0.x*scalar, 
            y: v0.y*scalar};
        return v2;
    }

    public dotProduct(v0: Vector2d, v1: Vector2d): number {
        return v0.x*v1.x + v0.y*v1.y;
    }

    public crossProduct(v0: Vector2d, v1: Vector2d): number {
        return v0.x*v1.y-v0.y*v1.x;
    }

    public length(v0: Vector2d): number {
        return Math.sqrt(Math.pow(v0.x,2)+Math.pow(v0.y,2));
    }

    public angle(v0: Vector2d, v1: Vector2d): number {
        return Math.acos(this.dotProduct(v0,v1)/(this.length(v0)*this.length(v1)));
    }

    public scalarProj(v0: Vector2d, v1: Vector2d): number {
        return this.dotProduct(v0,v1)/this.length(v0);
    }

    public vectorProj(v0: Vector2d, v1: Vector2d): Vector2d {
        return this.byScalar(v0,this.dotProduct(v0,v1)/Math.pow(this.length(v0),2));
    }

    public unit(v0: Vector2d): Vector2d {
        return this.byScalar(v0,1/this.length(v0));
    }

    public gramSchmidt(v0: Vector2d, v1:Vector2d): Vector2d[] {
        let u0: Vector2d = this.nullVector;
        let u1: Vector2d = this.nullVector;

        u0 = this.unit(v0);

        u1 = this.vectorProj(u0, v1);

        u1 = this.minus(v1,u1);

        u1 = this.unit(u1);
        
        return [u0, u1];
    }

    //Utils
    public toString(v0: Vector2d): void {
        console.log(`${v0.x}  ${v0.y}`);
    }

}