import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { attribute } from '../models/attribute';
import { attributevalue } from '../models/attributevalue';

@Injectable({
  providedIn: 'root'
})
export class AttributeService {

  constructor(private http: HttpClient) { }

  addattribute(attribute: FormData): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/Attribute", attribute);
  }
  getattribute() {
    return this.http.get<attribute[]>("http://127.0.0.1:8000/api/Attribute");
  }
  updateattribute(id: number, attribute: attribute) {
    return this.http.put(`http://127.0.0.1:8000/api/Attribute/${id}`, attribute);
  }
  getattributeById(id: any) {
    return this.http.get<attribute>(`http://127.0.0.1:8000/api/Attribute/${id}`);
  }

  deleteattribute(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/Attribute/${id}`);
  }

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  addattributevalue(attributevalue: FormData): Observable<any> {
    return this.http.post("http://127.0.0.1:8000/api/AttributeValue", attributevalue);
  }
  getattributevalue() {
    return this.http.get<attributevalue[]>("http://127.0.0.1:8000/api/AttributeValue");
  }
  updateattributevalue(id: number, attributevalue: attributevalue) {
    return this.http.put(`http://127.0.0.1:8000/api/AttributeValue/${id}`, attributevalue);
  }
  getattributeByIdvalue(id: any) {
    return this.http.get<attributevalue>(`http://127.0.0.1:8000/api/AttributeValue/${id}`);
  }

  deleteattributevalue(id: number) {
    return this.http.delete(`http://127.0.0.1:8000/api/AttributeValue/${id}`);
  }

}
