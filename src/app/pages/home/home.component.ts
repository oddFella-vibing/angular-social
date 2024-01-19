import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { ContentService } from 'src/app/shared/services/content.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user$: any;
  contentList$!: any;
  constructor(
    private afauth: AngularFireAuth,
    private contentService: ContentService
  ) {}
  ngOnInit(): void {
    this.user$ = this.afauth.authState;
    this.contentList$ = this.contentService.getPosts();
  }
}
