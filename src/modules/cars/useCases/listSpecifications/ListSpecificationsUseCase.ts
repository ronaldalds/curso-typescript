import { Specification } from "../../model/Specification";
import { ISpecificationsRepoitory } from "../../repositories/ISpecificationsRepository";

class ListSpecificationsUseCase {
    constructor(private specificationsRepository: ISpecificationsRepoitory) {}
    execute(): Specification[] {
        const all = this.specificationsRepository.list();
        return all;
    }
}

export { ListSpecificationsUseCase }