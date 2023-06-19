export interface Line2d {
    //General Form - Ax + By + C = 0
    //Needs to be represetend this way because of the axis lines.
    //When the equations is x = 0 there is no way to represent in the form y = ax + b
    a: number,
    b: number,
    c: number
}