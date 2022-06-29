import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Subscriber } from "src/app/models/subscriber.model";

export interface SubscriberState extends EntityState<Subscriber> {
  selectSubscriberId: string | null;
}
export const adapter: EntityAdapter<Subscriber> =
  createEntityAdapter<Subscriber>();
