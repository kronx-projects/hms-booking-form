import { NgModule } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Room } from '../interfaces/room';
import { ROOMS } from '../mook/ROOMS';
import { RoomServices } from '../services/roomServices';
import { Request } from '../interfaces/request';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../services/booking.service';



@Component({
  selector: 'app-form-bookooking',
  templateUrl: './form-bookooking.component.html',
  styleUrls: ['./form-bookooking.component.css']
})
export class FormBookookingComponent implements OnInit {
  public bookingForm = new FormGroup({
    "firstName": new FormControl<String>('', Validators.required),
    "lastName": new FormControl<String>('', Validators.required),
    "adults": new FormControl("", Validators.required),
    "type": new FormControl(),
    "dateStart": new FormControl("", Validators.required),
    "dateEnd": new FormControl("", Validators.required),
    "phoneNumber": new FormControl('', [
      Validators.required,
      Validators.pattern(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/),
    ]
    ),
    "children": new FormControl("", []),
    "selectedRoom" : new FormControl(),
    "messanger": new FormControl<String>(""),
    "message": new FormControl()
  });
  rooms: Array<Room> = ROOMS;
  isSend: Boolean = false;
  selectedRoom: any = { id: 0, image: "", area: 0, name: "", name2:"", countPerson: 0 };
  onChangeRoom() {

    this.selectedRoom = this.bookingForm.get("selectedRoom")?.value;
    if (this.selectedRoom != null) {
      this.roomSerivces.changeRoom(this.selectedRoom);
    }
    
  }
  constructor(
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    private readonly roomSerivces: RoomServices
  ) {

  }

  ngOnInit(): void {
    this.rooms = ROOMS;
    let room = this.getRoomByHref()
    if (room != undefined ) {
      this.selectedRoom = room
      this.roomSerivces.changeRoom(this.selectedRoom);
      this.bookingForm.controls.selectedRoom.setValue(this.selectedRoom);
    }

  }

  getRoomByHref(): Room | undefined {
    var url = window.location.href
    var val = Number(url.split('=').pop()) 
    let room : Room | undefined = this.rooms.find(x => x.id === val)
    return room

  }
  get m() {
    return this.bookingForm.controls;
  }
  onSubmit(): void {

    let obj = this.bookingForm.getRawValue()
    let requestToSend = {
      "date-start" : obj.dateStart,
      "date-end" : obj.dateEnd,
      "type": obj.selectedRoom.name2,
      "adults" : Number(obj.adults),
      "children" : Number(obj.children),
      "first-name" : obj.firstName,
      "last-name": obj.lastName,
      "phone-number": obj.phoneNumber,
      "messenger": obj.messanger,
      "comment":  obj.message
    }
    this.bookingService.createRequest(requestToSend).subscribe( val => {
      this.isSend = true;
      this.bookingForm.reset();
     })
  }

}
