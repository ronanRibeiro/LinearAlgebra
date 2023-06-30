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
    public constructLine(p1: Vector3d, p2: Vector3d): Line3d {
        let v: Vector3d = this.vector3dService.minus(p2, p1)
        return {
            r: { x: p1.x, y: p1.y, z: p1.z },
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
        if (!(n.x === 0 && n.y === 0 && n.z === 0)) {
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
        if (this.lineLineIsIntersect(l1, l2) || this.lineLineIsPerpendicular(l1, l2)) {
            let v: Vector3d = this.vector3dService.crossProduct(l1.v, l2.v); //normal vector
            let p: Vector3d = this.intersectionLineLine(l1, l2);
            return this.constructPlaneNormalPoint(p, v);
        } else {
            throw Error('The lines doesnt form a plane')
        }
    }

    //Line 3d Operation
    public intersectionLineLine(l1: Line3d, l2: Line3d): Vector3d {
        //Search if v.x, v.y or v.z is = 0 to avoid division by 0
        let v1: number[] = [l1.r.x, l1.r.y, l1.r.z, l1.v.x, l1.v.y, l1.v.z];
        let v2: number[] = [l2.r.x, l2.r.y, l2.r.z, l2.v.x, l2.v.y, l2.v.z];
        let t1: number;

        // (p1x-p2x+(v1x*(p2y-p1x)/v1y)/(v2x-(v1x/v1y)+v2y)
        // p->[0,1,2] // v->[3,4,5]        
        if (v1[4] !== 0) {
            t1 = (v1[0] - v2[0] + (v1[3] * (v2[1] - v1[0]) / v1[4])) / (v2[3] - (v1[3] / v1[4]) + v2[4]);
            return { x: v1[0] + v1[3] * t1, y: v1[1] + v1[4] * t1, z: v1[2] + v1[5] * t1 };
        } else if (v1[5] !== 0) {
            t1 = (v1[1] - v2[1] + (v1[4] * (v2[2] - v1[1]) / v1[5])) / (v2[4] - (v1[4] / v1[5]) + v2[5]);
            return { x: v1[0] + v1[3] * t1, y: v1[1] + v1[4] * t1, z: v1[2] + v1[5] * t1 };
        } else if (v1[3] !== 0) {
            //2+1 = 0 and 5+1 = 3
            t1 = (v1[2] - v2[2] + (v1[5] * (v2[0] - v1[2]) / v1[3])) / (v2[5] - (v1[5] / v1[3]) + v2[3]);
            return { x: v1[0] + v1[3] * t1, y: v1[1] + v1[4] * t1, z: v1[2] + v1[5] * t1 };
        } else {
            throw Error('The lines dont intersect')
        }
        /*
        let s: number = (-l2.r.x + (l1.v.x / l1.v.y) * l2.r.y - l1.r.x - (l1.v.x / l1.v.y) * l1.r.y) / (l1.v.x - (l1.v.x / l1.v.y) * l1.v.x);
        return { x: l2.r.x + s * l2.v.x, y: l2.r.y + s * l2.v.y, z: l2.r.z + s * l2.v.z };
        */
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

            //discover a point of the line
            let x: number;
            let y: number;
            let z: number;

            if (p1.b !== 0) {
                //For x=0
                //Plane 1 --> y = (-D1 - C1z)/B1
                //Substitue in PLane 2
                //(B2(-D1 - C1z))B1 + C2z + D2 = 0
                //z = (D1B2/B1 - D2) / (C2 - C1B2/B1)
                z = (-p2.d + p1.d * p2.b / p1.b) / (p2.c - p1.c * p2.b / p1.b)
                //y = -(A1x + C1z + D) / B1
                y = -(p1.c * z + p1.d) / p1.b
                x = 0;
            } else if (p1.c !== 0) {
                //For y=0
                //Plane 1 --> z = (-D1 - A1x)/C1
                //Substitue in PLane 2
                //(A2x + C2((-D1 - A1x)/C1) + D2 = 0
                //x = (D1C2/C1 - D2) / (A2 - A1C2/C1)
                x = (-p2.d + p1.d * p2.c / p1.c) / (p2.a - p1.a * p2.c / p1.c)
                //z = -(A1x + B1y + D) / C1
                z = -(p1.a * x + p1.d) / p1.c
                y = 0;
            } else if (p1.a !== 0) {
                //For z=0
                //Plane 1 --> x = (-D1 - B1y)/A1
                //Substitue in PLane 2
                //(A2(-D1 - B1y)/A1 + B2y + D2 = 0
                //x = (D1A2/A1 - D2) / (B2 - B1A2/A1)
                x = (-p2.d + p1.d * p2.a / p1.a) / (p2.b - p1.b * p2.a / p1.a)
                //y = -(A1x + C1z + D) / B1
                y = -(p1.a * x + p1.d) / p1.b
                z = 0;
            } else {
                //The code should not go here once it is tested for parallels or coincident before.
                throw Error("Planes are coincident or parallel")
            }
            let p: Vector3d = { x: x, y: y, z: z }
            return { r: p, v: v };
        } else {
            throw Error('The planes dont intersect')
        }
    }

    public commonPointLinePlane(l: Line3d, p: Plane): Vector3d {
        if (this.linePlaneIsCoincident(l, p)) {
            throw Error('The plane contains the line')
        } else if (this.linePlaneIsParallel(l, p)) {
            throw Error('The line and plane are parallel')
        } else {
            // solve Ax + By + Cz + D = 0 for r + t.v
            let t: number = -(p.a * l.r.x + p.b * l.r.y + p.c * l.r.y + p.d) / (p.a * l.v.x + p.b * l.v.y + p.c * l.v.y);
            return this.vector3dService.add(l.r, this.vector3dService.byScalar(l.v, t));
        }
    }

    public translatePlaneVector(p: Plane, v: Vector3d): Plane {
        return { a: p.a, b: p.b, c: p.c, d: p.d + p.a * v.x + p.b * v.y + p.c * v.z }; //D' = D + n . t
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
        let v: Vector3d = this.vector3dService.minus(p,l.r); //ro-r1
        return this.vector3dService.length(this.vector3dService.crossProduct(v, l.v)) / this.vector3dService.length(l.v);
    }

    //Point - Plane
    public distancePointPlane(po: Vector3d, pl: Plane): number {
        // |(p0 - l.v.1) . n + pl.d| / ||n||
        let v1: Vector3d = { x: pl.a, y: pl.b, z: pl.c }; //n
        return Math.abs(this.vector3dService.dotProduct(po, v1)+pl.d) / this.vector3dService.length(v1);
    }

    //Line - Line 
    public distanceLineLine(l1: Line3d, l2: Line3d): number {
        if (this.lineLineIsParallel(l1, l2)) {
            //||(r2 - r1) x v|| / ||v||
            let v: Vector3d = this.vector3dService.minus(l2.r, l1.r); //r2-r1
            return this.vector3dService.length(this.vector3dService.crossProduct(v, l2.v)) / this.vector3dService.length(l2.v);
        } else if (this.lineLineIsSkew(l1, l2) || this.lineLineIsSkewOrthogonal(l1, l2)) {
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
        if (this.lineLineIsPerpendicular(l1, l2) || this.lineLineIsSkewOrthogonal(l1, l2)) {
            return Math.PI/2;
        } else if (this.lineLineIsIntersect(l1, l2) || this.lineLineIsSkew(l1, l2)) {
            //The angle of the lines are = |(l1 . l2|/||l1||*||l2||
            //Using Math.abs() will always show the smaller angle (some times the complementary)
            return Math.acos((this.vector3dService.dotProduct(l1.v, l2.v)) / ((this.vector3dService.length(l1.v) * this.vector3dService.length(l2.v))));
        } else {
            return 0;
        }
    }

    //Line - Plane
    public angleLinePlane(l: Line3d, p: Plane): number {
        if (this.linePlaneIsPerpendicular(l, p)) {
            return Math.PI/2;
        } else if (this.linePlaneIsIntersect(l, p)) {
            //The angle of the lines are = |(r . n|/||r||*||n||
            //Using Math.abs() will always show the smaller angle (some times the complementary)
            return Math.acos((this.vector3dService.dotProduct(l.v, this.normalVectorPlane(p))) / (this.vector3dService.length(l.v) * this.vector3dService.length(this.normalVectorPlane(p))));
        } else {
            return 0;
        }
    }

    //Plane - Plane
    public anglePlanePlane(p1: Plane, p2: Plane): number {
        if (this.planePlaneIsPerpendicular(p1, p2)) {
            return Math.PI/2;
        } else if (this.planePlaneIsIntersect(p1, p2)) {
            //The angle of the lines are = |(n1 . n2|/||n1||*||n2||
            //Using Math.abs() will always show the smaller angle (some times the complementary)
            return Math.acos((this.vector3dService.dotProduct(this.normalVectorPlane(p1), this.normalVectorPlane(p2))) / (this.vector3dService.length(this.normalVectorPlane(p1)) * this.vector3dService.length(this.normalVectorPlane(p2))));
        } else {
            return 0;
        }
    }

    //Relations of Line-Line
    private relationLineLine(l1: Line3d, l2: Line3d): TypeRelationLinePlane {
        let t1: number;
        let t2: number;

        //find if there is a null vector in both lines:
        if ((l1.v.x === 0 && l1.v.y === 0 && l1.v.z === 0) ||
            (l2.v.x === 0 && l2.v.y === 0 && l2.v.z === 0)) {
            throw Error('Is not a line with a null vector (0,0,0)')
        } //find if there is two vectors 0 (a line in a single direction) they can be concident or parallel
        // besides, there is other ways for them to be coincident or parallel
        else if ((l1.v.x / l2.v.x === l1.v.y / l2.v.y && l1.v.x / l2.v.x === l1.v.z / l2.v.z) || //No zero
            (l1.v.x === 0 && l2.v.x === 0 && l1.v.y / l2.v.y === l1.v.z / l2.v.z) || // A = 0
            (l1.v.y === 0 && l2.v.y === 0 && l1.v.x / l2.v.x === l1.v.z / l2.v.z) || // B = 0
            (l1.v.z === 0 && l2.v.z === 0 && l1.v.x / l2.v.x === l1.v.y / l2.v.y) || // C = 0
            (l1.v.x === 0 && l2.v.x === 0 && l1.v.y === 0 && l2.v.y === 0) || // A = 0 and B = 0
            (l1.v.x === 0 && l2.v.x === 0 && l1.v.z === 0 && l2.v.z === 0) || // A = 0 and C = 0
            (l1.v.y === 0 && l2.v.y === 0 && l1.v.z === 0 && l2.v.z === 0)) {  // B = 0 and C = 0
                //The Lines are dependent 
            if ((l1.r.x - l2.r.x) / l2.v.x === (l1.r.y - l2.r.y) / l2.v.y && (l1.r.y - l2.r.y) / l2.v.y === (l1.r.z - l2.r.z) / l2.v.z) {
                //A point of l1 belongs to l2
                return TypeRelationLinePlane.Coincident;
            } else {
                return TypeRelationLinePlane.Parallel;
            }
        } //Case when the intersect point is the point that defines the line
        else if (l1.r.x === l2.r.x && l1.r.y === l2.r.y && l1.r.z === l2.r.z) {
            if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l1.v, l2.v), 0)) {
                //find the angle of the lines
                return TypeRelationLinePlane.Perpendicular;
            } else {
                return TypeRelationLinePlane.Intersecting;
            }
        }
        //The lines are independent
        //find if there is only one zero in the vector --> Specific case
        else if (l1.v.x === 0 || l1.v.y === 0 || l1.v.z === 0 || l2.v.x === 0 || l2.v.y === 0 || l2.v.z === 0) {
            //Find t1 and t2
            if (l1.v.x !== 0 || l2.v.x !== 0) {
                if (l1.v.x !== 0) {
                    t2 = (l1.r.x - l2.r.x + (l1.v.x / l1.v.y) * (l2.r.y - l1.r.y)) / (l2.v.x - (l1.v.x / l1.v.y) * l2.v.y);
                    t1 = (l2.r.x + t2 * l2.v.x - l1.r.x) / l2.v.x
                    //find if there is a common point
                    if (l1.r.x + t1 * l2.r.x === l2.r.x + t2 * l2.v.x && l1.r.y + t1 * l2.r.y === l2.r.y + t2 * l2.v.y && l1.r.z + t1 * l2.r.z === l2.r.x + t2 * l2.v.z) {
                        if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l1.v, l2.v), 0)) {
                            //find the angle of the lines
                            return TypeRelationLinePlane.Perpendicular;
                        } else {
                            return TypeRelationLinePlane.Intersecting;
                        }
                    } else {
                        if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l1.v, l2.v), 0)) {
                            //find the angle of the lines
                            return TypeRelationLinePlane.SkewOrthogonal;
                        } else {
                            return TypeRelationLinePlane.Skew;
                        }
                    }
                } else { //l1.v.x == 0 then r1.x = r2.x+t2*v2.x
                    t2 = (l1.r.x - l2.r.x) / l2.v.x
                    t1 = (l2.r.y + t2 * l2.v.y - l1.r.y) / l2.v.y
                    //find if there is a common point
                    if (l1.r.x + t1 * l2.r.x === l2.r.x + t2 * l2.v.x && l1.r.y + t1 * l2.r.y === l2.r.y + t2 * l2.v.y && l1.r.z + t1 * l2.r.z === l2.r.x + t2 * l2.v.z) {
                        if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l1.v, l2.v), 0)) {
                            //find the angle of the lines
                            return TypeRelationLinePlane.Perpendicular;
                        } else {
                            return TypeRelationLinePlane.Intersecting;
                        }
                    } else {
                        if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l1.v, l2.v), 0)) {
                            //find the angle of the lines
                            return TypeRelationLinePlane.SkewOrthogonal;
                        } else {
                            return TypeRelationLinePlane.Skew;
                        }
                    }
                }
            } else {
                if (l1.v.y !== 0) {
                    t2 = (l1.r.y - l2.r.y + (l1.v.y / l1.v.z) * (l2.r.z - l1.r.z)) / (l2.v.y - (l1.v.y / l1.v.z) * l2.v.z);
                    t1 = (l2.r.y + t2 * l2.v.y - l1.r.y) / l2.v.y
                    //find if there is a common point
                    if (l1.r.x + t1 * l2.r.x === l2.r.x + t2 * l2.v.x && l1.r.y + t1 * l2.r.y === l2.r.y + t2 * l2.v.y && l1.r.z + t1 * l2.r.z === l2.r.x + t2 * l2.v.z) {
                        if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l1.v, l2.v), 0)) {
                            //find the angle of the lines
                            return TypeRelationLinePlane.Perpendicular;
                        } else {
                            return TypeRelationLinePlane.Intersecting;
                        }
                    } else {
                        if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l1.v, l2.v), 0)) {
                            //find the angle of the lines
                            return TypeRelationLinePlane.SkewOrthogonal;
                        } else {
                            return TypeRelationLinePlane.Skew;
                        }
                    }
                } else { //l2.v.y == 0 then r1.y = r2.y+t2*v2.y
                    t2 = (l1.r.y - l2.r.y) / l2.v.y
                    t1 = (l2.r.z + t2 * l2.v.z - l1.r.z) / l2.v.z

                    //find if there is a common point
                    if (l1.r.x + t1 * l2.r.x === l2.r.x + t2 * l2.v.x && l1.r.y + t1 * l2.r.y === l2.r.y + t2 * l2.v.y && l1.r.z + t1 * l2.r.z === l2.r.x + t2 * l2.v.z) {
                        if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l1.v, l2.v), 0)) {
                            //find the angle of the lines
                            return TypeRelationLinePlane.Perpendicular;
                        } else {
                            return TypeRelationLinePlane.Intersecting;
                        }
                    } else {
                        if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l1.v, l2.v), 0)) {
                            //find the angle of the lines
                            return TypeRelationLinePlane.SkewOrthogonal;
                        } else {
                            return TypeRelationLinePlane.Skew;
                        }
                    }
                }
            }
        } else { //the lines doesn't have a zero
            //Find t1 and t2
            t2 = (l1.r.x - l2.r.x + (l1.v.x / l1.v.y) * (l2.r.y - l1.r.y)) / (l2.v.x - (l1.v.x / l1.v.y) * l2.v.y);
            t1 = (l2.r.x + t2 * l2.v.x - l1.r.x) / l2.v.x
            
            //find if there is a common point
            if (this.mathService.isAlmostEqual(l1.r.x + t1 * l1.v.x, l2.r.x + t2 * l2.v.x) &&
                this.mathService.isAlmostEqual(l1.r.y + t1 * l1.v.y, l2.r.y + t2 * l2.v.y) &&
                this.mathService.isAlmostEqual(l1.r.z + t1 * l1.v.z, l2.r.z + t2 * l2.v.z)) {

                if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l1.v, l2.v), 0)) {
                    //find the angle of the lines
                    return TypeRelationLinePlane.Perpendicular;
                } else {
                    return TypeRelationLinePlane.Intersecting;
                }
            } else {
                if (this.mathService.isAlmostEqual(this.vector3dService.dotProduct(l1.v, l2.v), 0)) {
                    //find the angle of the lines
                    return TypeRelationLinePlane.SkewOrthogonal;
                } else {
                    return TypeRelationLinePlane.Skew;
                }
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

    public lineLineIsSkewOrthogonal(l1: Line3d, l2: Line3d): boolean {
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
            //To be perpendicular the ratio of the normal vector must be equal of the line.
            //A/ta = B/tb = C/tc
            //When the denominator is 0, the numeral must be zero also.
            //So we have 7 verifications. 1 when there is no 0, 3 when there is 1 zero, 3 when there is 2 zero
            if ((l.v.x / p.a === l.v.y / p.b && l.v.y / p.b === l.v.z / p.c) || //No zero
                (p.a === 0 && l.v.x === 0 && l.v.y / p.b === l.v.z / p.c) || // A = 0
                (p.b === 0 && l.v.y === 0 && l.v.x / p.a === l.v.z / p.c) || // B = 0
                (p.c === 0 && l.v.z === 0 && l.v.x / p.a === l.v.y / p.b) || // C = 0
                (p.a === 0 && l.v.x === 0 && p.b === 0 && l.v.y === 0) || // A = 0 and B = 0
                (p.a === 0 && l.v.x === 0 && p.c === 0 && l.v.z === 0) || // A = 0 and C = 0
                (p.b === 0 && l.v.y === 0 && p.c === 0 && l.v.z === 0)) {  // B = 0 and C = 0
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
        console.log(`l: (${l.r.x}, ${l.r.y}, ${l.r.z}) + λ(${l.v.x}, ${l.v.y}, ${l.v.z}}`);

    }

    public planeToString(p: Plane): void {
        console.log(`${p.a}x + ${p.b}y + ${p.c}z + ${p.d} = 0`)
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
                console.log('The lines neither parallels nor intersect');
                break;
            case TypeRelationLinePlane.SkewOrthogonal:
                console.log('The lines neither parallels nor intersect, but orthogonal');
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
