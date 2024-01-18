import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  @Input()
  url: string = '';

  constructor(private router: Router) { }

  redirecionar(url: string | void) {
    if (url) {
      this.router.navigate(['/' + url]);
    } else {
      this.router.navigate(['/' + this.url]);
    }
  }
}
