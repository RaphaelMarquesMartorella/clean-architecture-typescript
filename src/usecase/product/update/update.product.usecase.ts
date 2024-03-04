import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";

export default class ProductUpdateUseCase {
    private productRepository: ProductRepositoryInterface

    constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository
    }

    async execute (input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
        const product = await this.productRepository.find(input.id)

        product.changeName(input.name)
        product.changePrice(input.price)
        
        this.productRepository.update(product)

        const output = {
            id: product.id,
            name: product.name,
            price: product.price,
        }
        return output
    }
}