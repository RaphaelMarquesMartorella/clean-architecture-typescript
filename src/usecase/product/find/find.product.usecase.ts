import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";

export default class ProductFindUseCase {
    private productRepository

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async execute (input: InputFindProductDto): Promise<OutputFindProductDto> {
        const response = await this.productRepository.find(input.id)

        const output = {
            id: response.id,
            name: response.name,
            price: response.price
        }

        return output
    }
}