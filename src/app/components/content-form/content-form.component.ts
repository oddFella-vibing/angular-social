import { Component, Input, OnInit } from '@angular/core';
import { PostData } from 'src/app/models/postDataModel';
import { ContentService } from 'src/app/shared/services/content.service';

@Component({
  selector: 'app-content-form',
  templateUrl: './content-form.component.html',
  styleUrls: ['./content-form.component.css'],
})
export class ContentFormComponent implements OnInit {
  @Input() user!: any;
  constructor(private contentService: ContentService) {}
  ngOnInit(): void {}
  onPost(content: string) {
    const postData: PostData = {
      username:this.user.displayName,
      userid: this.user.uid,
      userImage:this.user.photoURL,
      content: content,
      likes: 0,
      comments: [],
    };
   
    this.contentService.addNewPost(postData);
  }
}
