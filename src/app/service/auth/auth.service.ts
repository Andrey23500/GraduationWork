/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Router } from "@angular/router";
import { User } from "src/app/models/user.model";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";


@Injectable({
  providedIn: "root",
})
export class AuthService {
  public currentUser!: User | null;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    // this.afAuth.authState.subscribe((user) => {
    //   if (user) {
    //     this.getUserFromFS(user.uid);
    //     localStorage.setItem("user", JSON.stringify(this.currentUser));
    //     JSON.parse(localStorage.getItem("user")!);
    //   } else {
    //     localStorage.setItem("user", null!);
    //     JSON.parse(localStorage.getItem("user")!);
    //   }
    // });
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async login(userIn: User): Promise<void> {
    this.afAuth
      .signInWithEmailAndPassword(userIn.username, userIn.password)
      .then((user) => {
        this.firestore
          .collection("Users")
          .ref.where("username", "==", user.user?.email)
          .onSnapshot((snap) => {
            snap.forEach((userRef) => {
              this.currentUser = userRef.data() as User;
              this.router.navigate(["/system", "home"]);
            });
          });
      })
      .catch((err) => {
        let errorMessage: string = "";
        switch (err.code) {
          case "auth/user-not-found":
            errorMessage = "User not found.";
            break;
          case "auth/wrong-password":
            errorMessage = "Wrong password";
            break;
          case "auth/too-many-requests":
            errorMessage = "Many many requests";
            break;

          default:
            errorMessage = "Login error try again later.";
            break;
        }
        this.snackBar.open(`${errorMessage}`, "Ok", { duration: 3000 });
      });
  }

  logOut(): void {
    this.afAuth.signOut().then(() => {
      localStorage.removeItem("user");
      this.currentUser = null;
      this.router.navigate(["/login"]);
    });
  }

  signUp(userIn: User): void {
    this.afAuth
      .createUserWithEmailAndPassword(userIn.username, userIn.password)
      .then((userResponce) => {
        const userAdd: User = {
          id: userResponce.user!.uid,
          username: userIn.username,
          password: userIn.password,
          role: "customer",
        };
        this.firestore
          .collection("Users")
          .add(userAdd)
          .then((user) => {
            const upUser = Object.assign({}, userAdd);
            upUser["id"] = user.id;
            this.firestore.collection("Users").doc(upUser.id).update(upUser);
            user.get().then((x) => {
              this.currentUser = x.data() as User;
            });
          });

        this.router.navigate(["/system", "home"]);
      })
      .catch((err) => {
        let errorMessage: string = "";
        switch (err.code) {
          case "auth/email-already-exists":
            errorMessage = "User already exists";
            break;
          case "auth/email-already-in-use":
            errorMessage = "User already exists";
            break;

          default:
            errorMessage = "Registr error try again later.";
            break;
        }
        this.snackBar.open(`${errorMessage}`, "Ok", { duration: 3000 });
      });
  }

  getCurrentUser(): User | null {
    return this.currentUser;
  }

  get authenticated(): boolean {
    return this.currentUser !== null;
  }

  // getUserFromFS(id: string): Observable<any> {
  //   const user$ = this.firestore.collection("User").doc(id).get();
  //   user$.subscribe((data) => {
  //     this.currentUser = data;
  //   });
  //   return user$;
  // }
}
