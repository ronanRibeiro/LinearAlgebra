import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

import { Matrix2d } from "./models/matrix2d";
import { Matrix3d } from "./models/matrix3d";
import { Vector2d } from "./models/vector2d";
import { Vector3d } from "./models/vector3d";
import { Matrix2dService } from "./services/matrix2d.Service";
import { Matrix3dService } from "./services/matrix3d.Service";
import { Vector2dService } from "./services/vector2d.Service";
import { Vector3dService } from "./services/vector3d.Service";
import { Triangle2dService } from './services/triangle2d.Service';
import { Triangle2d } from './models/triangle2d';
import { Line2d } from './models/line2d';
import { AnalyticGeometry2dService } from './services/analyticGeomotry2d.Service';

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));


  let t2dService: Triangle2dService;
  t2dService = Triangle2dService.instance();
  let ag2dService: AnalyticGeometry2dService;
  ag2dService = AnalyticGeometry2dService.instance();
  let v2dService: Vector2dService;
  v2dService = Vector2dService.instance();




  let t: Triangle2d = { a: { x: 4, y: 2 }, b: { x: 8, y: 2 }, c: { x: 8, y: 5 } }; //Rectangular
  let la: Line2d = ag2dService.perpendicularBisector(t.a, t.b);
  let lb: Line2d = ag2dService.perpendicularBisector(t.b, t.c);
  
  v2dService.toString(ag2dService.midPoint(t.a,t.b));
  v2dService.toString(ag2dService.midPoint(t.b,t.c));

  let l1: Line2d = ag2dService.constructPointPointdOrVector(t.a, t.b);
  let l2: Line2d = ag2dService.constructPointPointdOrVector(t.a, t.b);

  ag2dService.lineToString(l1);
  ag2dService.lineToString(l1);

  ag2dService.lineToString(ag2dService.perpendicularLinePoint(l1,ag2dService.midPoint(t.a,t.b)));
  ag2dService.lineToString(ag2dService.perpendicularLinePoint(l2,ag2dService.midPoint(t.b,t.c)));

  ag2dService.lineToString(la);
  ag2dService.lineToString(lb);