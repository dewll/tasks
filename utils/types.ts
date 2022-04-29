/** how types relates to utils ??????, move it in "types" folder at the root of the app  */
export type Lit = string | number | boolean | undefined | null | void;
export const tuple = <T extends Lit[]>(...args: T) => args;
