import { environment } from './../../environments/environment';
import {DoCheck, Injectable, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, switchMap } from 'rxjs/operators';
import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Storage } from  '@ionic/storage-angular';
import jwt_decode from 'jwt-decode';
import {UsuarioModel} from "../model/usuario.model";
import {PerfilModel} from "../model/perfil.model";
const ACCESS_TOKEN_KEY: string = 'token';
const REFRESH_TOKEN_KEY: string = 'refresh';

const USER: string = 'user';

export interface JwtPayload {
  sub: string;
  roles: string[];
  exp: number;
}
@Injectable({
  providedIn: 'root'
})

export class ApiService implements OnInit {
  private readonly _AUTHENTICATED = 'authenticated';
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentAccessToken: any = "";
  url = environment.api_url;

  constructor(private http: HttpClient, private router: Router, private storage:Storage) {
  }
  async ngOnInit() {
    await this.loadToken();
  }


  isAuthenticado(): boolean {
     return sessionStorage.getItem(this._AUTHENTICATED) != undefined;
  }
  // Load accessToken on startup
  async loadToken() {
    await this.storage.create();
    const token = await this.storage.get(ACCESS_TOKEN_KEY);
    if (token) {
      this.currentAccessToken = token;
      this.isAuthenticated.next(true);
      return true;
    } else {
      this.isAuthenticated.next(false);
      return false;
    }
  }

  // Get our secret protected data
  getSecretData() {
    return this.http.get(`${this.url}/users/secret`);
  }

  // Create new user"http://localhost:8100"
  signUp(credentials: any): Observable<any> {
    return this.http.post(`${this.url}/usuario`, credentials);
  }

  // Sign in a user and store access and refres token
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.url}/login`, credentials, {responseType: 'text'}).pipe(
      switchMap((token: any) => {
        this.currentAccessToken = token;
        const storeAccess = this.storage.set(ACCESS_TOKEN_KEY, token);
        let user: JwtPayload = jwt_decode<JwtPayload>(token);
        const storeUser = this.storage.set(USER, user);
        sessionStorage.setItem(this._AUTHENTICATED, 'sim');
        return from(Promise.all([storeAccess, storeUser]));
      }),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    )
  }

  findAllUsuarios(): Observable<UsuarioModel[]> {
    return this.http.get<UsuarioModel[]>(`${this.url}/usuario`)
  }
  findUsuarioById(id: string): Observable<UsuarioModel> {
    return this.http.get<UsuarioModel>(`${this.url}/usuario/${id}`);
  }

  findAllPerfis(): Observable<PerfilModel[]> {
    return this.http.get<PerfilModel[]>(`${this.url}/perfil`)
  }
  async logout() {
    this.currentAccessToken = null;
    // Remove all stored tokens
    await this.storage.remove(ACCESS_TOKEN_KEY);
    await this.storage.remove(USER);
    await this.storage.remove(REFRESH_TOKEN_KEY);
    sessionStorage.removeItem(this._AUTHENTICATED);
    this.isAuthenticated.next(false);
    this.router.navigateByUrl('/', { replaceUrl: true });
  }


  getNewAccessToken() {
    const refreshToken = from(this.storage.get(REFRESH_TOKEN_KEY));
    return refreshToken.pipe(
      switchMap(token => {
        if (token && token) {
          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            })
          }
          return this.http.get(`${this.url}/auth/refresh`, httpOptions);
        } else {
          // No stored refresh token
          return of(null);
        }
      })
    );
  }

  storeAccessToken(accessToken: string) {
    this.currentAccessToken = accessToken;
    return from(this.storage.set(ACCESS_TOKEN_KEY, accessToken));
  }

  cadastrarUsuario(usuario: UsuarioModel): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.url}/usuario`, usuario);
  }

  cadastrarPerfil(perfil: PerfilModel): Observable<PerfilModel> {
    return this.http.post<PerfilModel>(`${this.url}/perfil`, perfil);
  }
}
