import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { IntroComponent } from './intro/intro.component';
import { CombineLatestComponent } from './combine-latest/combine-latest.component';
import { ExchangeDataService } from './services/exchange-data.service';
import { HttpClientModule } from '@angular/common/http';
import { SourcesComponent } from './sources/sources.component';
import { SubjectComponent } from './subject/subject.component';
import { ObservableComponent } from './observable/observable.component';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HighlightJsModule } from 'angular2-highlight-js';
import { ObserverComponent } from './observer/observer.component';


const appRoutes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'observable', component: ObservableComponent },
  { path: 'observer', component: ObserverComponent },
  { path: 'subject', component: SubjectComponent },
  { path: 'combinelatest', component: CombineLatestComponent },
  { path: 'sources', component: SourcesComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [
    AppComponent,
    IntroComponent,
    CombineLatestComponent,
    SourcesComponent,
    SubjectComponent,
    ObservableComponent,
    ObserverComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    HighlightJsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    ExchangeDataService,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
