import { Line2d } from "src/models/line2d";
import { AnalyticGeometry2dService } from "./analyticGeomotry2d.Service";
import { Vector2d } from "src/models/vector2d";

describe('analyticGeometry2d.Service.ts', function () {
    let ag2dService: AnalyticGeometry2dService;

    let l1: Line2d = { a: 3, b: -1, c: 1 } //Base Line
    let l2: Line2d = { a: 3, b: -1, c: 1 }; //Coincident
    let l3: Line2d = { a: 3, b: -1, c: -3}; // Parallel
    let l4: Line2d = { a: -1 / 3, b: -1, c: 2 }; // Perpendicular
    let l5: Line2d = { a: 2, b: -1, c: 3 }; // Instercet

    beforeEach(function () {
        ag2dService = AnalyticGeometry2dService.instance();
    })

    it('should return a line equation given the parameters a and b', function () {
        //Slope form: y = ax + b
        expect(ag2dService.constructEquationIntercept(3, 1)).toEqual(l1);
    })

    it('should return a line equation given the paramaters of the standard formula', function () {
        //Standard Formula --> ax + by + c = 0
        expect(ag2dService.constructEquationStandard(3, -1, 1)).toEqual(l1);
    })

    it('should return a line equation given a point and a point/vector', function () {
        let p1: Vector2d = { x: 0, y: 1 };
        let p2: Vector2d = { x: 2, y: 7 };
        expect(ag2dService.constructPointPointdOrVector(p1, p2)).toEqual(l1);
    })

    it('should return a line equation given a point and a slope', function () {
        //Slope is in RAD
        let p: Vector2d = { x: 0, y: 1 };
        expect(ag2dService.constructPointSlope(p, 3)).toEqual(l1);
    })

    it('should return a line equation given a point and an angle', function () {
        //Same as before,but now the angle is in Degree
        let p: Vector2d = { x: 0, y: 1 };
        let l: Line2d = ag2dService.constructPointAngle(p, 71.565)
        expect(l.a).toBeCloseTo(l1.a, 4);
        expect(l.b).toBeCloseTo(l1.b, 4);
    })

    it('should return Y given a line and a X', function () {
        expect(ag2dService.interpolationX(l1, 2)).toEqual(7);
    })

    it('should return X given a line and a Y', function () {
        expect(ag2dService.interpolationY(l1, 4)).toEqual(1);
    })

    it('should return the mid point of two given points', function () {
        expect(ag2dService.midPoint({ x: 3, y: 4 }, ({ x: 5, y: 2 }))).toEqual({ x: 4, y: 3 });
    })

    it('should return the intersection point of two given lines', function () {
        expect(ag2dService.intersection(l1, l5)).toEqual({ x: 2, y: 7 });
        expect(function() {ag2dService.intersection(l1, l3)}).toThrowError();
    })

    it('should return the equation of a line that is parallel of a given line and pass through a point given', function () {
        let p1: Vector2d = { x: 0, y: 1 };
        let p2: Vector2d = { x: 0, y: 3 };
        expect(function() { ag2dService.parallelLinePoint(l1, p1)}).toThrowError();
        expect(ag2dService.parallelLinePoint(l1, p2)).toEqual({ a: 3, b: -1, c: 3 });
    })

    it('should return the equation of the line that is perpendicular to a given line and pass through the given point', function () {
        let p1: Vector2d = { x: 1.5, y: 5.5 };
        expect(ag2dService.perpendicularLinePoint(l1, p1)).toEqual({ a: 1, b: 3, c: -18 });
    })

    it('should return the equation of the line that is perpendicular and pass through the mid point of two given points', function () {
        let p1: Vector2d = { x: 0, y: 0 };
        let p2: Vector2d = { x: 2, y: 2 };
        expect(ag2dService.perpendicularBisector(p1, p2)).toEqual({ a: 1, b: 1, c: -2 });

    })

    it('should return the distance between two points', function () {
        let p1: Vector2d = { x: 1, y: 2 };
        let p2: Vector2d = { x: 5, y: 5 };
        expect(ag2dService.distancePointPoint(p1, p2)).toBe(5);
        expect(ag2dService.distancePointPoint(p1, p1)).toBe(0);
    })

    it('should return the distance between a line and a point', function () {
        let p1: Vector2d = { x: 1.5, y: 5.5 };
        let p2: Vector2d = { x: 6, y: 4};
        expect(ag2dService.distancePointLine(p1, l1)).toBe(0);
        expect(ag2dService.distancePointLine(p2, l1)).toBeCloseTo(4.74341,4);
    })

    it('should return the distance between two lines', function () {
        expect(ag2dService.distanceLineLine(l1, l2)).toBe(0);
        expect(ag2dService.distanceLineLine(l1, l3)).toBeCloseTo(1.26491 , 4);
        expect(ag2dService.distanceLineLine(l1, l4)).toBe(0);
        expect(ag2dService.distanceLineLine(l1, l5)).toBe(0);
    })

    it('should return the angle between two lines', function () {
        expect(ag2dService.angleLineLine(l1, l2)).toBe(0);
        expect(ag2dService.angleLineLine(l1, l3)).toBe(0);
        expect(ag2dService.angleLineLine(l1, l4)).toBe(0.5*Math.PI);
        expect(ag2dService.angleLineLine(l1, l5)).toBeCloseTo(0.14189, 4);
    })

    it('should return true if the lines are coincidents, false if dont', function () {
        expect(ag2dService.isCoincident(l1, l2)).toBeTrue();
        expect(ag2dService.isCoincident(l1, l3)).toBeFalse();
        expect(ag2dService.isCoincident(l1, l4)).toBeFalse();
        expect(ag2dService.isCoincident(l1, l5)).toBeFalse();
    })

    it('should return true if the lines are parallels, false if dont', function () {
        expect(ag2dService.isParallel(l1, l2)).toBeTrue();
        expect(ag2dService.isParallel(l1, l3)).toBeTrue();
        expect(ag2dService.isParallel(l1, l4)).toBeFalse();
        expect(ag2dService.isParallel(l1, l5)).toBeFalse();
    })

    it('should return true if the lines are perpendiculars, false if dont', function () {
        expect(ag2dService.isPerpendicular(l1, l2)).toBeFalse();
        expect(ag2dService.isPerpendicular(l1, l3)).toBeFalse();
        expect(ag2dService.isPerpendicular(l1, l4)).toBeTrue();
        expect(ag2dService.isPerpendicular(l1, l5)).toBeFalse();

        let lx: Line2d = {a: 0, b: 2, c: 1};
        let ly: Line2d = {a: 1, b: 0, c: 2};

        expect(ag2dService.isPerpendicular(lx, ly)).toBeTrue();
    })

    it('should return true if the lines intersects, false if dont', function () {
        expect(ag2dService.isIntersect(l1, l2)).toBeFalse();
        expect(ag2dService.isIntersect(l1, l3)).toBeFalse();
        expect(ag2dService.isIntersect(l1, l4)).toBeTrue();
        expect(ag2dService.isIntersect(l1, l5)).toBeTrue();
    })

    //Utils
    it('should return the information of the equation of the line as a console.log string', function () {
        spyOn(console, 'log');
        let l: Line2d = {a: 2, b: 0, c: 0}
        ag2dService.lineToString(l);
        l = {a: -2, b: 1, c: 0}
        ag2dService.lineToString(l);
        l = {a: 4, b: -3, c: 2}
        ag2dService.lineToString(l);
        l = {a: 0, b: 1, c: -6}
        ag2dService.lineToString(l);

        expect(console.log).toHaveBeenCalledWith('2x = 0');
        expect(console.log).toHaveBeenCalledWith('-2x + 1y = 0');
        expect(console.log).toHaveBeenCalledWith('4x - 3y + 2 = 0');
        expect(console.log).toHaveBeenCalledWith('+ 1y - 6 = 0');
    })
})