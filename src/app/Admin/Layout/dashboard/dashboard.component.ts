import { Component } from '@angular/core';
import { AnalysisorderService, OrderStats, UserOrderStats, ProductOrderStats, SellerOrderStats, OrderDateStats } from '../../../apiservices/analysisorder.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { user } from '../../../models/user';
import { seller } from '../../../models/seller';
import { SellerService } from '../../../apiservices/seller.service';
import { ProductService } from '../../../apiservices/product.service';
import { product } from '../../../models/product';
import { productcategory } from '../../../models/productcategory';
import { blog } from '../../../models/blog';
import { blogcategory } from '../../../models/blogcategory';
import { brand } from '../../../models/brand';
import { BrandService } from '../../../apiservices/brand.service';
import { BlogService } from '../../../apiservices/blog.service';
import { ProductcategoryService } from '../../../apiservices/productcategory.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  OrderDateStats: { [key: string]: { total_price: string; order_count?: number } | string } = {};
  OrderSellerDateStats: { [key: string]: { total_price: string; order_count?: number } | string } = {};
  months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' }
  ];
  years: number[] = [];
  selectedMonth = '08';
  selectedYear = new Date().getFullYear().toString();

  orderStats: OrderStats | undefined;
  userOrderStats: UserOrderStats[] = [];
  productOrderStats: ProductOrderStats[] = [];
  sellerOrderStats: SellerOrderStats[] = [];
  userinfo: any = null;
  user: user[] = [];
  seller: seller[] = [];
  product: product[] = [];
  productcategory: productcategory[] = [];
  blog: blog[] = [];
  blogcategory: blogcategory[] = [];
  brand: brand[] = [];
  usercount: any = null;
  sellercount: any = null;
  productcount: any = null;
  productcategorycount: any = null;
  blogcount: any = null;
  blogcategorycount: any = null;
  brandcount: any = null;
  chartUser: any = {};
  chartOrderDate: any = {};
  chartSeller: any = {};
  chartProduct: any = {};

  orderSellerStats: OrderStats | undefined;
  userOrderSellerStats: UserOrderStats[] = [];
  productOrderSellerStats: ProductOrderStats[] = [];
  chartSellerUser: any = {};
  chartSellerProduct: any = {};
  chartOrderSellerDate: any = {};

  constructor(private analysisorderService: AnalysisorderService, private userserv: AuthApiFunctionService
    , private sellerserv: SellerService, private productserv: ProductService
    , private brandserv: BrandService, private blogserv: BlogService, private producatserv: ProductcategoryService
  ) { }

  ngOnInit(): void {
    const userData = this.userserv.getItem('user');
    if (userData) {
      this.userinfo = JSON.parse(userData);
    }
    const currentYear = new Date().getFullYear();
    this.years = [];
    for (let year = 2023; year <= currentYear + 10; year++) {
      this.years.push(year);
    }
    this.userserv.getuser().subscribe((data: user[]) => {
      this.user = data;
      if (!this.userinfo.seller_id) {
        this.usercount = this.user.length;
      } else {
        this.usercount = this.user.filter(p => p.seller_id === this.userinfo.seller_id).length;
      }
    });

    this.sellerserv.getseller().subscribe((data: seller[]) => {
      this.seller = data;
      this.sellercount = this.seller.length;
    });

    this.productserv.getproduct().subscribe((data: product[]) => {
      this.product = data;
      if (!this.userinfo.seller_id) {
        this.productcount = this.product.length;
      } else {
        this.productcount = this.product.filter(p => p.seller_id === this.userinfo.seller_id).length;
      }
    });

    this.brandserv.getbrand().subscribe((data: brand[]) => {
      this.brand = data;
      this.brandcount = this.brand.length;
    });

    this.blogserv.getblog().subscribe((data: blog[]) => {
      this.blog = data;
      this.blogcount = this.blog.length;
    });

    this.blogserv.getblogCategory().subscribe((data: blogcategory[]) => {
      this.blogcategory = data;
      this.blogcategorycount = this.blogcategory.length;
    });

    this.producatserv.getproductcategory().subscribe((data: productcategory[]) => {
      this.productcategory = data;
      this.productcategorycount = this.productcategory.length;
    });
    if (!this.userinfo.seller_id) {
      this.analysisorderService.getOrderStats().subscribe((response: any) => {
        this.orderStats = response.data || [];
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

      this.analysisorderService.getOrderDateStats().subscribe((response: any) => {
        this.OrderDateStats = response.data || {};
        this.updateChartDateOptions();
      });

    } else {
      this.analysisorderService.getOrderSellerStats(this.userinfo.seller_id).subscribe((response: any) => {
        this.orderSellerStats = response.data || [];
      });
      this.analysisorderService.getUserOrderSellerStats(this.userinfo.seller_id).subscribe((response: any) => {
        this.userOrderSellerStats = response.data || [];
        this.updateChartUserOrderSellerOptions();

      });
      this.analysisorderService.getProductOrderSellerStats(this.userinfo.seller_id).subscribe((response: any) => {
        this.productOrderSellerStats = response.data || [];
        this.updateProductSellerChart();

      });

      this.analysisorderService.getOrderSellerDateStats(this.userinfo.seller_id).subscribe((response: any) => {
        this.OrderSellerDateStats = response.data || {};
        this.updateChartSellerDateOptions();
      });
    }
  }

  onMonthOrYearChange(): void {
    console.log('Selected Month:', this.selectedMonth);
    console.log('Selected Year:', this.selectedYear);
    this.updateChartDateOptions();
  }

  updateChartDateOptions(): void {
    // Filter the data based on the selected month and year
    const filteredData = Object.entries(this.OrderDateStats).filter(([date]) => {
      const [year, month] = date.split('-');
      return year === this.selectedYear && month === this.selectedMonth;
    });

    // Transform the filtered data into dataPoints for the chart
    const dataPoints = filteredData.map(([date, stats]) => {
      const [year, month, day] = date.split('-');
      const total_price = typeof stats === 'string' ? stats : stats.total_price;
      const order_count = typeof stats === 'object' ? stats.order_count : undefined;

      return {
        label: `${month}-${day}`,  // Label for the X-axis
        y: parseFloat(total_price), // Y-axis value (Total Price)
        date: date,                 // Original date
        totalPrice: parseFloat(total_price),
        orderCount: order_count    // Order count

      };
    });

    console.log(dataPoints);

    // Create the chart options
    this.chartOrderDate = {
      title: {
        text: "Total Price by Day of the Month"
      },
      axisX: {
        title: "Day of the Month",
        labelAngle: -45
      },
      axisY: {
        title: "Total Price",
        includeZero: true,
        valueFormatString: "#,##0.00 EGP"
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }],
      toolTip: {
        contentFormatter: (e: any) => {
          const point = e.entries[0].dataPoint;
          return `
            Date: ${point.date}<br/>
            Total Order: ${point.orderCount }<br/>
            Total Price: ${point.totalPrice.toFixed(2)} EGP
          `;
        }
      }
    };
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
        product_count: stat.product_count,
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
            Product Count: ${point.product_count}<br/>
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


  updateChartUserOrderSellerOptions(): void {
    const dataPoints = this.userOrderSellerStats.map(stat => {
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
    this.chartSellerUser = {
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


  updateProductSellerChart(): void {
    const dataPoints = this.productOrderSellerStats.map(stat => {
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
    this.chartSellerProduct = {
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

  onMonthOrYearSellerChange(): void {
    this.updateChartSellerDateOptions();
  }
  updateChartSellerDateOptions(): void {
    // Filter the data based on the selected month and year
    const filteredData = Object.entries(this.OrderSellerDateStats).filter(([date]) => {
      const [year, month] = date.split('-');
      return year === this.selectedYear && month === this.selectedMonth;
    });

    // Transform the filtered data into dataPoints for the chart
    const dataPoints = filteredData.map(([date, stats]) => {
      const [year, month, day] = date.split('-');
      const total_price = typeof stats === 'string' ? stats : stats.total_price;
      const order_count = typeof stats === 'object' ? stats.order_count : undefined;

      return {
        label: `${month}-${day}`,  // Label for the X-axis
        y: parseFloat(total_price), // Y-axis value (Total Price)
        date: date,                 // Original date
        totalPrice: parseFloat(total_price),
        orderCount: order_count    // Order count

      };
    });

    console.log(dataPoints);

    // Create the chart options
    this.chartOrderSellerDate = {
      title: {
        text: "Total Price by Day of the Month"
      },
      axisX: {
        title: "Day of the Month",
        labelAngle: -45
      },
      axisY: {
        title: "Total Price",
        includeZero: true,
        valueFormatString: "#,##0.00 EGP"
      },
      data: [{
        type: "column",
        dataPoints: dataPoints
      }],
      toolTip: {
        contentFormatter: (e: any) => {
          const point = e.entries[0].dataPoint;
          return `
            Date: ${point.date}<br/>
            Total Order: ${point.orderCount }<br/>
            Total Price: ${point.totalPrice.toFixed(2)} EGP
          `;
        }
      }
    };
  }
}
