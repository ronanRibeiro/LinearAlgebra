export class Vector {
    

    constructor (
        private x: number,
        private y: number,
        private z = 0
        ) {}

    public getX(): number {
        return this.x;
    }

    public getY(): number {
        return this.y;
    }

    public getZ(): number {
        return this.z;
    }

    public vectorToString(): string {
        return `(${this.getX()}i, ${this.getY()}j, ${this.getZ()}k)`
    }

}