import { Component, OnInit } from '@angular/core';
import { PersonneService } from 'src/app/services/personne.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-personne',
  templateUrl: './personne.component.html',
  styleUrls: ['./personne.component.css']
})
export class PersonneComponent implements OnInit {

  personnes
  cols
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"Ajouter un personne",icon:"pi pi-plus",command: () =>{
      this.showPersonneDialog();
   }}
  ];
  constructor(private personnesService: PersonneService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getAllPersonnes()
    this.initChamps();
  }
  isAdmin(){
    return this.authService.isAdmin()
  }
  displayPersonnel: boolean = false;
  showPersonneDialog() {
      this.displayPersonnel = !this.displayPersonnel;
  }
  personne={nom:'',prenom:'',qualification:'',tel:'',cnss:0, salaire:'', fonction:''}
  AddPersonne(){
    console.log('this.personne :',this.personne)
    this.personnesService.save('/personnes', this.personne)
    .subscribe((res)=>{
      console.log('res :',res)
      this.getAllPersonnes()
      this.displayPersonnel = false
      this.personne={nom:'',prenom:'',qualification:'',tel:'',cnss:0, salaire:'', fonction:''}
    },err=>console.log(err))
  }
  getAllPersonnes(){
    this.personnesService.getAll("/personnes")
        .subscribe((res:any)=>{
          console.log(res)
          this.personnes = res._embedded.personnes
        },err=>console.log(err))
  }
  deletePersonne(id){
    this.personnesService.delete('/personnes', id)
        .subscribe(()=>{
          this.personnes =this.personnes.filter(personne =>  personne.idP !== id)
        },err=>console.log(err))
  }
  initChamps(){
  this.cols = [
    { field: 'nom', header: 'Nom' },
    { field: 'prenom', header: 'Prenom' },
    { field: 'qualification', header: 'Qualification' },
    { field: 'fonction', header: 'Fonction' },
    { field: 'cnss', header: 'CNSS' },
    { field: 'tele', header: 'Telephone' },
    { field: 'salaire', header: 'Salaire' },
    { field: 'dateEm', header: 'Date d\'Embauche' }
  ];
  }
  personneIdUpdate
  displayPersonnelEdit: boolean = false;
  popOverTitle: string = "Delete Personnel";
  popOverMessage: string = "Do you want to really delete?";
  cancelClicked: boolean = false;
  EditPersonne(personne){
    this.displayPersonnelEdit= true
    this.personne = personne
    this.personneIdUpdate = personne.idP

  }
  updatePersonne(){
    this.personnesService.update('/personnes',this.personneIdUpdate, this.personne)
        .subscribe((res:any)=>{
          console.log('updated :',res)
          this.personnes = this.personnes.forEach(p => {
              if(p.idP === this.personneIdUpdate){
                  p = res
                  this.getAllPersonnes()
                  return ;
              }
          });
        },err=>console.log(err))
        this.displayPersonnelEdit = false
  }
}
