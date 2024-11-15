"use client"

import ProjectsTable from "@/app/components/ProjectsTable";
import { useProjectsWithEvaluationResults } from "@/app/contextProvider";
import DashboardHeader, { DashboardMetric } from "@/app/components/DashboardHeader";
import { EvaluationResult, Project } from "@/app/service/types";
import EvaluationResults from "@/app/components/EvaluationResultsVerticalTable";
import { useRouter } from "next/navigation";

const TOXICITY_THRESHOLD = 0.2;

const getAverageOf = (array: EvaluationResult[] | Project[], prop: string) =>
    // @ts-expect-error TS7053
    Math.round(array.reduce((acc, ev) => acc + ev[prop], 0) * 100 / array.length);


const calculateProjectMetrics = (projects: Project[]): DashboardMetric[] => [
    {
        id: '1',
        name: 'Active Projects',
        value: projects.length,
    },
    {
        id: '2',
        name: 'Conformity Progress',
        value: getAverageOf(projects, 'conformityProgress'),
    },
];

const calculateEvaluationResultsMetrics = (results: EvaluationResult[]): DashboardMetric[] => [
    {
        id: '1',
        name: 'Evaluations performed',
        value: results.length,
    },
    {
        id: '2',
        name: 'Low Toxicity Projects',
        value: results.filter(r => r.toxicity < TOXICITY_THRESHOLD).length,
    },
    {
        id: '',
        name: 'Average Score',
        value: getAverageOf(results, 'score'),
    },
    {
        id: '4',
        name: 'Average Relevancy',
        value: getAverageOf(results, 'relevancy'),
    },
    {
        id: '5',
        name: 'Average helpfulness',
        value: getAverageOf(results, 'helpfulness'),
    },
    {
        id: '6',
        name: 'Average Accuracy',
        value: getAverageOf(results, 'accuracy'),
    },

];

export default function Home() {
    const router = useRouter();
    const { projects, evaluationResults } = useProjectsWithEvaluationResults()
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col gap-8">

                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Project Evaluation Dashboard</h1>
                            <p className="text-gray-600 mt-1">Monitor project performance and ensure AI market regulations compliance</p>
                        </div>
                        <div className="flex space-x-4">
                            <button
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm">
                                Export Report
                            </button>
                        </div>
                    </div>

                    <div className="flex items-center space-around">
                        <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Projects</h2>
                            <a className="mt-8 ml-20 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-sm cursor-pointer"
                                onClick={() => router.push('/projects')}
                            >
                                View all
                            </a>
                    </div>
                    <DashboardHeader metrics={calculateProjectMetrics(projects)}/>

                    <h2 className="text-2xl font-bold text-gray-900 mt-12 mb-4">Evaluation Results</h2>
                    <DashboardHeader metrics={calculateEvaluationResultsMetrics(evaluationResults)}/>

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:flex-1">
                            <ProjectsTable projects={projects} evaluationResults={evaluationResults}/>
                        </div>
                        <div className="lg:col-span-1 h-96 overflow-y-auto">
                            <div className="h-full">
                                <EvaluationResults results={evaluationResults}/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
