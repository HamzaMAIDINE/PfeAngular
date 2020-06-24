import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OuvrageComponent } from './components/ouvrage/ouvrage.component';
import { PersonneComponent } from './components/personne/personne.component';
import { ParcComponent } from './components/parc/parc.component';
import { AppelOffreComponent } from './components/appel-offre/appel-offre.component';
import { EtudePrixComponent } from './components/etude-prix/etude-prix.component';
import { SoumissionComponent } from './components/soumission/soumission.component';
import { ChantierComponent } from './components/chantier/chantier.component';
import { MaterielComponent } from './components/materiel/materiel.component';
import { ReparationComponent } from './components/reparation/reparation.component';
import { EntretienComponent } from './components/entretien/entretien.component';
import { DecompteComponent } from './components/decompte/decompte.component';
import { AchatMaterielComponent } from './components/achat-materiel/achat-materiel.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AppelOffreDetailsComponent } from './components/appel-offre-details/appel-offre-details.component';
import { ChantierDetailsComponent } from './components/chantier-details/chantier-details.component';
import { AcceuilComponent } from './components/acceuil/acceuil.component';


const routes: Routes = [
{path : '', component : AcceuilComponent}, 
{path : 'login', component : LoginComponent},
{path : 'register', component : RegisterComponent},
{path : 'ouvrage', component : OuvrageComponent},
{path : 'peronnel', component : PersonneComponent},
{path : 'parc', component : ParcComponent },
{path : 'appelOffre', component : AppelOffreComponent},
{path : 'appel-offre-details/:id', component : AppelOffreDetailsComponent},
{path : 'etudeprix', component : EtudePrixComponent},
{path : 'soumission', component : SoumissionComponent},
{path : 'chantier', component : ChantierComponent},
{path : 'chantier-details/:idappelOffre/:idChantier', component : ChantierDetailsComponent},
{path : 'materiel', component : MaterielComponent},
{path : 'reparation', component : ReparationComponent},
{path : 'entretien', component : EntretienComponent},
{path : 'decompte', component : DecompteComponent},
{path : 'achatmateriel', component : AchatMaterielComponent},
{path : 'admin/dashboard', component : DashboardComponent}
// {path : 'admin/users', component : }
// {path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
}) 
export class AppRoutingModule { }
