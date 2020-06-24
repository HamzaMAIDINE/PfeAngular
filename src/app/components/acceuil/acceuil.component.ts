import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceuil',
  templateUrl: './acceuil.component.html',
  styleUrls: ['./acceuil.component.css']
})
export class AcceuilComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  items: {des:string;
    src:string; 
    a:string;
    action?: ()=> void 
  }[]=[
    {des:"Ouvrages",src:"assets/images/icons/ouvrages.png",a:"/ouvrage",action: ()=>{}},
    {des:"Personnels",src:"assets/images/icons/personnels.png",a:"/peronnel",action: ()=>{}},
    {des:"Parc",src:"assets/images/icons/engin.png",a:"/parc",action: ()=>{}},
    {des:"Materiaux",src:"assets/images/icons/materielles.png",a:"/materiel",action: ()=>{}},
    {des:"appel offres",src:"assets/images/icons/appelOffre.png",a:"/appelOffre",action: ()=>{}},
    {des:"ajouter une etude du prix",src:"assets/images/icons/etudePrix.png",a:"/etudeprix",action: ()=>{
      // this.aoApi.setInfo({displayAL:false,displayAEP:true,displayIC:false,select:3});
    }},
    {des:"ajouter une soumission",src:"assets/images/icons/soumission.png",a:"/soumission",action: ()=>{
      // this.aoApi.setInfo({displayAL:true,displayAEP:false,displayIC:false,select:2});
    }},
    {des:"chantier",src:"assets/images/icons/chantier.png",a:"/chantier",action: ()=>{}},
    {des:"ajouter des reparations",src:"assets/images/icons/repairs.png",a:"/reparation",action: ()=>{
      // this.chApi.setInfo({addD: false, addB: false, addE: false, addP: false, addEn: false, addR: true, addA: false, select: 6});
    }},
    {des:"ajouter des entretiens",src:"assets/images/icons/maintenance.png",a:"/entretien",action: ()=>{
      // this.chApi.setInfo({addD: false, addB: false, addE: false, addP: false, addEn: true, addR: false, addA: false, select: 6});
    }},
    {des:"ajouter des decomptes",src:"assets/images/icons/decomptes.png",a:"/decompte",action: ()=>{
      // this.chApi.setInfo({addD: true, addB: false, addE: false, addP: false, addEn: false, addR: false, addA: false, select: 2});
    }},
    {des:"Ajouter des achat des materiaux",src:"assets/images/icons/materielles.png",a:"/achatmateriel",action: ()=>{
      // this.chApi.setInfo({addD: false, addB: false, addE: false, addP: false, addEn: false, addR: false, addA: true, select: 5});
    }}
  ]; 

}
