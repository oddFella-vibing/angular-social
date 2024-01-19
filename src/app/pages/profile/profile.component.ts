import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Subscription } from 'rxjs';
import { UserData } from 'src/app/models/userDataModel';
import { ProfileService } from 'src/app/shared/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  editing = false;
  user!: UserData;
  userName = 'User';
  imgSrc: any = 'assets/dummy-user.png';
  chosenImg!: File;
  userSub!: Subscription;

  constructor(
    private afauth: AngularFireAuth,
    private profileService: ProfileService
  ) {}
  ngOnInit(): void {
    this.userSub = this.afauth.authState.subscribe((user: any) => {
      this.user = {
        id: user.uid,
        user_name: user.displayName,
        profile_picture_url: user.photoURL,
        chosen_color: '',
      };
      this.imgSrc=user.photoURL
      this.userName = this.user.user_name;
    });
  }
  onEdit() {
    this.editing = !this.editing;
  }
  onFileUpload($event: any) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target?.result;
    };
    reader.readAsDataURL($event.target.files[0]);
    this.chosenImg = $event.target.files[0];
  }
  onUpdate() {
    // const userData: UserData = {
    //   id: 0,
    //   user_name: '',
    //   profile_picture_url: '',
    //   chosen_color: '',
    // };
    this.profileService.updatePhoto(this.user.id, this.chosenImg);
  }
  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
