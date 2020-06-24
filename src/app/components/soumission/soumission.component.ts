import { Component, OnInit } from '@angular/core';
import { SoumissionService } from 'src/app/services/soumission.service';
import { MenuItem } from 'primeng';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-soumission',
  templateUrl: './soumission.component.html',
  styleUrls: ['./soumission.component.css']
})
export class SoumissionComponent implements OnInit {
  displaySoumission:boolean=false
  items: MenuItem[]= [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"ajouter un Soumission",icon:"pi pi-plus" ,command: () =>{this.displaySoumission = !this.displaySoumission;
       this.getAllAppelOffres(); this.getAllOuvrages()}}
  ]; 
  constructor(private soumissionService: SoumissionService, private authService: AuthService) { }
  isAdmin(){
    return this.authService.isAdmin()
  }
  ngOnInit(): void {
    this.getAllSoumission()
  }
  soumissions:object[]
  getAllSoumission(){
    this.soumissionService.getAll("/getAllSoumissionsOuvrages")
        .subscribe((res:any)=>{
          this.soumissions = res
        },err=>console.log(err))
  }
  appelOffres
  getAllAppelOffres(){
    this.soumissionService.getAll("/appelOffres")
        .subscribe((res:any)=>{
          this.appelOffres = res._embedded.appelOffres
          console.log("appelOffres :",this.appelOffres)
        },err=>console.log(err))
  }
  ouvrages
  getAllOuvrages(){
    this.soumissionService.getAll("/ouvrages")
        .subscribe((res:any)=>{
          this.ouvrages = res._embedded.ouvrages
          console.log("ouvrages :",this.ouvrages)
        },err=>console.log(err))
  }
prix:0; qte:0
ouvrageId
appelOffreId
  addSoumission(){
    this.soumissionService.getAll('/addSoumissionOuvrage/'+this.appelOffreId+'/'+this.ouvrageId+'/'+this.qte+'/'+this.prix)
        .subscribe(()=>{
          this.getAllSoumission()
          setTimeout(() => {
            this.prix=0; this.qte=0
            this.displaySoumission = false
          }, 1000);
         },err=>console.log(err))
  }
  deleteSoumission(id, appelOffreId){
this.soumissionService.getAll('/soumission/'+appelOffreId+'/Delete')
.subscribe(()=>{
    this.soumissions = this.soumissions.filter(s=> s[0] !== id)  
 },err=>console.log(err))
}
}
 