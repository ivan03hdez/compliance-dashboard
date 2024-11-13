import { Project, EvaluationResult } from './types';

const HOST = 'galtea-server-1042654876718.us-central1.run.app'; // MAYBE HAVING THIS IN REACT ENV VARIABLE
const GALTEA_SERVER_URL = `https://${HOST}`;
const EVALUATION_RESULTS_ENDPOINT = `${GALTEA_SERVER_URL}/eval-results`;
const PROJECTS_ENDPOINT = `${GALTEA_SERVER_URL}/projects`;

async function fetchData<T>(url: string): Promise<T> {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}

export const getProjects = async (): Promise<Project[]> =>
    await fetchData<Project[]>(PROJECTS_ENDPOINT);

export const getEvaluationResults = async (): Promise<EvaluationResult[]> =>
    await fetchData<EvaluationResult[]>(EVALUATION_RESULTS_ENDPOINT);
