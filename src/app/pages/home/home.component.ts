import { Component } from '@angular/core';
import { HeaderComponent } from "../../shared/header/header.component";
import { BannerComponent } from "../../shared/banner/banner.component";
import { TextTitleComponent } from "../../shared/text-title/text-title.component";
import { SectionComponent } from "../../shared/section/section.component";
import { FooterComponent } from "../../shared/footer/footer.component";

@Component({
    selector: 'app-home',
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
    imports: [HeaderComponent, BannerComponent, TextTitleComponent, SectionComponent, FooterComponent]
})
export class HomeComponent {
    item: string[][] = [['Orçamento', 'fornecedores', 'locais'], ['organização','fotografia e filmagem','espaços','roupas do casamento'],['Confirmação de presença',
        'Lista de presentes','convite']];

}
