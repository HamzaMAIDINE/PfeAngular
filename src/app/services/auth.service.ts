import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {  

  public username:string=''
  public token:string=''
  roles:Array<string>=[]

  private host:string ="http://localhost:8080"
  constructor(private http: HttpClient, private router: Router) { }

  login(data){
    return this.http.post(`${this.host}/login`, data, {observe:'response'});
  }

  logout(){
    this.token = undefined
    this.roles = null
    localStorage.removeItem('token')
    
  }
  register(data){
    return this.http.post(`${this.host}/register`, data);
  }
  saveToken(token){
      this.token= token
      localStorage.setItem('token', token)
      this.parse()
  
    }
    parse(){
      let jwtHelper= new JwtHelperService()
      let decodeToken = jwtHelper.decodeToken(this.token)
      this.username = decodeToken.sub
      this.roles = decodeToken.roles
      console.log('user :',this.username, 'roles :',this.roles, 'isAdmin :',this.isAdmin(),'isUser :',this.isUser(),'isAuth', this.isAuthenticated())
    }

    isAdmin(){
      return (this.roles.indexOf('ADMIN')>=0)
    }
    isUser(){
      return (this.roles.indexOf('USER')>=0)
    }
    getUserName(){
      this.parse()
      return this.username;
    }
    isAuthenticated(){
     return (this.roles && (this.isAdmin() || this.isUser()))
    }
    loadToken(){
      this.token = localStorage.getItem('token')
      if(this.token){
        this.parse() 
      }
    }
      redirectIsAuth(){
          if (this.isAuthenticated()) {
            this.router.navigateByUrl('/')
          }else{
            this.router.navigateByUrl('/login')
          }
        }
}
