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
        //ax + (-1)y + b = 0
        return { a: a, b: -1, c: b };
    }

    public constructEquationStandard(a: number, b: number, c: number): Line2d {
        //ax + by + c = 0
        return { a: a, b: b, c: c };
    }

    public constructPointPointdOrVector(p1: Vector2d, p2: Vector2d): Line2d {
        //Slope form:
        //a = (y2 - y1) / (x2 - x1)
        //c = y1 - a * x1 = y2 - a * x2
        let a: number;
        let b: number;
        let c: number;

        if ((p2.x - p1.x) !== 0) {
            a = (p2.y - p1.y) / (p2.x - p1.x);
            b = -1;
            c = p1.y - a * p1.x
        } else {
            //Vertical Line
            a = 1;
            b = 0;
            c = p1.x;
        }

        return { a: a, b: b, c: c };
    }

    public constructPointSlope(p: Vector2d, m: number): Line2d {
        //m -> Dimensionless
        //y = mx + c;
        //p2 = (x1 + 1), (y1 + m)
        let a: number;
        let b: number;
        let c: number;

        if (m === Infinity) {
            a = 1;
            b = 0;
            c = p.y;
        } else {
            a = m;
            b = -1;
            c = p.y - a * p.x;
        }
        return { a: a, b: b, c: c };
    }

    public constructPointAngle(p: Vector2d, m: number): Line2d {
        //alpha = arctan(m)
        //y = mx + b;
        //p2 = (x1 + 1), (y1 + m)
        let a: number;
        let b: number;
        let c: number

        if (m === Infinity) {
            a = 1;
            b = 0;
            c = p.y;
        } else {
            a = Math.tan(m * Math.PI / 180);
            b = -1;
            c = p.y - a * p.x;
        }

        return { a: a, b: b, c: c };
    }

    //Interpolation
    public interpolationX(l: Line2d, x: number): number {
        //Find y given x of a line
        return (-l.a * x - l.c) / l.b;
    }

    public interpolationY(l: Line2d, y: number): number {
        //Find x given y of a line
        return (-l.b * y - l.c) / l.a;
    }

    //Basic Operations
    public midPoint(p1: Vector2d, p2: Vector2d): Vector2d {
        return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }
    }

    public intersection(l1: Line2d, l2: Line2d): Vector2d {
        //Determine the Point of intersections of two lines
        if (this.isIntersect(l1, l2) || this.isPerpendicular(l1, l2)) {
            if ((this.mathService.isAlmostEqual(l1.a, 0) && this.mathService.isAlmostEqual(l2.b, 0))) {
                //l1: horizontal and l2: vertical
                return { x: -l2.c / l2.a, y: -l1.c / l1.b };
            } else if (this.mathService.isAlmostEqual(l1.b, 0) && this.mathService.isAlmostEqual(l2.a, 0)) {
                //l1: vertical and l2: horizontal
                return { x: -l1.c / l1.a, y: -l2.c / l2.b };
            } else {
                // x = (B₁C₂ - B₂C₁) / (A₁B₂ - A₂B₁)
                let x: number = (l1.b * l2.c - l2.b * l1.c) / (l1.a * l2.b - l2.a * l2.b);
                let y: number;
                y = (-l1.a * x - l1.c) / l1.b;
                return { x: x, y: y };
            }
        } else {
            throw Error('These lines dont intersect');
        }
    }

    public parallelLinePoint(l: Line2d, p: Vector2d): Line2d {
        //Determine the parallel line between a given line and Point
        if (p.y === (-l.a * p.x - l.c) / l.b) {
            throw Error('The line contains the point');
        } else {
            //Must be the same slope (A and B)
            //Ax + By - A*x₁ - B*y₁ = 0.
            return { a: l.a, b: l.b, c: -l.a * p.x - l.b * p.y };
        }
    }

    public perpendicularLinePoint(l: Line2d, p: Vector2d): Line2d {
        //Determine the perpendicular line between a given line and Point
        if (l.b === 0) {
            //For vertical line, perpendicular is the horizontal line that pass through the p.y axis.
            return { a: 0, b: 1, c: -p.y };
        } else {
            //Perpendicular is: -B1x + Ay + C2 = 0
            return { a: -l.b, b: l.a, c: l.b * p.x - l.a * p.y };
        }
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
        return Math.abs(l.a * p.x + l.b * p.y + l.c) / Math.sqrt(l.a * l.a + l.b * l.b);
    }

    //Line - Line 
    public distanceLineLine(l1: Line2d, l2: Line2d): number {
        if (this.isParallel(l1, l2)) {
            //The distance of parallels lines =  |C2 - C1| / sqrt(A^2 + B^2)
            return Math.abs(l2.c - l1.c) / Math.sqrt(l1.a * l1.a + l1.b * l1.b);
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
            //The angle of the lines is tan alpha = (A2 * B1 - A1 * B2) / (A1 * A2 + B1 * B2)
            //The divisor cannot be 0 because it would be perpendicular
            return Math.abs(Math.atan((l2.a * l1.b - l1.a * l2.b) / (l1.a * l2.a + l1.b * l2.b)));
        } else {
            return 0;
        }
    }

    //Relations of Lines
    private relationLine(l1: Line2d, l2: Line2d): TypeRelationLinePlane {
        //For 2d lines there is no possibility to be skew lines.
        if (this.mathService.isAlmostEqual(l1.a / l2.a, l1.b / l2.b) &&
            this.mathService.isAlmostEqual(l1.b / l2.b, l1.c / l2.c)) {
            //Coincident - Ratio of coefficients are equal
            return TypeRelationLinePlane.Coincident;
        } else if (this.mathService.isAlmostEqual(l1.a / l2.a, l1.b / l2.b)) {
            //Parallel - Ratio of coefficients are equal (except coefficient C)
            return TypeRelationLinePlane.Parallel;
        } else if (this.mathService.isAlmostEqual(l1.a * l2.a + l1.b * l2.b, 0)) {
            //Perpendicular - Product of slopes = -1 --> A1/A2 * B1/B2 = -1
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
        let s: string = '';

        if (this.mathService.isAlmostEqual(l.a, 0)) {
        } else if (l.a > 0) {
            s += `${l.a}x `
        } else {
            s += `-${-l.a}x `
        }

        if (this.mathService.isAlmostEqual(l.b, 0)) {
        } else if (l.b > 0) {
            s += `+ ${l.b}y `
        } else {
            s += `- ${-l.b}y `
        }

        if (this.mathService.isAlmostEqual(l.c, 0)) {
        } else if (l.c > 0) {
            s += `+ ${l.c} `
        } else {
            s += `- ${-l.c} `
        }

        s += '= 0'
        console.log(s);
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