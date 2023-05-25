"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Vector = void 0;
class Vector {
    constructor(x, y, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    getX() {
        return this.x;
    }
    getY() {
        return this.y;
    }
    getZ() {
        return this.z;
    }
    vectorToString() {
        return `(${this.getX()}i, ${this.getY()}j, ${this.getZ()}k)`;
    }
}
exports.Vector = Vector;
//# sourceMappingURL=vector.js.map