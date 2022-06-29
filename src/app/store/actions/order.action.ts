import { createAction, props } from "@ngrx/store";
import { Order } from "src/app/models/order.model";

export enum EOrderAction {
  ADD_ORDER = "[Order] Add Order",
  ADD_ORDER_SUCCESS = "[Order] Add Order Success",

  GET_ORDER_BY_ID = "[Order] Get Order By Id",
  GET_ORDER_BY_ID_SUCCESS = "[Order] Get Order By Id Success",

  GET_ORDERS = "[Order] Get Orders",
  GET_ORDERS_SUCCESS = "[Order] Get Orders Success",

  UPDATE_ORDER = "[Order] Update Order",
  UPDATE_ORDER_SUCCESS = "[Order] Update Order Success",

  DELETE_ORDER = "[Order] Delete Order",
  DELETE_ORDER_SUCCESS = "[Order] Delete Order Success",
}

export const addOrder = createAction(
  EOrderAction.ADD_ORDER,
  props<{ order: Order }>(),
);
export const addOrderSuccess = createAction(
  EOrderAction.ADD_ORDER_SUCCESS,
  props<{ order: Order }>(),
);
export const getOrder = createAction(
  EOrderAction.GET_ORDER_BY_ID,
  props<{ id: string }>(),
);
export const getOrderSuccess = createAction(
  EOrderAction.GET_ORDER_BY_ID_SUCCESS,
  props<{ order: Order }>(),
);
export const updateOrder = createAction(
  EOrderAction.UPDATE_ORDER,
  props<{ order: Order }>(),
);
export const updateOrderSuccess = createAction(
  EOrderAction.UPDATE_ORDER_SUCCESS,
  props<{ order: Order }>(),
);
export const deleteOrder = createAction(
  EOrderAction.DELETE_ORDER,
  props<{ id: string }>(),
);
export const deleteOrderSuccess = createAction(
  EOrderAction.DELETE_ORDER_SUCCESS,
  props<{ id: string }>(),
);
export const loadOrders = createAction(EOrderAction.GET_ORDERS);
export const loadOrdersSuccess = createAction(
  EOrderAction.GET_ORDERS_SUCCESS,
  props<{ orders: Order[] }>(),
);
