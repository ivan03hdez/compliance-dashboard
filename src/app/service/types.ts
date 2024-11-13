export interface Project {
    conformityProgress: number;
    name: string;
    type: string;
}

export interface EvaluationResult {
    id: number;
    accuracy: number;
    datasetName: string;
    helpfulness: number;
    projectName: string;
    relevancy: number;
    score: number;
    systemName: string;
    toxicity: number;
}