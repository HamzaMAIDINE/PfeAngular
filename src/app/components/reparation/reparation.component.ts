import { Component, OnInit } from '@angular/core';
import { ReparationService } from 'src/app/services/reparation.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-reparation',
  templateUrl: './reparation.component.html',
  styleUrls: ['./reparation.component.css']
})
export class ReparationComponent implements OnInit {

  reparationDialog:boolean=false
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"Ajouter une reparation",icon:"pi pi-plus",command: () =>{
      this.reparationDialog =! this.reparationDialog;
          this.getAllEngins()
      }}
  ];
  reparations
  cols
  constructor(private reparationService: ReparationService, private authService: AuthService ) { }
  isAdmin(){
    return this.authService.isAdmin()
  }
  ngOnInit(): void {
    this.getAllReparations()
    this.initChamps()
    this.getAllChantiers()
    }

  engins
   getAllEngins(){
    this.reparationService.getAll("/engins/All")
        .subscribe((res:any)=>{
          this.engins = res
        },err=>console.log(err))
  } 
  chantiers
  getAllChantiers(){
    this.reparationService.getAll("/chantiers")
    .subscribe((res:any)=>{
      this.chantiers = res._embedded.chantiers
    },err=>console.log(err))
}
  
    getAllReparations(){
        this.reparationService.getAll("/Reparations/All")
            .subscribe((res:any)=>{
          this.reparations = res
        },err=>console.log(err))
    } 
    reparation={designation:'', pu:0}
    enginID;chantierId;

    AddReparation(){
       this.enginID = parseInt(this.enginID)
        this.reparationService.save("/Chantiers/affecterReparation/"+this.chantierId+"/"+this.enginID, this.reparation)
            .subscribe((res)=>{
          },err=>console.log(err))
          this.getAllReparations()
          this.reparationDialog = false
          this.reparation={designation:'', pu:0}
    }
    deleteReparation(idReparation:number){
        this.reparationService.getAll('/Reparations/'+idReparation)
          .subscribe(()=>{
              this.reparations = this.reparations.filter(e=> e[0] !== idReparation)
          },err=>console.log(err))
    }
    initChamps(){ 
    this.cols = [
      // { field: 'idR', header: 'codeReparation' },
      { field: 'designation', header: 'designation' },
      { field: 'date', header: 'Date' },
      { field: 'pu', header: 'prix ' },
      { field: 'engin.designation', header: 'Parc' },
      { field: 'Chantier', header: 'Chantier' }
    ];
    }
    reparationldUpdate
    displayReparationEdit: boolean = false;
    editReparation(o){
      console.log(o)
      this.reparationldUpdate = o[0]      
      this.reparation.designation = o[1]
      this.reparation.pu= o[3] 
      this.displayReparationEdit= true
    }
  
    updateAppelOffre(){
      console.log(this.reparationldUpdate)
      console.log(this.reparation)
      this.reparationService.update2('/Reparations/'+this.reparationldUpdate+'/edit', this.reparation)
          .subscribe((res:any)=>{
            console.log('updated :',res)
            this.getAllReparations()
            },err=>console.log(err))
          this.displayReparationEdit = false
    }

  }
 