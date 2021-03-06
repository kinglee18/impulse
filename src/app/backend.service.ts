import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  saveToken(token: string){
    localStorage.setItem('token', JSON.stringify({token}));
  }

  getToken(){
    const token = localStorage.getItem('token');
    return token ? JSON.parse(token).token : null;
  }

  login(data) {
    return this.http.post(`${environment.url}/auth`, data);
  }

  sendContent(data) {
    return this.http.post('/data', data);
  }
  predict(data: any) {
    return this.http.post(`${environment.url}/analysis`, {user: 1 ,...data});
  }
  compare(form) {

    const webs = form.competitors.map(url => {
      return {
        url: url,
        type: 'competitor',
        text: false
      }
    });
    const data = {
      user: 1,
      keyword: form.keyword,
      webs: [
        { url: form.url, text: false, type: 'own' },
        ...webs
      ]
    }
    return this.http.post(`${environment.url}/process`, data);
  }
}
