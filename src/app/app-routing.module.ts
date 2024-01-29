import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsAdminComponent } from './product/components/products-admin/products-admin.component';
import { ProductsComponent } from './product/components/products/products.component';

const routes: Routes = [
{path: '',
loadChildren : () => import('./product/product.module').then(m => m.ProductModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})

export class AppRoutingModule {}
