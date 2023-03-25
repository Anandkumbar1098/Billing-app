import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './components/billing/billing.component';
import { HomeComponent } from './components/home/home.component';
import { ViewBillsComponent } from './components/view-bills/view-bills.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'bill', component: BillingComponent },
  { path: 'viewbill', component: ViewBillsComponent },
  { path: 'display/:id', component: BillingComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
