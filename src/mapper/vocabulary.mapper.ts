import {
    CreateVocabularyDTO,
    ListVocabularyDTO,
    UpdateVocabularyDTO,
    VocabularyByIdDTO,
} from '../dtos/vocabulary.dto';
import Vocabulary from '../models/postgresql/vocabulary.model';
import { VocabularyModel } from '../types/vocabulary.type';

export class ListVocabularyMapper {
    toDTO(vocabulary: Vocabulary): ListVocabularyDTO {
        return {
            id: vocabulary.id,
            word: vocabulary.word,
            meaning: vocabulary.meaning,
            pronunciation: vocabulary.pronunciation,
            example: vocabulary.example,
            image: vocabulary.image,
        };
    }
    toDTOs(vocabularies: Vocabulary[]): ListVocabularyDTO[] {
        return vocabularies.map((vocabulary) => this.toDTO(vocabulary));
    }
}

export class VocabularyByIdMapper {
    toDTO(vocabulary: Vocabulary): VocabularyByIdDTO {
        return {
            id: vocabulary.id,
            word: vocabulary.word,
            meaning: vocabulary.meaning,
            pronunciation: vocabulary.pronunciation,
            example: vocabulary.example,
            image: vocabulary.image,
        };
    }
}

export class CreateVocabularyMapper {
    toModel(createVocabularyDTO: CreateVocabularyDTO): VocabularyModel {
        return {
            word: createVocabularyDTO.word,
            meaning: createVocabularyDTO.meaning,
            pronunciation: createVocabularyDTO.pronunciation,
            example: createVocabularyDTO.example,
            image: createVocabularyDTO.image,
        };
    }
}

export class UpdateVocabularyMapper {
    toModel(
        updateVocabularyDTO: UpdateVocabularyDTO,
    ): Partial<VocabularyModel> {
        return {
            word: updateVocabularyDTO.word,
            meaning: updateVocabularyDTO.meaning,
            pronunciation: updateVocabularyDTO.pronunciation,
            example: updateVocabularyDTO.example,
            image: updateVocabularyDTO.image,
        };
    }
}
