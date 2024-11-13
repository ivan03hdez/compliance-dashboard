"use client"

import React, { createContext, useContext } from "react";
import type { EvaluationResult, Project } from "@/app/service/types";

interface AppContextType {
    projects: Project[];
    evaluationResults: EvaluationResult[];
}
const AppContext = createContext<AppContextType>({ projects: [], evaluationResults: [] });

export const useProjectsWithEvaluationResults = () => useContext(AppContext);

interface ProjectsTableProps {
    children: React.ReactNode;
    projects: Project[];
    evaluationResults: EvaluationResult[]
}
function AppProvider({ children, projects, evaluationResults }: ProjectsTableProps) {
    return (
        <AppContext.Provider value={{
            projects,
            evaluationResults
        }}>
            {children}
        </AppContext.Provider>
    );
}

export default AppProvider;
