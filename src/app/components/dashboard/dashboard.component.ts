import { Component, OnInit } from '@angular/core';
import { PersonneService } from 'src/app/services/personne.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private personneService: PersonneService) { }
  personnes
  chantiers=[]
  reparations=[]
  async ngOnInit() {
    await this.getNbPersonnesPerChantier()
  }
  async getNbPersonnesPerChantier(){
    this.personnes =[]
    this.personnes = await  this.personneService.getAll('/getNbPersonnesPerChantier')
              .toPromise();
        console.log('this.personnes :',this.personnes)
      
  }

  // getNbReparationsPerChantier(){
  //   this.personneService.getAll('/getNbReparationsPerChantier')
  //   .subscribe((res:any)=>{
  //     console.log('getNbReparationsPerChantier :',res)
  //     this.reparations = res
  //   }, err=>console.log(err))
  // }
  // getNbChantierPerAppelOffre(){
  //   this.personneService.getAll('/getNbChantierPerAppelOffre')
  //   .subscribe((res:any)=>{
  //     console.log('getNbChantierPerAppelOffre :',res)
  //     this.chantiers = res
  //   }, err=>console.log(err))
  // }

}