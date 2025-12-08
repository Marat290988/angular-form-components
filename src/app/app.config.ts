import {ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {provideHighlightOptions} from 'ngx-highlightjs';

export const appConfig: ApplicationConfig = {
	providers: [
		provideBrowserGlobalErrorListeners(),
		provideZonelessChangeDetection(),
		provideRouter(routes),
		provideHighlightOptions({
			fullLibraryLoader: () => import('highlight.js'),
			lineNumbersLoader: () => import('ngx-highlightjs/line-numbers')
		})
	]
};
