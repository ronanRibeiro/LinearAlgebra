export enum TypeRelationLinePlane {
    Coincident, //Specific case of parallels - When comparing Line and Plane, the lane Contains the line
    Parallel,
    Perpendicular,  //Specific case of Intersect at 90º degree
    Intersecting,
    Skew, //Only happens when 2 3d lines neither intersect nor is parallel
    SkewOrthogonal,
}