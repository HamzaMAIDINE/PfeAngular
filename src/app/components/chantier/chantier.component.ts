import { Component, OnInit } from '@angular/core';
import { ChantierService } from 'src/app/services/chantier.service';
import { Router } from '@angular/router';
import {  MenuItem } from 'primeng/primeng';


@Component({
  selector: 'app-chantier',
  templateUrl: './chantier.component.html',
  styleUrls: ['./chantier.component.css']
})
export class ChantierComponent implements OnInit {

  popOverTitle: string = "Delete Materiel";
  popOverMessage: string = "Do you want to really delete?";
  cancelClicked: boolean = false;
  chantiers
  cols
  displayChantier: boolean = false;
  items: MenuItem[]= [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"ajouter un chantier",icon:"pi pi-plus" ,command: () =>{this.displayChantier = !this.displayChantier; this.getAllAppelOffres()}}
  ];
  constructor(private  chantierService:ChantierService, private router: Router) { }

  ngOnInit(): void {
    this.getAllChantiers()
   }
   chantier={numCh:'',appelOffre:''}
   AddChantier(){
     this.chantierService.save(`/Chantiers/${this.chantier.appelOffre}/Add`, {numCh:this.chantier.numCh})
     .subscribe((res:any)=>{
       console.log('res :',res)
       this.chantiers =[{numCh:res.numCh, date:res.data,etat:res.etat }, ...this.chantiers]
    },err=>console.log(err))
    setTimeout(() => {
      this.getAllChantiers()
      this.displayChantier = false
      this.chantier={numCh:'',appelOffre:undefined}
    }, 1000);
   }
  getAllChantiers(){
    this.chantierService.getAll("/Chantiers/getAllChantiersWithAppelOffre")
        .subscribe((res:any)=>{
          // console.log(res)
          this.chantiers = res
        },err=>console.log(err))
  }
  appelOffres
  getAllAppelOffres(){
    this.chantierService.getAll("/appelOffres")
        .subscribe((res:any)=>{
          this.appelOffres = res._embedded.appelOffres
          console.log(res)
        },err=>console.log(err))
  }
  onRowSelect(event){
    console.log(event.data)
    this.router.navigateByUrl('/chantier-details/'+event.data[2]+'/'+event.data[0])
  }
  finiChantier(id:string){
      this.chantierService.updateField('/chantiers',id, {etat:'fini'})
          .subscribe((res)=>{
            console.log(res)
            this.getAllChantiers()
            this.chantiers = this.chantiers.forEach(c => {
              if(c.numCh === id){
                  c.etat ='fini'
                  return ;
              }
            });
          },err=>console.log(err))
      // setTimeout(()=>this.getAllChantiers(), 1000);
  }

  deleteChantier(id:string){
    this.chantierService.delete('/chantiers', id)
      .subscribe(()=>{
          this.chantiers = this.chantiers.filter(c=> c[0] !== id )
      },err=>console.log(err))
  }
}
