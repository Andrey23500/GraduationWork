import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as serviceActions from "../actions/service.action";
import { map, mergeMap, EMPTY, of } from "rxjs";
import { ServiceService } from "src/app/service/services/service.service";

@Injectable({ providedIn: "root" })
export class ServiceEffects {
  // @Effect()
  getServices$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(serviceActions.EServiceAction.GET_SERVICES),
      mergeMap(() =>
        this.service.getAllService().pipe(
          map((services) => {
            return serviceActions.loadServicesSuccess({ services });
          }),
        ),
      ),
    );
  });

  getService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(serviceActions.EServiceAction.GET_SERVICE_BY_ID),
      mergeMap(({ id }) => {
        this.service.getOneService(id);
        return of(serviceActions.getServiceSuccess(id));
      }),
    );
  });

  delService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(serviceActions.EServiceAction.DELETE_SERVICE),
      mergeMap(({ id }) => {
        this.service.deleteService(id);
        return of(serviceActions.deleteServiceSuccess(id));
      }),
    );
  });

  addService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(serviceActions.EServiceAction.ADD_SERVICE),
      mergeMap(({ service }) => {
        this.service.addService(service);
        return EMPTY;
      }),
    );
  }, { dispatch: false });

  updateService$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(serviceActions.EServiceAction.UPDATE_SERVICE),
      mergeMap(({ service }) => {
        this.service.editService(service);
        return EMPTY;
      }),
    );
  }, { dispatch: false });

  constructor(private actions$: Actions, private service: ServiceService) {}
}
