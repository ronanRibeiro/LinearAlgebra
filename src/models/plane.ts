import { Vector2d } from "./vector2d";

export interface Plane {
    //ax + by + cz + d = 0
    a: number,
    b: number,
    c: number,
    d: number
}