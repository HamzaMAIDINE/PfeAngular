import { Component, OnInit, Input } from '@angular/core';
import { EtudePrixService } from 'src/app/services/etude-prix.service';
import { MenuItem } from 'primeng';

@Component({
  selector: 'app-etude-prix',
  templateUrl: './etude-prix.component.html',
  styleUrls: ['./etude-prix.component.css']
})
export class EtudePrixComponent implements OnInit {
@Input('appelOffreId') appelOffreId;

  constructor(private etudesPriceService: EtudePrixService) { }

  etudesPrices
  etudesPricesDialog=false
  allEtudesPrices
  allEtudesPricesDialog=true
  cols
  etudePrixDialog=false
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"Ajouter un etude price",icon:"pi pi-plus",command: () =>{
      this.etudePrixDialog = !this.etudePrixDialog;this.getAllOuvrages();this.getAllEnginCamion();this.getAppelOffres()
      }}
  ];
  ngOnInit(): void {
    this.getAllEtudesPriceByAppelOffre()
    this.initFields();
    this.getAllEtudeprices()
  }
initFields(){
  this.cols = [
    { field: 'rendement', header: 'rendement' },
    { field: 'prix', header: 'prix' },
    { field: 'cm.designation', header: 'Category' }
  ];
}
  getAllEtudesPriceByAppelOffre(){
  if(this.appelOffreId !== null || this.appelOffreId !== 'undefined'){
    this.etudesPricesDialog =true
    this.allEtudesPricesDialog =false
    this.allEtudesPrices = undefined
    this.etudesPriceService.getAll("/appelOffres/"+this.appelOffreId+"/etudePrix")
    .subscribe((res:any)=>{
    console.log('this.appelOffreId :',this.appelOffreId)
      console.log('getAllEtudesPriceByAppelOffre  :',res)
      this.etudesPrices = res._embedded.etudePrices
    },err=>console.log(err))
}
  }
  getAllEtudeprices(){
  if(this.appelOffreId == null || this.appelOffreId == 'undefined'){
    this.etudesPricesDialog =false
    this.allEtudesPricesDialog =true
    this.etudesPrices = undefined
    this.etudesPriceService.getAll("/EtudePrix/getAllEtudeprices")
    .subscribe((res:any)=>{
      console.log('getAllEtudeprices  :',res)
      this.allEtudesPrices = res

    },err=>console.log(err))
  }
}

enginCamionId
ouvrageId
idAppelOffre
etudePrix={rendement:'', foisonnement:0, distance:0, salaireChefEquipe:0, 
salaireOuvrier:0, nbrOuvrier:0}
addEtudePrix(){
  this.enginCamionId = parseInt(this.enginCamionId)
  this.ouvrageId = parseInt(this.ouvrageId)
  console.log('enginCamionId :',this.enginCamionId, 'ouvrageId :',this.ouvrageId, 'idAppelOffre :',this.idAppelOffre)
    console.log('this.etudePrix : ', this.etudePrix)
    this.etudesPriceService.save(`/AppelOffres/${this.idAppelOffre}/${this.ouvrageId}/${this.enginCamionId}/AddEtudePrice`, this.etudePrix)
        .subscribe((res)=>{
          console.log("res of etudePrix", res)
        },err=>console.log(err))
        this.getAllEtudeprices()
        // this.getAllEtudesPriceByAppelOffre()
        setTimeout(() => {
          this.etudePrix={ rendement:'', foisonnement:0, distance:0, salaireChefEquipe:0, 
          salaireOuvrier:0, nbrOuvrier:0 }
        }, 1000);
        this.etudePrixDialog=  false
        this.allEtudesPricesDialog =true
}
ouvrages
getAllOuvrages(){
  this.etudesPriceService.getAll('/ouvrages')
      .subscribe((res:any)=>{
        this.ouvrages = res._embedded.ouvrages
        console.log('this.ouvrages :',this.ouvrages)
      },err=>console.log(err))
}
enginCamion
getAllEnginCamion(){
  this.etudesPriceService.getAll('/engins/camion')
      .subscribe((res:any)=>{
        console.log('getAllEnginCamion  :',res)
        this.enginCamion = res
      },err=>console.log(err))
}
appelOffres
getAppelOffres(){
  this.etudesPriceService.getAll('/appelOffres')
      .subscribe((res:any)=>{
        console.log('getAppelOffres  :',res)
        this.appelOffres = res._embedded.appelOffres
      },err=>console.log(err))
}
showMainForm(){
         this.getAllEtudeprices()
        //  this.getAllEtudesPriceByAppelOffre()
}
}
