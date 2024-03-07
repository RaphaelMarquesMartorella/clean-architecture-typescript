import { Sequelize } from "sequelize-typescript";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ListProductUseCase from "./list.product.usecase";

const input = {}

const product1 = {
    id: "abcd",
    name: "Product",
    price: 200
}

const product2 = {
    id: "abc",
    name: "Product2",
    price: 400
}

describe("Int test product list use case", () => {

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
        const listProductUseCase = new ListProductUseCase(productRepository);
        
        const productEntity1 = new Product(product1.id, product1.name, product1.price)
        const productEntity2 = new Product(product2.id, product2.name, product2.price)

        await productRepository.create(productEntity1)
        await productRepository.create(productEntity2)

        const output = await listProductUseCase.execute({})
    
        expect(output.products.length).toBe(2);
        expect(output.products[0].id).toBe(product1.id);
        expect(output.products[0].name).toBe(product1.name);
        expect(output.products[0].price).toBe(product1.price);
        expect(output.products[1].id).toBe(product2.id);
        expect(output.products[1].name).toBe(product2.name);
        expect(output.products[1].price).toBe(product2.price);
    })

})
  