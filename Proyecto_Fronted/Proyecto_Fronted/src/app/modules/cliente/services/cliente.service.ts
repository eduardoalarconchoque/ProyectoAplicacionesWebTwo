import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from '../../../auth/Services/storage/storage.service';
import { Observable, tap } from 'rxjs';

const BASIC_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http: HttpClient) { }

  createAuthorizationHeader (): HttpHeaders{
    let authHeaders: HttpHeaders = new HttpHeaders();
    return authHeaders.set(
      'Authorization',
      'Bearer ' + StorageService.getToken()    
    );
  }

  getAllProducts(): Observable<any> {
    return this.http.get(`${BASIC_URL}/api/clientes/products`, {
       headers :this.createAuthorizationHeader()
      });
  }

 getCategorias(): Observable<any[]> {
        const headers = this.createAuthorizationHeader();
        return this.http.get<any[]>(`${BASIC_URL}/api/clientes/categorias`, { headers });
      }
  
 buscarProductos(nombre: string, categoriaId: string): Observable<any[]> {
      const params = {
        nombre: nombre,
        categoriaId: categoriaId
      };
      return this.http.get<any[]>(`${BASIC_URL}/api/clientes/products/search`, {
        headers: this.createAuthorizationHeader(),
        params: params
      });
    }

    crearCarrito(userId: number): Observable<any> {
      const headers = this.createAuthorizationHeader();
      return this.http.post<any>(
        `${BASIC_URL}/api/clientes/createCart`,
        {},
        { headers, params: { userId: userId.toString() } }
      );
    }
    
   
     agregarAlCarrito(userId: number, productId: number, cantidad: number): Observable<any> {
      const headers = this.createAuthorizationHeader();
      const params = new HttpParams().set('cantidad', cantidad.toString());
      return this.http.post(`${BASIC_URL}/api/clientes/cart/${userId}/add/${productId}`, null, { headers, params });
    }
    
    

    getCartItems(userId: number): Observable<any[]> {
      const headers = this.createAuthorizationHeader();
      return this.http.get<any[]>(`${BASIC_URL}/api/clientes/cart/${userId}`, {
        headers
      }).pipe(
        tap(cartItems => {
          console.log('Cart Items from Backend:', cartItems);  
        })
      );
    }

    eliminarItemDelCarrito(cartItemId: number): Observable<any> {
      const headers = this.createAuthorizationHeader();
      return this.http.delete(`${BASIC_URL}/api/clientes/cart/item/${cartItemId}`, { headers });
    }
    

    getTotalCarrito(userId: number): Observable<any> {
      const headers = this.createAuthorizationHeader();
      return this.http.get<any>(`${BASIC_URL}/api/clientes/total/${userId}`, {
        headers
      }).pipe(
        tap(total => {
          console.log('Total del Carrito desde Backend:', total);
        })
      );
    }

    
    crearOrdenDesdeCarrito(userId: number): Observable<any> {
      const headers = this.createAuthorizationHeader();
      return this.http.post(`${BASIC_URL}/api/clientes/order/${userId}`, null, { headers });
    }

    
    getOrdenesPorUsuario(userId: number): Observable<any[]> {
      const headers = this.createAuthorizationHeader();
      return this.http.get<any[]>(`${BASIC_URL}/api/clientes/orders/${userId}`, { headers });
    }

    pagarOrden(userId: number, orderId: number, paymentDto: any): Observable<any> {
      const headers = this.createAuthorizationHeader();
      return this.http.post(`${BASIC_URL}/api/clientes/order/${userId}/pay/${orderId}`, paymentDto, { headers });
    }
    
 
    obtenerPagos(userId: number): Observable<any[]> {
      const headers = this.createAuthorizationHeader();
      return this.http.get<any[]>(`${BASIC_URL}/api/clientes/payments/${userId}`, { headers });
    }
    
    
    getOrderDetail(orderId: number, userId: number): Observable<any> {
      const headers = this.createAuthorizationHeader();
      return this.http.get<any>(`${BASIC_URL}/api/clientes/order/${orderId}/user/${userId}`, { headers });
    }
    
    //para descargar archivos pdf
    descargarOrdenPdf(orderId: number, userId: number): Observable<Blob> {
      const headers = this.createAuthorizationHeader();
      return this.http.get(`${BASIC_URL}/api/pdf/orden/${orderId}/usuario/${userId}`, {
        headers,
        responseType: 'blob' 
      });
    }
    
    
}
