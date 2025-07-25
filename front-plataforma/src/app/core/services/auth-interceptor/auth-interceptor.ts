import { HttpInterceptorFn } from '@angular/common/http';

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  console.log('🔐 Interceptando:', req.url);

  const excludedUrls = ['/auth/register', '/auth/login'];
  const isExcluded = excludedUrls.some(url => req.url.includes(url));

  if (isExcluded) {
    return next(req); 
  }

  const token = localStorage.getItem('token');
  if (token) {
    let jwt = token;
    try {
      const parsed = JSON.parse(token);
      jwt = parsed.token || token;
    } catch (err) {
      // token já é string simples
    }

    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${jwt}`
      }
    });

    return next(clonedReq); // ✅ Requisição com Bearer Token
  }

  return next(req); // 🔄 Sem token encontrado
};
