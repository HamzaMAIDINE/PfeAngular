import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  username:string=''
  password:string=''
  repassword:string=''
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  } 

  register(){
      this.authService.register({username: this.username, password: this.password, repassword: this.repassword})
        .subscribe(()=>{
          this.authService.logout()
            this.router.navigateByUrl('/login')
        },err=>console.log(err))
  }
}
