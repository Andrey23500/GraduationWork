import { createAction, props } from "@ngrx/store";
import { Subscriber } from "src/app/models/subscriber.model";

export enum ESubscriberAction {
  ADD_SUBSCRIBER = "[Subscriber] Add Subscriber",
  ADD_SUBSCRIBER_SUCCESS = "[Subscriber] Add Subscriber Success",

  GET_SUBSCRIBER_BY_ID = "[Subscriber] Get Subscriber By Id",
  GET_SUBSCRIBER_BY_ID_SUCCESS = "[Subscriber] Get Subscriber By Id Success",

  GET_SUBSCRIBERS = "[Subscriber] Get Subscribers",
  GET_SUBSCRIBERS_SUCCESS = "[Subscriber] Get Subscribers Success",

  UPDATE_SUBSCRIBER = "[Subscriber] Update Subscriber",
  UPDATE_SUBSCRIBER_SUCCESS = "[Subscriber] Update Subscriber Success",

  DELETE_SUBSCRIBER = "[Subscriber] Delete Subscriber",
  DELETE_SUBSCRIBER_SUCCESS = "[Subscriber] Delete Subscriber Success",
}

export const addSubscriber = createAction(
  ESubscriberAction.ADD_SUBSCRIBER,
  props<{ subscriber: Subscriber }>(),
);
export const addSubscriberSuccess = createAction(
  ESubscriberAction.ADD_SUBSCRIBER_SUCCESS,
  props<{ subscriber: Subscriber }>(),
);
export const getSubscriber = createAction(
  ESubscriberAction.GET_SUBSCRIBER_BY_ID,
  props<{ id: string }>(),
);
export const getSubscriberSuccess = createAction(
  ESubscriberAction.GET_SUBSCRIBER_BY_ID_SUCCESS,
  props<{ id: string }>(),
);
export const updateSubscriber = createAction(
  ESubscriberAction.UPDATE_SUBSCRIBER,
  props<{ subscriber: Subscriber }>(),
);
export const updateSubscriberSuccess = createAction(
  ESubscriberAction.UPDATE_SUBSCRIBER_SUCCESS,
  props<{ subscriber: Subscriber }>(),
);
export const deleteSubscriber = createAction(
  ESubscriberAction.DELETE_SUBSCRIBER,
  props<{ id: string }>(),
);
export const deleteSubscriberSuccess = createAction(
  ESubscriberAction.DELETE_SUBSCRIBER_SUCCESS,
  props<{ id: string }>(),
);
export const loadSubscribers = createAction(ESubscriberAction.GET_SUBSCRIBERS);
export const loadSubscribersSuccess = createAction(
  ESubscriberAction.GET_SUBSCRIBERS_SUCCESS,
  props<{ subscribers: Subscriber[] }>(),
);
