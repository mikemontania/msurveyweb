import { Component, EventEmitter, Output } from '@angular/core';
import { LoginService } from 'src/app/services/service.index';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private loginService: LoginService
  ) { }
 


  logout() {
    this.loginService.logout()
  }

}
