import { createFeatureSelector, createSelector } from "@ngrx/store";
import { adapter, SubscriberState } from "../state/subscriber.state";

export const selectSubscriberState =
  createFeatureSelector<SubscriberState>("subscribers");

const { selectAll } = adapter.getSelectors();

export const selectSubscribers = createSelector(
  selectSubscriberState,
  selectAll,
);

export const selectCurrentSub = (id: string) =>
  createSelector(selectSubscriberState, (state) => {
    return state.entities[id];
  });
