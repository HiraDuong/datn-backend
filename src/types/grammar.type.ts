export interface GrammarModel {
    id?: number;
    name: string;
    rule: string;
    example: string;
}

export interface GrammarSearchTerm {
    name?: string;
}
