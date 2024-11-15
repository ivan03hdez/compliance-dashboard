'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    RadialLinearScale
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ArrowLeft } from 'lucide-react';
import type { Project, EvaluationResult } from '@/app/service/types';
import { useRouter } from "next/navigation";
import { colors } from "@/app/components/utils";

ChartJS?.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    RadialLinearScale,
    Title,
    Tooltip,
    Legend
);

const evaluationResultsBarData = (evResults: EvaluationResult[]) => {
    return {
        labels: [ 'Score', 'Accuracy', 'Helpfulness', 'Relevancy', 'Toxicity' ],
        legend: 'score comparison between systems and datasets',
        datasets: evResults.map((ev, idx) => ({
                label: `${ev.systemName}+${ev.datasetName}`,
                data: [ ev.score*100, ev.accuracy*100, ev.helpfulness*100, ev.relevancy*100, ev.toxicity*100 ],
                backgroundColor: colors[idx].backgroundColor,
                borderColor: colors[idx].borderColor,
                borderWidth: 1,
            })),
    }
};

interface ProjectViewProps {
    project: Project;
    evaluations: EvaluationResult[];
}

export default function ProjectView({ project, evaluations }: ProjectViewProps) {
    const router = useRouter();
    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8" onClick={() => router.back()}>
                    <ArrowLeft className="w-4 h-4 mr-1 cursor-pointer" />
                    <span className="text-sm text-gray-600 cursor-pointer">Back to Dashboard</span>
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{project.name}</h1>
                                <p className="text-gray-600 mt-1">{project.type}</p>
                        </div>
                    </div>
                </div>

            <div className="bg-white p-6 rounded-xl shadow-sm">
                <h2 className="text-lg font-semibold mb-4">Evaluations Metrics</h2>
                <div className="h-[300px]">
                    <Bar data={evaluationResultsBarData(evaluations)}
                         options={{
                            scales: {
                                y: {
                                    beginAtZero: true,
                                    max: 100,
                                }
                            },
                             plugins: {
                                 legend: {
                                     title: {
                                         display: true,
                                         text: 'Comparison in Performance Metrics between systems and datasets',
                                     }
                                 },
                             },
                            maintainAspectRatio: false,
                        }}
                />
                </div>
            </div>
        </div>
    </div>
);
}