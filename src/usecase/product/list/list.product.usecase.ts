import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import { InputListProductDto, OutputListProductDto } from "./list.product.dto";

export default class ListProductUseCase {
    private productRepository: ProductRepository

    constructor(productRepository: ProductRepository) {
        this.productRepository = productRepository
    }

    async execute(input: InputListProductDto): Promise<OutputListProductDto> {
        const response = await this.productRepository.findAll();
        const output = OutputMapper.toOutput(response)
        return output
    }

}

class OutputMapper {
    public static toOutput(products: Product[]): OutputListProductDto {
        return {
            products: products.map((product) => ({
                id: product.id,
                name: product.name,
                price: product.price
            }))
        }
    }
}