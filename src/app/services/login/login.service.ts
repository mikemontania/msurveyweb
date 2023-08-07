import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BASE_URL } from '../../config/config';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Observable, throwError } from 'rxjs'; 
import { map, catchError } from 'rxjs/operators';
import { User } from '../../models/user.model';
 
@Injectable()
export class LoginService {
  user: User | null = null; // Inicializar como null
  token: string = ''; // Inicializar como una cadena vacía

  constructor(
    public http: HttpClient,
    public router: Router  ) {
    this.cargarStorage();
  }

  actualizarToken() {
    return this.http.get(BASE_URL + 'auth/token')
      .pipe(
        map((response: any) => {
          console.log(response);

          let decode = [];
          decode = response.token.split('.');
          let usu: any;
          let ini;
          let exp;
          usu = JSON.parse(window.atob(decode[1]));
          ini = new Date(usu.iat * 1000);
          exp = new Date(usu.exp * 1000);
          console.log('inicio:' + ini);
          console.log('expira:' + exp);
          localStorage.removeItem('token'); 
           if (this.user !== null) {
            this.guardarLocalStorage(response.token, this.user);
          }
          console.log('tokenRenovado:');
          return true;
        }
        ),
        catchError(e => {
          console.error('ERROR', e.error);
          Swal.fire(e.error.header, e.error.message, 'error');
          return throwError(() => e);
        })
      );
  }
  renuevaToken() {
    if (this.user !== null) {
      let url = BASE_URL + 'auth/login';
      let body={};
      if (this.user !== null) {
        body = JSON.stringify({
          username: this.user.username,
          password: this.user.password,
        });
      }else{

      }
      return this.http
        .post(url, body).pipe(
          map((res: any) => {
            let decode = [];
            decode = res.token.split('.');
            let usu: any;
            let ini;
            let exp;
            usu = JSON.parse(window.atob(decode[1]));
            ini = new Date(usu.iat * 1000);
            exp = new Date(usu.exp * 1000); 
            console.log('inicio:' + ini);
            console.log('expira:' + exp);
            localStorage.removeItem('token');
            if (this.user !== null) {
              this.guardarLocalStorage(res.token, this.user);
            }
            console.log('tokenRenovado:');
            return true;
          }),
          catchError(err => {
            console.error(err);
            this.router.navigate(['/login']);
            Swal.fire(
              'No se pudo renovar token',
              'No fue posible renovar token',
              'error'
            );
            return throwError(() => err);
          })
        );
    } else {
      // Manejo si this.user es null
      console.error('this.user es null');
      return throwError(() => 'this.user es null');
    }
  }
  

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }


  

  cargarStorage() {
    const storedToken = localStorage.getItem('token');
    if (storedToken !== null) {
      this.token = storedToken;
      const storedUser = localStorage.getItem('user');
      if (storedUser !== null) {
        this.user = JSON.parse(storedUser);
      } else {
        this.user = null;
      }
    } else {
      this.token = '';
      this.user = null;
    }
  }

  changeSucursal(codSucursal: number): Observable<any> {
    return this.http
      .put<any>(BASE_URL + 'usuarios/changeCodSucursal?codsucursal=' + codSucursal, null)
      .pipe(
        catchError(e => {
          console.error('ERROR', e.error);
          Swal.fire(e.error.header, e.error.message, 'error');
          return throwError(() => e);
        })
      );
  }
  guardarStorage(id: string, token: string, user: User) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    this.token = token;
  }

  guardarLocalStorage(token: string, user: User) {
    this.user = user;
    this.token = token;
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    console.log(token);
  }

  logout() {
    this.user = null;
    this.token = '';
    localStorage.removeItem('tv');
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
  accion() {
    localStorage.removeItem('accion');
  }

  loginGoogle(token: string) {
    let url = BASE_URL + '/login/google';

    return this.http.post(url, { token }).pipe(

      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
      })
    )
  }

  login(body:any , recordar: boolean = false) {
    localStorage.removeItem('tv');
    localStorage.removeItem('token');
    if (recordar) {
      localStorage.setItem('username', body.username);
    } else {
      localStorage.removeItem('username');
    }
  
    let url = BASE_URL + 'auth/login';
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(url, JSON.stringify({
      username: body.username,
      password: body.password,
    }),httpOptions)
      .pipe(
        map((response: any) => {
              
          let decode = [];
          decode = response.token.split('.');
          let usu: any;
          let ini;
          let exp;
          usu = JSON.parse(window.atob(decode[1]));
           console.log('usuarioDesencriptado: ', usu); 
          console.log('***********************', usu)
          this.guardarLocalStorage(response.token, usu as User);
          return true;
        }),
        catchError(e => {

          console.error('login error ', e);
          if (e.status == '401' || e.status == 401) {

            Swal.fire('Atencion', 'Usuario o contraseña no valida', 'error');
          }
          return throwError(() => e);
        })
      );
  }
}
