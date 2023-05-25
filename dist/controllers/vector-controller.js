"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vectorController = void 0;
const vector_js_1 = require("../models/vector.js");
class vectorController {
    addVector(vectorA, vectorB) {
        return new vector_js_1.Vector(vectorA.getX() + vectorB.getX(), vectorA.getY() + vectorB.getY(), vectorA.getZ() + vectorB.getZ());
    }
    minusVector(vectorA, vectorB) {
        return new vector_js_1.Vector(vectorA.getX() - vectorB.getX(), vectorA.getY() - vectorB.getY(), vectorA.getZ() - vectorB.getZ());
    }
    vectorByScalar(vectorA, scalar) {
        return new vector_js_1.Vector(vectorA.getX() * scalar, vectorA.getY() * scalar, vectorA.getZ() * scalar);
    }
    dotProduct(vectorA, vectorB) {
        return vectorA.getX() * vectorB.getX() +
            vectorA.getY() * vectorB.getY() +
            vectorA.getZ() * vectorB.getZ();
    }
    crossProduct(vectorA, vectorB) {
        return new vector_js_1.Vector(vectorA.getY() * vectorB.getZ() - vectorA.getZ() * vectorB.getY(), vectorA.getZ() * vectorB.getX() - vectorA.getX() * vectorB.getZ(), vectorA.getX() * vectorB.getY() - vectorA.getY() * vectorB.getX());
    }
}
exports.vectorController = vectorController;
//# sourceMappingURL=vector-controller.js.map