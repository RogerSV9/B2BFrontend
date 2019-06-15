import * as io from 'socket.io-client' ;

export class User {
    _id: string;
    name: string;
    surname: string;
    username :string;
    email: string;
    age: string;
    description: string;
    localization: string;
    password: string;
    //picture: string;
    passwordrepeat: string;
    ratings: number[];
    tag: string[];
    socket: SocketIOClient.Socket; 
    


    constructor(_id = '', name = '',surname = '',username = '', email = '',  age = '', description = '', localization = '', password = '', passwordrepeat = '', ratings = [0], tag = ['']) {
        this._id = _id;
        this.name=name;
        this.surname=surname; 
        this.username=username;
        this.email = email;
        this.age=age;
        this.description=description;
        this.localization=localization;
        this.password=password;
        this.passwordrepeat=passwordrepeat;
        this.ratings = ratings;
        this.tag = tag;
        //this.picture=picture;
        
    }
}