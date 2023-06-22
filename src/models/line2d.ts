/**
 * Stores the Function of a line in the general form Ax + By + C = 0
 *
 * @param {number} a
 * @param {number} b 
 * @param {number} c
 */
export interface Line2d {
    //Needs to be represetend this way because of the axis lines.
    //Because when the equations is x = 0 there is no way to represent in the slope form y = ax + b
    a: number,
    b: number,
    c: number
}