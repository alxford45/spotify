import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'web';
  data: string = '';
  constructor(private http: HttpClient) {}
  getHello() {
    return;
  }
  ngOnInit() {
    const $auth = this.http.get<unknown>('/api/auth/track');
    $auth.subscribe((res) => {
      this.data = JSON.stringify(res, null, 2);
    });
  }
}
