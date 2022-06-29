import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Order } from "src/app/models/order.model";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private firestore: AngularFirestore) {}

  getAllOrders(): Observable<Order[]> {
    const collection = this.firestore.collection<Order>("Orders");
    const orders$ = collection.valueChanges();
    return orders$;
  }

  addOrder(order: Order): void {
    this.firestore
      .collection("Orders")
      .add(order)
      .then((docRef) => {
        const upOrder = Object.assign({}, order);
        upOrder["id"] = docRef.id;
        this.firestore.collection("Orders").doc(upOrder.id).update(upOrder);
      });
  }

  editOrder(order: Order): void {
    this.firestore.collection("Orders").doc(order.id).update(order);
  }

  deleteOrder(id: string): void {
    this.firestore.collection("Orders").doc(id).delete();
  }
}
