import { HttpInterceptorFn } from '@angular/common/http';
import { AuthService } from './services/auth.service';
import { LocalStorageUtil } from './utils/LocalStorageUtil';
import { environment } from '../environments/environment';

export const apiInterceptor: HttpInterceptorFn = (req, next) => {
  const WHITELABEL_APIS = [
    environment.baseApi + AuthService.AUTH_API + AuthService.LOGIN,
    environment.baseApi + AuthService.AUTH_API + AuthService.SIGN_IN
  ];

  if (!WHITELABEL_APIS.includes(req.url)) {
    const modifiedRequest = req.clone({
      setHeaders: {
        'Authorization': `Bearer ${LocalStorageUtil.getStorage().at}`
      }
    });
    return next(modifiedRequest);
  } else {
    return next(req);
  }
};
