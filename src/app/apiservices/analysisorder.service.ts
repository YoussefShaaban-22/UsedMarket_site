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
export interface OrderDateStats {
  [date: string]: {
    total_price: string; // Or number if prices are numeric
    order_count?: number; // Optional if you also store order count
  } | string; // In case only the price is stored directly as a string
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
  product_count: any;
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

  getOrderDateStats(): Observable<OrderDateStats[]> {
    return this.http.get<OrderDateStats[]>("http://127.0.0.1:8000/api/orderDate-analysis");
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


  getOrderSellerDateStats(seller_id: any): Observable<OrderDateStats[]> {
    return this.http.get<OrderDateStats[]>(`http://127.0.0.1:8000/api/orderDateSeller-analysis/${seller_id}`);
  }
  getOrderSellerStats(seller_id: any): Observable<OrderStats[]> {
    return this.http.get<OrderStats[]>(`http://127.0.0.1:8000/api/orderseller-analysis/${seller_id}`);
  }

  getUserOrderSellerStats(seller_id: any): Observable<UserOrderStats[]> {
    return this.http.get<UserOrderStats[]>(`http://127.0.0.1:8000/api/userseller-analysis/${seller_id}`);
  }

  getProductOrderSellerStats(seller_id: any): Observable<ProductOrderStats[]> {
    return this.http.get<ProductOrderStats[]>(`http://127.0.0.1:8000/api/productseller-analysis/${seller_id}`);
  }
}
