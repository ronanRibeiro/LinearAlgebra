import { Line2d } from "../models/line2d";
import { TypeRelationLinePlane } from "../enums/typeRelationLinePlane";
import { Vector2d } from "../models/vector2d";
import { MathService } from "./math.Service";

export class AnalyticGeometry2dService {
    //Domain in R2 --> Point (Vector2d) and Line (Line2d)

    constructor(
        private mathService: MathService
    ) { }

    static instance() {
        const instance = new AnalyticGeometry2dService(
            MathService.instance(),
        );
        return instance;
    }

    //Geometry Constructors
    //Contructor of the point is already the Vector2d
    //Constructor of lines by diferent methods -> y = ax + b
    public constructEquationIntercept(a: number, b: number): Line2d {
        //y = ax + b
        return { a: a, b: b };
    }

    public constructEquationStandard(a: number, b: number, c: number): Line2d {
        //ax + by + c = 0
        a = a / -b;
        c = c / -b;
        return { a: a, b: c };
    }

    public constructPointPointdOrVector(p1: Vector2d, p2: Vector2d): Line2d {
        //a = (y2 - y1) / (x2 - x1)
        //b = y1 - a * x1 = y2 - a * x2
        let a: number = (p2.y - p1.y) / (p2.x - p1.x);
        let b: number = p1.y - a * p1.x;
        return { a: a, b: b };
    }

    public constructPointSlope(p: Vector2d, m: number): Line2d {
        //m -> Dimensionless
        //y = mx + b;
        //p2 = (x1 + 1), (y1 + m)
        let b: number = p.y - m * p.x;
        return { a: m, b: b };
    }

    public constructPointAngle(p: Vector2d, a: number): Line2d {
        //alpha = arctan(m)
        //y = mx + b;
        //p2 = (x1 + 1), (y1 + m)
        let m: number = Math.tan(a * Math.PI / 180);
        let b: number = p.y - m * p.x;
        return { a: m, b: b };
    }

    //Interpolation
    public interpolationX(l: Line2d, x: number): number {
        //Find y given x of a line
        return l.a * x + l.b;
    }

    public interpolationY(l: Line2d, y: number): number {
        //Find x given y of a line
        return (y - l.b) / l.a;
    }

    //Basic Operations
    public midPoint(p1: Vector2d, p2: Vector2d): Vector2d {
        return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }
    }

    public intersection(l1: Line2d, l2: Line2d): Vector2d {
        //Determine the Point of intersections of two lines
        if (this.isIntersect(l1, l2) || this.isPerpendicular(l1, l2)) {
            let x: number = (l2.b - l1.b) / (l1.a - l2.a);
            let y: number = l1.a * x + l1.b;
            return { x: x, y: y };
        } else {
            throw Error('These lines dont intersect');
        }
    }

    public parallelLinePoint(l: Line2d, p: Vector2d): Line2d {
        //Determine the parallel line between a given line and Point
        if (p.y === l.a * p.x + l.b) {
            throw Error('The line contains the point');
        } else {
            let b: number = p.y - l.a * p.x; //Must be the same slope
            return { a: l.a, b: b };
        }
    }

    public perpendicularLinePoint(l: Line2d, p: Vector2d): Line2d {
        //Determine the perpendicular line between a given line and Point
        //y-y0 = -1/m * (x-x0)
        let a: number = -1 / l.a;
        let b: number = p.x / l.a + p.y;
        return { a: a, b: b };
    }

    public perpendicularBisector(p1: Vector2d, p2: Vector2d): Line2d {
        //Find the perpendicular line that pass through the midPoint
        return this.perpendicularLinePoint(this.constructPointPointdOrVector(p1, p2), this.midPoint(p1, p2));
    }

    //Distance
    //Point - Point
    public distancePointPoint(p1: Vector2d, p2: Vector2d): number {
        //Sqrt of the sum of the squares of the differences of their coordinate
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2))
    }

    //Point - Line
    public distancePointLine(p: Vector2d, l: Line2d): number {
        //The distance of a line and a Point is x = |A*x0 + B*yo + C|/sqrt(A²+B²)
        //Change to standard form -> B = -1
        return Math.abs(l.a * p.x - p.y + l.b) / Math.sqrt(l.a * l.a + 1);
    }

    //Line - Line 
    public distanceLineLine(l1: Line2d, l2: Line2d): number {
        if (this.isParallel(l1, l2)) {
            //The distance of parallels lines = |c1-c2|/sqrt(1+m²)
            return Math.abs(l1.b - l2.b) / Math.sqrt(l1.a * l1.a + 1);
        } else {
            return 0;
        }
    }

    //Relative Angles
    //Line - Line
    public angleLineLine(l1: Line2d, l2: Line2d): number {
        if (this.isPerpendicular(l1, l2)) {
            return 0.5 * Math.PI;
        } else if (this.isIntersect(l1, l2)) {
            //The angle of the lines are = |(m2-m1)/(1+m2*m1)|
            return Math.abs((l1.a - l2.a) / (l1.a * l2.a + 1));
        } else {
            return 0;
        }
    }

    //Relations of Lines
    private relationLine(l1: Line2d, l2: Line2d): TypeRelationLinePlane {
        //For 2d lines there is no possibility to be skew lines.
        if (l1.a === l2.a && l1.b === l2.b) {
            return TypeRelationLinePlane.Coincident;
        } else if (l1.a === l2.a) {
            return TypeRelationLinePlane.Parallel;
        } else if (this.mathService.isAlmostEqual(l1.a,-1/l2.a)) {
            return TypeRelationLinePlane.Perpendicular;
        } else {
            return TypeRelationLinePlane.Intersecting;
        }
    }

    //Test type of relation of lines
    public isCoincident(l1: Line2d, l2: Line2d): boolean {
        return this.relationLine(l1, l2) === TypeRelationLinePlane.Coincident;
    }

    public isParallel(l1: Line2d, l2: Line2d): boolean {
        return (this.relationLine(l1, l2) === TypeRelationLinePlane.Parallel ||
            this.relationLine(l1, l2) === TypeRelationLinePlane.Coincident);
    }

    public isPerpendicular(l1: Line2d, l2: Line2d): boolean {
        return this.relationLine(l1, l2) === TypeRelationLinePlane.Perpendicular;
    }

    public isIntersect(l1: Line2d, l2: Line2d): boolean {
        return (this.relationLine(l1, l2) === TypeRelationLinePlane.Intersecting ||
            this.relationLine(l1, l2) === TypeRelationLinePlane.Perpendicular);
    }

    //Utils
    public lineToString(l: Line2d): void {
        if (this.mathService.isAlmostEqual(l.b, 0)) {
            console.log(`y = ${l.a}x`);
        } else if (!this.mathService.isAlmostEqual(l.b, 0) && l.b > 0) {
            console.log(`y = ${l.a}x + ${l.b}`);
        } else if (!this.mathService.isAlmostEqual(l.b, 0) && l.b < 0) {
            console.log(`y = ${l.a}x - ${-l.b}`);
        }
    }

    public stringTypeRelation(l1: Line2d, l2: Line2d): void {
        switch (this.relationLine(l1, l2)) {
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
                console.log('The lines intersect each other');
                break;
        }
    }
}