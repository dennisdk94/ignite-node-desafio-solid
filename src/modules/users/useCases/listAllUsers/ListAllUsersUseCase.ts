import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const users = this.usersRepository.list();

    const userIsAdmin = this.usersRepository.findById(user_id);

    if (userIsAdmin.admin === false) {
      throw new Error("Usuário cadastrado não é administrador!");
    }

    if (!userIsAdmin) {
      throw new Error("Usuário não existe");
    }

    return users;
  }
}

export { ListAllUsersUseCase };
