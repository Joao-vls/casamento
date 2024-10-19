import { Component, inject, OnInit } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { BannerComponent } from "../../shared/banner/banner.component";
import { TextTitleComponent } from "../../shared/text-title/text-title.component";
import { SectionComponent } from "../../shared/section/section.component";
import { FooterComponent } from "../../shared/footer/footer.component";
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderComponent, BannerComponent, TextTitleComponent, SectionComponent, FooterComponent]
})
export class HomeComponent implements OnInit{
    item: string[][] = [['Orçamento', 'fornecedores', 'locais'], ['organização','fotografia e filmagem','espaços','roupas do casamento'],['Confirmação de presença',
        'Lista de presentes','convite']];

        constructor (private authService:AuthService,private router:Router){

        }
    ngOnInit(): void {
        if (this.authService.getToken()) {
            this.router.navigate(['/contratante']);
          } 
    }

}
