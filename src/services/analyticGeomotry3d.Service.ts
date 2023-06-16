import { Line3d } from "../models/line3d";
import { TypeRelationLinePlane } from "../enums/typeRelationLinePlane";
import { Vector3d } from "../models/vector3d";
import { MathService } from "./math.Service";
import { Plane } from "../models/plane";
import { Vector3dService } from "./vector3d.Service";
import { Vector2dService } from "./vector2d.Service";
;

export class AnalyticGeometry3dService {
    //Domain in R3 --> Point (Vector3d), Line (Line3d) and Plane (Plane)

    constructor(
        private mathService: MathService,
        private vector3dService: Vector3dService
    ) { }

    static instance() {
        const instance = new AnalyticGeometry3dService
    (
            MathService.instance(),
            Vector3dService.instance()
        );
        return instance;
    }

    //Geometry Constructors
    //Contructor of the point is already the Vector3d
    //Contructor of lines -->  = r0 + t * v
    public constructLine(p: Vector3d, v: Vector3d): Line3d {
        //y = ax + b
        return {
            r: { x: p.x, y: p.y, z: p.z },
            v: { x: v.x, y: v.y, z: v.z }
        };
    }

    //Contructor of planes --> ax + by + cz + d = 0
    public constructPlane(a: number, b: number, c: number, d: number): Plane {
        //y = ax + b
        return { a: a, b: b, c: c, d: d };
    }

    public normalVectorPlane(p: Plane): Vector3d {
        return { x: p.a, y: p.b, z: p.c };
    }

    public constructPlane3Points(p1: Vector3d, p2: Vector3d, p3: Vector3d): Plane {
        // n = (p2-p1) x (p3-p1)
        let n: Vector3d = this.vector3dService.crossProduct(this.vector3dService.minus(p2, p1), this.vector3dService.minus(p3, p1));
        if (n.x === 0 && n.y === 0 && n.z === 0) {
            let d: number = -(p1.x * n.x + p1.y * n.y + p1.z * n.z)
            return { a: n.x, b: n.y, c: n.z, d: d };
        }
        else {
            throw Error('These are colinear points')
        }
    }

    public constructPlaneNormalPoint(p: Vector3d, v: Vector3d): Plane {
        let d: number = -v.x * p.x - v.y * p.y - v.z * p.z;
        return { a: v.x, b: v.y, c: v.z, d: d };
    }

    public constructPlane2Lines(l1: Line3d, l2: Line3d): Plane {
        if (this.lineLineIsIntersect(l1, l2)) {
            let n: Vector3d = this.vector3dService.crossProduct(l1.v, l2.v); //normal vector
            let p: Vector3d = this.intersectionLineLine(l1, l2);
            return this.constructPlaneNormalPoint(p, n);
        } else {
            throw Error('The lines doesnt form an plane')
        }
    }

    //Line 3d Operation
    public intersectionLineLine(l1: Line3d, l2: Line3d): Vector3d {
        //solve intersection
        let s: number = (-l2.r.x + (l1.v.x / l1.v.y) * l2.r.y - l1.r.x - (l1.v.x / l1.v.y) * l1.r.y) / (l1.v.x - (l1.v.x / l1.v.y) * l1.v.x);
        return { x: l2.r.x + s * l2.v.x, y: l2.r.y + s * l2.v.y, z: l2.r.z + s * l2.v.z };
    }

    //PLane Operation
    public isPointInPlane(pl: Plane, po: Vector3d): boolean {
        if (this.mathService.isAlmostEqual(pl.a * po.x + pl.b * po.y + pl.c * po.z + pl.d, 0)) {
            return true;
        } else {
            return false;
        }
    }

    public lineIntersection2Planes(p1: Plane, p2: Plane): Line3d {
        if (this.planePlaneIsIntersect(p1, p2)) {
            let v: Vector3d = this.vector3dService.crossProduct(this.normalVectorPlane(p1), this.normalVectorPlane(p2)); //vector of the line is n1 x n2
            let p: Vector3d = { x: 0, y: 0, z: -p1.d / p1.c } //substitute x=0 and y=0
            return { r: p, v: v };
        } else {
            throw Error('The planes dont intersect')
        }
    }

    public commonPointLinePlane(l: Line3d, p: Plane): Vector3d {
        if (this.linePlaneIsCoincident(l,p)) {
            let t: number = -(p.a*l.r.x+p.b*l.r.y+p.c*l.r.y+p.d) / (p.a*l.v.x+p.b*l.v.y+p.c*l.v.y); // solve Ax + By + Cz + D = 0 for r + t.v
            return this.vector3dService.add(l.r,this.vector3dService.byScalar(l.v,t));
        } else {
            throw Error('The line and plane dont intersect')
        }
    }

