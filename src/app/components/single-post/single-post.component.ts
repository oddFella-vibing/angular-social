import { Component, Input } from '@angular/core';
import { PostData } from 'src/app/models/postDataModel';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css'],
})
export class SinglePostComponent {
  @Input() post?: PostData;
  dummyImage = 'assets/dummy-user.png';
  chosen_color = 'red';
  liked_current = false;
  onlike() {
    this.liked_current = !this.liked_current;
  }
}
