import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AllService {

  headers = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {}

  getPrograms() {
    let headers: any =  this.headers;
    return this.http.get(`${environment.urlApi}/Programa/Programas`,  headers );
  }

  login(body: any) {
    let headers: any =  this.headers;
    return this.http.post(`${environment.urlApi}/Estudiante/Login`, body,  headers );
  }

  singup(body: any) {
    let headers: any =  this.headers;
    return this.http.post(`${environment.urlApi}/Estudiante/RegistrarUsuario`, body,  headers );
  }

  getSignatures(email: any) {
    let headers: any =  this.headers;
    return this.http.get(`${environment.urlApi}/Materia/ConsultarMaterias?email=${email}`,  headers );
  }

  saveSing(body: any) {
    let headers: any =  this.headers;
    return this.http.post(`${environment.urlApi}/Inscripcion/RegistrarInscripcion`, body,  headers );
  }

}
