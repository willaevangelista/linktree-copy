import { Component } from '@angular/core';
import { LinksComponent } from "../../components/links/links";

@Component({
  selector: 'app-home',
  imports: [LinksComponent],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  currentYear: number = new Date().getFullYear();
}
