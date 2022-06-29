import { ActionReducerMap } from "@ngrx/store";
import * as fromOrder from "./reducers/order.reducer";
import * as fromService from "./reducers/service.reducer";
import * as fromSubscriber from "./reducers/subscriber.reducer";
import { OrderState } from "./state/order.state";
import { ServiceState } from "./state/service.state";
import { SubscriberState } from "./state/subscriber.state";

export interface AppState {
  orders: OrderState;
  services: ServiceState;
  subscribers: SubscriberState;
}
export const reducers: ActionReducerMap<AppState> = {
  orders: fromOrder.orderReducer,
  services: fromService.serviceReducer,
  subscribers: fromSubscriber.subscriberReducer,
};
