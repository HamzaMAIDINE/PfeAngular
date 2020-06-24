import { Component, OnInit } from '@angular/core';
import { ChantierService } from 'src/app/services/chantier.service';
import { ActivatedRoute } from '@angular/router';
import {  MenuItem } from 'primeng/primeng';
import { AppelOffreService } from 'src/app/services/appel-offre.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-chantier-details',
  templateUrl: './chantier-details.component.html',
  styleUrls: ['./chantier-details.component.css']
})
export class ChantierDetailsComponent implements OnInit {

  popOverTitle: string = "Delete Materiel";
  popOverMessage: string = "Do you want to really delete?";
  cancelClicked: boolean = false;

  chantier
  idChantier
  idappelOffre
  cols
  shows={mainForm:true, s1:false, s2:false, s3:false, s4:false, s5:false, s6:false}
  constructor(private  chantierService:ChantierService, private appelOffreService : AppelOffreService, private activatedRoute: ActivatedRoute, private authServise: AuthService) { }
  isAdmin(){
    return this.authServise.isAdmin()
  }
  ngOnInit(): void {
    this.idChantier = this.activatedRoute.snapshot.params.idChantier
    this.idappelOffre = this.activatedRoute.snapshot.params.idappelOffre
    this.getChantier(); this.getPersonnes();this.getAchatmaterielChantier();this.getBesionsTravers();this.getReparations();
    this.getAvancementChantier();
   }
  allpersonnes
  getPersonnesNonAffecter(){
    this.chantierService.getAll("/Chantiers/getPersonnesNonAffecter/"+this.idChantier)
        .subscribe((res:any)=>{
          this.allpersonnes = res
          console.log(' getAllPersonnes :',this.allpersonnes)
        },err=>console.log(err))
  }
   selectedCar2 ;selectedCars2
  affecterPersonneToChantier(idP) {
    this.chantierService.getAll('/Chantiers/affecterPersonneToChantier/'+this.idChantier+"/"+idP)
    .subscribe(()=>{
      this.allpersonnes = this.allpersonnes.filter(p=> p[0] !== idP)
    },err=>console.log(err))
  }
engins
getEngin(){
   this.chantierService.getAll('/engins/All')
  .subscribe((res:any)=>{
    this.engins =res
    console.log('this.engins :',this.engins)
  },err=>console.log(err))
}
reparation={designation:'', pu:0} ;engin:number
affecterReparation(){
  console.log('this.reparation :',this.reparation)
  this.chantierService.save("/Chantiers/affecterReparation/"+this.idChantier+"/"+this.engin,this.reparation)
  .subscribe(()=>{
      },err=>console.log(err))
      this.showMainForm()
}
designation:''; adresse:''; montant:0;tel:''; type:''
affecterBesoinsTravers(){
   this.chantierService.getAll("/Chantiers/affecterBesoinsTravers/"+this.idChantier+"/"+this.designation+"/"+this.adresse
   +"/"+this.montant+"/"+this.tel+"/"+this.type)
  .subscribe(()=>{
    console.log('added besoin ')
  },err=>console.log(err))
  this.showMainForm()
}
qte; idOuvrage
addDecompte(){
  console.log(this.qte, this.idOuvrage)
  this.chantierService.getAll("/Dos/getNumchantierAndIdDecompte/"+this.idChantier+"/"+this.idOuvrage+"/"+this.qte)
  .subscribe(()=>{
  },err=>console.log(err))
  this.showMainForm()
}
ouvrages
getAllOuvragesForDecompte(){
  this.chantierService.getAll("/ouvrages")
  .subscribe((res:any)=>{
    this.ouvrages = res._embedded.ouvrages
  },err=>console.log(err))
}
materiels
getAllMateriels(){
  this.chantierService.getAll('/materiels')
      .subscribe((res:any)=>{
        this.materiels = res._embedded.materiels
        console.log('this.materiels :', this.materiels)
 },err=>console.log(err))
}
achatMatereil={prix :0, qte:0, type:''}
materielId
addAchatMatereil(){
  this.materielId = parseInt(this.materielId)
  console.log('achatMatereil :', this.achatMatereil)
  this.chantierService.save(`/achatMateriels/${this.idChantier}/${this.materielId}/Add`, this.achatMatereil)
      .subscribe((res)=>{
         console.log('res :',res)
      },err=>console.log(err))
  this.achatMatereil={prix :0, qte:0, type:''}
  this.materielId =undefined
  this.showMainForm()
}

removePersonneFromChantier(idP){
  this.chantierService.getAll("/Chantiers/removePersonneFromChantier/"+this.idChantier+"/"+idP)
      .subscribe(()=>{
         this.personnes = this.personnes.filter(p=> p.idP !== idP)
      },err=>console.log(err))
      this.getPersonnes()
}

  getChantier(){
    this.chantierService.getAll("/Chantiers/getOneChantierByNumChAndNumAO/"+this.idappelOffre+"/"+this.idChantier)
        .subscribe((res:any)=>{
          this.chantier = res
          console.log('Chantier : ',res)
        },err=>console.log(err))
  }
  besionsTravers
  getBesionsTravers(){
    this.appelOffreService.getAll("/Chantiers/getBesionsTravers/"+this.idChantier)
    .subscribe((res:any)=>{
      this.besionsTravers = res
      console.log("getBesionsTravers : ",this.besionsTravers)
      },err=>console.log(err))
    }
    personnes
    getPersonnes(){
      this.appelOffreService.getAll("/Chantiers/getPersonnes/"+this.idChantier)
      .subscribe((res:any)=>{
        this.personnes = res
        console.log("getPersonnes : ",this.personnes)
        },err=>console.log(err))
    }
    reparations
    getReparations(){
      this.appelOffreService.getAll("/Chantiers/getReparations/"+this.idChantier)
      .subscribe((res:any)=>{
        this.reparations = res
        console.log("reparations : ",this.reparations)
        },err=>console.log(err))
    }
    achatmaterielChantier
    getAchatmaterielChantier(){
      this.appelOffreService.getAll("/Chantiers/getAchatmaterielChantier/"+this.idChantier)
      .subscribe((res:any)=>{
        this.achatmaterielChantier = res
        console.log("achatmaterielChantier : ",this.achatmaterielChantier)
        },err=>console.log(err))
    }
    avancementChantier
    getAvancementChantier(){
      this.appelOffreService.getAll("/Chantiers/getAvancementChantier/"+this.idChantier)
      .subscribe((res:any)=>{
        this.avancementChantier = res
        console.log("avancementChantier : ",this.avancementChantier)
        },err=>console.log(err))
    }

