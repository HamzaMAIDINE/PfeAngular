import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private authService: AuthService, private router: Router){}
    username:string=''
    ngOnInit(): void {
      // this.authService.loadToken() 
      this.authService.redirectIsAuth()
      this.username =  this.authService.getUserName()
    }


    isAdmin(){
      return this.authService.isAdmin()
    }

    isAuth(){
      return this.authService.isAuthenticated()
    }
    logout(){
      this.authService.logout()
      this.router.navigateByUrl('/login')
    }
}