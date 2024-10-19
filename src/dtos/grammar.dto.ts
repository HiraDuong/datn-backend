export interface ListGrammarDTO {
    id: number;
    name: string;
}

export interface GrammarByIdDTO {
    id: number;
    name: string;
    description: string;
    example: string;
}

export interface CreateGrammarDTO {
    name: string;
    description: string;
    example: string;
}

export interface UpdateGrammarDTO {
    name?: string;
    description?: string;
    example?: string;
}
