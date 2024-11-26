import Process from "../../models/postgresql/many-to-many/process.model";
import ProcessRepository from "../../repositories/many-many/process.repository";
import { ProcessModel } from "../../types/many-many/process.type";

class ProcessService {
    private readonly processRepository: ProcessRepository;
    

    constructor() {
        this.processRepository = new ProcessRepository();
    }

    async createProcess(process: ProcessModel): Promise<Process> {
        return await this.processRepository.create(process);
    }

    async updateProcess(process: Partial<ProcessModel>): Promise<
        Process | null >
    {
        if (!process.id) {
            throw new Error('Process id is required');
        }
        return await this.processRepository.update(process.id, process);
    }
    
    async getCourseProcessByUserId(
        userId: number,
        courseId: number
    ): Promise<Process[]> {
        return await this.processRepository.getCourseProcessByUserId(userId, courseId);
    }

    async deleteProcess(id: number): Promise<void> {
        await this.processRepository.delete(id);
    }
}

export default ProcessService;