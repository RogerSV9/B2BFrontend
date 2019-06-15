import { Injectable } from '@angular/core';

import {Observable, Subject} from 'rxjs/Rx';
import { TouchSequence } from 'selenium-webdriver';
import * as io from 'socket.io-client' ;




@Injectable({
  providedIn: 'root'
})
export class ChatService {
      socket: SocketIOClient.Socket;
      userdest: String;


}
