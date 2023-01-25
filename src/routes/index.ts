import { Router } from "express";
import Controller from "../presentation/controller/Controller";

enum endpoints {
  FUNCIONARIO = "funcionario",
  CARGO = "cargo",
}


const routes = Router();
const controller = new Controller()

for (const endpoint in endpoints) {
  routes.get(`/${endpoint}`, controller.handle);
  routes.post(`/${endpoint}`, controller.handle);
  routes.patch(`/${endpoint}`, controller.handle);
  routes.put(`/${endpoint}`, controller.handle);
  routes.delete(`/${endpoint}`, controller.handle);
}
export { routes };
