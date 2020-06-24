import { Component, OnInit } from '@angular/core';
import { AppelOffreService } from 'src/app/services/appel-offre.service';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-appel-offre',
  templateUrl: './appel-offre.component.html',
  styleUrls: ['./appel-offre.component.css']
})
export class AppelOffreComponent implements OnInit {

  popOverTitle: string = "Delete Materiel";
  popOverMessage: string = "Do you want to really delete?";
  cancelClicked: boolean = false;

  appelOffres
  cols
  items: MenuItem[]= [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"ajouter un appel offre",icon:"pi pi-plus",command: () => this.displayappelOff = !this.displayappelOff}];
  constructor(private appelOffreService: AppelOffreService, private router: Router, private authService: AuthService) { }
  isAdmin(){
    return this.authService.isAdmin()
  }
  ngOnInit(): void {
    this.getAllAppelOffres();
    this.cols = [
      { field: 'numAO', header: 'Numero' },
      { field: 'objet', header: 'Objet' },
      { field: 'dateAO', header: 'Date' },
      { field: 'localisation', header: 'Localisation' },
      { field: 'estimation', header: 'Estimation' }
    ];
  }
  refresh(){
    this.getAllAppelOffres()
  }
  displayappelOff: boolean = false;
  appelOff={numAO:'',localisation:'',objet:'',estimation:0}
  AddAppelOff(){
    console.log('this.appelOff :',this.appelOff)
    this.appelOffreService.save('/appelOffres', this.appelOff)
    .subscribe((res)=>{
          console.log('res :',res)
          this.appelOffres = [this.appelOff , ...this.appelOffres]
    },err=>console.log(err))
          this.displayappelOff = false
          this.appelOff={numAO:'',localisation:'',objet:'',estimation:0}
          this.getAllAppelOffres();
  }
  getAllAppelOffres(){
    this.appelOffreService.getAll("/appelOffres")
        .subscribe((res:any)=>{
          console.log(res._embedded.appelOffres)
          this.appelOffres = res._embedded.appelOffres
         },err=>console.log(err))
  }
  onRowSelect(event){
    this.router.navigateByUrl('/appel-offre-details/'+event.data.numAO)
  }
  deleteAppelOffre(numAO){
      this.appelOffreService.delete('/appelOffres', numAO)
          .subscribe(()=>{
            this.appelOffres  = this.appelOffres.filter(appelOffre => appelOffre.numAO !== numAO)
          })
  }

    appelOffreldUpdate
  displayAppelOffreEdit: boolean = false;
  editAppelOffre(o){
    this.appelOff = o
    this.displayAppelOffreEdit= true
    this.appelOffreldUpdate = o.numAO

  }

  updateAppelOffre(){
    console.log(this.appelOffreldUpdate)
    console.log(this.appelOff)
    this.appelOffreService.update('/appelOffres/'+this.appelOffreldUpdate, this.appelOff)
        .subscribe((res:any)=>{
          console.log('updated :',res)
            this.getAllAppelOffres()
          },err=>console.log(err))
        this.displayAppelOffreEdit = false
  }
}
