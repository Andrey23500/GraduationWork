import { createReducer, on } from "@ngrx/store";
import * as SubscriberAction from "../actions/subscriber.action";
import { adapter, SubscriberState } from "../state/subscriber.state";

export const initialState: SubscriberState = adapter.getInitialState({
   selectSubscriberId: null,
});

export const subscriberReducer = createReducer(
  initialState,
  on(SubscriberAction.loadSubscribersSuccess, (state, { subscribers }) => {
    return adapter.setAll(subscribers, state);
  }),
  on(SubscriberAction.deleteSubscriberSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(SubscriberAction.addSubscriberSuccess, (state, { subscriber }) => {
    return adapter.addOne(subscriber, state);
  }),
  on(SubscriberAction.updateSubscriberSuccess, (state, { subscriber }) => {
    return adapter.setOne(subscriber, state);
  }),
);
