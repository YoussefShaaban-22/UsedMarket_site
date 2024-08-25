import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { information } from '../models/information';
import { socialLinks } from '../models/socialLinks';
import { returnpolicy } from '../models/returnpolicy';
import { shippingpolicy } from '../models/shippingpolicy';
import { privacypolicy } from '../models/privacypolicy';
import { termsservice } from '../models/termsservice';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private http: HttpClient) { }

  addinformation(information: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/Information", information);
  }
  getinformation() {
    return this.http.get<information[]>("http://127.0.0.1:8000/api/Information");
  }
  getinformationById(id: any) {
    return this.http.get<information>(`http://127.0.0.1:8000/api/InformationID/${id}`);
  }
  updateinformation(id: number, information: information) {
    return this.http.put(`http://127.0.0.1:8000/api/Information/${id}`, information);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  addsocialLinks(socialLinks: any): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/SocialLink", socialLinks);
  }
  getsocialLinks() {
    return this.http.get<socialLinks[]>("http://127.0.0.1:8000/api/SocialLink");
  }
  getsocialLinksById(id: any) {
    return this.http.get<socialLinks>(`http://127.0.0.1:8000/api/SocialLinkID/${id}`);
  }
  updatesocialLinks(id: number, socialLinks: socialLinks) {
    return this.http.put(`http://127.0.0.1:8000/api/SocialLink/${id}`, socialLinks);
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  getReturnPolicy() {
    return this.http.get<returnpolicy[]>("http://127.0.0.1:8000/api/ReturnPolicy");
  }
  getReturnPolicyById(id: any) {
    return this.http.get<returnpolicy>(`http://127.0.0.1:8000/api/ReturnPolicyID/${id}`);
  }
  updateReturnPolicy(id: number, returnpolicy: returnpolicy) {
    return this.http.put(`http://127.0.0.1:8000/api/ReturnPolicy/${id}`, returnpolicy);
  }

  getprivacypolicy() {
    return this.http.get<privacypolicy[]>("http://127.0.0.1:8000/api/PrivacyPolicy");
  }
  getprivacypolicyById(id: any) {
    return this.http.get<privacypolicy>(`http://127.0.0.1:8000/api/PrivacyPolicyID/${id}`);
  }
  updateprivacypolicy(id: number, privacypolicy: privacypolicy) {
    return this.http.put(`http://127.0.0.1:8000/api/PrivacyPolicy/${id}`, privacypolicy);
  }

  gettermsservice() {
    return this.http.get<termsservice[]>("http://127.0.0.1:8000/api/TermsService");
  }
  gettermsserviceById(id: any) {
    return this.http.get<termsservice>(`http://127.0.0.1:8000/api/TermsServiceID/${id}`);
  }
  updatetermsservice(id: number, termsservice: termsservice) {
    return this.http.put(`http://127.0.0.1:8000/api/TermsService/${id}`, termsservice);
  }

  getShippingpolicy() {
    return this.http.get<shippingpolicy[]>("http://127.0.0.1:8000/api/Shippingpolicy");
  }
  getShippingpolicyById(id: any) {
    return this.http.get<shippingpolicy>(`http://127.0.0.1:8000/api/ShippingpolicyID/${id}`);
  }
  updateShippingpolicy(id: number, shippingpolicy: shippingpolicy) {
    return this.http.put(`http://127.0.0.1:8000/api/Shippingpolicy/${id}`, shippingpolicy);
  }
}
