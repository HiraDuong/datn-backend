export interface ListVocabularyDTO {
    id: number;
    word: string;
    meaning: string;
    pronunciation: string;
    example: string;
    image: string;
}

export interface VocabularyByIdDTO {
    id: number;
    word: string;
    meaning: string;
    pronunciation: string;
    example: string;
    image: string;
}

export interface CreateVocabularyDTO {
    word: string;
    meaning: string;
    pronunciation: string;
    example: string;
    image: string;
}

export interface UpdateVocabularyDTO {
    word?: string;
    meaning?: string;
    pronunciation?: string;
    example?: string;
    image?: string;
}
