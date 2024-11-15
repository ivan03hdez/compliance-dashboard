import { Project, EvaluationResult } from './types';
import { fetchData } from "@/app/service/utils";

const HOST = 'galtea-server-1042654876718.us-central1.run.app'; // MAYBE HAVING THIS IN REACT ENV VARIABLE
const GALTEA_SERVER_URL = `https://${HOST}`;
const EVALUATION_RESULTS_ENDPOINT = `${GALTEA_SERVER_URL}/eval-results`;
const PROJECTS_ENDPOINT = `${GALTEA_SERVER_URL}/projects`;

export const getProjects = async (): Promise<Project[]> =>
    await fetchData<Project[]>(PROJECTS_ENDPOINT);

export const getEvaluationResults = async (): Promise<EvaluationResult[]> =>
    await fetchData<EvaluationResult[]>(EVALUATION_RESULTS_ENDPOINT);

export const getAverageScore = (evaluationResult: EvaluationResult) => {
    const scores = [
        evaluationResult.accuracy,
        evaluationResult.helpfulness,
        evaluationResult.relevancy,
        evaluationResult.score,
        evaluationResult.toxicity
    ];
    const sum = scores.reduce((acc, score) => acc + score, 0);
    return sum * 100 / scores.length;
}