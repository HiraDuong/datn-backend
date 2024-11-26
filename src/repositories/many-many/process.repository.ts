import Process from "../../models/postgresql/many-to-many/process.model";
import { ProcessModel } from "../../types/many-many/process.type";

interface IProcessRepository {
    create(process: ProcessModel): Promise<Process>;
    getAll(
        limit: number,
        offset: number,
    ): Promise<Process[]>;
    getById(id: number): Promise<Process | null>;
    update(id: number, process: Process): Promise<Process | null>;
    delete(id: number): Promise<boolean>;
    getCourseProcessByUserId(userId: number, courseId : number): Promise<Process[]>
}

class ProcessRepository implements IProcessRepository {
    async create(process: ProcessModel): Promise<Process> {
        try {
            return await Process.create({
                courseId: process.courseId,
                lessonId: process.lessonId ,
                userId: process.userId,
            });
        } catch (error) {
            throw new Error(error + 'Failed to create process');
        }
    }

    async getAll(limit: number, offset: number): Promise<Process[]> {
        try {
            return await Process.findAll({ limit, offset });
        } catch (error) {
            throw new Error(error + 'Failed to get processes');
        }
    }
    async getById(id: number): Promise<Process | null> {
        try {
            return await Process.findByPk(id);
        } catch (error) {
            throw new Error(error + 'Failed to get process by id');
        }
    }
    async update(id: number, process: Partial<Process>): Promise<Process | null> {
        try {
          const result = await Process.findByPk(id);
            if (result) {
                return await result.update(process);
            } else {
                throw new Error('Process not found');
            }
        } catch (error) {
            throw new Error(error + 'Failed to update process by id');
        }
    }
    async delete(id: number): Promise<boolean> {
        try {
            const deletedProcess = await Process.destroy({ where: { id } });
            return !!deletedProcess;
        } catch (error) {
            throw new Error(error + 'Failed to delete process by id');
        }
    }
    
    async getCourseProcessByUserId(userId: number, courseId : number): Promise<Process[]> {
        try {
            return await Process.findAll({ where: { userId, courseId } });
        } catch (error) {
            throw new Error(error + 'Failed to get process by userId and courseId');
        }
    }
}

export default ProcessRepository;