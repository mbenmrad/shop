
export interface Country {
    name?: string;
    code?: string;
}

export interface Representative {
    name?: string;
    image?: string;
}

export interface Product {
    id: number;
    code: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    inventoryStatus: string;
    category: string;
    image?: string;
    rating?: number;
  }