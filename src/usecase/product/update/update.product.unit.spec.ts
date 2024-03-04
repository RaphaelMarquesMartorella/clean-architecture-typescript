import ProductFactory from "../../../domain/product/ factory/product.factory";
import ProductUpdateUseCase from "./update.product.usecase";

let ProductCreated = ProductFactory.create("a", "Product A", 200)

let input = {
    id: ProductCreated.id,
    name: ProductCreated.name,
    price: ProductCreated.price
}

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(ProductCreated)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

describe("Unit test update product use case", () => {
    it("should update a product use case", async () => {
        const productRepository = MockRepository();
        const productUpdateUseCase = new ProductUpdateUseCase(productRepository);

        const output = await productUpdateUseCase.execute(input);

        expect(output).toEqual(input);
    });
});