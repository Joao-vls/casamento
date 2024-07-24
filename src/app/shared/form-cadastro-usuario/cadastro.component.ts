
import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcessoService } from '../../services/acesso.service';
import { CookiesServices } from '../../services/cookies.service';
@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  @Output() close = new EventEmitter<boolean>();
  isActive: boolean = true;
  cookieService = inject(CookieService)
  form: FormGroup;


  constructor(private fb: FormBuilder, private acesso: AcessoService ,private cookie:CookiesServices) {
    this.form = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  buttonActive() {
    this.isActive = !this.isActive;
  }
  closeCadastro() {
    this.close.emit();
  }

  onSubmit() {
    const novoUsuario = {
      nome: this.form.value.nome,
      email: this.form.value.email,
      senha: this.form.value.password
    };

    this.acesso.createUser(novoUsuario).subscribe({
      next: (v) => {this.cookie.setCookie(v)
        console.log(v);
        
      },
      error: (e) => console.error(e),
      complete: () => console.info('complete')
    }
    );

  }
}
