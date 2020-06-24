import { Component, OnInit } from '@angular/core';
import { EntretienService } from 'src/app/services/entretien.service';
import { MenuItem } from 'primeng';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-entretien',
  templateUrl: './entretien.component.html',
  styleUrls: ['./entretien.component.css']
})
export class EntretienComponent implements OnInit {

  popOverTitle: string = "Delete Materiel";
  popOverMessage: string = "Do you want to really delete?";
  cancelClicked: boolean = false;

  entretienDialog:boolean=false
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"Ajouter un entretien",icon:"pi pi-plus",command: () =>{
      this.entretienDialog =! this.entretienDialog;
          this.getAllEnginsInterne()
      }}
  ];
  entretiens
  cols
  constructor(private entretienService: EntretienService, private authService: AuthService) { }
  isAdmin(){
    return this.authService.isAdmin()
  }
  ngOnInit(): void {
    this.getAllEntretiens()
    this.initChamps()
    }
  engins
   getAllEnginsInterne(){
    this.entretienService.getAll("/engins/interne")
        .subscribe((res:any)=>{
          this.engins = res
        },err=>console.log(err))
  }
  getAllEntretiens(){
    this.entretienService.getAll("/Entretiens/All")
        .subscribe((res:any)=>{
          this.entretiens = res
        },err=>console.log(err))
  }
  entretien={designation:'', pu:0}
  enginID;
  AddEntretien(){
    this.entretienService.save(`/Entretiens/entretien/${this.enginID}/Add`, this.entretien)
        .subscribe((res)=>{
             this.entretiens = [res, ...this.entretiens]
             this.getAllEntretiens()
        },err=>console.log(err))
          this.entretienDialog = false
          this.entretien={designation:'', pu:0}
          this.enginID  = undefined
   }
  deleteEntretien(id:number){
      this.entretienService.delete('/entretiens',id)
          .subscribe(()=>{
              this.entretiens = this.entretiens.filter(e=> e[0] !== id)
          },err=>console.log(err))
  }
  initChamps(){
    this.cols = [
      // { field: 'idR', header: 'codeEntretien' },
      { field: '[2]', header: 'designation' },
      { field: '[1]', header: 'Date' },
      { field: '[3]', header: 'prix ' },
      { field: '[5]', header: 'Parc' },
    ];
    }
    entretienldUpdate
    displayEntretienEdit: boolean = false;
    editEntretien(o){
      console.log(o)
      this.entretienldUpdate = o[0]
      this.entretien.designation = o[2]
      this.entretien.pu= o[3]
      this.displayEntretienEdit= true
    }

    updateAppelOffre(){
      console.log(this.entretienldUpdate)
      console.log(this.entretien)
      this.entretienService.update2('/Entretiens/'+this.entretienldUpdate+'/edit', this.entretien)
          .subscribe((res:any)=>{
            console.log('updated :',res)
            this.getAllEntretiens()
            },err=>console.log(err))
          this.displayEntretienEdit = false
    }
}