  getTotalMontantBT(){
    let total:number =0;
     if(this.besionsTravers){
          for (const b of this.besionsTravers) {
              total += b[5]
          }
     }
    return total;}
  getTotalPersonnes(){
    let total:number =0;
    if(this.personnes){
         for (const c of this.personnes) {
           total += 1
         }
    }
    return total;}
  getTotalReaparation(){
    let total:number =0;
    if(this.reparations){
         for (const c of this.reparations) {
           total += 1
         }
    }
    return total;}
  getTotalPricereparations(){
    let total:number =0;
    if(this.reparations){
         for (const c of this.reparations) {
           total += c[2]
         }
    }
    return total;
  }
  getTotalArticles(){
    let total:number =0;
    if(this.avancementChantier){
      this.avancementChantier.forEach(o => {
        total += o[6]
       });
    }
    return total;}
  getTotaTVA(){
    let total:number =this.getTotalArticles();
    let tva:number =0
        tva = ( total * 0.2 )
    return tva;}
  getTotalWithTVA(){
      const total:number =this.getTotalArticles();
      const tva:number =this.getTotaTVA();
      let somme:number=0;
      somme = (tva+ total)
    return somme;}
    getTotalPriceMateriels(){
      let total:number=0;
      if(this.achatmaterielChantier){
        for (const a of this.achatmaterielChantier) {
          total += a[5]
        }
      }
      return total;
    }
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/chantier"},
    {separator:true},
    {label:'maintenance des Engins',icon:'pi', items: [
      {label:'Reparation', icon:'pi', command: () =>  this.showReparation()}]},
          {label:'Affectation',icon:'pi pi-plus',
            items:[
                {label:'Personnels',icon:'pi pi-user-plus', command: () => this.showPersonnel()},
                {label:'Achat des materiaux',icon:'pi', command: () => this.showAchatMateriel()},
                {label:'Besoin transverses',icon:'pi', command: () => this.showBesoinTravers()}
                ]
    },{label:'ajouter decomptes',icon:'pi pi-plus', command:()=> {this.showDecompte();this.getAllOuvragesForDecompte()} }
  ];
  showMainForm(){
    this.shows.mainForm = true
    this.shows.s1 = false  ;this.shows.s2 = false ;this.shows.s3 = false
    this.shows.s4 = false ; this.shows.s5 = false ; this.shows.s6 = false ; this.decompteDialog = false
    this.getAchatmaterielChantier() ;this.getAllOuvragesForDecompte() ;  this.getAvancementChantier() ;
    this.getBesionsTravers() ;this.getEngin();this.getPersonnes() ; this.getPersonnesNonAffecter() ;
    this.getReparations() ; this.getTotaTVA(); this.getTotalArticles() ;this.getTotalMontantBT(); this.getTotalPersonnes();
    this.getTotalPriceMateriels(); this.getTotalPricereparations(); this.getTotalReaparation(); this.getTotalWithTVA()
  }
  showReparation(){
    this.getEngin()
    this.shows.mainForm = false
    this.shows.s1 = !this.shows.s1
    this.shows.s2 = false
    this.shows.s3 = false
    this.shows.s4 = false
    this.shows.s5 = false
    this.shows.s6 = false
  }
  showEntretien(){
    this.shows.mainForm = false
    this.shows.s2 = !this.shows.s2
    this.shows.s1 = false
    this.shows.s3 = false
    this.shows.s4 = false
    this.shows.s5 = false
    this.shows.s6 = false
  }
  showEngins(){
    this.shows.mainForm = false
    this.shows.s3 = !this.shows.s3
    this.shows.s1 = false
    this.shows.s2 = false
    this.shows.s4 = false
    this.shows.s5 = false
    this.shows.s6 = false
  }
  showPersonnel(){
    this.getPersonnesNonAffecter()
    this.shows.mainForm = false
    this.shows.s4 = !this.shows.s4
    this.shows.s1 = false
    this.shows.s2 = false
    this.shows.s3 = false
    this.shows.s5 = false
    this.shows.s6 = false
  }
  showAchatMateriel(){
    this.shows.mainForm = false ;this.shows.s5 = !this.shows.s5 ;this.shows.s1 = false
    this.shows.s2 = false ;this.shows.s3 = false ;this.shows.s4 = false ;this.shows.s6 = false
    this.getAllMateriels()
  }
  showBesoinTravers(){
    this.shows.mainForm = false
    this.shows.s6 = !this.shows.s6
    this.shows.s1 = false
    this.shows.s2 = false
    this.shows.s3 = false
    this.shows.s4 = false
    this.shows.s5 = false
  }
  decompteDialog:boolean=false
   showDecompte(){
    this.shows.mainForm = false
    this.decompteDialog = !this.decompteDialog
    this.shows.s1 = false
    this.shows.s2 = false
    this.shows.s3 = false
    this.shows.s4 = false
    this.shows.s5 = false
  }
}
