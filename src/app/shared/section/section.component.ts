import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [],
  templateUrl: './section.component.html',
  styleUrl: './section.component.css'
})
export class SectionComponent {
  @Input()
  img: string = ''
  @Input()
  titulo: string = '';
  @Input()
  items: string[] = [];
  @Input()
  buttonInput: string='';

  constructor(
    private router: Router,
  ) { }
  redirecionar(url: string | void) {
    if (url) {
      this.router.navigate(['/' + url]);
    } else {
      this.router.navigate(['/' + 'acesso']);
    }
  }
}
