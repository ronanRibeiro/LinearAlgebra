import { Vector3d } from "../models/vector3d.js";

export class Vector3dService {

    public add(v0: Vector3d, v1: Vector3d): Vector3d {
        const v2 = {
            x: v0.x + v1.x,
            y: v0.y + v1.y,
            z: v0.z + v1.z};
        return v2;
    }

    public minus(v0: Vector3d, v1: Vector3d): Vector3d { 
        const v2 = {
            x: v0.x - v1.x,
            y: v0.y - v1.y,
            z: v0.z - v1.z};
        return v2;
    }

    public byScalar(v0: Vector3d, scalar: number): Vector3d { 
        const v2 = {
            x: v0.x*scalar,
            y: v0.y*scalar,  
            z: v0.z*scalar};
        return v2;
    }

    public dotProduct(v0: Vector3d, v1: Vector3d): number {
        return v0.x*v1.x + v0.y*v1.y + v0.z*v1.z;
    }

    public crossProduct(v0: Vector3d, v1: Vector3d): Vector3d {
        const v2 = {
            x: v0.y*v1.z-v0.z*v1.y,
            y: v0.z*v1.x-v0.x*v1.z,  
            z: v0.x*v1.y-v0.y*v1.x};
        return v2;
    }

    public toString(v0: Vector3d): string {
        return `(${v0.x}i, ${v0.y}j, ${v0.z}j)`
    }

}