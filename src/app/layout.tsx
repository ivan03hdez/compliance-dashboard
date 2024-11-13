import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import React from "react";
import AppProvider from "@/app/contextProvider";
import { getEvaluationResults, getProjects } from "@/app/service/galteaServerService";

const inter = Inter({ subsets: [ 'latin' ] });

export const metadata: Metadata = {
  title: 'Project Evaluation Dashboard',
  description: 'Monitor project performance and evaluation metrics',
};

export default async function RootLayout({ children }: {
  children: React.ReactNode;
}) {
    const projects = await getProjects();
    const evaluationResults = await getEvaluationResults();
    return (
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className} suppressHydrationWarning>
            <AppProvider projects={projects} evaluationResults={evaluationResults}>
                {children}
            </AppProvider>
        </body>
      </html>
  );
}