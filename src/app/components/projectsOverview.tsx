'use client';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from "next/navigation";
import type { Project } from "@/app/service/types";
import { colors } from "@/app/components/utils";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const chartData = (projects: Project[]) => ({
    labels: [ 'Conformity Progress' ],
    datasets: projects.map((p, idx) => ({
        label: `${p.name}`,
        data: [ p.conformityProgress*100 ],
        backgroundColor: colors[idx].backgroundColor,
        borderColor: colors[idx].borderColor,
        borderWidth: 1,
    })),
});

const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        title: {
            display: true,
            text: 'Conformity Progress of all projects',
        }
    },
    scales: {
        y: {
            beginAtZero: true,
            max: 100,
            title: {
                display: true,
                text: 'Percentage of Conformity Progress',
            },
        },
        x: {
            title: {
                display: true,
                text: 'Projects',
            },
        },
    },
};


interface ProjectsOverviewProps {
    projects: Project[];
}

export default function ProjectsOverview({ projects }: ProjectsOverviewProps) {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-8 cursor-pointer" onClick={() => router.push(`/`)}>
                        <ArrowLeft className="w-4 h-4 mr-1" />
                        Back to Dashboard
                    <h1 className="text-3xl font-bold text-gray-900">Projects Overview</h1>
                    <p className="text-gray-600 mt-1">Conformity progress across all projects</p>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="h-[500px]">
                        <Bar data={chartData(projects)} options={chartOptions} />
                    </div>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-3">
                    {projects.map((project) => (
                        <div className='cursor-pointer' key={`${project.name}-overview`} onClick={() => router.push(`/projects/${project.name}`)}>
                            <p className="text-sm text-gray-500 text-center mb-4">{project.type}</p>
                            <div className="flex items-center">
                                <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
                                    <div
                                        className={`h-2 rounded-full ${
                                            project.conformityProgress >= 0.9
                                                ? 'bg-green-500'
                                                : project.conformityProgress >= 0.7
                                                    ? 'bg-yellow-500'
                                                    : 'bg-red-500'
                                        }`}
                                        style={{ width: `${project.conformityProgress*100}%` }}
                                    />
                                </div>
                                <span className="text-sm font-medium text-gray-600">
                                    {project.conformityProgress*100}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}