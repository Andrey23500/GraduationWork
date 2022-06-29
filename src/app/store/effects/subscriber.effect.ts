import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import * as subscriberActions from "../actions/subscriber.action";
import { map, mergeMap, EMPTY, of } from "rxjs";
import { SubscriberService } from "src/app/service/subscriber/subscriber.service";

@Injectable({ providedIn: "root" })
export class SubscriberEffects {
  // @Effect()
  getSubscribers$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(subscriberActions.ESubscriberAction.GET_SUBSCRIBERS),
      mergeMap(() =>
        this.service.getAllSubscribers().pipe(
          map((subscribers) => {
            return subscriberActions.loadSubscribersSuccess({ subscribers });
          }),
        ),
      ),
    );
  });

  getSubscriber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(subscriberActions.ESubscriberAction.GET_SUBSCRIBER_BY_ID),
      mergeMap(({ id }) => {
        this.service.getOneSubscriber(id);
        return of(subscriberActions.getSubscriberSuccess(id));
      }),
    );
  });

  delSubscriber$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(subscriberActions.ESubscriberAction.DELETE_SUBSCRIBER),
      mergeMap(({ id }) => {
        this.service.deleteSub(id);
        return of(subscriberActions.deleteSubscriberSuccess(id));
      }),
    );
  });

  addSubscriber$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(subscriberActions.ESubscriberAction.ADD_SUBSCRIBER),
        mergeMap(({ subscriber }) => {
          this.service.addSub(subscriber);
          return EMPTY;
        }),
      );
    },
    { dispatch: false },
  );

  updateSubscriber$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(subscriberActions.ESubscriberAction.UPDATE_SUBSCRIBER),
        mergeMap(({ subscriber }) => {
          this.service.editSub(subscriber);
          return EMPTY;
        }),
      );
    },
    { dispatch: false },
  );

  constructor(private actions$: Actions, private service: SubscriberService) {}
}
