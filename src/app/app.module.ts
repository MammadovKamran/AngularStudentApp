import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentsModule } from './components/components.module';
import { LayoutModule } from './layout/layout.module';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ComponentsModule,
    LayoutModule,
    HttpClientModule,
    MatDialogModule
  ],
  providers: [
    provideClientHydration(),
    {provide: "baseUrl",useValue : "http://localhost:5139/api", multi:true},
    provideAnimationsAsync(),    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
