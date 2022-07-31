import { Component, OnInit, Input } from '@angular/core';
import { Room } from '../interfaces/room';
import { RoomServices } from '../services/roomServices';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hostel-info',
  templateUrl: './hostel-info.component.html',
  styleUrls: ['./hostel-info.component.css']
})
export class HostelInfoComponent implements OnInit {
  private subs: Subscription = new Subscription;

  selectedRoom: Room = {id:0, name:"", name2:""};
  constructor(
    private readonly roomSerivces: RoomServices
  ) { }

  private setRoom(room: Room) {
    this.selectedRoom = room;
  }

  ngOnInit(): void {
    this.subs = this.roomSerivces.room$.subscribe((room: Room) => this.setRoom(room));
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
