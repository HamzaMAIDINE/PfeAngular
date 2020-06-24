import { Component, OnInit } from '@angular/core';
import { AchatMaterielService } from 'src/app/services/achat-materiel.service';
import { MenuItem } from 'primeng';

@Component({
  selector: 'app-achat-materiel',
  templateUrl: './achat-materiel.component.html',
  styleUrls: ['./achat-materiel.component.css']
})
export class AchatMaterielComponent implements OnInit {

  materiels
  etudePrices
  chantiers
  items: MenuItem[]= [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true}]
  constructor(private achatMService: AchatMaterielService ) { }

  ngOnInit(): void {
    this.getAllMateriels()
    // this.getAllEtudePrice()
    this.getAllChantiers()
  }
    getAllMateriels(){
      this.achatMService.getAll('/materiels')
          .subscribe((res:any)=>{
            this.materiels = res._embedded.materiels
            console.log('this.materiels :', this.materiels)
          },err=>console.log(err))
    }
    getAllChantiers(){
      this.achatMService.getAll('/Chantiers/getAllChantiersWithAppelOffre')
          .subscribe((res:any)=>{
            this.chantiers = res
            console.log('this.chantiers :', this.chantiers)
          },err=>console.log(err))
    }
    getAllEtudePrice(){
      this.achatMService.getAll('/etudePrices')
          .subscribe((res:any)=>{
            this.etudePrices = res._embedded.etudePrices
            console.log('this.etudePrices :',this.etudePrices)
          },err=>console.log(err))
    }
    achatMatereil={prix :0, qte:0, type:''}
    chantierId
    materielId
    addAchatMatereil(){
      this.materielId = parseInt(this.materielId)
      console.log('achatMatereil :', this.achatMatereil)
      this.achatMService.save(`/achatMateriels/${this.chantierId}/${this.materielId}/Add`, this.achatMatereil)
          .subscribe((res)=>{
             console.log('res :',res)
          },err=>console.log(err))
      this.achatMatereil={prix :0, qte:0, type:''}
      this.chantierId =undefined
      this.materielId =undefined
      this.getAllChantiers()
    }

}
