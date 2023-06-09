import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { LandingPage } from './pages/landing/landing.page';
import { HomePage } from './pages/home/home.page';
import { ChatPage } from './pages/chat/chat.page';
import { BreathPage } from './pages/breath/breath.page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'landing',
    component: LandingPage,
  },
  {
    path: 'home',
    component: HomePage,
  },
  {
    path: 'chat',
    component: ChatPage,
  },
  {
    path: 'breath',
    component: BreathPage,
  },
  // {
  //   path: '',
  //   loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  // }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
