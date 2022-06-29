import { createReducer, on } from "@ngrx/store";
import * as OrderAction from "../actions/order.action";
import { adapter, OrderState } from "../state/order.state";

export const initialState: OrderState = adapter.getInitialState({
  selectOrderId: null,
});

export const orderReducer = createReducer(
  initialState,
  on(OrderAction.loadOrdersSuccess, (state, { orders }) => {
    return adapter.setAll(orders, state);
  }),
  on(OrderAction.deleteOrderSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(OrderAction.addOrderSuccess, (state, { order }) => {
    return adapter.addOne(order, state);
  }),
  on(OrderAction.updateOrderSuccess, (state, { order }) => {
    return adapter.setOne(order, state);
  }),
);
