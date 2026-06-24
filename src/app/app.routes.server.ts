import { RenderMode, ServerRoute } from '@angular/ssr';


export const serverRoutes: ServerRoute[] = [
  { path: 'gold-calculator', renderMode: RenderMode.Server },
  { path: 'converter', renderMode: RenderMode.Server },
  {
    path: ':group/:title',
    renderMode: RenderMode.Server
  },
  {
    path: '',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  }
];
