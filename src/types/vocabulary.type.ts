export interface VocabularyModel {
    id?: number;
    word: string;
    meaning: string;
    pronunciation: string;
    example: string;
}

export interface VocabularySearchTerm {
    word?: string;
    meaning?: string;
}
