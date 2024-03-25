import { HttpClient, HttpHeaders, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from "src/environments/environment";

@Injectable({providedIn: "root"})

export class GamerService {
    constructor(private http: HttpClient) {
        
    }
    createGamer(email: string, username: string, password: string): Observable<any> {
        const gamer =  {email, username, password};
        return this.http.post('http://3.120.153.148:8080/Gamer/add', gamer, { responseType: 'text' }).pipe(
            map(response => {
                console.log('Response:', response);
                return response
            }),
            catchError(error => {
                console.error('Error:', error);
                return error;
            })
        );

    }

    readGamerByCredentials(username_email: string, password: string): Observable<any> {
        return this.http.get('http://3.120.153.148:8080/Gamer/getByCredentials?username_email=' + username_email + '&password=' + password, { responseType: 'text' }).pipe(
            map(response => {
                console.log('Response:', response);
                return response
            }),
            catchError(error => {
                console.error('Error:', error);
                return error;
            })
        );
    }

    updateUsername() {

    }

    updatePassword() {

    }

    updateLeagueId() {

    }

    deleteGamer() {

    }

    forgot_password(email: string): Observable<any> {
        return this.http.put('http://3.120.153.148:8080/Gamer/extras/forgot_password?email=' + email, null, { responseType: 'text' }).pipe(
            map(response => {
                console.log('Response:', response);
                return response
            }),
            catchError(error => {
                console.error('Error:', error);
                return error;
            })
        );
    }

}