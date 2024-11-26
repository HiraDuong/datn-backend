import BaseRoutes from "./base/base.routes";
import ProcessController from "../controllers/many-to-many/process.controller";
class ProcessRoute extends BaseRoutes {
  routes(): void {
    this.router.post("/", ProcessController.createProcess.bind(ProcessController));
    this.router.put("/:id", ProcessController.updateProcess.bind(ProcessController));
    this.router.delete("/:id", ProcessController.deleteProcess.bind(ProcessController));
    this.router.get("/:userId/:courseId", ProcessController.getProcessByUserId.bind(ProcessController));
  }
}
export default new ProcessRoute().router