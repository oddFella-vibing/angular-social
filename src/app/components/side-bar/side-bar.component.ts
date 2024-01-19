import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css'],
})
export class SideBarComponent {
  @Input() user!: any;
  dummyImage = 'assets/dummy-user.png';
  chosen_color = 'red';
  borderstyle = '0.5px solid ' + this.chosen_color;
  constructor(public authService: AuthService) {}
}
