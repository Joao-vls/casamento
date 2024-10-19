import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcessoService } from '../../services/acesso.service';
import { CookiesService } from '../../services/cookies.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent {
  @Output() close = new EventEmitter<boolean>();
  isActive: boolean = true;
  cookieService = inject(CookieService);
  form: FormGroup;
  private router = inject(Router);

  constructor(private fb: FormBuilder, private acesso: AcessoService, private cookie: CookiesService) {
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
      senha:this.form.value.password,
    };

    this.acesso.createUser(novoUsuario).subscribe({
      next: (v) => {
        this.cookie.setCookie(
          'authTokenKey',  // Nome do cookie
          v.token,      // Token a ser armazenado
          2,            // Expiração em horas
          '/',          // Caminho
          true,         // Secure
          'Lax',        // SameSite
          ''            // Domain
        );        
        this.cookie.setCookie(
          'usuario',  
          novoUsuario,      
          2,           
          '/',         
          true,        
          'Lax',        
          ''    
        )
        // Redireciona para a página 'contratante' após o login bem-sucedido
        this.router.navigate(['/contratante']);
      },
      error: (e) => console.error(e),
    });
  }
}
