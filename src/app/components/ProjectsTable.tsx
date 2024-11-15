"use client";

import { useRouter } from 'next/navigation';
import {CheckCircle, AlertCircle, Code, ChevronRight, ChevronDown} from 'lucide-react';
import type { EvaluationResult, Project } from '@/app/service/types';
import EvaluationResultExpandedRow from "@/app/components/EvaluationResultExpandedRow";
import React, {useState} from "react";

interface ProjectsTableProps {
    projects: Project[];
    evaluationResults: EvaluationResult[];
}

export default function ProjectsTable({ projects, evaluationResults }: ProjectsTableProps) {
    const router = useRouter();
    const [expandedProjects, setExpandedProjects] = useState<string[]>([]);


    const toggleProject = (projectName: string) => {
        setExpandedProjects(prev =>
            prev.includes(projectName)
                ? prev.filter(p => p !== projectName)
                : [...prev, projectName]
        );
    };

    return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">Active Projects</h2>
        </div>
    <div className="overflow-x-auto">
    <table className="min-w-full divide-y divide-gray-200">
    <thead className="bg-gray-50">
    <tr key='projects-table-header'>
        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-8"/>
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
        {projects.map((project, idx) => {
                const projectEvaluations = evaluationResults?.filter((evaluationResult) => evaluationResult.projectName === project.name);
                return (<React.Fragment key={`projects-table-row-${project.name}-${idx}`}>
                <tr key={`projects-table-${project.name}-${idx}`}
                        className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                        <button
                            onClick={(e) => toggleProject(project.name)}
                            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-150 inline-flex"
                        >
                            {expandedProjects.includes(project.name) ? (
                                <ChevronDown className="w-4 h-4 text-gray-500"/>
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-500"/>
                            )}
                        </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap cursor-pointer"
                        onClick={() => router.push(`/projects/${project.name}`)}>
                        <div className="flex items-center">
                            <Code className="w-5 h-5 text-gray-500 ml-2"/>
                            <span className="ml-2 text-base font-medium text-gray-900 hover:text-blue-600 truncate">
                                {project.name}
                            </span>
                        </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                        onClick={() => router.push(`/projects/${project.name}`)}>
                        {project.type}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap"
                        onClick={() => router.push(`/projects/${project.name}`)}
                    >
                        <div className="flex items-center">
                            <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                                <div className={`h-2 rounded-full ${
                                    project.conformityProgress >= 0.9
                                        ? 'bg-green-500'
                                : project.conformityProgress >= 0.7
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                        }`}
                        style={{ width: `${project.conformityProgress*100}%` }}/>
                    </div>
                      <span className="text-sm text-gray-600">{project.conformityProgress*100}%</span>
                    </div>
                </td>
                    <td onClick={() => router.push(`/projects/${project.name}`)}
                        className="px-6 py-4 whitespace-nowrap">
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
                {expandedProjects.includes(project.name) && projectEvaluations?.map((evaluation, idx) => (
                    <EvaluationResultExpandedRow
                        key={`${project.name}-${evaluation.systemName}-${evaluation.datasetName}-${idx}`}
                        evaluationResult={evaluation}
                        isLast={idx === projectEvaluations!.length - 1}/>
                ))}
        </React.Fragment>)
    })}
    </tbody>
    </table>
    </div>
    </div>
);
}