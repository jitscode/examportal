import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import baseUrl from './helper';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  static authorities: any;

  constructor( private http: HttpClient) {}

  //add User
public addUser(user:any){
  return this.http.post(`${baseUrl}/user/`,user);
}

}
