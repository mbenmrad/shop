import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsAdminComponent } from './components/products-admin/products-admin.component';
import { ProductsComponent } from './components/products/products.component';


const routes: Routes = [
{path: 'admin/products', component: ProductsAdminComponent},
{path: 'products', component: ProductsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class ProductRoutingModule {}
