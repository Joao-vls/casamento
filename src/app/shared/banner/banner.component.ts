import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  @Input()
  num: number = 0
  ativo: Boolean = true;
  class!: string;
  @Input()
  background: string = "";
  @Input()
  titulo!: string;
  @Input()
  subtitulo!: string;
  @Input()
  heigth: string="35rem";
  constructor() {

  }
}
