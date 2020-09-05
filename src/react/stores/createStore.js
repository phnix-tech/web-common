import {createStore, applyMiddleware} from "redux";
import getStateMiddleware from "./getStateMiddleware";

export default function (reducer, initState) {
  return createStore(reducer, initState, applyMiddleware(getStateMiddleware));
}