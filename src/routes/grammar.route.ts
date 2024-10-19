import BaseRoutes from './base/base.routes';
import GrammarController from '../controllers/grammar.controller';

class GrammarRoutes extends BaseRoutes {
    routes(): void {
        this.router.get(
            '/',
            GrammarController.listGrammar.bind(GrammarController),
        );
        this.router.get(
            '/:id',
            GrammarController.getGrammarById.bind(GrammarController),
        );
        this.router.post(
            '/',
            GrammarController.createGrammar.bind(GrammarController),
        );
        this.router.put(
            '/:id',
            GrammarController.updateGrammar.bind(GrammarController),
        );
        this.router.delete(
            '/:id',
            GrammarController.deleteGrammar.bind(GrammarController),
        );
    }
}

export default new GrammarRoutes().router;
