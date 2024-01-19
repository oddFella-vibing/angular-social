import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ContentService {
  constructor(private afs: AngularFirestore) {}
  addNewPost(post: any) {
    this.afs.collection(`users/${post.userid}/posts`).add(post);
  }
  // getPosts() {
  //   return this.afs.collection(`users/6TUutZx1TMaihzAQCpLJOS1vnHi2/posts`).valueChanges();
  // }
  getPosts() {

    return this.afs.collectionGroup('posts').valueChanges()
  }
}
