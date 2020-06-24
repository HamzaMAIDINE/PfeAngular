import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 

  username:''
  password:''
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {}
 
  login(){
    console.log(this.username, this.password)
    this.authService.login({username: this.username, password: this.password})
        .subscribe((res)=>{
          //  console.log(res)
           this.authService.saveToken(res.headers.get('Authorization'))
           this.router.navigateByUrl('/')
        },err=>console.log(err))
  }

}
