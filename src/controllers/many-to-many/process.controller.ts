import ProcessService from "../../services/many-to-many/process.service";
import { Request, Response } from 'express';

class ProcessController {
    private readonly processService: ProcessService;
    
    constructor() {
        this.processService = new ProcessService();
    }



    async createProcess(req: Request, res: Response) {
        const process = req.body;
        const newProcess = await this.processService.createProcess(process);
        return res.status(201).json(newProcess);
    }
    async updateProcess(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        const process = req.body;
        const updatedProcess = await this.processService.updateProcess( process);
        return res.status(200).json(updatedProcess);
    }
    async deleteProcess(req: Request, res: Response) {
        const id = parseInt(req.params.id);
        await this.processService.deleteProcess(id);
        return res.status(204).json();
    }

    async getProcessByUserId(req: Request, res: Response) {
        const { userId, courseId } = req.params;
        const processList = await this.processService.getCourseProcessByUserId(parseInt(userId),parseInt(courseId));
        return res.status(200).json(processList);
    }
}

export default new ProcessController();