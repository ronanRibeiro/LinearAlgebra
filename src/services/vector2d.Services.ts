import { Vector2d } from "../models/vector2d.js";

export class Vector2dService {

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

    public toString(v0: Vector2d): string {
        return `(${v0.x}i, ${v0.y}j)`
    }

}