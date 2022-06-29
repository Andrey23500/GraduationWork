import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";
import { Order } from "src/app/models/order.model";
import { adapter, OrderState } from "../state/order.state";

export const selectOrderState = createFeatureSelector<OrderState>("orders");

const { selectAll } = adapter.getSelectors();

export const selectOrders = createSelector(selectOrderState, selectAll);

export const selectCurrentOrder = (id: string): MemoizedSelector<object, Order | undefined, DefaultProjectorFn<Order | undefined>>  => createSelector(selectOrderState, (state) => {
  return state.entities[id];
});
