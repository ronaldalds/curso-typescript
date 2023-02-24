import { Specification } from "../../model/Specification";
import { ICreateSpecificationDTO, ISpecificationsRepoitory } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepoitory {
    private specifications: Specification[];
    
    private static INSTANCE: SpecificationsRepository;

    private constructor() {
        this.specifications = [];
    }

    public static getInstance(): SpecificationsRepository {
        if (!SpecificationsRepository.INSTANCE) {
            SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        }
        return SpecificationsRepository.INSTANCE;
    }


    findByName(name: string): Specification {
        return this.specifications.find(s => s.name === name);
    };

    create({ name, description }: ICreateSpecificationDTO): void {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description,
            create_at: new Date(),
        });

        this.specifications.push(specification);
    }

    list(): Specification[] {
        return this.specifications;
    }

}

export { SpecificationsRepository };