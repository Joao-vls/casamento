import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination,Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CommonModule } from '@angular/common';
import { LocaisService } from '../../services/locais.service';
import { Locais } from '../../models/locais';


@Component({
  selector: 'app-carrosel',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './carrosel.component.html',
  styleUrls: ['./carrosel.component.css'] 
})
export class CarroselComponent implements AfterViewInit, OnChanges{
  @Input() id!:number;

  images: string[] = [
   
  ];
  constructor(private localService: LocaisService) {}

  ngOnChanges(){
    this.localService.getImagensLocal(this.id).subscribe({
      next: (response: Locais) => {
          this.images=response.imageUrls;            
      },
      error: (err) => {
          console.error('Erro ao carregar o local:', err);
      },
  });
  }

  ngOnInit() {
      this.localService.getImagensLocal(this.id).subscribe({
          next: (response: Locais) => {
              this.images=response.imageUrls;  
          },
          error: (err) => {
              console.error('Erro ao carregar o local:', err);
          },
      });
  }

  ngAfterViewInit() {
    new Swiper('.swiper', {
      modules: [Navigation, Pagination, Scrollbar],
      slidesPerView: 3,
      spaceBetween: 3,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
    });
  }
}
