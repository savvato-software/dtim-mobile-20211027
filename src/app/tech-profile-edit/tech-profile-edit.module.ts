import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { TechProfileEditPage } from './tech-profile-edit.page';

import { DtimTechprofileModule } from '@savvato-software/dtim-techprofile-component';

const routes: Routes = [
  {
    path: '',
    component: TechProfileEditPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    DtimTechprofileModule,
  ],
  declarations: [TechProfileEditPage]
})
export class TechProfileEditPageModule {}
