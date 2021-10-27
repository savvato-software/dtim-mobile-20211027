import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  { path: 'new-user', 
      loadChildren: () => import('./new-user/new-user.module').then( m => m.NewUserPageModule) },
  { path: 'returning-user', 
      loadChildren: () => import('./returning-user/returning-user.module').then( m => m.ReturningUserPageModule) },
  { path: 'admin', 
      loadChildren: () => import('./admin/admin.module').then( m => m.AdminPageModule) },
  { path: 'user-tech-profile/:userId', 
      loadChildren: () => import('./user-tech-profile/user-tech-profile.module').then( m => m.UserTechProfilePageModule) },
  { path: 'line-item-action-page/:userId/:lineItemId/:idx', 
      loadChildren: () => import('./line-item-action-page/line-item-action-page.module').then( m => m.LineItemActionPagePageModule) },
  { path: 'line-item-level-content-page/:userId/:lineItemId/:idx', 
      loadChildren: () => import('./line-item-level-content-page/line-item-level-content-page.module').then( m => m.LineItemLevelContentPagePageModule) },
  { path: 'user-question-detail/:userId/:questionId', 
      loadChildren: () => import('./user-question-detail/user-question-detail.module').then( m => m.UserQuestionDetailPageModule) },
  { path: 'question-list/:lineItemId/:level', 
      loadChildren: () => import('./admin/question-list/question-list.module').then( m => m.QuestionListPageModule) },
  { path: 'question-list', 
      loadChildren: () => import('./admin/question-list/question-list.module').then( m => m.QuestionListPageModule) },
  { path: 'question-display/:questionId',
      loadChildren: () => import('./admin/question-display/question-display.module').then( m => m.QuestionDisplayPageModule) },
  { path: 'question-edit/new', 
      loadChildren: () => import('./admin/question-edit/question-edit.module').then( m => m.QuestionEditPageModule) },
  { path: 'question-edit/:questionId', 
      loadChildren: () => import('./admin/question-edit/question-edit.module').then( m => m.QuestionEditPageModule) },
  { path: 'tech-profile-edit', 
      loadChildren: () => import('./tech-profile-edit/tech-profile-edit.module').then( m => m.TechProfileEditPageModule) },
  { path: 'tech-profile-line-item-edit/:lineItemId', 
      loadChildren: () => import('./tech-profile-line-item-edit/tech-profile-line-item-edit.module').then( m => m.TechProfileLineItemEditPageModule) },
  { path: 'tech-profile-topic-edit/:topicId',
      loadChildren: () => import('./tech-profile-topic-edit/tech-profile-topic-edit.module').then( m => m.TechProfileTopicEditPageModule) },
  { path: 'tech-profile-question',
      loadChildren: () => import('./tech-profile-question/tech-profile-question.module').then( m => m.TechProfileQuestionPageModule) }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
