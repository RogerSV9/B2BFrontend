export class Event {
    _id: string;
    name: string;
    date: string;
    location: string;
    description: string;

    constructor(_id="", name="", date="", location="", description=""){
        this._id = _id;
        this.name = name;
        this.date = date;
        this.location = location;
        this.description = description;
    }
}
