export interface Product {
    productId: string;
    productName: string;
    company: string;
    category: string;
    price: number;
    rating: number;
    discount: number;
    availability: string;
  }
  
  export interface AuthResponse {
    access_token: string;
  }
  