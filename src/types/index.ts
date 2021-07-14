/**
 * `any` alias, 用于统一关闭`any` lint错误
 */
export type Any = any; // eslint-disable-line @typescript-eslint/no-explicit-any

/**
 * 空接口类型，用于泛型默认空对象参数，或者限定泛型参数为对象类型  
 * 建议改用内置类型`Record<string, never>` 
 */
export interface EmptyObject { // eslint-disable-line @typescript-eslint/no-empty-interface

}