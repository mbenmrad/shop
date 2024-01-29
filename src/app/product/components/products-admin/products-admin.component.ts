import { Component, OnInit } from '@angular/core';
import { Product, Representative } from 'app/product/domain/product';
import { ProductService } from 'app/product/services/product.service';
import { EventDriverService } from 'app/product/state/event.driver.service';
import { ProductActionTypes } from 'app/product/state/product.state';
import {  SelectItem } from 'primeng/api';
import { ConfirmationService, MessageService } from 'primeng/api';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-products-admin',
  templateUrl: './products-admin.component.html',
  styleUrls: ['./products-admin.component.scss'],
  providers: [MessageService, ConfirmationService]
})
export class ProductsAdminComponent implements OnInit {

    products!: Product[];

    statuses!: SelectItem[];

    clonedProducts: { [s: string]: Product } = {};

  representatives!: Representative[];

  loading: boolean = false;

  activityValues: number[] = [0, 100];
  
  selectedCustomers!: Product[];

  totalRecords!: number;

  selectAll: boolean = false;
  productDialog: boolean = false;
  product!: Product;
  submitted: boolean = false;
  selectedProducts!: Product[] | null;
  
  constructor(
    private productService: ProductService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private eventDriverService: EventDriverService
  ) {}

  ngOnInit() {
    this.onGetAllProducts();
    this.eventDriverService.sourceEventSubjectObservable.subscribe(
      {
        next: (event) => {
          this.onActionEvent(event);
        }
      }
    );

    this.representatives = [
        { name: 'Amy Elsner', image: 'amyelsner.png' },
        { name: 'Anna Fali', image: 'annafali.png' },
        { name: 'Asiya Javayant', image: 'asiyajavayant.png' },
        { name: 'Bernardo Dominic', image: 'bernardodominic.png' },
        { name: 'Elwin Sharvill', image: 'elwinsharvill.png' },
        { name: 'Ioni Bowcher', image: 'ionibowcher.png' },
        { name: 'Ivan Magalhaes', image: 'ivanmagalhaes.png' },
        { name: 'Onyama Limba', image: 'onyamalimba.png' },
        { name: 'Stephen Shaw', image: 'stephenshaw.png' },
        { name: 'Xuxue Feng', image: 'xuxuefeng.png' }
    ];

    this.statuses = [
        { label: 'Unqualified', value: 'unqualified' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'New', value: 'new' },
        { label: 'Negotiation', value: 'negotiation' },
        { label: 'Renewal', value: 'renewal' },
        { label: 'Proposal', value: 'proposal' }
    ];
}


onGetAllProducts(){
    this.productService.getAllProducts().subscribe(
        { next: (resp) => {
            this.products= resp;
        }
    });

}
onSelectionChange(value = []) {
    this.selectAll = value.length === this.totalRecords;
    this.selectedCustomers = value;
}


onSelectAllChange(event: any) {
    const checked = event.checked;

    if (checked) {
        this.selectAll = true;
    } else {
        this.selectAll = false;
    }
}

onRowEditInit(product: Product) {
    this.clonedProducts[product.id as unknown as string] = { ...product };
}

onRowEditSave(product: Product) {
    if (product.price > 0) {
        delete this.clonedProducts[product.id];
        this.productService.update(product).subscribe((data)=>{
            this.onGetAllProducts();
        });
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product is updated' });
      
    } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Invalid Price' });
    }
}

onRowEditCancel(product: Product, index: number) {
    this.products[index] = this.clonedProducts[product.id];
    delete this.clonedProducts[product.id];
}

openNew() {
    this.product =  {id: 0, code: '', name: '', description: '', price: 0, quantity: 0, inventoryStatus: '', category: ''}
    this.submitted = false;
    this.productDialog = true;
}

deleteSelectedProducts() {
}

deleteProduct(product: Product) {
    this.confirmationService.confirm({
        message: 'Are you sure you want to delete the selected products?',
        header: 'Confirm',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
          this.productService.delete(product).subscribe(
            (data)=>{
                this.onGetAllProducts();
            }
          )
          this.messageService.add({
            severity: 'success',
            summary: 'Successful',
            detail: 'Products Deleted',
            life: 3000,
          });
         
        },
      });
}

createId(): number {
   return Math.floor(Math.random() * 10000);
}

  saveProduct() {
    this.submitted = true;

    if (this.product.name?.trim()) {
        if (this.product.id) {
            this.product.code= uuidv4().split('-')[0];
            this.products[this.findIndexById(this.product.id)] = this.product;
            this.productService.save(this.product).subscribe();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
        } else {
            this.product.id = this.createId();
            this.product.image = 'product-placeholder.svg';
            this.product.code= uuidv4().split('-')[0];
            this.products.push(this.product);
            this.productService.save(this.product).subscribe();
            this.messageService.add({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
        }

        this.products = [...this.products];
        this.productDialog = false;
        this.product = {id: 0, code: '', name: '', description: '', price: 0, quantity: 0, inventoryStatus: '', category: ''}
    }
}

findIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.products.length; i++) {
        if (this.products[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
}

    hideDialog() {
        this.productDialog = false;
        this.submitted = false;
      }


      onActionEvent($event){
        switch($event.type){
          case ProductActionTypes.EDIT_PRODUCT_INIT:
            this.onRowEditInit($event.payload);
            break;
          case ProductActionTypes.EDIT_PRODUCT_SAVE:
            this.onRowEditSave($event.payload);
            break;
          case ProductActionTypes.EDIT_PRODUCT_CANCEL:
            this.onRowEditCancel($event.payload.product, $event.payload.index);
            break;
            case ProductActionTypes.DELETE_PRODUCT:
            this.deleteProduct($event.payload);
            break;
        }
      }


}
