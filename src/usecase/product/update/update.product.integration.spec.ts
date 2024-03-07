import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ProductUpdateUseCase from "./update.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Int test product update use case", () => {
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

    const input = {
        id: "123",
        name: "Product 1",
        price: 100
    };
    
    const product = {
        id: "123",
        name: "Product A",
        price: 200
    }

    it("should create a product", async () => {
        const productRepository = new ProductRepository()
        const usecase = new ProductUpdateUseCase(productRepository);
        
        const productEntity = new Product(product.id, product.name, product.price)
        await productRepository.create(productEntity)

        const output = await usecase.execute(input);

        expect(output).toEqual(input);
      });
    });