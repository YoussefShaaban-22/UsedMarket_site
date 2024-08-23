import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSliderModule} from '@angular/material/slider';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { VerifyComponent } from './Auth/verify/verify.component';
import { HeaderComponent } from './Admin/Layout/header/header.component';
import { DashboardComponent } from './Admin/Layout/dashboard/dashboard.component';
import { CreateBlogCategoryComponent } from './Admin/BlogCategory/create/create.component';
import { ListBlogCategoryComponent } from './Admin/BlogCategory/list/list.component';
import { UpdateBlogCategoryComponent } from './Admin/BlogCategory/update/update.component';
import { CreateBlogComponent } from './Admin/Blog/create/create.component';
import { ListBlogComponent } from './Admin/Blog/list/list.component';
import { UpdateBlogComponent } from './Admin/Blog/update/update.component';
import { UpdateSellerComponent } from './Admin/Seller/update-seller/update-seller.component';
import { CreateSellerComponent } from './Admin/Seller/create-seller/create-seller.component';
import { ListSellerComponent } from './Admin/Seller/list-seller/list-seller.component';
import { ListbrandComponent } from './Admin/Brand/listbrand/listbrand.component';
import { CreatebrandComponent } from './Admin/Brand/createbrand/createbrand.component';
import { UpdatebrandComponent } from './Admin/Brand/updatebrand/updatebrand.component';
import { UpdatesliderComponent } from './Admin/Slider/updateslider/updateslider.component';
import { CreatesliderComponent } from './Admin/Slider/createslider/createslider.component';
import { ListsliderComponent } from './Admin/Slider/listslider/listslider.component';
import { ListcolorComponent } from './Admin/Color/listcolor/listcolor.component';
import { CreatecolorComponent } from './Admin/Color/createcolor/createcolor.component';
import { UpdatecolorComponent } from './Admin/Color/updatecolor/updatecolor.component';
import { UpdateProductCategoryComponent } from './Admin/ProductCategory/update-product-category/update-product-category.component';
import { CreateProductCategoryComponent } from './Admin/ProductCategory/create-product-category/create-product-category.component';
import { ListProductCategoryComponent } from './Admin/ProductCategory/list-product-category/list-product-category.component';
import { HomeComponent } from './EndUser/home/home.component';
import { NavbarComponent } from './EndUser/Layout/navbar/navbar.component';
import { FooterComponent } from './EndUser/Layout/footer/footer.component';
import { ListAttributeComponent } from './Admin/Attribute/list-attribute/list-attribute.component';
import { CreateAttributeComponent } from './Admin/Attribute/create-attribute/create-attribute.component';
import { UpdateAttributeComponent } from './Admin/Attribute/update-attribute/update-attribute.component';
import { UpdateAttributeValueComponent } from './Admin/AttributeValue/update-attribute-value/update-attribute-value.component';
import { CreateAttributeValueComponent } from './Admin/AttributeValue/create-attribute-value/create-attribute-value.component';
import { ListAttributeValueComponent } from './Admin/AttributeValue/list-attribute-value/list-attribute-value.component';
import { CreateProductComponent } from './Admin/Product/create-product/create-product.component';
import { ListProductComponent } from './Admin/Product/list-product/list-product.component';
import { UpdateProductComponent } from './Admin/Product/update-product/update-product.component';
import { UpdateHomeSliderComponent } from './Admin/HomeSlider/update-home-slider/update-home-slider.component';
import { CreateHomeSliderComponent } from './Admin/HomeSlider/create-home-slider/create-home-slider.component';
import { ListHomeSliderComponent } from './Admin/HomeSlider/list-home-slider/list-home-slider.component';
import { ViewBlogComponent } from './EndUser/Blog/view-blog/view-blog.component';
import { BlogDetailsComponent } from './EndUser/Blog/blog-details/blog-details.component';
import { ViewBrandComponent } from './EndUser/Brand/view-brand/view-brand.component';
import { BrandProductComponent } from './EndUser/Brand/brand-product/brand-product.component';
import { SellerProductComponent } from './EndUser/Seller/seller-product/seller-product.component';
import { ViewSellerComponent } from './EndUser/Seller/view-seller/view-seller.component';
import { ViewCategoryComponent } from './EndUser/Category/view-category/view-category.component';
import { ViewProductComponent } from './EndUser/Product/view-product/view-product.component';
import { ViewCartComponent } from './EndUser/Cart/view-cart/view-cart.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { AddUserComponent } from './Admin/User/add-user/add-user.component';
import { SearchProductComponent } from './EndUser/Product/search-product/search-product.component';
import { ChooseWayPaidComponent } from './EndUser/Cart/choose-way-paid/choose-way-paid.component';
import { MyorderComponent } from './EndUser/Order/myorder/myorder.component';
import { ListUserComponent } from './Admin/User/list-user/list-user.component';
import { ListInquiryComponent } from './Admin/Inquiry/list-inquiry/list-inquiry.component';
import { ListOrderComponent } from './Admin/Order/list-order/list-order.component';
import { ViewOrderComponent } from './Admin/Order/view-order/view-order.component';
import { ViewRefundComponent } from './Admin/Refund/view-refund/view-refund.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    VerifyComponent,
    HeaderComponent,
    DashboardComponent,
    CreateBlogCategoryComponent,
    ListBlogCategoryComponent,
    UpdateBlogCategoryComponent,
    CreateBlogComponent,
    ListBlogComponent,
    UpdateBlogComponent,
    UpdateSellerComponent,
    CreateSellerComponent,
    ListSellerComponent,
    ListbrandComponent,
    CreatebrandComponent,
    UpdatebrandComponent,
    UpdatesliderComponent,
    CreatesliderComponent,
    ListsliderComponent,
    ListcolorComponent,
    CreatecolorComponent,
    UpdatecolorComponent,
    UpdateProductCategoryComponent,
    CreateProductCategoryComponent,
    ListProductCategoryComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    ListAttributeComponent,
    CreateAttributeComponent,
    UpdateAttributeComponent,
    UpdateAttributeValueComponent,
    CreateAttributeValueComponent,
    ListAttributeValueComponent,
    CreateProductComponent,
    ListProductComponent,
    UpdateProductComponent,
    UpdateHomeSliderComponent,
    CreateHomeSliderComponent,
    ListHomeSliderComponent,
    ViewBlogComponent,
    BlogDetailsComponent,
    ViewBrandComponent,
    BrandProductComponent,
    SellerProductComponent,
    ViewSellerComponent,
    ViewCategoryComponent,
    ViewProductComponent,
    ViewCartComponent,
    SafeUrlPipe,
    AddUserComponent,
    SearchProductComponent,
    ChooseWayPaidComponent,
    MyorderComponent,
    ListUserComponent,
    ListInquiryComponent,
    ListOrderComponent,
    ViewOrderComponent,
    ViewRefundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSliderModule,
    BrowserAnimationsModule,
    NgxPaginationModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
