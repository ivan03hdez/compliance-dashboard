'use client';

import { BarChart2, Zap, Heart, Target, Shield } from 'lucide-react';
import type { EvaluationResult } from '@/app/service/types';

interface EvaluationResultsProps {
    results: EvaluationResult[];
}

export default function EvaluationResults({ results }: EvaluationResultsProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900">Latest Evaluations</h2>
            </div>
            <div className="divide-y divide-gray-100">
                {results.map((result) => (
                    <div key={`${result.projectName}-${result.datasetName}-${result.systemName}`} className="p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-medium text-gray-900">{result.projectName}</h3>
                            <span className="text-sm text-gray-500">{result.systemName}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-4">Dataset: {result.datasetName}</p>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Target className="w-4 h-4 text-blue-500 mr-2" />
                                    <span className="text-sm text-gray-600">Accuracy</span>
                                </div>
                                <span className="text-sm font-medium">{result.accuracy*100}%</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Heart className="w-4 h-4 text-red-500 mr-2" />
                                    <span className="text-sm text-gray-600">Helpfulness</span>
                                </div>
                                <span className="text-sm font-medium">{result.helpfulness*100}%</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <BarChart2 className="w-4 h-4 text-green-500 mr-2" />
                                    <span className="text-sm text-gray-600">Relevancy</span>
                                </div>
                                <span className="text-sm font-medium">{result.relevancy*100}%</span>
                            </div>

                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <Shield className="w-4 h-4 text-purple-500 mr-2" />
                                    <span className="text-sm text-gray-600">Toxicity</span>
                                </div>
                                <span className="text-sm font-medium">{result.toxicity*100}%</span>
                            </div>

                            <div className="pt-3 border-t border-gray-100">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <Zap className="w-4 h-4 text-yellow-500 mr-2" />
                                        <span className="text-sm font-medium">Overall Score</span>
                                    </div>
                                    <span className="text-sm font-medium">{result.score*100}%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}