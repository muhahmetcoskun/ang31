import {Role} from "./role.enum";

export class User {
 
  firstname: string = "";
  lastname: string = "";
 
  username: string = "";
  password: string = "";
  email: string = "";
  phonenumber: string = "";
  role: Role = Role.USER;

  accessToken: string = "";
  refreshToken: string = "";
 
}



