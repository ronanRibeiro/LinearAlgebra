import { Vector3d } from "./vector3d";

export interface Line3d {
    //r = r0 + t * v
    r: Vector3d, //A point
    v: Vector3d //A director vector
}