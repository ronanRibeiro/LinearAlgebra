import { Line2d } from "../models/line2d";
import { Triangle2d } from "../models/triangle";
import { Vector2d } from "../models/vector2d";
import { AnalyticGeometry2d } from "./analyticGemotry2d.Service";
import { MathService } from "./math.Service";
import { Vector2dService } from "./vector2d.Service";

export class Triangle2dService {
    constructor(
        private mathService: MathService,
        private vector2dService: Vector2dService,
        private analyticGeometry2d: AnalyticGeometry2d
    ) { }

    static instance() {
        const instance = new Triangle2dService(
            MathService.instance(),
            Vector2dService.instance(),
            AnalyticGeometry2d.instance()
        );
        return instance;
    }

    //Proprieties
    public length(t: Triangle2d): number[] {
        return [this.vector2dService.length(this.vector2dService.minus(t.a, t.b)),
        this.vector2dService.length(this.vector2dService.minus(t.b, t.c)),
        this.vector2dService.length(this.vector2dService.minus(t.c, t.a))];
    }

    public angle(t: Triangle2d): number[] {
        return [this.vector2dService.angle(t.a, t.b),
        this.vector2dService.angle(t.b, t.c),
        this.vector2dService.angle(t.c, t.a)];
    }

    //Traingle Classifications
    //Lengths
    public isEquilateral(t: Triangle2d) { //All sides Equal
        let l: number[] = this.length(t);
        if (this.mathService.isAlmostEqual(l[0], l[1]) && this.mathService.isAlmostEqual(l[1], l[2]) && this.mathService.isAlmostEqual(l[2], l[0])) {
            return true;
        } else {
            return false;
        }
    }

    public isIsosceles(t: Triangle2d) { //Two sides Equal
        let l: number[] = this.length(t);
        if (this.mathService.isAlmostEqual(l[0], l[1]) || this.mathService.isAlmostEqual(l[1], l[2]) || this.mathService.isAlmostEqual(l[2], l[0])) {
            return true;
        } else {
            return false;
        }
    }

    public isScalene(t: Triangle2d) { //All sides different
        let l: number[] = this.length(t);
        if (!this.mathService.isAlmostEqual(l[0], l[1]) && !this.mathService.isAlmostEqual(l[1], l[2]) && !this.mathService.isAlmostEqual(l[2], l[0])) {
            return true;
        } else {
            return false;
        }
    }

    //Angles
    public isAcute(t: Triangle2d) { //All angles < 90
        let a: number[] = this.angle(t);
        if (a[0] < 90 && a[1] < 90 && a[2] < 90) {
            return true;
        } else {
            return false;
        }
    }

    public isRectangle(t: Triangle2d) { //An angle = 90
        let a: number[] = this.angle(t);
        if (a[0] == 90 || a[1] == 90 || a[2] == 90) {
            return true;
        } else {
            return false;
        }
    }

    public isObtuse (t: Triangle2d) { //An angle > 90
        let a: number[] = this.angle(t);
        if (a[0] > 90 || a[1] > 90 || a[2] > 90) {
            return true;
        } else {
            return false;
        }
    }

    public isSimilar(t1: Triangle2d, t2: Triangle2d) { //All sides different
        let l1: number[] = this.length(t1);
        let l2: number[] = this.length(t2);
        let r: number = l1[0] / l2[0]; //proportion     

        if (this.mathService.isAlmostEqual(l1[1], r*l2[1]) && this.mathService.isAlmostEqual(l1[2], r*l2[2])) {
            return true;
        } else {
            return false;
        }
    }

    //Basic Operations
    public perimeter(t: Triangle2d): number {
        let l: number[] = this.length(t);
        return l[0]+l[1]+l[2];
    }

    public area(t: Triangle2d): number { 
        //Shoelace Formula
        //Area = 0.5 * |(x1 * (y2 - y3)) + (x2 * (y3 - y1)) + (x3 * (y1 - y2))|
        return 0.5 * Math.abs(t.a.x * (t.b.y - t.c.y) + t.b.x * (t.c.y - t.a.y) + t.c.x * (t.a.y - t.b.y));
    }

    public centroid(t: Triangle2d): Vector2d {
        //((x1+x2+x3)/3, (y1+y2+y3)/3))
        return { x: (t.a.x + t.b.x + t.c.x) / 3, y: (t.a.y + t.b.y + t.c.y) / 3 };
    }

    public incenter(t: Triangle2d): Vector2d {
        //let a = length of the side A...
        //((a*x1+b*x2+c*x3)/(a+b+c), (a*y1+b*y2+c*y3)/(a+b+c)))
        let l: number[] = this.length(t);
        return { x: (l[0] * t.a.x + l[1] * t.b.x + l[2] * t.c.x) / (l[0] + l[1] + l[2]), y: (l[0] * t.a.y + l[1] * t.b.y + l[2] * t.c.y) / (l[0] + l[1] + l[2]) };
    }

    public circumcenter(t: Triangle2d): Vector2d {
        //Equation of perpendicular lines passing through the midpoint
        let la: Line2d = this.analyticGeometry2d.perpendicularBisector(t.a, t.b);
        let lb: Line2d = this.analyticGeometry2d.perpendicularBisector(t.b, t.c);

        return this.analyticGeometry2d.intersection(la, lb);
    }

    public orthocenter(t: Triangle2d): Vector2d {
        //Perpendicular line of Line A that pass through point C
        let la: Line2d = this.analyticGeometry2d.perpendicularLinePoint(this.analyticGeometry2d.constructPointPointdOrVector(t.a, t.b), t.c);
        let lb: Line2d = this.analyticGeometry2d.perpendicularLinePoint(this.analyticGeometry2d.constructPointPointdOrVector(t.b, t.c), t.a);

        return this.analyticGeometry2d.intersection(la, lb);
    }

    //Utils
    public toString(t: Triangle2d): void {
        console.log(`(${t.a.x, t.a.y}), (${t.b.x, t.b.y}), (${t.c.x, t.c.y})`)
    }

}
