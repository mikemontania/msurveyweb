import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { BASE_URL } from 'src/app/config/config';
import { Survey } from 'src/app/models/survey.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }


  getUserProfileImage(id: string): Observable<any> {
    return this.http.get(`${BASE_URL}uploads/usuarios/${id}`).pipe(
      map((resp: any) => resp),
      catchError(e => {
        console.error('ERROR', e.error);
        Swal.fire(e.error.header, e.error.message, 'error');
        return throwError(() => e);
      })
    );
  }

  getSurveyById(surveyId: number): Observable<any> {
    const url = `${BASE_URL}survey/${surveyId}`;
    return this.http.get<any>(url).pipe(
      map((resp: any) => resp),
      catchError(e => {
        console.error('ERROR', e.error);
        Swal.fire(e.error.header, e.error.message, 'error');
        return throwError(() => e);
      })
    );
  }
  getSurveyResultById(surveyId: number): Observable<any> {
    const url = `${BASE_URL}survey/result/${surveyId}`;
    return this.http.get<any>(url).pipe(
      map((resp: any) => resp),
      catchError(e => {
        console.error('ERROR', e.error);
        Swal.fire(e.error.header, e.error.message, 'error');
        return throwError(() => e);
      })
    );
  }

  // Survey

  getSurveys(): Observable<any> {
    return this.http.get(`${BASE_URL}survey/list`).pipe(
      map((resp: any) => resp),
      catchError(e => {
        console.error('ERROR', e.error);
        Swal.fire(e.error.header, e.error.message, 'error');
        return throwError(() => e);
      })
    );
  }

  createSurvey(surveyData: Survey): Observable<Survey> {
    return this.http.post(`${BASE_URL}survey/create`, surveyData).pipe(
      map((resp: any) => resp),
      catchError(e => {
        console.error('ERROR', e.error);
        Swal.fire(e.error.header, e.error.message, 'error');
        return throwError(() => e);
      })
    );
  }

  updateSurvey(survey : Survey): Observable<Survey> {
    return this.http.post(`${BASE_URL}survey/${survey.codSurvey}`, survey).pipe(
      map((resp: any) => resp),
      catchError(e => {
        console.error('ERROR', e.error);
        Swal.fire(e.error.header, e.error.message, 'error');
        return throwError(() => e);
      })
    );
  }

  activateSurvey(id: string): Observable<any> {
    return this.http.put(`${BASE_URL}survey/${id}/activate`, null).pipe(
      map((resp: any) => resp),
      catchError(e => {
        console.error('ERROR', e.error);
        Swal.fire(e.error.header, e.error.message, 'error');
        return throwError(() => e);
      })
    );
  }

  // File Upload and Images

  uploadImage(type: string, id: string, image: File): Observable<any> {
    const formData = new FormData();
    formData.append('imagen', image);
    return this.http.put(`${BASE_URL}uploads/${type}/${id}`, formData).pipe(
      map((resp: any) => resp),
      catchError(e => {
        console.error('ERROR', e.error);
        Swal.fire(e.error.header, e.error.message, 'error');
        return throwError(() => e);
      })
    );
  }

  getUploadedImage(type: string, photo: string): Observable<any> {
    return this.http.get(`${BASE_URL}uploads/${type}/${photo}`, { responseType: 'blob' }).pipe(
      map((resp: any) => resp),
      catchError(e => {
        console.error('ERROR', e.error);
        Swal.fire(e.error.header, e.error.message, 'error');
        return throwError(() => e);
      })
    );
  }
}
