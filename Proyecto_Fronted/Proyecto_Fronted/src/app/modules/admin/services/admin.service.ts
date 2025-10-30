import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from '../../../auth/Services/storage/storage.service';

const BASIC_URL = "http://localhost:8080";

@Injectable({
  providedIn: 'root'
})

export class AdminService {

       constructor(private http: HttpClient) {}

      createAuthorizationHeader (): HttpHeaders{
        let authHeaders: HttpHeaders = new HttpHeaders();
        return authHeaders.set(
          'Authorization',
          'Bearer ' + StorageService.getToken()
    
        );
      }

    agregarProducto(productDto: any): Observable<any> {
      return this.http.post(`${BASIC_URL}/api/admin/product`, productDto, {
        headers: this.createAuthorizationHeader()
      });
    }

    actualizarProducto(productId: number, productDto: any): Observable<any> {
      return this.http.put(`${BASIC_URL}/api/admin/product/${productId}`, productDto, {
        headers: this.createAuthorizationHeader()
      });
    }

    eliminarProducto(productId: number): Observable<any> {
      return this.http.delete(`${BASIC_URL}/api/admin/product/${productId}`, {
        headers: this.createAuthorizationHeader()
      });
    }
  

    getProductosPorCategoria(categoriaId: number): Observable<any[]> {
      return this.http.get<any[]>(`${BASIC_URL}/api/admin/products/category/${categoriaId}`, {
        headers: this.createAuthorizationHeader()
      });
    }

    buscarProductos(nombre: string, categoriaNombre: string): Observable<any[]> {
      const params = {
        nombre: nombre,
        categoriaNombre: categoriaNombre
      };
      return this.http.get<any[]>(`${BASIC_URL}/api/admin/products/search`, {
        headers: this.createAuthorizationHeader(),
        params: params
      });
    }
    


    getCategorias(): Observable<any[]> {
      const headers = this.createAuthorizationHeader();
      return this.http.get<any[]>(`${BASIC_URL}/api/admin/categories`, { headers });
    }

    agregarCategoria(categoryDto: any): Observable<any> {
      const headers = this.createAuthorizationHeader();
      return this.http.post<any>(`${BASIC_URL}/api/admin/category`, categoryDto, { headers });
    }
    
    actualizarCategoria(categoryId: number, categoryDto: any): Observable<boolean> {
      const headers = this.createAuthorizationHeader();
      return this.http.put<boolean>(`${BASIC_URL}/api/admin/category/${categoryId}`, categoryDto, { headers });
    }

    eliminarCategoria(categoryId: number): Observable<boolean> {
      const headers = this.createAuthorizationHeader();
      return this.http.delete<boolean>(`${BASIC_URL}/api/admin/category/${categoryId}`, { headers });
    }
  

  //---------------------------------------------------------------------------------//
  getUsuarios(): Observable<any[]> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any[]>(`${BASIC_URL}/api/admin/users`, { headers });
  }

  eliminarUsuario(userId: number): Observable<boolean> {
    const headers = this.createAuthorizationHeader();
    return this.http.delete<boolean>(`${BASIC_URL}/api/admin/user/${userId}`, { headers });
  }

//----------------------------------------------------------------------------------------------//
 
   obtenerOrdenesPorUsuario(userId: number): Observable<any[]> {
       const headers = this.createAuthorizationHeader();
     return this.http.get<any[]>(`${BASIC_URL}/api/admin/orders/${userId}`, { headers });
  }



  actualizarEstadoDeOrden(orderId: number, estado: string): Observable<boolean> {
           const headers = this.createAuthorizationHeader();
           return this.http.put<boolean>(
         `${BASIC_URL}/api/admin/order/${orderId}/status`,
           {}, 
         { headers, params: { estado } }
      )
  }
//-----------------------metodo nuevo ------------------------------//
getTodosLosPagos(): Observable<any[]> {
  const headers = this.createAuthorizationHeader();
  return this.http.get<any[]>(`${BASIC_URL}/api/admin/payments`, { headers });
}
//----------------------------------------------------------------------//
  

obtenerPagoPorOrden(orderId: number): Observable<any> {
    const headers = this.createAuthorizationHeader();
    return this.http.get<any>(`${BASIC_URL}/api/admin/payment/${orderId}`, { headers });
  }

obtenerPagosPorUsuario(userId: number): Observable<any> {
  const headers = this.createAuthorizationHeader();
  return this.http.get<any>(`${BASIC_URL}/api/admin/payment/${userId}`, { headers });
}

obtenerOrdenesPendientes(): Observable<any[]> {
  const headers = this.createAuthorizationHeader();
  return this.http.get<any[]>(`${BASIC_URL}/api/admin/orders/pending`, { headers });
}

obtenerPagosPendientes(): Observable<any[]> {
  const headers = this.createAuthorizationHeader();
  return this.http.get<any[]>(`${BASIC_URL}/api/admin/payments/pending`, { headers });
}

}

  

  


 

 



