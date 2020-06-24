import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MegaMenuModule } from 'primeng/megamenu';
import { TableModule} from 'primeng/table';
import { AccordionModule } from 'primeng/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenubarModule } from 'primeng/menubar';
import { DialogModule } from 'primeng/dialog';
import { MatCardModule } from '@angular/material/card';
import { TabViewModule } from 'primeng/tabview';


// import { MaterialModule } from "./material/material.module";


import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { OuvrageComponent } from './components/ouvrage/ouvrage.component';
import { PersonneComponent } from './components/personne/personne.component';
import { ParcComponent } from './components/parc/parc.component';
import { MaterielComponent } from './components/materiel/materiel.component';
import { AppelOffreComponent } from './components/appel-offre/appel-offre.component';
import { EtudePrixComponent } from './components/etude-prix/etude-prix.component';
import { SoumissionComponent } from './components/soumission/soumission.component';
import { ChantierComponent } from './components/chantier/chantier.component';
import { ReparationComponent } from './components/reparation/reparation.component';
import { EntretienComponent } from './components/entretien/entretien.component';
import { DecompteComponent } from './components/decompte/decompte.component';
import { AchatMaterielComponent } from './components/achat-materiel/achat-materiel.component';
import { AppelOffreDetailsComponent } from './components/appel-offre-details/appel-offre-details.component';
import { ChantierDetailsComponent } from './components/chantier-details/chantier-details.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';
import { ChartComponent } from './components/chart/chart.component';
import {ConfirmationPopoverModule} from "angular-confirmation-popover";
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    OuvrageComponent,
    PersonneComponent,
    ParcComponent,
    MaterielComponent,
    AppelOffreComponent,
    EtudePrixComponent,
    SoumissionComponent,
    ChantierComponent,
    ReparationComponent,
    EntretienComponent,
    DecompteComponent,
    AchatMaterielComponent,
    AppelOffreDetailsComponent,
    ChantierDetailsComponent,
    AcceuilComponent,
    ChartComponent

   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MegaMenuModule,
    AccordionModule,
    BrowserAnimationsModule,
    TableModule,
    BreadcrumbModule,
    MenubarModule,
    DialogModule,
    MatCardModule,
    TabViewModule,
    ConfirmationPopoverModule.forRoot({confirmButtonType: 'danger'})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
