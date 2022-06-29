import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { Service } from "src/app/models/service.model";

@Injectable({
  providedIn: "root",
})
export class ServiceService {
  constructor(private firestore: AngularFirestore, private store: Store) {}

  getAllService(): Observable<Service[]> {
    const collection = this.firestore.collection<Service>("Services");
    const services$ = collection.valueChanges();
    return services$;
  }

  getOneService(id: string): Observable<Service> {
    const service$ = this.firestore.collection("Services").doc(id).get();
    return service$;
  }

  addService(service: Service): void {
    this.firestore
      .collection("Services")
      .add(service)
      .then((docRef) => {
        const upService = Object.assign({}, service);
        upService["id"] = docRef.id;
        this.firestore
          .collection("Services")
          .doc(upService.id)
          .update(upService);
      });
  }

  editService(service: Service): void {
    this.firestore.collection("Services").doc(service.id).update(service);
  }

  deleteService(id: string): void {
    this.firestore.collection("Services").doc(id).delete();
  }
}
