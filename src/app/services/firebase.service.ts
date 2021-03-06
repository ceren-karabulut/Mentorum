import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  collectionName= 'mentors';

  constructor(
    private firestore:AngularFirestore
  ) {}

  create_mentor(record){
    return this.firestore.collection(this.collectionName).add(record);
  }

  get_mentors(){
    return this.firestore.collection(this.collectionName).snapshotChanges();
  }
}
