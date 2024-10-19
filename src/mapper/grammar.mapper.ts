import {
    CreateGrammarDTO,
    GrammarByIdDTO,
    ListGrammarDTO,
    UpdateGrammarDTO,
} from '../dtos/grammar.dto';
import Grammar from '../models/postgresql/grammar.model';
import { GrammarModel } from '../types/grammar.type';

export class ListGrammarMapper {
    toDTO(listGrammar: Grammar): ListGrammarDTO {
        return {
            id: listGrammar.id,
            name: listGrammar.name,
        };
    }
    toListDTO(listGrammar: Grammar[]): ListGrammarDTO[] {
        return listGrammar.map(this.toDTO);
    }
}

export class GrammarByIdMapper {
    toDTO(grammar: Grammar): GrammarByIdDTO {
        return {
            id: grammar.id,
            name: grammar.name,
            description: grammar.description,
            example: grammar.example,
        };
    }
}

export class CreateGrammarMapper {
    toModel(createGrammarDTO: CreateGrammarDTO): GrammarModel {
        return {
            name: createGrammarDTO.name,
            description: createGrammarDTO.description,
            example: createGrammarDTO.example,
        };
    }
}

export class UpdateGrammarMapper {
    toModel(updateGrammarDTO: UpdateGrammarDTO): Partial<GrammarModel> {
        return {
            name: updateGrammarDTO.name,
            description: updateGrammarDTO.description,
            example: updateGrammarDTO.example,
        };
    }
}
