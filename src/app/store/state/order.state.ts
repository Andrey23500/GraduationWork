import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Order } from "src/app/models/order.model";
export interface OrderState extends EntityState<Order> {
  selectOrderId: string | null;
}
export const adapter: EntityAdapter<Order> = createEntityAdapter<Order>();
