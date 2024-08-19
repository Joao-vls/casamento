import { Component, AfterViewInit } from '@angular/core';
import Swiper from 'swiper';
import { Navigation, Pagination,Scrollbar } from 'swiper/modules';

// import Swiper and modules styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { CommonModule } from '@angular/common';
// Importa os estilos de barra de rolagem

@Component({
  selector: 'app-carrosel',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './carrosel.component.html',
  styleUrls: ['./carrosel.component.css'] // Corrigido de styleUrl para styleUrls
})
export class CarroselComponent implements AfterViewInit {

  images: string[] = [
    'assets/img/ban.jpg',
    'assets/img/ban2.jpg',
    'assets/img/ban.jpg',
    'assets/img/ban.jpg',
    'assets/img/ban.jpg',
    'assets/img/ban.jpg'
  ];

  ngAfterViewInit() {
    // Inicializa o Swiper após a visualização do componente
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
