"use client"

import ProjectsOverview from "@/app/components/projectsOverview";
import { useProjectsWithEvaluationResults } from "@/app/contextProvider";

export default function ProjectsPage() {
    const { projects } = useProjectsWithEvaluationResults();
    return <ProjectsOverview projects={projects} />;
}