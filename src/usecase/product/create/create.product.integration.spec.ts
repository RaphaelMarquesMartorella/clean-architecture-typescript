import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";
import Product from "../../../domain/product/entity/product";

describe("Int test product create use case", () => {
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

    it("should create a product", async () => {
        const productRepository = new ProductRepository()
        const usecase = new CreateProductUseCase(productRepository);
        
        const output = {
            id: "123",
            name: "Product 1",
            price: 100
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(output);
      });
    });