import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MainLayoutComponent } from './layouts/main-layout.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MainLayoutComponent],
  template: `
    <app-main-layout>
      <router-outlet></router-outlet>
    </app-main-layout>
  `,
  styleUrl: './app.scss'
})
export class App {
  title = 'AgriFlow - Gestion Agricole';
}
