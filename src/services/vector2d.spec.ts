import { Vector2d } from "src/models/vector2d";
import { Vector2dService } from "./vector2d.Service";

describe('vector2d.Service.ts', function () {
    let v2dService: Vector2dService;
    let v1: Vector2d = {x: 3, y: 4};
    let v2: Vector2d = {x: 2, y: 5};


    beforeEach(function () {
      v2dService = Vector2dService.instance();
    })

    it('should return the length of the vector', function () {
        expect(v2dService.length(v1)).toBe(5);
    })

    it('should return the angle of two vectors', function () {
        //The limits are PI and 0; PI for perpendicual and 0 for parallel
        expect(v2dService.angle(v1,v1)).toBe(0); //Pparallel - same vector
        expect(v2dService.angle(v1,v2dService.byScalar(v1,-1))).toBe(Math.PI); //Perpendicular
        expect(v2dService.angle(v1,v2)).toBeCloseTo(0.26299,5);
    })

    it('should return the sum of two vectors', function () {
        expect(v2dService.add(v1,v2)).toEqual({x: 5, y: 9});
    })

    it('should return the subtraction of two vectors', function () {
        expect(v2dService.minus(v1,v2)).toEqual({x: 1, y: -1});
    })

    it('should return the multiplication of a vector by a scalar', function () {
        expect(v2dService.byScalar(v1,3)).toEqual({x: 9, y: 12});
    })

    it('should return the dot product of two vectors', function () {
        expect(v2dService.dotProduct(v1,v2)).toBe(26);
    })

    it('should return the cross product of two vectors', function () {
        expect(v2dService.crossProduct(v1,v2)).toBe(7);
    })

    it('should return the scalar projection of a vector in other one', function () {
        expect(v2dService.scalarProj(v1,v2)).toBe(5.2);
    })

    it('should return the vector projection of a vector in other one', function () {
        expect(v2dService.vectorProj(v1,v2)).toEqual({x: 3.12, y: 4.16});
    })

    it('should return the unit vector', function () {
        let v: Vector2d = v2dService.unit(v1)
        expect(v.x).toBeCloseTo(0.6, 5);
        expect(v.y).toBeCloseTo(0.8, 5);
    })

    it('should return the Gram Schmidt Orthonormalization vector', function () {
        let v: Vector2d[] = v2dService.gramSchmidt(v1,v2)
        expect(v[0].x).toBeCloseTo(0.6, 5);
        expect(v[0].y).toBeCloseTo(0.8, 5);
        expect(v[1].x).toBeCloseTo(-0.8, 5);
        expect(v[1].y).toBeCloseTo(0.6, 5);
    })

    it('should return the information of a vector as a console.log string', function () {
        spyOn(console, 'log');
        v2dService.toString(v1);
        expect(console.log).toHaveBeenCalledWith('3, 4');
    })
}) 