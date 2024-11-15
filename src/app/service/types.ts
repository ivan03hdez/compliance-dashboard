export interface Project {
    conformityProgress: number;
    name: string;
    type: string;
}

export interface EvaluationResult {
    id: number;
    projectName: string;
    systemName: string;
    datasetName: string;
    accuracy: number;
    helpfulness: number;
    relevancy: number;
    score: number;
    toxicity: number;
}