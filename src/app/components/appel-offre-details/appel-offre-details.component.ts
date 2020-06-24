import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppelOffreService } from 'src/app/services/appel-offre.service';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-appel-offre-details',
  templateUrl: './appel-offre-details.component.html',
  styleUrls: ['./appel-offre-details.component.css']
})
export class AppelOffreDetailsComponent implements OnInit {
  
  constructor(private activatedRoute: ActivatedRoute, private appelOffreService: AppelOffreService) { }
  
  idAppelOffre
  soumissionOuvrage
  appelOffre
  cols
  cols2
  instalationChantierDialog:boolean=false
  SoumissionDialog:boolean=false
  etudePrixDialog:boolean=false
  items: MenuItem[] = [
        {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/appelOffre"},
        {separator:true},
        {label:"instalation chantier",icon:"pi pi-plus"
        ,command: () =>{ this.instalationChantierDialog = ! this.instalationChantierDialog}
      },
        {label:"Soumission",icon:"pi",items:[
          {label:"insertion",icon:"pi pi-plus"
          ,command: () =>{ this.SoumissionDialog = !this.SoumissionDialog;this.getAllOuvrages();}
        }]},
        {label:"etude de prix",icon:"pi",items:[
          {label:"insertion",icon:"pi pi-plus"
          ,command: () =>{  this.etudePrixDialog = !this.etudePrixDialog;this.getAllOuvrages();this.getAllEnginCamion()}
        }]},   
  ];
  ngOnInit(): void {
        this.idAppelOffre  = this.activatedRoute.snapshot.params.id
        if(this.idAppelOffre !== null || this.idAppelOffre !== 'undefined'){
          this.getAppelOffre();
          this.getTableBord()
        this.getInstallationChantierByAppelOffre()
        }
        this.initFileds();
  }    
  initFileds(){
        this.cols = [
          { field: 'designation', header: 'designation' },
          { field: 'prix', header: 'prix' },
          { field: 'cm.designation', header: 'Category' }
        ];
          this.cols2 = [
            { field: 'designation', header: 'designation d\'ouvrage' },
            { field: 'unite', header: 'Unite' },
            { field: 'Qnt', header: 'Qnt' },
            { field: 'prixU', header: 'prix Unitaire' },
            { field: 'prixV', header: 'prix Vente' }
          ];
  }
  getAppelOffre(){
    this.appelOffreService.getOne("/appelOffres", this.idAppelOffre)
        .subscribe((res:any)=>{
          console.log('getAppelOffre',res)
            this.appelOffre = res
            this.getTotalInsC();
        },err=>console.log(err))
  }
  ouvrages
  getAllOuvrages(){
    this.appelOffreService.getAll('/ouvrages')
        .subscribe((res:any)=>{
          this.ouvrages = res._embedded.ouvrages
          console.log('this.ouvrages :',this.ouvrages)
        },err=>console.log(err))
  }
  enginCamion
  getAllEnginCamion(){
    this.appelOffreService.getAll('/engins/camion')
        .subscribe((res:any)=>{
          console.log('getAllEnginCamion  :',res)
          this.enginCamion = res
        },err=>console.log(err))
  }
  instalationChantier={designation:'', montant:0,appelOffre:''}
  AddInstalationChantier(){
    console.log('this.chantier :',this.instalationChantier)
    this.appelOffreService.save(`/AppelOffres/${this.idAppelOffre}/Add`, {designation:this.instalationChantier.designation,
       montant: this.instalationChantier.montant})
    .subscribe((res)=>{
      this.installationChantierByAppelOffres  = [res, ...this.installationChantierByAppelOffres]
      console.log('res :',res)
    },err=>console.log(err))
    this.instalationChantier={designation:'', montant:0,appelOffre:''}
    this.showMainForm()
  }
  ouvrageID; qte ;prix
  addSoumissionOuvrage(){
    console.log(this.idAppelOffre, this.ouvrageID, this.qte, this.prix)
     this.appelOffreService.getAll('/addSoumissionOuvrage/'+this.idAppelOffre+'/'+this.ouvrageID+'/'+this.qte+'/'+this.prix)
           .subscribe(()=>{
             console.log('  added soumission ')
           },err=>console.log(err))
      this.showMainForm()   
  }

  etudePrix={rendement:'', foisonnement:0, distance:0, salaireChefEquipe:0, 
  salaireOuvrier:0, nbrOuvrier:0 }
  enginCamionId
  ouvrageId
  addEtudePrix(){
    this.enginCamionId = parseInt(this.enginCamionId)
    this.ouvrageId = parseInt(this.ouvrageId)
    console.log('enginCamionId :',this.enginCamionId, 'ouvrageId :',this.ouvrageId, 'type :', typeof this.ouvrageId)
      console.log('this.etudePrix : ', this.etudePrix)
      this.appelOffreService.save(`/AppelOffres/${this.idAppelOffre}/${this.ouvrageId}/${this.enginCamionId}/AddEtudePrice`, this.etudePrix)
          .subscribe((res)=>{
            console.log("res of etudePrix", res)
          },err=>console.log(err))
          this.getAppelOffre()
          setTimeout(() => {
            this.etudePrix={ rendement:'', foisonnement:0, distance:0, salaireChefEquipe:0, 
            salaireOuvrier:0, nbrOuvrier:0 }
          }, 1000);
          this.showMainForm()
  }
  installationChantierByAppelOffres
  getInstallationChantierByAppelOffre(){
    this.appelOffreService.getOne("/appelOffres", this.idAppelOffre+"/installationChantiers")
    .subscribe((res:any)=>{
          console.log("getInstallationChantierByAppelOffre : ",res._embedded.installationChantiers)
            this.installationChantierByAppelOffres = res._embedded.installationChantiers 
      this.getTotalInsC();
   },err=>console.log(err))
  }
  tableBord
  getTableBord(){
     this.appelOffreService.getAll('/AppelOffres/getTableBord/'+this.idAppelOffre)
          .subscribe((res)=>{
            console.log(res)
            this.tableBord = res
          },err=>console.log(err))
  }
  getTotalInsC(){
     let total:number =0;
     if(this.installationChantierByAppelOffres){
       this.installationChantierByAppelOffres.forEach(ich => {
             total += ich.montant
        });
        return total;
     }
  }
  getTotalArticles(){
  let total:number =0;
  if(this.tableBord){
    this.tableBord.forEach(o => {
      total += o[5]
     });
     return total;
  }
  } 
  getTotaTVA(){
  let total:number =this.getTotalArticles();
  let tva:number =0
      tva = ( total * 0.2 )
       return tva;
  }
  getTotalWithTVA(){
    let total:number =this.getTotalArticles();
    let tva:number =this.getTotaTVA();
    let somme:number=0;
    somme = (tva+ total)
     return somme;
  }
  showMainFormDialog:boolean = true
  showMainForm(){
    this.getAppelOffre() ;this.getAllOuvrages() ;this.getAllEnginCamion() ;this.getInstallationChantierByAppelOffre() ;
    this.getTableBord() ;this.getTotalInsC() ;this.getTotalArticles() ;this.getTotaTVA() ;this.getTotalWithTVA()
    this.instalationChantierDialog = false ; this.SoumissionDialog =false ; this.etudePrixDialog = false
    this.showMainFormDialog = true
  }
}
