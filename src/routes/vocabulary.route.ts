import BaseRoutes from './base/base.routes';
import VocabularyController from '../controllers/vocabulary.controller';

class VocabularyRoutes extends BaseRoutes {
    routes(): void {
        this.router.get(
            '/',
            VocabularyController.listVocabulary.bind(VocabularyController),
        );
        this.router.get(
            '/:id',
            VocabularyController.getVocabularyById.bind(VocabularyController),
        );
        this.router.post(
            '/',
            VocabularyController.createVocabulary.bind(VocabularyController),
        );
        this.router.put(
            '/:id',
            VocabularyController.updateVocabulary.bind(VocabularyController),
        );
        this.router.delete(
            '/:id',
            VocabularyController.deleteVocabulary.bind(VocabularyController),
        );
    }
}

export default new VocabularyRoutes().router;
