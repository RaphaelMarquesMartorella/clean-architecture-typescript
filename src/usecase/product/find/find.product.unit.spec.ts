import ProductFindUseCase from "./find.product.usecase";

const input = {
    id: "abc",
}


const product = {
    id: "abc",
    name: "Product",
    price: 200
}

const MockRepository = () => {
    return {
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

describe("Test Product use case", () => {

    it("should find a product", async () => {
        const ProductRepository = MockRepository();
        const productFindUseCase = new ProductFindUseCase(ProductRepository);
    
        const result = await productFindUseCase.execute(input)
    
        const output = product
    
        expect(result).toEqual(output)
    })

    it("should not find a product", async () => {
        const productRepository = MockRepository();
        productRepository.find.mockImplementation(() => {
            throw new Error("Product not found");
          });
        const productFindUseCase = new ProductFindUseCase(productRepository);
    
        expect(() => {
            return productFindUseCase.execute(input);
          }).rejects.toThrow("Product not found");
    })

})
  