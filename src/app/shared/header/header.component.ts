import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { CookiesService } from '../../services/cookies.service';
import { CommonModule } from '@angular/common'; // Import necessário para diretivas comuns como *ngIf, *ngFor

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // Correção: styleUrl -> styleUrls
})
export class HeaderComponent {

  @Input() url: string = '';
  paginaAtual!: string;

  constructor(
    private router: Router,
    private cookiesService: CookiesService, // Consistência no nome do serviço
    private route: ActivatedRoute
  ) { 
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.updateCurrentPage();
      }
    });
  }

  redirecionar(url: string | void) {
    if (url) {
      this.router.navigate(['/' + url]);
    } else {
      if (this.url) {
        this.router.navigate(['/' + this.url]);
      }
    }
  }

  sessionCookie(): boolean {
    return !!this.cookiesService.getCookie('usuario'); // Simplificação da verificação de cookies
  }

  private updateCurrentPage() {
    this.paginaAtual = this.router.url;
  }
}
