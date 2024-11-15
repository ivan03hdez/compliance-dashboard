'use client';

import { CheckCircle, Clock, XCircle } from 'lucide-react';
import { EvaluationResult } from "@/app/service/types";
import { getAverageScore } from "@/app/service/galteaServerService";

interface SystemEvaluationRowProps {
    evaluationResult: EvaluationResult;
    isLast: boolean;
}

const getStatusIcon = (status: string) => {
    switch (status) {
        case 'completed':
            return <CheckCircle className="w-4 h-4 text-green-500" />;
        case 'pending':
            return <Clock className="w-4 h-4 text-yellow-500" />;
        case 'failed':
            return <XCircle className="w-4 h-4 text-red-500" />;
    }
};

const getStatusText = (status: string) => {
    switch (status) {
        case 'completed':
            return 'text-green-700 bg-green-50';
        case 'pending':
            return 'text-yellow-700 bg-yellow-50';
        case 'failed':
            return 'text-red-700 bg-red-50';
    }
};


const getStatus = (averageScore: number) => {
    if (averageScore >= 0.9) {
        return 'completed';
    } else if (averageScore >= 0.7) {
        return 'pending';
    } else {
        return 'failed';
    }
}
export default function EvaluationResultExpandedRow({ evaluationResult, isLast }: SystemEvaluationRowProps) {
    const averageScore = getAverageScore(evaluationResult);
    const status = getStatus(averageScore);

    console.log('averageScore', averageScore)
    console.log('status', status)
    console.log('evaluationResult', evaluationResult)

    return (
        <tr className={`bg-gray-50 hover:bg-gray-100 ${!isLast ? 'border-b border-gray-200' : ''}`}>
            <td className="pl-16 py-2 whitespace-nowrap">
                <span className="text-sm text-gray-600">{evaluationResult.systemName}</span>
            </td>
            <td className="px-6 py-2 whitespace-nowrap">
                <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-1.5 mr-2">
                        <div
                            className={`h-1.5 rounded-full ${
                                averageScore >= 0.9
                                    ? 'bg-green-500'
                                    : averageScore >= 0.7
                                        ? 'bg-yellow-500'
                                        : 'bg-red-500'
                            }`}
                            style={{ width: `${averageScore}%` }}
                        />
                    </div>
                    <span className="text-sm text-gray-600">{averageScore}%</span>
                </div>
            </td>
            <td className="px-6 py-2 whitespace-nowrap">
                <div className="flex items-center">
                    {getStatusIcon(status)}
                    <span className={`ml-1.5 text-xs px-2 py-0.5 rounded-full ${getStatusText(status)}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                    </span>
                </div>
            </td>
        </tr>
    );
}