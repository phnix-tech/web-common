import { Action, AnyAction } from "redux";
import { Any, EmptyObject } from "../../types";
import { RTable } from "../../types/Table";
import { IStore } from "./index";
declare enum ActionType {
    SET_STATE = 0,
    SEARCH_PARAMS = 1,
    RESET = 2
}
interface PageStoreAction<S> extends Action<ActionType> {
    value: Partial<S>;
}
interface IMapDispatchToProps<S, SP> {
    setState(state: Partial<S>): PageStoreAction<S>;
    setSearchParams(searchParams: Partial<SP>): PageStoreAction<SP>;
    /**
     * 同步获取store state
     */
    getState(): S;
    /**
     * fix IntelliJ IDEA warning `Promise returned from xxx is ignored`
     * @param rest
     */
    search(...rest: Any[]): void;
    search<P = Any>(...rest: Any[]): Promise<P>;
    resetPageSearch(...rest: Any[]): void;
    resetPageSearch<P = Any>(...rest: Any[]): Promise<P>;
    reset(searchParams?: Partial<SP>): void;
    reset<P = Any>(searchParams?: Partial<SP>): Promise<P>;
}
/**
 * @template C - redux context
 * @template S - redux store state
 * @template SP - search params
 * @template A - dispatch actions
 */
interface ISearchPageStore<C, S, SP, A extends Action = AnyAction> extends IStore<C, S, IMapDispatchToProps<S, SP>, A> {
}
declare type IState<T, SP, ES = EmptyObject> = {
    table: T | null;
    searchParams: SP;
} & ES;
/**
 * @template SP - search params generic type
 * @template T - table api generic type
 * @template C - redux store context generic type
 * @param searchParams - initial search params state
 * @param extraState - extra state
 * @param ctx - optional store context
 */
export default function <SP = Record<string, unknown>, ES = EmptyObject, T extends RTable = RTable, C = null>(searchParams: SP, extraState?: ES, ctx?: C | null): ISearchPageStore<C, IState<T, SP, ES>, SP, PageStoreAction<IState<T, SP, ES>>>;
export {};
