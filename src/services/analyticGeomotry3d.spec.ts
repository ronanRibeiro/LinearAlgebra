import { Vector3d } from "src/models/vector3d";
import { AnalyticGeometry3dService } from "./analyticGeomotry3d.Service";
import { Line3d } from "src/models/line3d";
import { Plane } from "src/models/plane";

describe('analyticGeometry3d.Service.ts', function () {
    let ag3dService: AnalyticGeometry3dService;

    let pl1: Plane = { a: 2, b: -3, c: 1, d: 1 }
    let pl2: Plane = { a: 2, b: -3, c: 1, d: 1 } //Coincident p1
    let pl3: Plane = { a: 2, b: -3, c: 1, d: 5 } //Parallel p1
    let pl4: Plane = { a: 3, b: 1, c: -3, d: -2 } //Perpendicular p1
    let pl5: Plane = { a: 4, b: 1, c: -2, d: 1 } //Intersecting p1

    let l1: Line3d = { //Coincident line to pl1
        r: { x: 0, y: 0, z: -1 },
        v: { x: 3, y: 1, z: -3 }
    }
    let l2: Line3d = { //Parallel line to pl1
        r: { x: 0, y: 0, z: 5 },
        v: { x: 3, y: 1, z: -3 }
    }
    let l3: Line3d = { //Perpendicular line to pl1
        r: { x: -1, y: 1, z: -3 },
        v: { x: 2, y: -3, z: 1 }
    }
    let l4: Line3d = { //Intersection line to pl1
        r: { x: -10, y: -3, z: -2 },
        v: { x: -10, y: -3, z: 3 }
    }

    let l5: Line3d = { //Coincident line to l1
        r: { x: 0, y: 0, z: -1 },
        v: { x: 3, y: 1, z: -3 }
    }
    let l6: Line3d = { //Parallel line to l1
        r: { x: 1, y: 1, z: -2 },
        v: { x: 3, y: 1, z: -3 }
    }
    let l7: Line3d = { //Perpendicular line to l1
        r: { x: 0, y: 0, z: -1 },
        v: { x: -1, y: 3, z: 0 }
    }
    let l8: Line3d = { //Intersects line to l1
        r: { x: 0, y: 0, z: -1 },
        v: { x: -2, y: -1, z: -5 }
    }
    let l9: Line3d = { //Skew line to l1
        r: { x: 2, y: 3, z: -4 },
        v: { x: 5, y: 2, z: -6 }
    }
    let l10: Line3d = { //Skew Orthogonal line to l1
        r: { x: 0, y: 0, z: -3 },
        v: { x: -1, y: 3, z: 0 }
    }

    let v0: Vector3d = { x: 1, y: 2, z: 1 };
    let v1: Vector3d = { x: 3, y: 2, z: 2 };

    beforeEach(function () {
        ag3dService = AnalyticGeometry3dService.instance();
    })

    it('should return a line3d given a point/point or point/vector', function () {
        //r0 + t * v
        let l: Line3d = ag3dService.constructLine(v0, v1)
        expect(l.r.x).toBe(1);
        expect(l.r.y).toBe(2);
        expect(l.r.z).toBe(1);
        expect(l.v.x).toBe(2);
        expect(l.v.y).toBe(0);
        expect(l.v.z).toBe(1);
    })

    it('should return a plane given the parameters of a plane ', function () {
        //Ax + By + Cz + D = 0
        expect(pl1.a).toBe(2);
        expect(pl1.b).toBe(-3);
        expect(pl1.c).toBe(1);
        expect(pl1.d).toBe(1);
    })

    it('should return the normal vector of a plane', function () {
        let n: Vector3d = ag3dService.normalVectorPlane(pl1)
        expect(n.x).toBe(2);
        expect(n.y).toBe(-3);
        expect(n.z).toBe(1);
    })

    it('should return the plane given 3 points', function () {
        let p1: Vector3d = { x: 0, y: 0, z: 0 }
        let p2: Vector3d = { x: 1, y: -2, z: 3 }
        let p3: Vector3d = { x: 2, y: 4, z: -1 }
        let p4: Vector3d = { x: 2, y: -4, z: 6 } //Colinear to p2

        let plane: Plane = ag3dService.constructPlane3Points(p1, p2, p3)
        expect(plane.a).toBe(-10);
        expect(plane.b).toBe(7);
        expect(plane.c).toBe(8);
        expect(plane.d).toBe(0);

        expect(function () { ag3dService.constructPlane3Points(p1, p2, p4) }).toThrowError();
    })

    it('should return the plane given a point and the normal vector of the plane', function () {
        let p: Vector3d = { x: 0, y: 2, z: -1 }
        let v: Vector3d = { x: 2, y: 3, z: 4 }

        let plane: Plane = ag3dService.constructPlaneNormalPoint(p, v)
        expect(plane.a).toBe(2);
        expect(plane.b).toBe(3);
        expect(plane.c).toBe(4);
        expect(plane.d).toBe(-2);
    })

    it('should return the plane given two lines', function () {
        expect(function () { ag3dService.constructPlane2Lines(l1, l2) }).toThrowError();

        let line: Line3d = { r: { x: 6, y: 12, z: 3 }, v: { x: -6, y: -12, z: -4 } }
        let plane: Plane = ag3dService.constructPlane2Lines(l1, line)

        //It's correct, but it is not divided by the minimun multiple common
        expect(plane.a).toBeCloseTo(-40, 4);
        expect(plane.b).toBeCloseTo(30, 4);
        expect(plane.c).toBeCloseTo(-30, 4);
        expect(plane.d).toBeCloseTo(-30, 4);
    })


    it('should return the point of the intersection of two lines', function () {
        let v1: Vector3d = ag3dService.intersectionLineLine(l1, l2)
        expect(v1.x).toBe(0);
        expect(v1.y).toBe(0);
        expect(v1.z).toBe(-1);

        let l: Line3d = { //Same line, but l1.r and l2.r is the same point
            r: { x: 0, y: 0, z: -1 },
            v: { x: -10, y: -3, z: 3 }
        }
        let v2: Vector3d = ag3dService.intersectionLineLine(l1, l)
        expect(v1.x).toBe(0);
        expect(v1.y).toBe(0);
        expect(v1.z).toBe(-1);
    })

    it('should return true when the point is in the plane', function () {
        let p1: Vector3d = { x: 1, y: 2, z: -3 }
        let p2: Vector3d = { x: 3, y: 1, z: -4 }

        expect(ag3dService.isPointInPlane(pl1, p1)).toBeFalse();
        expect(ag3dService.isPointInPlane(pl1, p2)).toBeTrue();
    })

    it('should return the equation of the line that is intersection ', function () {
        let pl: Plane = { a: 2, b: -3, c: -3, d: -1 }
        let l: Line3d = ag3dService.lineIntersection2Planes(pl1, pl)

        expect(l.r.x).toBeCloseTo(0, 4);
        expect(l.r.y).toBeCloseTo(0.1666667, 4);
        expect(l.r.z).toBeCloseTo(-0.5, 4);
        expect(l.v.x).toBe(12);
        expect(l.v.y).toBe(8);
        expect(l.v.z).toBe(0);
    })

    it('should return the point that is the intersection of a line and a plane', function () {
        let plane: Plane = { a: 1, b: 0, c: 0, d: 0 }
        let line1: Line3d = ag3dService.constructLine({ x: 2, y: 2, z: 1 }, { x: 2, y: 2, z: 2 }) //parallel
        let line2: Line3d = ag3dService.constructLine({ x: 0, y: 2, z: 0 }, { x: 0, y: 3, z: 0 }) //contain
        let line3: Line3d = ag3dService.constructLine({ x: 0, y: 0, z: 0 }, { x: 1, y: 0, z: 0 }) //perpendicular
        let line4: Line3d = ag3dService.constructLine({ x: 2, y: 0, z: 0 }, { x: 4, y: 3, z: 4 }) //Intersect

        let point1: Vector3d = ag3dService.commonPointLinePlane(line3, plane)
        let point2: Vector3d = ag3dService.commonPointLinePlane(line4, plane)

        expect(function () { ag3dService.commonPointLinePlane(line1, plane) }).toThrowError();
        expect(function () { ag3dService.commonPointLinePlane(line2, plane) }).toThrowError();
        expect(point1).toEqual({ x: 0, y: 0, z: 0 });
        expect(point2).toEqual({ x: 0, y: -3, z: -4 });
    })

    it('should return the translated plane given a plane and a vector', function () {
        expect(ag3dService.translatePlaneVector(pl1, v0)).toEqual({ a: 2, b: -3, c: 1, d: -2 })
        expect(ag3dService.translatePlaneVector(pl1, v1)).toEqual({ a: 2, b: -3, c: 1, d: 3 })
    })

    it('should return the distance between two points', function () {
        let point: Vector3d = { x: -2, y: 0, z: 5 }
        expect(ag3dService.distancePointPoint(v0, v1)).toBeCloseTo(2.23606, 4)
        expect(ag3dService.distancePointPoint(v0, point)).toBeCloseTo(5.38516, 4)
        expect(ag3dService.distancePointPoint(v1, point)).toBeCloseTo(6.16441, 4)
    })

    it('should return the distance between a point and a line', function () {
        expect(ag3dService.distancePointLine(v0, l5)).toBeCloseTo(2.99121, 4)
        expect(ag3dService.distancePointLine(v0, l9)).toBeCloseTo(2.43689, 4)
        expect(ag3dService.distancePointLine(v1, l5)).toBeCloseTo(4.66791, 4)
        expect(ag3dService.distancePointLine(v1, l9)).toBeCloseTo(4.60935, 4)
    })

    it('should return the distance between a point and a plane', function () {
        expect(ag3dService.distancePointPlane(v0, pl2)).toBeCloseTo(0.53452, 4)
        expect(ag3dService.distancePointPlane(v0, pl4)).toBeCloseTo(0, 4)
        expect(ag3dService.distancePointPlane(v1, pl2)).toBeCloseTo(0.80178, 4)
        expect(ag3dService.distancePointPlane(v1, pl4)).toBeCloseTo(0.68824, 4)
    })

    it('should return the distance between two lines', function () {
        expect(ag3dService.distanceLineLine(l1, l1)).toBeCloseTo(0, 4)
        expect(ag3dService.distanceLineLine(l1, l2)).toBeCloseTo(4.35285, 4)
        expect(ag3dService.distanceLineLine(l1, l3)).toBeCloseTo(1.28759, 4)
        expect(ag3dService.distanceLineLine(l1, l4)).toBeCloseTo(0.18295, 4)
        expect(ag3dService.distanceLineLine(l2, l3)).toBeCloseTo(5.33431, 4)
        expect(ag3dService.distanceLineLine(l2, l4)).toBeCloseTo(0.45738, 4)
        expect(ag3dService.distanceLineLine(l3, l4)).toBeCloseTo(2.05773, 4)
    })

    it('should return the distance between a line and a plane', function () {
        let line1: Line3d = { r: { x: 0, y: 2, z: -1 }, v: { x: 3, y: 1, z: -3 } };
        let line2: Line3d = { r: { x: 1, y: 2, z: -1 }, v: { x: 2, y: -3, z: 1 } };

        expect(ag3dService.distanceLinePlane(line1, pl2)).toBeCloseTo(1.60356, 4)
        expect(ag3dService.distanceLinePlane(line1, pl4)).toBeCloseTo(0, 4)
        expect(ag3dService.distanceLinePlane(line2, pl2)).toBeCloseTo(0, 4)
        expect(ag3dService.distanceLinePlane(line2, pl4)).toBeCloseTo(1.37649, 4)
    })

    it('should return the distance between two planes', function () {
        expect(ag3dService.distancePlanePlane(pl1, pl2)).toBe(0)
        expect(ag3dService.distancePlanePlane(pl1, pl3)).toBeCloseTo(1.06904, 4)
        expect(ag3dService.distancePlanePlane(pl1, pl4)).toBe(0)
    })

    it('should return the angle between two lines in radians', function () {
        expect(ag3dService.angleLineLine(l1, l1)).toBe(0)
        expect(ag3dService.angleLineLine(l1, l2)).toBe(0)
        expect(ag3dService.angleLineLine(l1, l3)).toBeCloseTo(Math.PI/2, 2)
        expect(ag3dService.angleLineLine(l1, l4)).toBeCloseTo(2.662, 2)
        expect(ag3dService.angleLineLine(l2, l3)).toBeCloseTo(Math.PI/2, 2)
        expect(ag3dService.angleLineLine(l2, l4)).toBeCloseTo(2.662, 2)
        expect(ag3dService.angleLineLine(l3, l4)).toBeCloseTo(1.769, 2)
    })

    it('should return the angle between a line and a plane in radians', function () {
        expect(ag3dService.angleLinePlane(l1, pl1)).toBeCloseTo(0, 4)
        expect(ag3dService.angleLinePlane(l1, pl3)).toBeCloseTo(0, 4)
        expect(ag3dService.angleLinePlane(l1, pl4)).toBeCloseTo(1.57080, 4)
        expect(ag3dService.angleLinePlane(l2, pl1)).toBeCloseTo(0, 4)
        expect(ag3dService.angleLinePlane(l2, pl4)).toBeCloseTo(1.57080, 4)
        expect(ag3dService.angleLinePlane(l3, pl3)).toBeCloseTo(1.57080, 4)
        expect(ag3dService.angleLinePlane(l3, pl4)).toBeCloseTo(0, 4)
    })

    it('should return the angle between two planes in radians', function () {
        expect(ag3dService.anglePlanePlane(pl1, pl1)).toBeCloseTo(0, 4)
        expect(ag3dService.anglePlanePlane(pl1, pl3)).toBeCloseTo(0, 4)
        expect(ag3dService.anglePlanePlane(pl1, pl4)).toBeCloseTo(Math.PI/2, 4)
        expect(ag3dService.anglePlanePlane(pl1, pl5)).toBeCloseTo(1.39492, 4)

    })

    //Relation Line/Line
    it('should return true when two lines are coincidents', function () {
        expect(ag3dService.lineLineIsCoincident(l1, l5)).toBeTrue();
        expect(ag3dService.lineLineIsCoincident(l1, l6)).toBeFalse();
        expect(ag3dService.lineLineIsCoincident(l1, l7)).toBeFalse();
        expect(ag3dService.lineLineIsCoincident(l1, l8)).toBeFalse();
        expect(ag3dService.lineLineIsCoincident(l1, l9)).toBeFalse();
        expect(ag3dService.lineLineIsCoincident(l1, l10)).toBeFalse();
    })

    it('should return true when two lines are parallels', function () {
        expect(ag3dService.lineLineIsParallel(l1, l5)).toBeFalse();
        expect(ag3dService.lineLineIsParallel(l1, l6)).toBeTrue();
        expect(ag3dService.lineLineIsParallel(l1, l7)).toBeFalse();
        expect(ag3dService.lineLineIsParallel(l1, l8)).toBeFalse();
        expect(ag3dService.lineLineIsParallel(l1, l9)).toBeFalse();
        expect(ag3dService.lineLineIsParallel(l1, l10)).toBeFalse();
    })

    it('should return true when two lines are perpendiculars', function () {
        expect(ag3dService.lineLineIsPerpendicular(l1, l5)).toBeFalse();
        expect(ag3dService.lineLineIsPerpendicular(l1, l6)).toBeFalse();
        expect(ag3dService.lineLineIsPerpendicular(l1, l7)).toBeTrue();
        expect(ag3dService.lineLineIsPerpendicular(l1, l8)).toBeFalse();
        expect(ag3dService.lineLineIsPerpendicular(l1, l9)).toBeFalse();
        expect(ag3dService.lineLineIsPerpendicular(l1, l10)).toBeFalse();
    })

    it('should return true when two lines intersects', function () {
        expect(ag3dService.lineLineIsIntersect(l1, l5)).toBeFalse();
        expect(ag3dService.lineLineIsIntersect(l1, l6)).toBeFalse();
        expect(ag3dService.lineLineIsIntersect(l1, l7)).toBeFalse();
        expect(ag3dService.lineLineIsIntersect(l1, l8)).toBeTrue();
        expect(ag3dService.lineLineIsIntersect(l1, l9)).toBeFalse();
        expect(ag3dService.lineLineIsIntersect(l1, l10)).toBeFalse();
    })

    it('should return true when two lines are skew', function () {
        expect(ag3dService.lineLineIsSkew(l1, l5)).toBeFalse();
        expect(ag3dService.lineLineIsSkew(l1, l6)).toBeFalse();
        expect(ag3dService.lineLineIsSkew(l1, l7)).toBeFalse();
        expect(ag3dService.lineLineIsSkew(l1, l8)).toBeFalse();
        expect(ag3dService.lineLineIsSkew(l1, l9)).toBeTrue();
        expect(ag3dService.lineLineIsSkew(l1, l10)).toBeFalse();
    })

    it('should return true when two lines are skew and orthogonal', function () {
        expect(ag3dService.lineLineIsSkewOrthogonal(l1, l5)).toBeFalse();
        expect(ag3dService.lineLineIsSkewOrthogonal(l1, l6)).toBeFalse();
        expect(ag3dService.lineLineIsSkewOrthogonal(l1, l7)).toBeFalse();
        expect(ag3dService.lineLineIsSkewOrthogonal(l1, l8)).toBeFalse();
        expect(ag3dService.lineLineIsSkewOrthogonal(l1, l9)).toBeFalse();
        expect(ag3dService.lineLineIsSkewOrthogonal(l1, l10)).toBeTrue();
    })

    //Relation Plane/Line
    it('should return true when a plane contain a line', function () {
        expect(ag3dService.linePlaneIsCoincident(l1, pl1)).toBeTrue();
        expect(ag3dService.linePlaneIsCoincident(l2, pl1)).toBeFalse();
        expect(ag3dService.linePlaneIsCoincident(l3, pl1)).toBeFalse();
        expect(ag3dService.linePlaneIsCoincident(l4, pl1)).toBeFalse();
    })

    it('should return true when a line is parallel to a plane', function () {
        expect(ag3dService.linePlaneIsParallel(l1, pl1)).toBeFalse();
        expect(ag3dService.linePlaneIsParallel(l2, pl1)).toBeTrue();
        expect(ag3dService.linePlaneIsParallel(l3, pl1)).toBeFalse();
        expect(ag3dService.linePlaneIsParallel(l4, pl1)).toBeFalse();
    })

    it('should return true when a line is perpendicular to a plane', function () {
        expect(ag3dService.linePlaneIsPerpendicular(l1, pl1)).toBeFalse();
        expect(ag3dService.linePlaneIsPerpendicular(l2, pl1)).toBeFalse();
        expect(ag3dService.linePlaneIsPerpendicular(l3, pl1)).toBeTrue();
        expect(ag3dService.linePlaneIsPerpendicular(l4, pl1)).toBeFalse();
    })

    it('should return true when a line intersects a plane', function () {
        expect(ag3dService.linePlaneIsIntersect(l1, pl1)).toBeFalse();
        expect(ag3dService.linePlaneIsIntersect(l2, pl1)).toBeFalse();
        expect(ag3dService.linePlaneIsIntersect(l3, pl1)).toBeFalse();
        expect(ag3dService.linePlaneIsIntersect(l4, pl1)).toBeTrue();
    })

    //Relation Plane/Plane
    it('should return true when two planes are coincident', function () {
        expect(ag3dService.planePlaneIsCoincident(pl1, pl2)).toBeTrue();
        expect(ag3dService.planePlaneIsCoincident(pl1, pl3)).toBeFalse();
        expect(ag3dService.planePlaneIsCoincident(pl1, pl4)).toBeFalse();
        expect(ag3dService.planePlaneIsCoincident(pl1, pl5)).toBeFalse();
    })

    it('should return true when two planes are parallels', function () {
        expect(ag3dService.planePlaneIsParallel(pl1, pl2)).toBeFalse();
        expect(ag3dService.planePlaneIsParallel(pl1, pl3)).toBeTrue();
        expect(ag3dService.planePlaneIsParallel(pl1, pl4)).toBeFalse();
        expect(ag3dService.planePlaneIsParallel(pl1, pl5)).toBeFalse();
    })

    it('should return true when two planes are perpendiculars', function () {
        expect(ag3dService.planePlaneIsPerpendicular(pl1, pl2)).toBeFalse();
        expect(ag3dService.planePlaneIsPerpendicular(pl1, pl3)).toBeFalse();
        expect(ag3dService.planePlaneIsPerpendicular(pl1, pl4)).toBeTrue();
        expect(ag3dService.planePlaneIsPerpendicular(pl1, pl5)).toBeFalse();
    })

    it('should return true when two planes intersects', function () {
        expect(ag3dService.planePlaneIsIntersect(pl1, pl2)).toBeFalse();
        expect(ag3dService.planePlaneIsIntersect(pl1, pl3)).toBeFalse();
        expect(ag3dService.planePlaneIsIntersect(pl1, pl4)).toBeFalse();
        expect(ag3dService.planePlaneIsIntersect(pl1, pl5)).toBeTrue();
    })

    //Utils

})


