import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHighlightOptions} from 'ngx-highlightjs';
import {providePrimeNG} from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideRouter(routes),
		provideHighlightOptions({
			fullLibraryLoader: () => import('highlight.js'),
			lineNumbersLoader: () => import('ngx-highlightjs/line-numbers')
		}),
		providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '',
        },
      },
    }),
	]
};
