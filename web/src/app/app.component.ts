import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'web';
  data = 'loading...';
  constructor(private http: HttpClient) {
  }
  getHello() {
    return
  }
  ngOnInit() {
    const $hello = this.http.get<{ data: string }>("/api");
    $hello.subscribe((res) => { this.data = res.data })
  }
}
