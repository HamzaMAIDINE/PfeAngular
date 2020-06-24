import { Component, OnInit } from '@angular/core';
import { MaterielService } from 'src/app/services/materiel.service';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-materiel',
  templateUrl: './materiel.component.html',
  styleUrls: ['./materiel.component.css']
})
export class MaterielComponent implements OnInit {

  catsWithMateriels
  displayCategory=false
  displayMateriel=false
  popOverTitle: string = "Delete Materiel";
  popOverMessage: string = "Do you want to really delete?";
  cancelClicked: boolean = false;
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"Ajouter une categorie",icon:"pi pi-plus",command: () =>this.displayCategory = !this.displayCategory },
    {label:"Ajouter un materiel",icon:"pi pi-plus",command: () =>{this.displayMateriel = !this.displayMateriel;this.getAllCategories()} }
  ];
  search=''
  cols: any[];
  constructor(private materielService: MaterielService, private authService: AuthService) { }
  isAdmin(){
    return this.authService.isAdmin()
  }
  ngOnInit(): void {
    this.getAllCategoriesWithMateriels()
    this.initFileds();
  }
  initFileds(){
    this.cols = [
      { field: 'designation', header: 'designation' },
      { field: 'prix', header: 'prix' },
      { field: 'cm.designation', header: 'Category' }
    ];
  }

materiel={designation:'', prix:0, categorie:''}
AddMateriel(){
  let IdCat = parseInt(this.materiel.categorie)
  this.materielService.save('/Materiels/'+IdCat+'/Add', this.materiel)
  .subscribe((res)=>{
          console.log('res :',res)
  },err=>console.log(err))
  this.getAllCategoriesWithMateriels()
  this.displayMateriel = false
  this.materiel={designation:'', prix:0, categorie:''}
}
  categoryName:string=''
  AddCategory(){
  this.materielService.save('/categorieMateriels', {designation: this.categoryName})
  .subscribe(()=>{
    this.getAllCategoriesWithMateriels()
    this.displayCategory = false
    this.categoryName=''
  },err=>console.log(err))
  }
  getAllCategoriesWithMateriels(){
  this.materielService.getAll("/materiels?projection=materielPro")
      .subscribe((res:any)=>{
        this.catsWithMateriels = res._embedded.materiels
        console.log('this.catsWithMateriels :',this.catsWithMateriels)
      },err=>console.log(err))
  }
  categories
  getAllCategories(){
    this.materielService.getAll('/categorieMateriels')
        .subscribe((res:any)=>{
          console.log(res)
          this.categories = res._embedded.categorieMateriels
        },err=>console.log(err))
  }
  deleteMat(id:number){
      this.materielService.delete('/materiels', id)
          .subscribe(()=>{
              this.getAllCategoriesWithMateriels();
        },err=>console.log(err))
  }
  materieldUpdate

  displayMaterielEdit: boolean = false;
  EditMatereil(materiel){
    this.displayMaterielEdit= true
    this.materiel = materiel
    this.materiel.categorie = materiel.categorieMateriel.idCM
    this.materieldUpdate = materiel.idMateriel
    this.getAllCategories()

  }
  updateMatereil(){
    console.log(this.materiel.categorie)
    console.log(this.materieldUpdate)
    console.log(this.materiel)
    this.materielService.update2('/Materiels/'+this.materiel.categorie+'/edit', this.materiel)
        .subscribe((res:any)=>{
          console.log('updated :',res)
          this.catsWithMateriels = this.catsWithMateriels.forEach(p => {
              if(p.idP === this.materieldUpdate){
                  p = res
                  return ;
              }
            });
          },err=>console.log(err))
          this.getAllCategoriesWithMateriels()
        this.displayMaterielEdit = false
  }
}

