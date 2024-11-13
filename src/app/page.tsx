"use client"

import ProjectsTable from "@/app/components/ProjectsTable";
import { useProjectsWithEvaluationResults } from "@/app/contextProvider";
import DashboardHeader, { DashboardMetric } from "@/app/components/DashboardHeader";
import { EvaluationResult, Project } from "@/app/service/types";

const TOXICITY_THRESHOLD = 0.2;

const calculateMetrics = (projects: Project[], results: EvaluationResult[]): DashboardMetric[] => [
    {
        id: '1',
        name: 'Average Conformity',
        value: Math.round(projects.reduce((acc, p) => acc + p.conformityProgress*100, 0) / projects.length),
        change: 2.5,
        status: 'success',
    },
    {
        id: '2',
        name: 'Active Projects',
        value: projects.length,
        change: 1,
        status: 'success',
    },
    {
        id: '3',
        name: 'Average Score',
        value: Math.round(results.reduce((acc, r) => acc + r.score*100, 0) / results.length),
        change: 3.2,
        status: 'success',
    },
    {
        id: '4',
        name: 'Low Toxicity Projects',
        value: results.filter(r => r.toxicity < TOXICITY_THRESHOLD).length,
        change: 0,
        status: 'success',
    },
    {
        id: '5',
        name: 'Relevancy',
        value: results.filter(r => r.relevancy < TOXICITY_THRESHOLD).length,
        change: 0,
        status: 'success',
    },
    {
        id: '6',
        name: 'Accuracy',
        value: results.filter(r => r.accuracy < TOXICITY_THRESHOLD).length,
        change: 0,
        status: 'success',
    },
];

export default function Home() {
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

                    <DashboardHeader metrics={calculateMetrics(projects, evaluationResults)}/>

                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="lg:flex-1">
                            <ProjectsTable projects={projects}/>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
