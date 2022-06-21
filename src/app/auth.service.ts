import { Injectable } from "@angular/core";
import { User } from "./user";

@Injectable({
    providedIn:'root'
})

export class AuthService{
    Users: any;
    constructor(){}

    authUser(user: any){
        let UserArray = [];
        if (localStorage.getItem('Users')){
            UserArray = JSON.parse (localStorage.getItem('Users')!);
            
        }
        return UserArray.find((p: { name: any; password: any; }) => p.name === user.name && p.password === user.password);
    }
}