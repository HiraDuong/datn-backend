export interface ListGrammarDTO {
    id: number;
    name: string;
}

export interface GrammarByIdDTO {
    id: number;
    name: string;
    rule: string;
    example: string;
}

export interface CreateGrammarDTO {
    name: string;
    rule: string;
    example: string;
}

export interface UpdateGrammarDTO {
    name?: string;
    rule?: string;
    example?: string;
}
