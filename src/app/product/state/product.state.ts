export enum ProductActionTypes {
    EDIT_PRODUCT_INIT = '[Product] Edit Product Init',
    EDIT_PRODUCT_SAVE = '[Product] Edit Product Save',
    EDIT_PRODUCT_CANCEL = '[Product] Edit Product Cancel',
    DELETE_PRODUCT = '[Product] Delete Product'
}

export interface ActionEvent {
    type: ProductActionTypes,
    payload?: any
}