import {CanActivateFn, Router} from '@angular/router';
import {LocalStorageUtil} from "../utils/LocalStorageUtil";
import {inject} from "@angular/core";

export const authGuard: CanActivateFn = (route,
                                         state) => {
  const router = inject(Router);
  const storage = LocalStorageUtil.getStorage();
  if (storage.at && storage.rt) {
   return true;
  }
  router.navigate(['']);
  return false;


};
