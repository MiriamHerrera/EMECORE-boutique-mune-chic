export interface Product {
  id: number;
  name: string;
  description: string | null;
  price: number;
  category_id: number;
  category_name: string | null;
  main_image: string | null;
  created_at: string;
  updated_at: string;
} 