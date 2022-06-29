import { createReducer, on } from "@ngrx/store";
import * as ServiceAction from "../actions/service.action";
import { adapter, ServiceState } from "../state/service.state";

export const initialState: ServiceState = adapter.getInitialState({
    selectServiceId: null,
});

export const serviceReducer = createReducer(
  initialState,
  on(ServiceAction.loadServicesSuccess, (state, { services }) => {
    return adapter.setAll(services, state);
  }),
  on(ServiceAction.deleteServiceSuccess, (state, { id }) => {
    return adapter.removeOne(id, state);
  }),
  on(ServiceAction.addServiceSuccess, (state, { service }) => {
    return adapter.addOne(service, state);
  }),
  on(ServiceAction.updateServiceSuccess, (state, { service }) => {
    return adapter.setOne(service, state);
  }),
);
