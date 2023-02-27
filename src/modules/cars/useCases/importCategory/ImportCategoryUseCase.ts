import {parse} from 'csv-parse';
import fs from 'fs';
import { ICategoriesRepository } from '../../repositories/ICategoriesRepository';

interface IIimportCategory {
    name: string;
    description: string;
}


class ImportCategoryUseCase {
    constructor(private categoriesRepository: ICategoriesRepository) {}

    loadCategories(file: Express.Multer.File): Promise<IIimportCategory[]> {
        return new Promise((resolve, reject) => {
            const stream = fs.createReadStream(file.path);
            const categories: IIimportCategory[] = [];
        
            const parseFile = parse();
        
            stream.pipe(parseFile);
        
            parseFile.on("data", (line) => {
                const [name, description] = line;
                categories.push({
                    name,
                    description
                });
            });
        
            parseFile.on("error", (err) => {
                reject(err); // Tratar erro aqui 
            });
            parseFile.on("end", () => {
                resolve(categories);
            });
        });
    }

    async execute(file: Express.Multer.File): Promise<void> {
        const categories = await this.loadCategories(file);

        categories.map(async category => {
            const { name, description } = category
            const categoryAlreadyExists = this.categoriesRepository.findByName(name);
            if (!categoryAlreadyExists) {
                this.categoriesRepository.create({name, description});
            }
        })
    }
}

export { ImportCategoryUseCase };