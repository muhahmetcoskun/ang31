import {Role} from "./role.enum";

export class Userregister {
  firstname: string = "";
  lastname: string = "";
 
  username: string = "";
  password: string = "";
  email: string = "";
  phonenumber: string = "";
  role: Role = Role.USER;
 
}
