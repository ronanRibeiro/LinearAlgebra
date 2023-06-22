import { MathService } from "./math.Service";

describe('math.Service.ts', function () {
    let mathService: MathService;

    beforeEach(function () {
        mathService = MathService.instance();
    })


    it('should return true when the difference of the numbers are less than a limit (0.00005 as Standard)', function () {
        expect(mathService.isAlmostEqual(1, 2)).toBeFalse();
        expect(mathService.isAlmostEqual(10 , -10)).toBeFalse();
        expect(mathService.isAlmostEqual(-2,-3,0.5)).toBeFalse();
        expect(mathService.isAlmostEqual(0.0000015, 0.0000027)).toBeTrue();
        expect(mathService.isAlmostEqual(1,1.5,2)).toBeTrue();
        expect(mathService.isAlmostEqual(-3,-3.2,0.5)).toBeTrue();
    })

    it('should return the cuber root of a number', function () {
        expect(mathService.cuberoot(27)).toBeCloseTo(3);
        expect(mathService.cuberoot(-125)).toBeCloseTo(-5);
        expect(mathService.cuberoot(125)).toBeCloseTo(5);
        expect(mathService.cuberoot(0)).toBeCloseTo(0);
    })

    it('should return the solution of the cubic equation. Only the real solutions', function () {        
        expect(mathService.cubicEquation(1,2,3,4)).toBeCloseTo(-1.6506,4);

        let n0: number[] = mathService.cubicEquation(0 , 1, 4, 3)
        expect(n0[0]).toBeCloseTo(-1, 4);
        expect(n0[1]).toBeCloseTo(-3, 4);        
        
        expect(mathService.cubicEquation(1,0,3,4.5)).toBeCloseTo(-1.0800, 4);
        expect(mathService.cubicEquation(-1,2,0,-4)).toBeCloseTo(-1.1304);
        expect(mathService.cubicEquation(4,-2,3,0)).toBeCloseTo(0);
        
        let n1: number[] = mathService.cubicEquation(1,-6,9,-4)
        expect(n1[0]).toBeCloseTo(1);
        expect(n1[1]).toBeCloseTo(1);
        expect(n1[2]).toBeCloseTo(4); 
        
        let n2: number[] = mathService.cubicEquation(1,-3,3,-1)
        expect(n2[0]).toBeCloseTo(1);
        expect(n2[1]).toBeCloseTo(1);
        expect(n2[2]).toBeCloseTo(1);

        let n3: number[] = mathService.cubicEquation(1,4,-4,-1)
        expect(n3[0]).toBeCloseTo(1);
        expect(n3[1]).toBeCloseTo(-0.20871,4);
        expect(n3[2]).toBeCloseTo(-4.79129,4);

        let n4: number[] = mathService.cubicEquation(1,-4,5,-2)
        expect(n4[0]).toBeCloseTo(1);
        expect(n4[1]).toBeCloseTo(1);
        expect(n4[2]).toBeCloseTo(2);

    })

    it('should return the solution of the quadratic equation. Only the real solutions', function () {
        let n1: number[] = mathService.quadraticEquation(1,4,3)
        expect(n1[0]).toBeCloseTo(-1, 4);
        expect(n1[1]).toBeCloseTo(-3, 4);

        let n2: number[] = mathService.quadraticEquation(-2, 1,3)
        expect(n2[0]).toBeCloseTo(-1, 4);
        expect(n2[1]).toBeCloseTo(1.5, 4);

        let n3: number[] = mathService.quadraticEquation(-2, -4,0)
        expect(n3[0]).toBeCloseTo(-2, 4);
        expect(n3[1]).toBeCloseTo(0, 4);

        let n4: number[] = mathService.quadraticEquation(1, 0, -9)
        expect(n4[0]).toBeCloseTo(3, 4);
        expect(n4[1]).toBeCloseTo(-3, 4);

        let n5: number[] = mathService.quadraticEquation(0, 2, 1)
        expect(n5[0]).toBeCloseTo(-0.5, 4);

        expect(function() {mathService.quadraticEquation(1, 2, 3)}).toThrowError();
    })

    it('should return the solution of the linear equation. Only the real solutions', function () {
        expect(mathService.linearEquation(1,2)).toBeCloseTo(-2,4);
        expect(mathService.linearEquation(1,-4)).toBeCloseTo(4,4);
        expect(mathService.linearEquation(-2,1)).toBeCloseTo(0.5,4);
        expect(mathService.linearEquation(-3,6)).toBeCloseTo(2,4);
        expect(function() {mathService.linearEquation(0,3)}).toThrowError();
    })

})