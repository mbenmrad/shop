import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGModule } from 'app/shared/utils/primeng/primeng.module';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { ProductRoutingModule } from './product-routing.module';



@NgModule({
  declarations: [
    ProductsAdminComponent,
    ProductsComponent,
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    PrimeNGModule, 
    ProductRoutingModule
  ]
})
export class ProductModule { }
