import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-text-title',
  standalone: true,
  imports: [],
  templateUrl: './text-title.component.html',
  styleUrl: './text-title.component.css'
})
export class TextTitleComponent {
  @Input()
  texto:string='';
  @Input()
  titulo:string='';
}
