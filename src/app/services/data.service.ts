import { HttpClient } from '@angular/common/http';


export class DataService {
  private authService ;
  public domaine:string = "http://localhost:8080"
  constructor( protected http:HttpClient) { }

  getAll(url){
    return this.http.get(this.domaine+url)
  }

  getOne(url, id){
    return this.http.get(this.domaine+url+"/"+id)
  }

  delete(url, id){
    return this.http.delete(this.domaine+url+"/"+id)
  }

  save(url ,data){
    return this.http.post(this.domaine+url, data)
  }
  updateField(url, id:string, data){
    return this.http.patch(this.domaine+url+"/"+id, data)
  }
}
