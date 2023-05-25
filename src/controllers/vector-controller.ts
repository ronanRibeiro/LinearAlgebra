import { Vector } from "../models/vector.js";

export class vectorController {

    public addVector(vectorA: Vector, vectorB: Vector): Vector {
        return new Vector(
            vectorA.getX()+vectorB.getX(),
            vectorA.getY()+vectorB.getY(),
            vectorA.getZ()+vectorB.getZ());
    }

    public minusVector(vectorA: Vector, vectorB: Vector): Vector { 
        return new Vector(
            vectorA.getX()-vectorB.getX(),
            vectorA.getY()-vectorB.getY(),
            vectorA.getZ()-vectorB.getZ());
    }

    public vectorByScalar(vectorA: Vector, scalar: number): Vector { 
        return new Vector(
            vectorA.getX()*scalar,
            vectorA.getY()*scalar,
            vectorA.getZ()*scalar);
    }

    public dotProduct(vectorA: Vector, vectorB: Vector): number {
        return vectorA.getX()*vectorB.getX()+
            vectorA.getY()*vectorB.getY()+
            vectorA.getZ()*vectorB.getZ();
    }

    public crossProduct(vectorA: Vector, vectorB: Vector): Vector {
        return new Vector(
            vectorA.getY()*vectorB.getZ()-vectorA.getZ()*vectorB.getY(),
            vectorA.getZ()*vectorB.getX()-vectorA.getX()*vectorB.getZ(),
            vectorA.getX()*vectorB.getY()-vectorA.getY()*vectorB.getX());
    }

}