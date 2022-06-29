import { createEntityAdapter, EntityAdapter, EntityState } from "@ngrx/entity";
import { Service } from "src/app/models/service.model";

export interface ServiceState extends EntityState<Service>{
  selectServiceId: string | null;
}
export const adapter: EntityAdapter<Service> = createEntityAdapter<Service>();
