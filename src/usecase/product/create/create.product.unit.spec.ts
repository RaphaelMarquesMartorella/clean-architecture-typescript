import CreateProductUseCase from "./create.product.usecase";

let input = {
    id: "123",
    name: "Product A",
    price: 100
}

const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };

describe("Unit test create product use case", () => {
    it("should create a product use case", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        const output = {
            id: "123",
            name: "Product A",
            price: 100
        }
        const result = await productCreateUseCase.execute(input);

        expect(result).toEqual(output);
    })

    it("Should return an error if id is not provided", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input = { 
            id: "",
            name: "Product A",
            price: 100
    }


        await expect(() => productCreateUseCase.execute(input)).rejects.toThrow("Id is required")
    })

    it("Should return an error if name is not provided", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input = { 
            id: "abc",
            name: "",
            price: 100
    }

        await expect(() => productCreateUseCase.execute(input)).rejects.toThrow("Name is required")

    })

    it("Should return an error if price is less than zero", async () => {
        const productRepository = MockRepository();
        const productCreateUseCase = new CreateProductUseCase(productRepository);

        input = { 
            id: "abc",
            name: "Product A",
            price: -10
    }

        await expect(() => productCreateUseCase.execute(input)).rejects.toThrow("product: Price greater than 0 is required")
    })

});