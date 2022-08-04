import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { FormBookookingComponent } from './form-bookooking/form-bookooking.component';
import { HeaderComponent } from './header/header.component';
import { HostelInfoComponent } from './hostel-info/hostel-info.component';
import { SelectedRoomComponent } from './selected-room/selected-room.component';
import { RoomServices } from './services/roomServices';
import { LeftColumnComponent } from './left-column/left-column.component';


@NgModule({
  declarations: [
    AppComponent,
    FormBookookingComponent,
    HeaderComponent,
    HostelInfoComponent,
    SelectedRoomComponent,
    LeftColumnComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [ RoomServices  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
