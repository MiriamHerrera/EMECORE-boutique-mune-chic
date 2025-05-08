export interface ProductImage {
  id: number;
  product_id: number;
  url: string;
  is_main: boolean;
  created_at: string;
  updated_at: string;
}

export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category_id: number;
  category_name: string | null;
  main_image: string | null;
  images?: ProductImage[];
  created_at: string;
  updated_at: string;
}

export interface NewProductImage {
  url: string;
  file?: File;
  isMain?: boolean;
} 