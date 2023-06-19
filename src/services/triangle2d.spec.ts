import { Triangle2d } from "src/models/triangle2d";
import { Triangle2dService } from "./triangle2d.Service";

describe('triangle2d.Service.ts', function () {
    let t2dService: Triangle2dService;
    let t1: Triangle2d = { a: { x: 4, y: 2 }, b: { x: 8, y: 2 }, c: { x: 8, y: 5 } }; //Rectangular
    let t2: Triangle2d = { a: { x: 1, y: 4 }, b: { x: 3, y: 6 }, c: { x: 1, y: 8 } }; //Isoceles
    let t3: Triangle2d = { a: { x: 1, y: 1 }, b: { x: 5, y: 1 }, c: { x: 7, y: 2 } }; //Obtuse and Scalene
    let t4: Triangle2d = { a: { x: -0.5, y: 0 }, b: { x: 0.5, y: 0 }, c: { x: 0, y: 0.86602540378 } }; //Equilateral
    let t5: Triangle2d = { a: { x: 4, y: 2 }, b: { x: 12, y: 2 }, c: { x: 12, y: 8 } }; //Similiar to t1 -- 2x
    let t6: Triangle2d = { a: { x: 4, y: 4 }, b: { x: 5, y: 5 }, c: { x: 4, y: 5.5 } }; //Acute

    beforeEach(function () {
        t2dService = Triangle2dService.instance();
    })

    it('should return the array of the lenght of the 3 sides', function () {
        let l: number[] = t2dService.length(t1);
        expect(l[0]).toBe(4);
        expect(l[1]).toBe(3);
        expect(l[2]).toBe(5);
    })

    it('should return the angles of the 3 sides', function () {
        let a: number[] = t2dService.angle(t1);
        expect(a[0]).toBeCloseTo(1.5708, 4);
        expect(a[1]).toBeCloseTo(0.92729, 4);
        expect(a[2]).toBeCloseTo(0.64350, 4);
    })

    it('should return true if is an Equilateral Triangle', function () {
        expect(t2dService.isEquilateral(t4)).toBeTrue();
    })

    it('should return true if is an Isosceles Triangle', function () {
        expect(t2dService.isIsosceles(t2)).toBeTrue();
    })

    it('should return true if is a Scalene Triangle', function () {
        expect(t2dService.isScalene(t3)).toBeTrue();
    })

    it('should return true if is an Acute Triangle', function () {
        expect(t2dService.isAcute(t6)).toBeTrue();
    })

    it('should return true if is a Rectangle Triangle', function () {
        expect(t2dService.isRectangle(t1)).toBeTrue();
    })

    it('should return true if is an Obtuse Triangle', function () {
        expect(t2dService.isObtuse(t3)).toBeTrue();
    })

    it('should return true if Triangle 1 is similiar to Triangle 2', function () {
        expect(t2dService.isSimilar(t1, t5)).toBeTrue();
    })

    it('should return the perimeter of a Triangle', function () {
        expect(t2dService.perimeter(t1)).toBe(12);
    })

    it('should return the area of a Triangle', function () {
        expect(t2dService.area(t1)).toBe(6);
    })

    it('should return the centroid of a Triangle', function () {
        expect(t2dService.centroid(t1)).toEqual({ x: 20 / 3, y: 3 });
    })
    
    it('should return the incenter of a Triangle', function () {
        expect(t2dService.incenter(t1)).toEqual({ x: 20 / 3, y: 3.25 });
    })

    it('should return the circumcenter of a Triangle', function () {
        expect(t2dService.circumcenter(t1)).toEqual({ x: 6, y: 3.5 });
    })

    it('should return the orthocenter of a Triangle', function () {
        expect(t2dService.orthocenter(t1)).toEqual({ x: 8, y: 2 });
    })

    it('should return the information of the points of the Triangle as a console.log string', function () {
        spyOn(console, 'log');
        t2dService.toString(t1);
        expect(console.log).toHaveBeenCalledWith('(4, 2), (8, 2), (8, 5)');
    })

})