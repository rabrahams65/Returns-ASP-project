import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SearchReturnsComponent } from './search-returns/search-returns.component';
import { AddNewComponent } from './add-new/add-new.component';
import { CustomersComponent } from './customers/customers.component';
import { ProductsComponent } from './products/products.component';
import { OwnersComponent } from './owners/owners.component';
import { FaultsComponent } from './faults/faults.component';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { FaultDetailComponent } from './fault-detail/fault-detail.component';
import { OwnerDetailComponent } from './owner-detail/owner-detail.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ReturnDetailComponent } from './return-detail/return-detail.component';
import { RegisterUserComponent } from './register-user/register-user.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AddFaultComponent } from './add-fault/add-fault.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { AddOwnerComponent } from './add-owner/add-owner.component';
import { AddProductComponent } from './add-product/add-product.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    SearchReturnsComponent,
    AddNewComponent,
    CustomersComponent,
    ProductsComponent,
    OwnersComponent,
    FaultsComponent,
    CustomerDetailComponent,
    FaultDetailComponent,
    OwnerDetailComponent,
    ProductDetailComponent,
    ReturnDetailComponent,
    RegisterUserComponent,
    AddFaultComponent,
    AddCustomerComponent,
    AddOwnerComponent,
    AddProductComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: SearchReturnsComponent, pathMatch: 'full' },
      { path: 'search-returns', component: SearchReturnsComponent },
      { path: 'add-new', component: AddNewComponent, canActivate: [AuthGuard] },
      { path: 'customers', component: CustomersComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'owners', component: OwnersComponent },
      { path: 'faults', component: FaultsComponent },
      { path: 'return-detail/:returnId', component: ReturnDetailComponent },
      { path: 'customer-detail/:customerId', component: CustomerDetailComponent },
      { path: 'product-detail/:productId', component: ProductDetailComponent },
      { path: 'owner-detail/:ownerId', component: OwnerDetailComponent },
      { path: 'fault-detail/:faultId', component: FaultDetailComponent },
      { path: 'register-user', component: RegisterUserComponent },
      { path: 'add-fault', component: AddFaultComponent },
      { path: 'add-customer', component: AddCustomerComponent },
      { path: 'add-product', component: AddProductComponent },
      { path: 'add-owner', component: AddOwnerComponent }
    ]),
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
