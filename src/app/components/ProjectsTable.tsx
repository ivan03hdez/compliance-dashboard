"use client";

import { useRouter } from 'next/navigation';
import { CheckCircle, AlertCircle, Code } from 'lucide-react';
import type { Project } from '@/app/service/types';
import Link from "next/link";

interface ProjectsTableProps {
    projects: Project[];
}

export default function ProjectsTable({ projects }: ProjectsTableProps) {
    const router = useRouter();

    return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Active Projects</h2>
        </div>
    <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
    <tr>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Project
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Type
        </th>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Conformity Progress
    </th>
    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Status
        </th>
        </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
        {projects.map((project) => (
            <tr key={project.name}
                    className="hover:bg-gray-50 transition-colors duration-150 cursor-pointer"
                    onClick={() => router.push(`/projects/${project.name}`)}>
                <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                        <Code className="w-5 h-5 text-gray-500" />
                    <span className="ml-2 text-sm font-medium text-gray-900">{project.name}</span>
                    </div>
                </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {project.type}
            </td>
            <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
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
                <span className="text-sm text-gray-600">{project.conformityProgress}%</span>
                    </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                        {project.conformityProgress >= 0.8 ? (
                                <span className="flex items-center text-green-600">
                                    <CheckCircle className="w-5 h-5 mr-1" />
                                    <span className="text-sm">Compliant</span>
                                </span>
                            ) : (
                                <span className="flex items-center text-yellow-600">
                                    <AlertCircle className="w-5 h-5 mr-1" />
                                    <span className="text-sm">Review Needed</span>
                                </span>
                        )}
                    </td>
            </tr>
))}
    </tbody>
    </table>
    </div>
    </div>
);
}