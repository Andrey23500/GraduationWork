import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Observable } from "rxjs";
import { Subscriber } from "src/app/models/subscriber.model";

@Injectable({
  providedIn: "root",
})
export class SubscriberService {
  constructor(private firestore: AngularFirestore) {}

  getAllSubscribers(): Observable<Subscriber[]> {
    const collection = this.firestore.collection<Subscriber>("Subscribers");
    const subscribers$ = collection.valueChanges();
    return subscribers$;
  }

  getOneSubscriber(id: string): Observable<Subscriber> {
    const subscriber$ = this.firestore.collection("Subscribers").doc(id).get();
    return subscriber$;
  }

  addSub(sub: Subscriber): void {
    this.firestore
      .collection("Subscribers")
      .add(sub)
      .then((docRef) => {
        const upSub = Object.assign({}, sub);
        upSub["id"] = docRef.id;
        this.firestore.collection("Subscribers").doc(upSub.id).update(upSub);
      });
  }

  editSub(sub: Subscriber): void {
    this.firestore.collection("Subscribers").doc(sub.id).update(sub);
  }

  deleteSub(id: string): void {
    this.firestore.collection("Subscribers").doc(id).delete();
  }
}
