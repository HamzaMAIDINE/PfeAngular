import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ParcService } from 'src/app/services/parc.service';
import { AuthService } from 'src/app/services/auth.service';



@Component({
  selector: 'app-parc',
  templateUrl: './parc.component.html',
  styleUrls: ['./parc.component.css']
})
export class ParcComponent implements OnInit {
  enginsExterne
  enginsIntern
  enginsCamion
  displayEngin
  enginsVehicule
  popOverTitle: string = "Delete Parc";
  popOverMessage: string = "Do you want to really delete?";
  cancelClicked: boolean = false;
  items: MenuItem[] = [
    {label:"Retourne",icon:"pi pi-angle-left",routerLink:"/"},
    {separator:true},
    {label:"Ajouter un engin",icon:"pi pi-plus",command: () =>this.displayEngin = !this.displayEngin}
  ];
  constructor(private parcServise: ParcService, private authService: AuthService) { }
  isAdmin(){
    return this.authService.isAdmin()
  }
  ngOnInit(): void {
    this.getEnginsExterne();
    this.getEnginsIntern();
    this.getEnginsCamion();
    this.getEnginsVehicule();
  }


engin={type:'', designation:'', caracteristiques:'',prixLocation:0, prixAchat:0, consommationH:0, poids:0 }
showFiledsByType={displayEnginVehicule:false, displayEnginExterne:false, displayEnginInterne:false, displayEnginCamion:false }
AddEngin(){
  console.log('this.engin :',this.engin)
  if(this.typeEngin === 'interne'){
    console.log('type of engin : interne')
    this.parcServise.save('/engins/Add/interne', this.engin)
          .subscribe((res:any)=>{
              console.log('res.type :',res.type)
          },err=>console.log(err))
      this.getEnginsIntern()
  }
  if(this.typeEngin === 'externe'){
    console.log('type of engin : externe')
    this.parcServise.save('/engins/Add/externe', this.engin)
          .subscribe((res:any)=>{
              console.log('res.type :',res.type)
          },err=>console.log(err))
          this.getEnginsExterne()
  }
   if(this.typeEngin === 'camion'){
    console.log('type of engin : camion')
    this.parcServise.save('/engins/Add/camion', this.engin)
          .subscribe((res:any)=>{
              console.log('res.type :',res.type)
          },err=>console.log(err))
      this.getEnginsCamion()
  }
   if(this.typeEngin === 'vehicule'){
    console.log('type of engin : vehicule')
    this.parcServise.save('/engins/Add/vehicule', this.engin)
          .subscribe((res:any)=>{
              console.log('res.type :',res.type)
          },err=>console.log(err))
      this.getEnginsVehicule()
  }
  this.displayEngin =false
  this.engin={type:'', designation:'', caracteristiques:'',prixLocation:0, prixAchat:0, consommationH:0, poids:0 }

}

typeEngin
selectTypeEngin(){
  if( this.engin.type === 'interne' ){
    this.typeEngin = 'interne'
    this.showFiledsByType.displayEnginInterne = true
    this.showFiledsByType.displayEnginExterne = false
    this.showFiledsByType.displayEnginCamion  = false
    this.showFiledsByType.displayEnginVehicule= false
   }
  if( this.engin.type === 'externe' ){
    this.typeEngin = 'externe'
    this.showFiledsByType.displayEnginInterne = false
    this.showFiledsByType.displayEnginExterne = true
    this.showFiledsByType.displayEnginCamion  = false
    this.showFiledsByType.displayEnginVehicule= false
  }
  if( this.engin.type === 'camion' ){
    this.typeEngin = 'camion'
    this.showFiledsByType.displayEnginInterne = false
    this.showFiledsByType.displayEnginExterne = false
    this.showFiledsByType.displayEnginCamion  = true
    this.showFiledsByType.displayEnginVehicule= false
  }
  if( this.engin.type === 'vehicule' ){
        this.typeEngin ='vehicule'
    this.showFiledsByType.displayEnginInterne = false
    this.showFiledsByType.displayEnginExterne = false
    this.showFiledsByType.displayEnginCamion  = false
    this.showFiledsByType.displayEnginVehicule= true
  }
}
  getEnginsExterne(){
    this.parcServise.getAll("/engins/externe")
        .subscribe((res:any)=>{
          this.enginsExterne = res
          // console.log("enginsExterne : ",res)
        },err=>console.log(err))
  }
  getEnginsIntern(){
    this.parcServise.getAll("/engins/interne")
        .subscribe((res:any)=>{
          this.enginsIntern = res
        },err=>console.log(err))
  }
  getEnginsCamion(){
    this.parcServise.getAll("/engins/camion")
        .subscribe((res:any)=>{
          this.enginsCamion = res
          // console.log("enginsCamion : ",res)
        },err=>console.log(err))
  }
  getEnginsVehicule(){
    this.parcServise.getAll("/engins/vehicule")
        .subscribe((res:any)=>{
          this.enginsVehicule = res
          // console.log("enginsVehicule : ",res)
        },err=>console.log(err))
  }

  deleteParc(id){
  this.parcServise.delete('/engins/delete',id)
    .subscribe(()=>{
      this.enginsIntern =  this.enginsIntern.filter(res=> res.idEngin !== id )
      this.enginsExterne =  this.enginsExterne.filter(res=> res.idEngin !== id )
      this.enginsVehicule =  this.enginsVehicule.filter(res=> res.idEngin !== id )
      this.enginsCamion =  this.enginsCamion.filter(res=> res.idEngin !== id )
    },err=> console.log(err))

  }
  parcldUpdate
  displayEnginEdit: boolean = false;
  EditEngin(engin){
    this.displayEnginEdit= true
    this.engin =engin
    this.parcldUpdate = engin.idEngin
    this.typeEngin = engin.type;
    this.selectTypeEngin()

  }
  updateEngin(){
    console.log(this.parcldUpdate)
    console.log(this.engin)
    this.parcServise.update2('/engins/'+this.parcldUpdate, this.engin)
        .subscribe((res:any)=>{
          console.log('updated :',res)

          },err=>console.log(err))
          this.getEnginsCamion()
          this.getEnginsExterne()
          this.getEnginsIntern()
          this.getEnginsVehicule()
        this.displayEnginEdit = false
  }


}
