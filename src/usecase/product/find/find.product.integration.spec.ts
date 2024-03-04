import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductFindUseCase from "./find.product.usecase";

const input = {
    id: "abc",
}

const product = {
    id: "abc",
    name: "Product",
    price: 200
}

describe("Test Product use case", () => {

    let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });


    it("should find a product", async () => {
        const productRepository = new ProductRepository();
        const productFindUseCase = new ProductFindUseCase(productRepository);
        
        const productEntity = new Product(product.id, product.name, product.price)
        await productRepository.create(productEntity)

        const result = await productFindUseCase.execute(input)
    
        const output = product
    
        expect(result).toEqual(output)
    })

})
  