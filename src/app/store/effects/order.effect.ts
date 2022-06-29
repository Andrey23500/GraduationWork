import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as orderActions from "../actions/order.action";
import { OrderService } from "src/app/service/order/order.service";
import { EMPTY, map, mergeMap, of } from "rxjs";
@Injectable({ providedIn: "root" })
export class OrderEffects {
  // @Effect()
  getOrders$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActions.EOrderAction.GET_ORDERS),
      mergeMap(() =>
        this.service.getAllOrders().pipe(
          map((orders) => {
            return orderActions.loadOrdersSuccess({ orders });
          }),
        ),
      ),
    );
  });

  delOrder$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(orderActions.EOrderAction.DELETE_ORDER),
      mergeMap(({ id }) => {
        this.service.deleteOrder(id);
        return of(orderActions.deleteOrderSuccess(id));
      }),
    );
  });

  addOrder$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(orderActions.EOrderAction.ADD_ORDER),
        mergeMap(({ order }) => {
          this.service.addOrder(order);
          return EMPTY;
        }),
      );
    },
    { dispatch: false },
  );

  updateOrder$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(orderActions.EOrderAction.UPDATE_ORDER),
        mergeMap(({ order }) => {
          this.service.editOrder(order);
          return EMPTY;
        }),
      );
    },
    { dispatch: false },
  );

  constructor(private actions$: Actions, private service: OrderService) {}
}
