import { createAction, props } from "@ngrx/store";
import { Service } from "src/app/models/service.model";

export enum EServiceAction {
  ADD_SERVICE = "[Service] Add Service",
  ADD_SERVICE_SUCCESS = "[Service] Add Service Success",

  GET_SERVICE_BY_ID = "[Service] Get Service By Id",
  GET_SERVICE_BY_ID_SUCCESS = "[Service] Get Service By Id Success",

  GET_SERVICES = "[Service] Get Services",
  GET_SERVICES_SUCCESS = "[Service] Get Services Success",

  UPDATE_SERVICE = "[Service] Update Service",
  UPDATE_SERVICE_SUCCESS = "[Service] Update Service Success",

  DELETE_SERVICE = "[Service] Delete Service",
  DELETE_SERVICE_SUCCESS = "[Service] Delete Service Success",
}

export const addService = createAction(
  EServiceAction.ADD_SERVICE,
  props<{ service: Service }>(),
);
export const addServiceSuccess = createAction(
  EServiceAction.ADD_SERVICE_SUCCESS,
  props<{ service: Service }>(),
);
export const getService = createAction(
  EServiceAction.GET_SERVICE_BY_ID,
  props<{ id: string }>(),
);
export const getServiceSuccess = createAction(
  EServiceAction.GET_SERVICE_BY_ID_SUCCESS,
  props<{ id: string }>(),
);
export const updateService = createAction(
  EServiceAction.UPDATE_SERVICE,
  props<{ service: Service }>(),
);
export const updateServiceSuccess = createAction(
  EServiceAction.UPDATE_SERVICE_SUCCESS,
  props<{ service: Service }>(),
);
export const deleteService = createAction(
  EServiceAction.DELETE_SERVICE,
  props<{ id: string }>(),
);
export const deleteServiceSuccess = createAction(
  EServiceAction.DELETE_SERVICE_SUCCESS,
  props<{ id: string }>(),
);
export const loadServices = createAction(
  EServiceAction.GET_SERVICES,
);
export const loadServicesSuccess = createAction(
  EServiceAction.GET_SERVICES_SUCCESS,
  props<{ services: Service[] }>(),
);
