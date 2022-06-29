import { createFeatureSelector, createSelector, DefaultProjectorFn, MemoizedSelector } from "@ngrx/store";
import { Service } from "src/app/models/service.model";
import { adapter, ServiceState } from "../state/service.state";

export const selectServiceState =
  createFeatureSelector<ServiceState>("services");

const { selectAll } = adapter.getSelectors();

export const selectServices = createSelector(selectServiceState, selectAll);

export const selectCurrentService = (id: string): MemoizedSelector<object, Service | undefined, DefaultProjectorFn<Service | undefined>> =>
  createSelector(selectServiceState, (state) => {
    return state.entities[id];
  });
