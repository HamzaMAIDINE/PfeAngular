import { Component, OnInit } from '@angular/core';
import { DecompteService } from 'src/app/services/decompte.service';
import { MenuItem } from 'primeng';

@Component({
  selector: 'app-decompte',
  templateUrl: './decompte.component.html',
  styleUrls: ['./decompte.component.css']
})
export class DecompteComponent implements OnInit {
  displayDecompte:boolean=false
  items: MenuItem[]= [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"ajouter un Decompte",icon:"pi pi-plus" ,command: () =>{this.displayDecompte = !this.displayDecompte;
      this.getAllOuvrages(); this.getAllChanties()  }}
  ]; 
  constructor(private decompteService: DecompteService) { }

  ngOnInit(): void {
    this.getAllDecompte()
  }
  decomptes:object[]
  getAllDecompte(){
    this.decompteService.getAll("/Dos/getAllDecomptesOuvrages")
        .subscribe((res:any)=>{
          this.decomptes = res
        },err=>console.log(err))
  }

  chantiers
  getAllChanties(){
    this.decompteService.getAll("/chantiers")
        .subscribe((res:any)=>{
          this.chantiers = res._embedded.chantiers
          console.log("chantiers :",this.chantiers)
        },err=>console.log(err))
  }
  ouvrages
  getAllOuvrages(){
    this.decompteService.getAll("/ouvrages")
        .subscribe((res:any)=>{
          this.ouvrages = res._embedded.ouvrages
          console.log("ouvrages :",this.ouvrages)
        },err=>console.log(err))
  }
decompte={qte:0}
ouvrageId
chantierId
  AddDecompte(){
    console.log(this.decompte)
    console.log(this.chantierId)
    console.log(this.ouvrageId)
    this.decompteService.save(`/Dos/decompte/${this.chantierId}/${this.ouvrageId}/Add`, this.decompte)
        .subscribe(()=>{
          this.getAllDecompte()
          setTimeout(() => {
            this.decompte={ qte:0}
            this.displayDecompte = false
          }, 1000);
        },err=>console.log(err))
  }


}
