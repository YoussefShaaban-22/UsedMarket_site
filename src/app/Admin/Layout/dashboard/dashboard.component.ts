import { Component } from '@angular/core';
import { AnalysisorderService, OrderStats, UserOrderStats, ProductOrderStats, SellerOrderStats } from '../../../apiservices/analysisorder.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { user } from '../../../models/user';
import { seller } from '../../../models/seller';
import { SellerService } from '../../../apiservices/seller.service';
import { ProductService } from '../../../apiservices/product.service';
import { product } from '../../../models/product';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  orderStats: OrderStats | undefined;
  userOrderStats: UserOrderStats[] = [];
  productOrderStats: ProductOrderStats[] = [];
  sellerOrderStats: SellerOrderStats[] = [];
  user: user[] = [];
  seller: seller[] = [];
  product: product[] = [];
  chartUser: any = {};
  chartSeller: any = {};
  chartProduct: any = {};

  constructor(private analysisorderService: AnalysisorderService, private userserv: AuthApiFunctionService
    , private sellerserv: SellerService, private productserv: ProductService
  ) { }

  ngOnInit(): void {
    this.userserv.getuser().subscribe((data: user[]) => {
      this.user = data;
    });
    this.sellerserv.getseller().subscribe((data: seller[]) => {
      this.seller = data;
    });
    this.productserv.getproduct().subscribe((data: product[]) => {
      this.product = data;
    });

    this.analysisorderService.getOrderStats().subscribe((response: any) => {
      this.orderStats = response.data || [];
      console.log(this.orderStats)
    });

    this.analysisorderService.getUserOrderStats().subscribe((response: any) => {
      this.userOrderStats = response.data || [];
      this.updateChartOptions();

    });


    this.analysisorderService.getProductOrderStats().subscribe((response: any) => {
      this.productOrderStats = response.data || [];
      this.updateProductChart();

    });

    this.analysisorderService.getSellerOrderStats().subscribe((response: any) => {
      this.sellerOrderStats = response.data || [];
      this.updateSellerChart();
    });
  }

  updateChartOptions(): void {
    const dataPoints = this.userOrderStats.map(stat => {
      const userObj = this.user.find(u => u.id === stat.user_id);
      const userName = userObj ? userObj.name : `User ${stat.user_id}`;

      return {
        label: userName,
        y: stat.order_count,
        user_id: stat.user_id,
        order_count: stat.order_count,
        total_quantity: stat.total_quantity,
        total_product_price: stat.total_product_price,
        userName
      };
    });
    this.chartUser = {
      title: {
        text: "User Order Statistics"
      },
      axisX: {
        title: "Users",
        labelAngle: -45
      },
      axisY: {
        title: "Order Count",
        includeZero: true
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }],
      toolTip: {
        contentFormatter: (e: any) => {
          const point = e.entries[0].dataPoint;
          return `
            User Name: ${point.userName}<br/>
            User ID: ${point.user_id}<br/>
            Order Count: ${point.order_count}<br/>
            Total Quantity: ${point.total_quantity}<br/>
            Total orders Price: ${point.total_product_price}
          `;
        }
      }
    };
  }

  updateSellerChart(): void {
    const dataPoints = this.sellerOrderStats.map(stat => {
      const sellerObj = this.seller.find(u => u.id === stat.seller_id);
      const sellerName = sellerObj ? sellerObj.name : `User ${stat.seller_id}`;

      return {
        label: sellerName,
        y: stat.order_count,
        seller_id: stat.seller_id,
        order_count: stat.order_count,
        total_quantity: stat.total_quantity,
        total_product_price: stat.total_product_price,
        sellerName
      };
    });
    this.chartSeller = {
      title: {
        text: "Seller Order Statistics"
      },
      axisX: {
        title: "Sellers",
        labelAngle: -45
      },
      axisY: {
        title: "Order Count",
        includeZero: true
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }],
      toolTip: {
        contentFormatter: (e: any) => {
          const point = e.entries[0].dataPoint;
          return `
            Seller Name: ${point.sellerName}<br/>
            Seller ID: ${point.seller_id}<br/>
            Order Count: ${point.order_count}<br/>
            Total Quantity: ${point.total_quantity}<br/>
            Total orders Price: ${point.total_product_price}
          `;
        }
      }
    };
  }

  updateProductChart(): void {
    const dataPoints = this.productOrderStats.map(stat => {
      const productObj = this.product.find(u => u.id === stat.product_id);
      const productName = productObj ? productObj.name : `User ${stat.product_id}`;

      return {
        label: productName,
        y: stat.count,
        product_id: stat.product_id,
        count: stat.count,
        total_quantity: stat.total_quantity,
        total_product_price: stat.total_product_price,
        productName
      };
    });
    this.chartProduct = {
      title: {
        text: "Product Order Statistics"
      },
      axisX: {
        title: "Products",
        labelAngle: -45
      },
      axisY: {
        title: "Order Count",
        includeZero: true
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }],
      toolTip: {
        contentFormatter: (e: any) => {
          const point = e.entries[0].dataPoint;
          return `
            Product Name: ${point.productName}<br/>
            Product ID: ${point.product_id}<br/>
            Order Count: ${point.count}<br/>
            Total Quantity: ${point.total_quantity}<br/>
            Total orders Price: ${point.total_product_price}
          `;
        }
      }
    };
  }
}
