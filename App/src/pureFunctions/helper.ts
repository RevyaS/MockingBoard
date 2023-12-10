// PURE FUNCTIONS - Non stateful functions, returns a new copy of a value

// Generates Obj from k, v pair
const extractOf = (k: string) => (v: any) => ({ [k]: v });
