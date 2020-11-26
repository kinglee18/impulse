import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient) { }

  login(data) {
    return this.http.post('/login', data);
  }

  sendContent(data) {
    return this.http.post('/data', data);
  }
  predict(data: any) {
    return this.http.post(`${environment.url}/analysis`, data);
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
      keyword: form.keyword,
      webs: [
        { url: form.url, text: false, type: 'own' },
        ...webs
      ]
    }
    return this.http.post(`${environment.url}/process`, data);
  }
}
