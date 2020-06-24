import { Injectable } from '@angular/core';
import { DataService } from './data.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class OuvrageService{
  public domaine:string = "http://localhost:8080" 
  constructor(private http: HttpClient, private authService: AuthService) { 
  }
  headers = new HttpHeaders({'authorization': this.authService.token})
  getAll(url){
    return this.http.get(this.domaine+url, {headers: this.headers})
  }
  getOne(url, id){
    return this.http.get(this.domaine+url+"/"+id, {headers: this.headers})
  }

  delete(url, id){
    return this.http.delete(this.domaine+url+"/"+id, {headers: this.headers})
  }

  save(url ,data){
    return this.http.post(this.domaine+url, data, {headers: this.headers})
  }
  updateField(url, id:string, data){
    return this.http.patch(this.domaine+url+"/"+id, data, {headers: this.headers})
  }
    update(url ,data){
    return this.http.put(this.domaine+url , data, {headers: this.headers})
  }
}