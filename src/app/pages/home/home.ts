import { Component } from '@angular/core';
import { Links } from "../../components/links/links";

@Component({
  selector: 'app-home',
  imports: [Links],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
