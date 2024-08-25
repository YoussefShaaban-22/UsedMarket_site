import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './Auth/register/register.component';
import { LoginComponent } from './Auth/login/login.component';
import { VerifyComponent } from './Auth/verify/verify.component';
import { DashboardComponent } from './Admin/Layout/dashboard/dashboard.component';
import { CreateBlogCategoryComponent } from './Admin/BlogCategory/create/create.component';
import { ListBlogCategoryComponent } from './Admin/BlogCategory/list/list.component';
import { UpdateBlogCategoryComponent } from './Admin/BlogCategory/update/update.component';
import { AuthGuardService } from './apiservices/auth-guard.service';
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
import { ViewCategoryComponent } from './EndUser/Category/view-category/view-category.component';
import { ViewProductComponent } from './EndUser/Product/view-product/view-product.component';
import { ViewCartComponent } from './EndUser/Cart/view-cart/view-cart.component';
import { ViewBrandComponent } from './EndUser/Brand/view-brand/view-brand.component';
import { BrandProductComponent } from './EndUser/Brand/brand-product/brand-product.component';
import { SellerProductComponent } from './EndUser/Seller/seller-product/seller-product.component';
import { ViewSellerComponent } from './EndUser/Seller/view-seller/view-seller.component';
import { AddUserComponent } from './Admin/User/add-user/add-user.component';
import { SearchProductComponent } from './EndUser/Product/search-product/search-product.component';
import { ChooseWayPaidComponent } from './EndUser/Cart/choose-way-paid/choose-way-paid.component';
import { MyorderComponent } from './EndUser/Order/myorder/myorder.component';
import { ListUserComponent } from './Admin/User/list-user/list-user.component';
import { ListInquiryComponent } from './Admin/Inquiry/list-inquiry/list-inquiry.component';
import { ListOrderComponent } from './Admin/Order/list-order/list-order.component';
import { ViewOrderComponent } from './Admin/Order/view-order/view-order.component';
import { ViewRefundComponent } from './Admin/Refund/view-refund/view-refund.component';
import { ViewInfoComponent } from './Admin/Footer/view-info/view-info.component';
import { UpdateInfoComponent } from './Admin/Footer/update-info/update-info.component';
import { SocialMediaComponent } from './Admin/Footer/social-media/social-media.component';
import { UpdatesocialComponent } from './Admin/Footer/updatesocial/updatesocial.component';
import { UpdateReturnsPolicyComponent } from './Admin/Pages/update-returns-policy/update-returns-policy.component';
import { ViewReturnsPolicyComponent } from './Admin/Pages/view-returns-policy/view-returns-policy.component';
import { ViewTermsServiceComponent } from './Admin/Pages/view-terms-service/view-terms-service.component';
import { UpdateTermsServiceComponent } from './Admin/Pages/update-terms-service/update-terms-service.component';
import { UpdatePrivacyPolicyComponent } from './Admin/Pages/update-privacy-policy/update-privacy-policy.component';
import { ViewPrivacyPolicyComponent } from './Admin/Pages/view-privacy-policy/view-privacy-policy.component';
import { ViewShippingpolicyComponent } from './Admin/Pages/view-shippingpolicy/view-shippingpolicy.component';
import { UpdateShippingpolicyComponent } from './Admin/Pages/update-shippingpolicy/update-shippingpolicy.component';
import { ReturnpolicyComponent } from './EndUser/Pages/returnpolicy/returnpolicy.component';
import { PrivacypolicyComponent } from './EndUser/Pages/privacypolicy/privacypolicy.component';
import { TermsofserviceComponent } from './EndUser/Pages/termsofservice/termsofservice.component';
import { ShippingpolicyComponent } from './EndUser/Pages/shippingpolicy/shippingpolicy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: ViewBlogComponent },
  { path: 'blog/:slug', component: BlogDetailsComponent },
  { path: 'category/:slug', component: ViewCategoryComponent },
  { path: 'product/:slug', component: ViewProductComponent },
  { path: 'SearchItem/:searchTerm', component: SearchProductComponent },
  { path: 'Mycart', component: ViewCartComponent },
  { path: 'Myorder', component: MyorderComponent },
  { path: 'paymethod', component: ChooseWayPaidComponent },
  { path: 'Return-policy', component: ReturnpolicyComponent },
  { path: 'Privacy-policy', component: PrivacypolicyComponent },
  { path: 'Terms-of-service', component: TermsofserviceComponent },
  { path: 'Shipping-policy', component: ShippingpolicyComponent },
  { path: 'brand/:slug', component: BrandProductComponent },
  { path: 'brand', component: ViewBrandComponent },
  { path: 'seller/:slug', component: SellerProductComponent },
  { path: 'seller', component: ViewSellerComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'Verify', component: VerifyComponent },
  { path: 'admin', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'admin/blogCategory/create', component: CreateBlogCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'admin/blogCategory/show', component: ListBlogCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'admin/blogCategory/update/:id', component: UpdateBlogCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'admin/blog/create', component: CreateBlogComponent, canActivate: [AuthGuardService] },
  { path: 'admin/blog/show', component: ListBlogComponent, canActivate: [AuthGuardService] },
  { path: 'admin/blog/update/:id', component: UpdateBlogComponent, canActivate: [AuthGuardService] },
  { path: 'admin/seller/create', component: CreateSellerComponent, canActivate: [AuthGuardService] },
  { path: 'admin/seller/show', component: ListSellerComponent, canActivate: [AuthGuardService] },
  { path: 'admin/seller/update/:id', component: UpdateSellerComponent, canActivate: [AuthGuardService] },
  { path: 'admin/brand/create', component: CreatebrandComponent, canActivate: [AuthGuardService] },
  { path: 'admin/brand/show', component: ListbrandComponent, canActivate: [AuthGuardService] },
  { path: 'admin/brand/update/:id', component: UpdatebrandComponent, canActivate: [AuthGuardService] },
  { path: 'admin/slider/create', component: CreatesliderComponent, canActivate: [AuthGuardService] },
  { path: 'admin/slider/show', component: ListsliderComponent, canActivate: [AuthGuardService] },
  { path: 'admin/slider/update/:id', component: UpdatesliderComponent, canActivate: [AuthGuardService] },
  { path: 'admin/color/create', component: CreatecolorComponent, canActivate: [AuthGuardService] },
  { path: 'admin/color/show', component: ListcolorComponent, canActivate: [AuthGuardService] },
  { path: 'admin/color/update/:id', component: UpdatecolorComponent, canActivate: [AuthGuardService] },
  { path: 'admin/productcategory/create', component: CreateProductCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'admin/productcategory/show', component: ListProductCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'admin/productcategory/update/:id', component: UpdateProductCategoryComponent, canActivate: [AuthGuardService] },
  { path: 'admin/attribute/create', component: CreateAttributeComponent, canActivate: [AuthGuardService] },
  { path: 'admin/attribute/show', component: ListAttributeComponent, canActivate: [AuthGuardService] },
  { path: 'admin/attribute/update/:id', component: UpdateAttributeComponent, canActivate: [AuthGuardService] },
  { path: 'admin/attributevalue/create/:id', component: CreateAttributeValueComponent, canActivate: [AuthGuardService] },
  { path: 'admin/attributevalue/show', component: ListAttributeValueComponent, canActivate: [AuthGuardService] },
  { path: 'admin/attributevalue/update/:id', component: UpdateAttributeValueComponent, canActivate: [AuthGuardService] },
  { path: 'admin/product/create', component: CreateProductComponent, canActivate: [AuthGuardService] },
  { path: 'admin/product/show', component: ListProductComponent, canActivate: [AuthGuardService] },
  { path: 'admin/product/update/:id', component: UpdateProductComponent, canActivate: [AuthGuardService] },
  { path: 'admin/homeslider/create', component: CreateHomeSliderComponent, canActivate: [AuthGuardService] },
  { path: 'admin/homeslider/show', component: ListHomeSliderComponent, canActivate: [AuthGuardService] },
  { path: 'admin/homeslider/update/:id', component: UpdateHomeSliderComponent, canActivate: [AuthGuardService] },
  { path: 'admin/AddNewUser', component: AddUserComponent, canActivate: [AuthGuardService] },
  { path: 'admin/showUser', component: ListUserComponent, canActivate: [AuthGuardService] },
  { path: 'admin/productInquiry', component: ListInquiryComponent, canActivate: [AuthGuardService] },
  { path: 'admin/AllOrders', component: ListOrderComponent, canActivate: [AuthGuardService] },
  { path: 'admin/AllRefund', component: ViewRefundComponent, canActivate: [AuthGuardService] },
  { path: 'admin/Order/:id', component: ViewOrderComponent, canActivate: [AuthGuardService] },
  { path: 'admin/information/show', component: ViewInfoComponent, canActivate: [AuthGuardService] },
  { path: 'admin/information/update/:id', component: UpdateInfoComponent, canActivate: [AuthGuardService] },
  { path: 'admin/socialMedia/show', component: SocialMediaComponent, canActivate: [AuthGuardService] },
  { path: 'admin/socialMedia/update/:id', component: UpdatesocialComponent, canActivate: [AuthGuardService] },
  { path: 'admin/returnpolicy/show', component: ViewReturnsPolicyComponent, canActivate: [AuthGuardService] },
  { path: 'admin/returnpolicy/update/:id', component: UpdateReturnsPolicyComponent, canActivate: [AuthGuardService] },
  { path: 'admin/shippingpolicy/show', component: ViewShippingpolicyComponent, canActivate: [AuthGuardService] },
  { path: 'admin/shippingpolicy/update/:id', component: UpdateShippingpolicyComponent, canActivate: [AuthGuardService] },
  { path: 'admin/privacypolicy/show', component: ViewPrivacyPolicyComponent, canActivate: [AuthGuardService] },
  { path: 'admin/privacypolicy/update/:id', component: UpdatePrivacyPolicyComponent, canActivate: [AuthGuardService] },
  { path: 'admin/termsservice/show', component: ViewTermsServiceComponent, canActivate: [AuthGuardService] },
  { path: 'admin/termsservice/update/:id', component: UpdateTermsServiceComponent, canActivate: [AuthGuardService] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
