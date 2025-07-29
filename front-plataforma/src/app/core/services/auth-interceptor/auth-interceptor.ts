import { HttpInterceptorFn } from '@angular/common/http';
import { inject, PLATFORM_ID } from '@angular/core'; 
import { isPlatformBrowser } from '@angular/common'; 

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const platformId = inject(PLATFORM_ID);

  // Ignora requisições que não são HTTP (ex: arquivos locais)
  if (!req.url.startsWith('http')) {
    return next(req);
  }

  console.log('🔐 Interceptando:', req.url);

  const excludedPaths = ['/auth/register', '/auth/login'];
  const isExcluded = excludedPaths.some(path => {
    try {
      const urlObj = new URL(req.url);
      return path === urlObj.pathname;
    } catch (e) {
      return req.url.endsWith(path);
    }
  });

  if (isExcluded) {
    console.log(`🔒 Não interceptando (excluído): ${req.url}`);
    return next(req);
  }

  let token: string | null = null;

  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('token');
  }

  if (token) {
    let jwt = token;

    try {
      const parsed = JSON.parse(token);
      jwt = parsed.token || token; // Se for um objeto com { token: '...' }
    } catch (err) {
      // token já era uma string simples, segue com ele
    }

    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`
      }
    });

    console.log(`✅ Token adicionado para: ${req.url}`);
    return next(clonedReq);
  }

  console.log(`🔄 Sem token encontrado para: ${req.url}`);
  return next(req);
};