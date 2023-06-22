export class MathService {

    constructor() {}

    static instance() {
        const instance = new MathService();
        return instance;
    }

    public isAlmostEqual(n0: number, n1: number, eps = 0.00005): boolean {
        
        return Math.abs((n0 - n1)) <= eps ? true : false;
    }

    public cuberoot(x: number): number {
        var y: number = Math.pow(Math.abs(x), 1 / 3);
        return x < 0 ? -y : y;
    }


    public linearEquation(a: number, b: number): number {
        if (!(a===0)) {
            return -b/a;
        } else {
            throw Error ('There is no solution')
        }
      }

    public quadraticEquation(a: number, b: number, c: number): number[] {
        if (!(a === 0)) {
        let delta = b * b - 4 * a * c;
        if (delta > 0) {
            return [(-b + Math.sqrt(delta)) / (2 * a),
                    (-b - Math.sqrt(delta)) / (2 * a)];
          } else {
            throw Error ('There is no solution');
          }
        } else {
            let result: number = this.linearEquation(b,c)
            return [result];
        }
      }

    public cubicEquation(a: number, b: number, c: number, d: number): number[] {
        let roots: number[] = [];
        
        if (a === 0) {
            return roots = this.quadraticEquation(b, c, d);
        }
        
        // Convert to depressed cubic t^3+pt+q = 0 (subst x = t - b/3a)
        let p: number = (3 * a * c - b * b) / (3 * a * a);
        let q: number = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);

        if (this.isAlmostEqual(p, 0)) { // p = 0 -> t^3 = -q -> t = -q^1/3
            roots = [this.cuberoot(-q),this.cuberoot(-q),this.cuberoot(-q)];
        } else if (this.isAlmostEqual(q,0)) { // q = 0 -> t^3 + pt = 0 -> t(t^2+p)=0
            roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
        } else {
            let D: number = q * q / 4 + p * p * p / 27;
            if (this.isAlmostEqual(D,0)) {       // D = 0 -> two roots
                roots = [-1.5 * q / p, -1.5 * q / p, 3 * q / p];
            } else if (!this.isAlmostEqual(q,0) && D > 0) {             // Only one real root
                let u: number = this.cuberoot(-q / 2 - Math.sqrt(D));
                roots = [u - p / (3 * u)];
            } else if (!this.isAlmostEqual(q,0) && D < 0) {    // D < 0, three roots, but needs to use complex numbers/trigonometric solution
                let u: number = 2 * Math.sqrt(-p / 3);
                let t: number = Math.acos(3 * q / (p * u)) / 3;  // D < 0 implies p < 0 and acos argument in [-1..1]
                let k: number = 2 * Math.PI / 3;
                roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)];
            }
        }

        // Convert back from depressed cubic
        for (var i = 0; i < roots.length; i++)
            roots[i] -= b / (3 * a);
        return roots;
    }


}