import { User } from "../../models";
import { UserDTO } from "../../types";

export class UserService {
  private user: UserDTO;

  constructor(private userDto: UserDTO) {
    this.user = userDto;
  }

  public async login() {
    // return User.findOne();
  }

  public async register(): Promise<User> {
    const newUser = await User.create<User>(this.user);
    console.log(newUser);
    return newUser;
  }
}
