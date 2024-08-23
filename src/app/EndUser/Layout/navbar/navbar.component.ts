import { Component, OnInit, Renderer2, ElementRef, HostListener, ChangeDetectorRef } from '@angular/core';
import { productcategory } from '../../../models/productcategory';
import { Router } from '@angular/router';
import { ProductcategoryService } from '../../../apiservices/productcategory.service';
import { AuthApiFunctionService } from '../../../apiservices/auth-api-function.service';
import { CartService } from '../../../apiservices/cart.service';
import { cart } from '../../../models/cart';
import { product } from '../../../models/product';
import { ProductService } from '../../../apiservices/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  productcategories: productcategory[] = [];
  cart: any = new cart();
  cartLength: any;
  menucat: string = '';
  user: any = null;
  user_id: any = null;
  searchTerm: string = '';
  filteredProducts: product[] = [];

  products: product[] = [];
  isAuthenticated!: boolean;
  userToken: string | null = null;

  constructor(private serv: ProductcategoryService, private Authserv: AuthApiFunctionService,private productService: ProductService,
     private cartserv: CartService
    , private router: Router, private renderer: Renderer2, private el: ElementRef,private cdr: ChangeDetectorRef
  ) {}

  onSearchTermChange() {
    if (this.searchTerm.length > 0) {
      this.productService.getSearchProduct(this.searchTerm).subscribe((products: product[]) => {
        this.filteredProducts = products.slice(0, 10);
      });
    } else {
      this.filteredProducts = [];
    }
  }
  onSearch() {
    this.router.navigate(['/SearchItem', this.searchTerm]);
  }
  ngOnInit(): void {

    this.serv.getproductcategory().subscribe((data: productcategory[]) => {
      this.productcategories = data;
      this.menucat = this.catlevel(0);
      setTimeout(() => {
        this.initializeMenu();
        this.cdr.detectChanges(); // Manually trigger change detection
      }, 0);    }, error => {
      console.error('Error fetching categories', error);
    });
    this.isAuthenticated = this.Authserv.isLoggedIn();

    this.userToken = this.Authserv.getItem('userToken');
    if (this.userToken) {
      // console.log('Token retrieved:', this.userToken);
    }
    const userData = this.Authserv.getItem('user');
    if (userData) {
      this.user = JSON.parse(userData);
      this.user_id = this.user.id;
    }

    this.cartserv.getcartByuserId(this.user_id).subscribe((data: cart[]) => {
      this.cart = data;
      this.cartLength = this.cart.length;

    }, error => {
      console.error('Error fetching Cart', error);
    });

  }

  logout() {
    this.Authserv.logout().subscribe(() => {
      localStorage.removeItem('userToken');
      localStorage.removeItem('user');
      window.location.reload();
    }, error => {
      console.error('Logout failed', error);

      localStorage.removeItem('userToken');
      localStorage.removeItem('user');
      window.location.reload();
    });
  }

  catlevel(parent_id: number): string {
    let menucat = '';
    const selectcat = this.productcategories.filter(cat => cat.parent_id === parent_id);
    selectcat.forEach(itemcat => {
      const submenucat = this.catlevel(itemcat.id);
      const hasSubcategories = this.productcategories.some(cat => cat.parent_id === itemcat.id);
      if (parent_id === 0) {
        menucat += `<li class="has-children">
          <a href="/category/${itemcat.slug}"><i class="surfsidemedia-font-tshirt"></i>${itemcat.name}</a>`;
        if (hasSubcategories) {
          menucat += `<div class="dropdown-menu">
            <ul class="mega-menu">${submenucat}</ul></div>`;
        }
        menucat += `</li>`;
      } else {
        menucat += `<li><a href="/category/${itemcat.slug}" class="submenu-title">${itemcat.name}</a>`;
        if (hasSubcategories) {
          menucat += `<ul class="submenu">`;
          this.productcategories
            .filter(cat => cat.parent_id === itemcat.id)
            .forEach(subcat => {
              menucat += `<li><a class="dropdown-item nav-link nav_item" href="/category/${subcat.slug}">${subcat.name}</a></li>`;
            });
          menucat += `</ul>`;
        }
        menucat += `</li>`;
      }
    });
    return menucat;
  }
  private initializeMenu() {
    const menu = this.el.nativeElement.querySelector('.mobile-menu');
    if (!menu) return; // Early exit if menu is not found

    const subMenus = menu.querySelectorAll('.dropdown');

    subMenus.forEach((subMenu: HTMLElement) => {
      const expandButton = this.renderer.createElement('span');
      this.renderer.addClass(expandButton, 'menu-expand');
      this.renderer.insertBefore(subMenu.parentNode, expandButton, subMenu);
      this.renderer.setStyle(subMenu, 'display', 'none');
    });

    this.renderer.listen(menu, 'click', (event: Event) => {
      const target = event.target as HTMLElement;
      if (target.closest('li a') || target.classList.contains('menu-expand')) {
        const listItem = target.closest('li') as HTMLElement;
        if (listItem && (listItem.classList.contains('menu-item-has-children') || listItem.classList.contains('has-children') || listItem.classList.contains('has-sub-menu'))) {
          event.preventDefault();
          const subMenu = listItem.querySelector('ul');
          if (subMenu) {
            if (subMenu.style.display === 'block') {
              this.renderer.removeClass(listItem, 'active');
              this.renderer.setStyle(subMenu, 'display', 'none');
            } else {
              this.renderer.addClass(listItem, 'active');
              const siblings = Array.from(listItem.parentElement?.children || []).filter(child => child !== listItem);
              siblings.forEach(sibling => {
                this.renderer.removeClass(sibling, 'active');
                const siblingSubMenu = (sibling as HTMLElement).querySelector('ul');
                if (siblingSubMenu) {
                  this.renderer.setStyle(siblingSubMenu, 'display', 'none');
                }
              });
              this.renderer.setStyle(subMenu, 'display', 'block');
            }
          }
        }
      }
    });
  }

  getCategoryUrl(slug: string): string {
    return `/category/${slug}`;
  }
}
