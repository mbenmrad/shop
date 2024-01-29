import { EventDriverService } from './../../state/event.driver.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'app/product/domain/product';
import { ActionEvent, ProductActionTypes } from 'app/product/state/product.state';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent {
  @Input() product: Product|null = null;
  @Input() editing : boolean= false;
  @Input() ri : number = 0;
  constructor(private eventDriverService: EventDriverService) { }
  onRowEditInit(product: Product) {
  this.eventDriverService.publishEvent({type: ProductActionTypes.EDIT_PRODUCT_INIT, payload: product});
}

onRowEditSave(product: Product) {
 
    this.eventDriverService.publishEvent({type: ProductActionTypes.EDIT_PRODUCT_SAVE, payload: product});
}

onRowEditCancel(product: Product, index: number) {
 this.eventDriverService.publishEvent({type: ProductActionTypes.EDIT_PRODUCT_CANCEL, payload: product});
}

deleteProduct(product: Product) {
  this.eventDriverService.publishEvent({type: ProductActionTypes.DELETE_PRODUCT, payload: product});

}

}
