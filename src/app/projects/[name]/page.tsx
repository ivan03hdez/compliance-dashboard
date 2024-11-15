"use client"

import { useProjectsWithEvaluationResults } from "@/app/contextProvider";
import { notFound, useParams } from "next/navigation";
import ProjectView from "@/app/components/ProjectView";

export default function ProjectDetailPage() {
    const params = useParams()
    const { name } = params
    const decodedName = decodeURIComponent(name as string);
    const { projects, evaluationResults } = useProjectsWithEvaluationResults()
    const project = projects.find((project) => decodedName === project.name)
    const projectResults = evaluationResults.filter((evaluationResult) => decodedName === evaluationResult.projectName)

    if (!name || !projectResults.length) {
        notFound();
    }

    if (!project || !projectResults || !projectResults.length) {
        notFound();
    }
    return (
        <>
            <ProjectView project={project} evaluations={projectResults} />;
        </>
    );
}