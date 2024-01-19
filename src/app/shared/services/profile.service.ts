import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  // id: number;
  //   user_name:string;
  //   profile_picture_url:string;
  //   chosen_color:string;
  constructor(
    private afs: AngularFirestore,
    private afStorage: AngularFireStorage,
    private afauth: AngularFireAuth
  ) {}
  //    updateUser(user:any){
  // this.afs.collection(`users/${user.id}/profile`)
  //    }
  updatePhoto(id: any, imageFile: any) {
    this.afStorage
      .upload(`profiles/${id}`, imageFile)
      .then((ref) => {
        this.afStorage
          .ref(`profiles/${id}`)
          .getDownloadURL()
          .subscribe((url: any) => {
            this.afauth.currentUser.then((user) => {
              console.log(user)
              user?.updateProfile({
                photoURL: url,
              });
            });
          
          });
      })
      .catch((err) => console.log(err));
  }
}
