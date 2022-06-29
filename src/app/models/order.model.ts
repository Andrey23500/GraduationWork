export interface Order {
  id: string;
  name?: string;
  status?: StatusOrder;
  subscriberRef?: string;
  serviceRef: string[];
  createDate?: Date;
  guessDate?: Date;
  completeDate?: Date;
  description?: string;
  userId: string;
}

export enum StatusOrder {
  CREATED = "Created",
  INPROGRESS = "In progress",
  REJECTED = "Rejected",
  COMLETED = "Completed",
}
