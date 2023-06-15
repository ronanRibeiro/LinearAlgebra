import { Vector3dService } from "./vector3d.Service";
import { Vector3d } from "src/models/vector3d";

describe('vector3d.Service.ts', function () {
    let v3dService: Vector3dService;
    let v1: Vector3d = { x: 1, y: 3, z: 5 };
    let v2: Vector3d = { x: 2, y: 5, z: 7 };


    beforeEach(function () {
        v3dService = Vector3dService.instance();
    })

    it('should return the length of the vector', function () {
        expect(v3dService.length(v1)).toBeCloseTo(5.91607, 4);
    })

    it('should return the angle of two vectors', function () {
        //The limits are PI and 0; PI for perpendicual and 0 for parallel
        expect(v3dService.angle(v1, v1)).toBe(0); //Pparallel - same vector
        expect(v3dService.angle(v1, v3dService.byScalar(v1, -1))).toBe(Math.PI); //Perpendicular
        expect(v3dService.angle(v1, v2)).toBeCloseTo(0.09774, 4);
    })

    it('should return the sum of two vectors', function () {
        expect(v3dService.add(v1, v2)).toEqual({ x: 3, y: 8, z: 12 });
    })

    it('should return the subtraction of two vectors', function () {
        expect(v3dService.minus(v1, v2)).toEqual({ x: -1, y: -2, z: -2 });
    })

    it('should return the multiplication of a vector by a scalar', function () {
        expect(v3dService.byScalar(v1, 3)).toEqual({ x: 3, y: 9, z: 15 });
    })

    it('should return the dot product of two vectors', function () {
        expect(v3dService.dotProduct(v1, v2)).toBe(52);
    })

    it('should return the cross product of two vectors', function () {
        expect(v3dService.crossProduct(v1, v2)).toEqual({ x: -4, y: 3, z: -1 });
    })

    it('should return the scalar projection of a vector in other one', function () {
        expect(v3dService.scalarProj(v1, v2)).toBeCloseTo(8.78960, 4);
    })

    it('should return the vector projection of a vector in other one', function () {
        let v: Vector3d = v3dService.vectorProj(v1, v2)
        expect(v.x).toBeCloseTo(1.48571, 4);
        expect(v.y).toBeCloseTo(4.45714, 4);
        expect(v.z).toBeCloseTo(7.42857, 4);
    })

    it('should return the unit vector', function () {
        let v: Vector3d = v3dService.unit(v1)
        expect(v.x).toBeCloseTo(0.16903, 4);
        expect(v.y).toBeCloseTo(0.50709, 4);
        expect(v.z).toBeCloseTo(0.84515, 4);
    })

    it('should return the Gram Schmidt Orthonormalization vector', function () {
        let v3: Vector3d = { x: 3, y: 4, z: 2 };
        let v: Vector3d[] = v3dService.gramSchmidt(v1, v2, v3)
        expect(v[0].x).toBeCloseTo(0.16903, 4);
        expect(v[0].y).toBeCloseTo(0.50709, 4);
        expect(v[0].z).toBeCloseTo(0.84515, 4);
        expect(v[1].x).toBeCloseTo(0.59669, 4);
        expect(v[1].y).toBeCloseTo(0.62984, 4);
        expect(v[1].z).toBeCloseTo(-0.49724, 4);
        expect(v[2].x).toBeCloseTo(0.78446, 4);
        expect(v[2].y).toBeCloseTo(-0.5883, 4);
        expect(v[2].z).toBeCloseTo(0.19611, 4);
    })

    it('should return the information of a vector as a console.log string', function () {
        spyOn(console, 'log');
        v3dService.toString(v1);
        expect(console.log).toHaveBeenCalledWith('1, 3, 5');
    })
}) 
