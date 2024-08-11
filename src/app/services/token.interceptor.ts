import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService); // Injeta o serviço de autenticação
  const token = authService.getToken(); // Obtém o token do serviço
 

  if (token) {
    // Clona a requisição adicionando o token ao cabeçalho Authorization
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedReq); // Passa a requisição clonada adiante
  }

  return next(req); // Se não houver token, passa a requisição original
};