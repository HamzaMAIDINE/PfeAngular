import { Component, OnInit } from '@angular/core';
import { OuvrageService } from 'src/app/services/ouvrage.service';
import {MessageService, MenuItem} from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-ouvrage',
  templateUrl: './ouvrage.component.html',
  styleUrls: ['./ouvrage.component.css'],
  providers: [MessageService]
})
export class OuvrageComponent implements OnInit {

  popOverTitle: string = "Delete Ouvrage";
  popOverMessage: string = "Do you want to really delete?";
  cancelClicked: boolean = false;

  catOuvrages:any
  cols: any[];
  categorie={designation:'',unite:'',prixU:0,prixV:0}
  displayOuvrage:boolean = false
  displayCategory:boolean = false
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"Ajouter une categorie",icon:"pi pi-plus",command: () => this.displayCategory = !this.displayCategory
    },
    {label:"Ajouter un ouvrage",icon:"pi pi-plus",command: () =>{this.displayOuvrage = !this.displayOuvrage; this.getAllCategories()}},
  ];
  constructor(private ouvrageService:OuvrageService, private authService: AuthService, private router : Router) { }
  categoryName:string=''
  AddCategory(){
    this.ouvrageService.save('/categories', {designation: this.categoryName})
    .subscribe(()=>{
      this.getAllCategories()
      this.displayCategory = false
      this.categoryName=''
    },err=>console.log(err))
  }
  ouvrage={designation:'',unite:'',prixU:0,prixV:0}
  categorieId:number=0
  AddOuvrage(){
    console.log("l'objet ouvrage :", this.ouvrage)
       console.log('idCat',this.categorieId )
        this.ouvrageService.save('/Ouvrages/'+this.categorieId+'/add', this.ouvrage)
             .subscribe((res)=>{
            console.log('res :',res)
            this.getAllOuvrages()
          },err=>console.log(err))
            this.displayOuvrage = false
            this.ouvrage={designation:'',unite:'',prixU:0,prixV:0}

}

  ngOnInit() {
    this.getAllOuvrages();
    this.authService.loadToken()
    // this.authService.redirectIsAuth()
  }
  isAdmin(){
    return this.authService.isAdmin()
  }

  getAllOuvrages(){
    this.ouvrageService.getAll("/categories?projection=categoryP")
        .subscribe((res:any)=>{
          this.catOuvrages = res._embedded.categories
          console.log('cat with there ouvrages :',this.catOuvrages)
        },err=>console.log(err))
  }
  categories
  getAllCategories(){
    this.ouvrageService.getAll("/categories")
        .subscribe((res:any)=>{
          this.categories = res._embedded.categories
          // console.log('categories :',this.categories)
        },err=>console.log(err))
  }
  deleteOuvrage(id:number){
    this.ouvrageService.delete("/ouvrages", id)
        .subscribe(()=>{
          this.getAllOuvrages();
        },err=>console.log(err))
  }
  deleteCat(id:number){
    this.ouvrageService.delete("/categories", id)
        .subscribe(()=>{
            this.catOuvrages = this.catOuvrages.filter(ouvrage => ouvrage.id != id)
        },err=>console.log(err))
  }
  refresh(){
    this.getAllOuvrages()
    this.getAllCategories()
  }

  ouvrageldUpdate
  displayOuvrageEdit: boolean = false;
  editOuvrage(o){
    this.ouvrage = o
    this.displayOuvrageEdit= true
    this.ouvrageldUpdate = o.idOuvrage
    this.getAllCategories()
  }

  updateOuvrage(){
    console.log(this.ouvrageldUpdate)
    console.log(this.ouvrage)
    this.ouvrageService.update('/ouvrages/'+this.ouvrageldUpdate, this.ouvrage)
        .subscribe((res:any)=>{
          console.log('updated :',res)
          this.getAllOuvrages()
          },err=>console.log(err))
        this.displayOuvrageEdit = false
  }
}
