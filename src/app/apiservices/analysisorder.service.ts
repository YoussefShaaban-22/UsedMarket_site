import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface OrderStats {
  total_orders: any;
  total_price: any;
  total_sellers: any;
  total_users: any;
  total_products: any;
}

export interface UserOrderStats {
  user_id: any;
  order_count: any;
  total_quantity: any;
  total_product_price: any;
}

export interface ProductOrderStats {
  product_id: any;
  count: any;
  total_quantity: any;
  total_product_price: any;
}

export interface SellerOrderStats {
  seller_id: any;
  order_count: any;
  total_quantity: any;
  total_product_price: any;
}

@Injectable({
  providedIn: 'root'
})
export class AnalysisorderService {

  constructor(private http: HttpClient) { }

  getOrderStats(): Observable<OrderStats[]> {
    return this.http.get<OrderStats[]>("http://127.0.0.1:8000/api/order-analysis");
  }

  getUserOrderStats(): Observable<UserOrderStats[]> {
    return this.http.get<UserOrderStats[]>("http://127.0.0.1:8000/api/user-analysis");
  }

  getProductOrderStats(): Observable<ProductOrderStats[]> {
    return this.http.get<ProductOrderStats[]>("http://127.0.0.1:8000/api/product-analysis");
  }

  getSellerOrderStats(): Observable<SellerOrderStats[]> {
    return this.http.get<SellerOrderStats[]>("http://127.0.0.1:8000/api/seller-analysis");
  }
}
