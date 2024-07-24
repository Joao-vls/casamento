import { Component, Input } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterLink } from '@angular/router';
import { CookiesServices } from '../../services/cookies.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input()url: string = '';
  paginaAtual!:string;
  

  constructor(private router: Router,private cookie:CookiesServices,private route: ActivatedRoute) { 
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
  sessionCookie(){
      if(this.cookie.getCookie()){
        console.log (Object.keys(this.cookie.getCookie()));
        
        return true;
      }
      return false;
  }
  private updateCurrentPage() {
    this.paginaAtual = this.router.url;
  }
}
