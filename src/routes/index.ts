import { Router } from "express";

enum endpoints {
  FUNCIONARIO = "funcionario",
  CARGO = "cargo",
}

class Teste {

  handle() { console.log('não implementado') }
}

const routes = Router();
const controller = new Teste()

for (const endpoint in endpoints) {
  routes.get(`/${endpoint}`, controller.handle);
  routes.post(`/${endpoint}`, controller.handle);
  routes.put(`/${endpoint}`, controller.handle);
  routes.delete(`/${endpoint}`, controller.handle);
}
export { routes };
