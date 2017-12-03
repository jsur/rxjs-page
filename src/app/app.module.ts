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
import { StreamComponent } from './stream/stream.component';
import { SubjectComponent } from './subject/subject.component';
import { ObservableComponent } from './observable/observable.component';

const appRoutes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'observable', component: ObservableComponent },
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
    StreamComponent,
    SubjectComponent,
    ObservableComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule
  ],
  providers: [
    ExchangeDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
