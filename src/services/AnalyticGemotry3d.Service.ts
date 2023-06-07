import { Line2d } from "../models/line2d";
import { Plane } from "../models/plane";
import { Vector3d } from "../models/vector3d";
import { MathService } from "./math.Service";

/*
export class AnalyticGeometry {

        //Plane - Line - Point

    constructor(
        private mathService: MathService
    ) { }

    static instance() {
        const instance = new AnalyticGeometry(
            MathService.instance(),
        );

        return instance;
    }

    //Constructor of lines by diferent methods
    //The storage of the line is made by the linear equation
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

    public constructVector3dVector3dOrVector(p1: Vector3d, p2: Vector3d): Line2d {
        //a = (y2 - y1) / (x2 - x1)
        //b = y1 - a * x1 = y2 - a * x2
        let a: number = (p2.y - p1.y) / (p2.x - p1.x);
        let b: number = p1.y - a * p1.x;
        return { a: a, b: b };
    }

    public constructVector3dSlope(p: Vector3d, m: number): Line2d {
        //m -> Dimensionless
        //y = mx + b;
        //p2 = (x1 + 1), (y1 + m)
        let b: number = p.y - m * p.x;
        return { a: m, b: b };
    }

    public constructVector3dAngle(p: Vector3d, a: number): Line2d {
        //alpha = arctan(m)
        //y = mx + b;
        //p2 = (x1 + 1), (y1 + m)
        let m: number = Math.atan(a);
        let b: number = p.y - m * p.x;
        return { a: m, b: b };
    }

    //Interpolation
    public interpolationX (l: Line2d, x: number): number {
        //Find y given x of a line
        return l.a*x+l.b;
    }

    public interpolationY (l: Line2d, y: number): number {
        //Find x given y of a line
        return (y-l.b)/l.a;
    }

    //Segment Operations
    


    //Relative Line Positions
    public midVector3d(p1: Vector3d, p2: Vector3d): Vector3d {
        return { x: (p1.x + p2.x) / 2, y: (p1.y + p2.y) / 2 }
    }

    public intersection(l1: Line2d, l2: Line2d): Vector3d {
        //Determine the Vector3d of intersections of two lines
        let x: number = (l2.b = l1.b) / (l1.a - l2.b);
        let y: number = l1.a * x + l1.b;
        return { x: x, y: y };
    }

    

    public parallelLineVector3d(l: Line2d, p: Vector3d): Line2d {
        //Determine the parallel line between a given line and Vector3d
        let b: number = p.y - l.a * p.x; //Must be the same slope
        return { a: l.a, b: b };
    }

    public perpendicularLineVector3d(l: Line2d, p: Vector3d): Line2d {
        //Determine the perpendicular line between a given line and Vector3d
        //y-y0 = -1/m * (x-x0)
        let a: number = -1 / l.a;
        let b: number = p.x / l.a + p.y;
        return { a: a, b: b };
    }

    public perpendicularBisector(p1: Vector3d, p2: Vector3d): Line2d {
        //Find the perpendicular line that pass through the midVector3d
        return this.perpendicularLineVector3d(this.constructVector3dVector3dOrVector(p1, p2), this.midVector3d(p1, p2));
    }



    


    //Distance
    //Vector3d - Vector3d
    public distanceVector3dVector3d(p1: Vector3d, p2: Vector3d): number {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2)) //Sqrt of the sum of the squares of the differences of their coordinate
    }    

    //Vector3d - Line
    public distanceVector3dLine(p: Vector3d, l: Line2d): number {
        //The distance of a line and a Vector3d is x = |A*x0 + B*yo + C|/sqrt(A²+B²)
        //Change to standard form - B = -1
        return Math.abs(l.a * p.x - p.y + l.b) / Math.sqrt(l.a * l.a + 1);
    }

	//Vector3d - Plane
    public distanceVector3dPlane(po: Vector3d, pl: Plane): number {
        //The distance of a line and a Vector3d is x = |A*x0 + B*yo + C*z0 + D|/sqrt(A²+B²+C²)
        return Math.abs(pl.a * po.x + pl.b * po.y + pl.c * po.z + pl.d) / Math.sqrt(Math.pow(pl.a,2)+Math.pow(pl.b,2)+Math.pow(pl.c,2));
    }

    //Line - Line 
    public distanceLineLine(l1: Line2d, l2: Line2d): number {
        //The distance of parallels lines = |c1-c2|/sqrt(1+m²)
        if (l1.a === l2.a) {
            return Math.abs(l1.b - l2.b) / Math.sqrt(l1.a * l1.a + 1);
        } else {
            return 0 //Need to treat this Error
        }
    }

    //Line - Plane
    public distanceLinePlane() {

    }

    //Plane - Plane
    public distancePlanePlane() {

    }

    
    //Relative Angles
    //Line - Line
	//Line - Plane
	//Plane - Plane




    //Utils
    public lineToString(l: Line2d): void {
        if (this.mathService.isAlmostEqual(l.b, 0)) {
            console.log(`y = ${l.a}x`)
        } else if (!this.mathService.isAlmostEqual(l.b, 0) && l.b > 0) {
            console.log(`y = ${l.a}x + ${l.b}`)
        } else if (!this.mathService.isAlmostEqual(l.b, 0) && l.b < 0) {
            console.log(`y = ${l.a}x - ${l.b}`)
        }
    }

}
*/