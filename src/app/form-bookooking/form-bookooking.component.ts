import { NgModule } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { Room } from '../interfaces/room';
import { ROOMS } from '../mook/ROOMS';
import { RoomServices } from '../services/roomServices';
import { Request } from '../interfaces/request';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BookingService } from '../booking.service';



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
    "children": new FormControl(0, []),
    "selectedRoom" : new FormControl(),
    "messanger": new FormControl<String>("")
  });
  rooms: Array<Room> = ROOMS;

  selectedRoom: any = { id: 0, image: "", area: 0, name: "", name2:"", countPerson: 0 };
  onChangeRoom() {

    this.selectedRoom = this.bookingForm.get("selectedRoom")?.value;
    this.roomSerivces.changeRoom(this.selectedRoom);
  }
  constructor(
    private bookingService: BookingService,
    private formBuilder: FormBuilder,
    private readonly roomSerivces: RoomServices
  ) {

  }

  ngOnInit(): void {
    this.rooms = ROOMS;
  }
  get m() {
    return this.bookingForm.controls;
  }
  onSubmit(): void {

    let obj = this.bookingForm.getRawValue();
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
      "comment": "test"
    }
    this.bookingService.createRequest(requestToSend).subscribe( val => {
      console.log(val)
     })
  }

}
