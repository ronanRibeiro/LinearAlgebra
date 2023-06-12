import { MathService } from "./math.Service";
import { Vector2dService } from "./vector2d.Service";

export class Triangle2dService {
    constructor(
        private mathService: MathService,
        private vector2dService: Vector2dService
    ) { }

    static instance() {
        const instance = new Triangle2dService(
            MathService.instance(),
            Vector2dService.instance()
        );
        return instance;
    }

    
}