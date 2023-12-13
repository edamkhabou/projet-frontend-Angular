import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
@Injectable({
  providedIn: 'root'
})
export class PieChartService {

  readonly API_URL = "http://localhost:8686";

  readonly ENDPOINT_PRDUIT = "/produits";
  readonly ENDPOINT_CATEGORIE = "/categories";
  constructor(private httpClient:HttpClient) { 

  }
  getProduitsAsc():
  Observable<any>{
    return this.httpClient.get(this.API_URL+this.ENDPOINT_PRDUIT+'/trouverCoutVentePlusCher')
  }
  getProduitsDesc():
  Observable<any>{
    return this.httpClient.get(this.API_URL+this.ENDPOINT_PRDUIT+'/listerProduitsParPrixDesc')
  }
  getProduitPlusCher():Observable<any>{
    return this.httpClient.get(this.API_URL+this.ENDPOINT_PRDUIT+'/trouverCoutVentePlusCher')
  }
  getProduitMoinsCher():Observable<any>{
    return this.httpClient.get(this.API_URL+this.ENDPOINT_PRDUIT+'/trouverCoutVenteMoinsCher')
  }
  getAllProduits():Observable<any>{
    return this.httpClient.get(this.API_URL+this.ENDPOINT_PRDUIT+'/')
  }
  getAllCategories():Observable<any>{
    return this.httpClient.get(this.API_URL+this.ENDPOINT_CATEGORIE+'/')
  }
  getPourcentageCategorie():Observable<any>{
    return this.httpClient.get(this.API_URL + this.ENDPOINT_PRDUIT + '/statistique')
  }
  getAllProduitsPrixAscd():Observable<any>{
    return this.httpClient.get(this.API_URL+this.ENDPOINT_PRDUIT+'/listerProduitsParPrixAsc')
  }
  getPourcentageParQuant():Observable<any>{
    return this.httpClient.get(this.API_URL+this.ENDPOINT_PRDUIT+'/calculerPourcentageParQuantite')
  }
  afficherPourcentageQuantiteVenduetous(date: string): Observable<any> {
    const url = `${this.API_URL}${this.ENDPOINT_PRDUIT}/afficherPourcentageQuantiteVenduetous/${date}`;
    if(url)
    console.log(url);
    return this.httpClient.get(url);

  }
}
