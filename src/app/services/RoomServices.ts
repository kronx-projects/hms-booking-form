import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Room } from '../interfaces/room';

@Injectable()
export class RoomServices {
    public room$ = new Subject<Room>();

		public changeRoom(room: Room) {
   		this.room$.next(room); 
  	}
}