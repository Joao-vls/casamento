import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verifica se o token está presente e, portanto, se o usuário está autenticado
  if (authService.getToken()) {
    return true; // Permite a navegação se o usuário estiver autenticado
  } else {
    router.navigate(['/acesso']); // Redireciona para a página de login se não autenticado
    return false; // Bloqueia a navegação
  }
};
