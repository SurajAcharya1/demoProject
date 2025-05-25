import {APP_INITIALIZER, ApplicationConfig} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import {NbIconLibraries, NbLayoutModule, NbMenuModule, NbSidebarModule, NbThemeModule} from "@nebular/theme";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptors} from '@angular/common/http';
import {apiInterceptor} from "./ApiInterceptor";
import {TitleCasePipe} from "@angular/common";
import {BrowserAnimationsModule, provideAnimations} from "@angular/platform-browser/animations";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { importProvidersFrom } from '@angular/core';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {provideNativeDateAdapter} from "@angular/material/core";


export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    ...(NbThemeModule.forRoot().providers ?? []),
    ...(NbSidebarModule.forRoot().providers ?? []),
    ...(NbMenuModule.forRoot().providers ?? []),
    provideHttpClient(withInterceptors([apiInterceptor])),
    NbLayoutModule,
    TitleCasePipe,
    provideAnimations(),
    importProvidersFrom(MatProgressSpinnerModule),
    provideNativeDateAdapter()
  ]
};
