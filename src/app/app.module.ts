import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostTextComponent } from './post-text/post-text.component';
import { GetTextComponent } from './get-text/get-text.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CpDirective } from './cp.directive';
import { PasteDirective } from './paste.directive';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import { PasswordFilterPipe } from './password-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PostTextComponent,
    GetTextComponent,
    CpDirective,
    PasteDirective,
    PasswordFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {

}