    public translatePlaneVector(p: Plane, v: Vector3d): Plane {
        return {a: p.a, b: p.b, c: p.c, d: p.a*v.x+p.b*v.y+p.c*v.z+p.d}; //D' = D + n . t
    }


    //Distance
    //Point - Point
    public distancePointPoint(p1: Vector3d, p2: Vector3d): number {
        //Sqrt of the sum of the squares of the differences of their coordinate
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));
    }

    //Point - Line
    public distancePointLine(p: Vector3d, l: Line3d): number {
        // ||(r0 - r1) x v|| / ||v||
        let v: Vector3d = { x: p.x - l.r.x, y: p.y - l.r.y, z: p.z - l.r.z }; //ro-r1
        return this.vector3dService.length(this.vector3dService.crossProduct(v, l.v)) / this.vector3dService.length(l.v);
    }

    //Point - Plane
    public distancePointPlane(po: Vector3d, pl: Plane): number {
        // |(r0 - r1) . n| / ||n||
        let v0: Vector3d = { x: po.x - pl.a, y: po.y - pl.b, z: po.x - pl.c }; //ro-r1
        let v1: Vector3d = { x: pl.a, y: pl.b, z: pl.c }; //n
        return this.vector3dService.length(this.vector3dService.crossProduct(v0, v1)) / this.vector3dService.length(v1);
    }

    //Line - Line 
    public distanceLineLine(l1: Line3d, l2: Line3d): number {
        if (this.lineLineIsParallel(l1, l2)) {
            //||(r2 - r1) x v|| / ||v||
            let v: Vector3d = this.vector3dService.minus(l2.r, l1.r); //r2-r1
            return this.vector3dService.length(this.vector3dService.crossProduct(v, l2.v)) / this.vector3dService.length(l2.v);
        } else if (this.lineLineIsSkew(l1, l2) || this.lineLineIsSkewOrhogonal(l1, l2)) {
            //|(r2 - r1) . (v1 x v2)| / ||v1 x v2||
            let v: Vector3d = this.vector3dService.minus(l2.r, l1.r); //r2-r1
            return Math.abs(this.vector3dService.dotProduct(v, this.vector3dService.crossProduct(l1.v, l2.v))) / this.vector3dService.length(this.vector3dService.crossProduct(l1.v, l2.v));
        } else {
            return 0;
        }
    }

    //Line - Plane
    public distanceLinePlane(l: Line3d, p: Plane): number {
        if (this.linePlaneIsParallel(l, p)) {
            //||(r2 - r1) . n|| / ||n|| 
            let v: Vector3d = this.vector3dService.minus(l.r, { x: 0, y: 0, z: -p.d / p.c }); //Any point of line - Any point of plane
            return Math.abs(this.vector3dService.dotProduct(v, this.normalVectorPlane(p))) / this.vector3dService.length(this.normalVectorPlane(p));
        } else {
            return 0;
        }
    }

    //Plane - Plane
    public distancePlanePlane(p1: Plane, p2: Plane): number {
        if (this.planePlaneIsParallel(p1, p2)) {
            //||(r2 - r1) . n|| / ||n|| 
            let v: Vector3d = this.vector3dService.minus({ x: 0, y: 0, z: -p1.d / p1.c }, { x: 0, y: 0, z: -p2.d / p2.c }); //Any point of plane 1 - Any point of plane 2
            return Math.abs(this.vector3dService.dotProduct(v, this.normalVectorPlane(p1))) / this.vector3dService.length(this.normalVectorPlane(p1));
        } else {
            return 0;
        }
    }


    //Relative Angles
    //Line - Line
    public angleLineLine(l1: Line3d, l2: Line3d): number {
        if (this.lineLineIsPerpendicular(l1, l2)) {
            return 90;
        } else if (this.lineLineIsIntersect(l1, l2)) {
            //The angle of the lines are = |(l1 . l2|/||l1||*||l2||
            return Math.atan(Math.abs(this.vector3dService.dotProduct(l1.v, l2.v)) / (this.vector3dService.length(l1.v) * this.vector3dService.length(l2.v)));
        } else {
            return 0;
        }
    }

    //Line - Plane
    public angleLinePlane(l: Line3d, p: Plane): number {
        if (this.linePlaneIsPerpendicular(l, p)) {
            return 90;
        } else if (this.linePlaneIsIntersect(l, p)) {
            //The angle of the lines are = |(r . n|/||r||*||n||
            return Math.atan(Math.abs(this.vector3dService.dotProduct(l.v, this.normalVectorPlane(p))) / (this.vector3dService.length(l.v) * this.vector3dService.length(this.normalVectorPlane(p))));
        } else {
            return 0;
        }
    }

    //Plane - Plane
    public anglePlanePlane(p1: Plane, p2: Plane): number {
        if (this.planePlaneIsPerpendicular(p1, p2)) {
            return 90;
        } else if (this.planePlaneIsIntersect(p1, p2)) {
            //The angle of the lines are = |(n1 . n2|/||n1||*||n2||
            return Math.atan(Math.abs(this.vector3dService.dotProduct(this.normalVectorPlane(p1), this.normalVectorPlane(p2))) / (this.vector3dService.length(this.normalVectorPlane(p1)) * this.vector3dService.length(this.normalVectorPlane(p2))));
        } else {
            return 0;
        }
    }

    //Relations of Line-Line
    private relationLineLine(l1: Line3d, l2: Line3d): TypeRelationLinePlane {
        if (l1.v.x / l2.v.x === l1.v.y / l2.v.y && l1.v.y / l2.v.y === l1.v.z / l2.v.z) {
            //The Lines are dependent 
            if ((l1.r.x - l2.r.x) / l2.v.x === (l1.r.y - l2.r.y) / l2.v.y && (l1.r.y - l2.r.y) / l2.v.y === (l1.r.z - l2.r.z) / l2.v.z) {
                //A point of l1 belongs to l2
                return TypeRelationLinePlane.Coincident;
            } else {
                return TypeRelationLinePlane.Parallel;
            }
        } else if ((l1.r.x - l2.r.x) / l2.v.x === (l1.r.y - l2.r.y) / l2.v.y && (l1.r.y - l2.r.y) / l2.v.y === (l1.r.z - l2.r.z) / l2.v.z) {
            //A point of l1 belongs to l2
            if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l1.v, l2.v), 0)) {
                //Dot Product of two vector is 0 when the angle is 90º
                return TypeRelationLinePlane.Perpendicular;
            } else {
                return TypeRelationLinePlane.Intersecting;
            }
        } else {
            if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l1.v, l2.v), 0)) {
                return TypeRelationLinePlane.SkewOrthogonal;
            } else {
                return TypeRelationLinePlane.Skew;
            }
        }
    }

    //Test type of relation of Line-Line
    public lineLineIsCoincident(l1: Line3d, l2: Line3d): boolean {
        return this.relationLineLine(l1, l2) === TypeRelationLinePlane.Coincident;
    }

    public lineLineIsParallel(l1: Line3d, l2: Line3d): boolean {
        return this.relationLineLine(l1, l2) === TypeRelationLinePlane.Parallel;
    }

    public lineLineIsPerpendicular(l1: Line3d, l2: Line3d): boolean {
        return this.relationLineLine(l1, l2) === TypeRelationLinePlane.Perpendicular;
    }

    public lineLineIsIntersect(l1: Line3d, l2: Line3d): boolean {
        return this.relationLineLine(l1, l2) === TypeRelationLinePlane.Intersecting;
    }

    public lineLineIsSkew(l1: Line3d, l2: Line3d): boolean {
        return this.relationLineLine(l1, l2) === TypeRelationLinePlane.Skew;
    }

    public lineLineIsSkewOrhogonal(l1: Line3d, l2: Line3d): boolean {
        return this.relationLineLine(l1, l2) === TypeRelationLinePlane.SkewOrthogonal;
    }

    //Relations of Line-Plane
    private relationLinePlane(l: Line3d, p: Plane): TypeRelationLinePlane {
        if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l.v, this.normalVectorPlane(p)), 0)) {
            //The lines are parallels
            if (this.mathService.isAlmostEqual((l.r.x * p.a + l.r.y * p.b + l.r.z * p.c + p.d), 0)) {
                //A point of the line is inside the plane
                return TypeRelationLinePlane.Coincident;
            } else {
                return TypeRelationLinePlane.Parallel;
            }
        } else {
            if (l.v.x / p.a === l.v.y / p.b && l.v.y / p.b === l.v.z / p.c) {
                //Linear dependent
                return TypeRelationLinePlane.Perpendicular;
            } else {
                return TypeRelationLinePlane.Intersecting;
            }
        }
    }

    //Test type of relation of Line-Plane
    public linePlaneIsCoincident(l: Line3d, p: Plane): boolean {
        return this.relationLinePlane(l, p) === TypeRelationLinePlane.Coincident
    }

    public linePlaneIsParallel(l: Line3d, p: Plane): boolean {
        return this.relationLinePlane(l, p) === TypeRelationLinePlane.Parallel
    }

    public linePlaneIsPerpendicular(l: Line3d, p: Plane): boolean {
        return this.relationLinePlane(l, p) === TypeRelationLinePlane.Perpendicular
    }

    public linePlaneIsIntersect(l: Line3d, p: Plane): boolean {
        return this.relationLinePlane(l, p) === TypeRelationLinePlane.Intersecting
    }


    //Relations of Plane-Plane
    private relationPlanePlane(p1: Plane, p2: Plane): TypeRelationLinePlane {
        if (p1.a / p2.a === p1.b / p2.b && p1.b / p2.b === p1.c / p2.c) {
            //Linear Dependent
            if (p1.d === p2.d) {
                return TypeRelationLinePlane.Coincident;
            } else {
                return TypeRelationLinePlane.Parallel;
            }
        } else {
            if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(this.normalVectorPlane(p1), this.normalVectorPlane(p2)), 0)) {
                return TypeRelationLinePlane.Perpendicular;
            } else {
                return TypeRelationLinePlane.Intersecting;
            }
        }
    }

    //Test type of relation of Plane-Plane
    public planePlaneIsCoincident(p1: Plane, p2: Plane): boolean {
        return this.relationPlanePlane(p1, p2) === TypeRelationLinePlane.Coincident
    }

    public planePlaneIsParallel(p1: Plane, p2: Plane): boolean {
        return this.relationPlanePlane(p1, p2) === TypeRelationLinePlane.Parallel
    }

    public planePlaneIsPerpendicular(p1: Plane, p2: Plane): boolean {
        return this.relationPlanePlane(p1, p2) === TypeRelationLinePlane.Perpendicular
    }

    public planePlaneIsIntersect(p1: Plane, p2: Plane): boolean {
        return this.relationPlanePlane(p1, p2) === TypeRelationLinePlane.Intersecting
    }

    //Utils
    public lineToString(l: Line3d): void {
        console.log (`l: (${l.r.x}, ${l.r.y}, ${l.r.z}) + λ(${l.v.x}, ${l.v.y}, ${l.v.z}}`);

    }

    public planeToString(p: Plane): void {
        console.log (`${p.a}x + ${p.b}y + ${p.c}z + ${p.d} = 0`)
    }

    public stringTypeRelationLineLine(l1: Line3d, l2: Line3d): void {
        switch (this.relationLineLine(l1, l2)) {
            case TypeRelationLinePlane.Coincident:
                console.log('The lines are Coincidents');
                break;
            case TypeRelationLinePlane.Parallel:
                console.log('The lines are parallels');
                break;
            case TypeRelationLinePlane.Perpendicular:
                console.log('The lines are perpendiculars');
                break;
            case TypeRelationLinePlane.Intersecting:
                console.log('The lines intersects each other');
                break;
            case TypeRelationLinePlane.Skew:
                console.log('The lines neither paralles nor intersect');
                break;
            case TypeRelationLinePlane.SkewOrthogonal:
                console.log('The lines neither paralles nor intersect, but orthogonal');
                break;
        }
    }

    public stringTypeRelationLinePlane(l: Line3d, p: Plane): void {
        switch (this.relationLinePlane(l, p)) {
            case TypeRelationLinePlane.Coincident:
                console.log('The plane contains the line');
                break;
            case TypeRelationLinePlane.Parallel:
                console.log('The line is parallel to the plane');
                break;
            case TypeRelationLinePlane.Perpendicular:
                console.log('The line is perpendicular to the plane');
                break;
            case TypeRelationLinePlane.Intersecting:
                console.log('The line intersects the plane');
                break;
        }
    }

    public stringTypeRelationPlanePlane(p1: Plane, p2: Plane): void {
        switch (this.relationPlanePlane(p1, p2)) {
            case TypeRelationLinePlane.Coincident:
                console.log('The planes are Coincidents');
                break;
            case TypeRelationLinePlane.Parallel:
                console.log('The planes are parallels');
                break;
            case TypeRelationLinePlane.Perpendicular:
                console.log('The planes are perpendiculars');
                break;
            case TypeRelationLinePlane.Intersecting:
                console.log('The planes intersect each other');
                break;
        }
    }

}
