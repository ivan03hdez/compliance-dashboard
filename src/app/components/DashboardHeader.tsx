'use client';

import { BarChart, Users, CheckCircle, Shield, Target, Heart } from 'lucide-react';

interface DashboardHeaderProps {
    metrics: DashboardMetric[];
}

export interface DashboardMetric {
    id: string;
    name: string;
    value: number;
}

const nonPercentageMetrics = [
    'Active Projects',
    'Evaluations performed',
    'Low Toxicity Projects',
]

const getMetricIcon = (name: string) => {
    switch (name) {
        case 'Conformity Progress':
            return <BarChart className="w-5 h-5 text-blue-500" />;
        case 'Active Projects':
            return <Users className="w-5 h-5 text-green-500" />;
        case 'Evaluations performed':
            return <Users className="w-5 h-5 text-green-500" />;
        case 'Average Score':
            return <CheckCircle className="w-5 h-5 text-purple-500" />;
        case 'Low Toxicity Projects':
            return <Shield className="w-5 h-5 text-yellow-500" />;
        case 'Average Relevancy':
            return <Target className="w-5 h-5 text-orange-500" />;
        case 'Average Accuracy':
            return <CheckCircle className="w-5 h-5 text-green-500" />;
        case 'Average Helpfulness':
            return <Heart className="w-5 h-5 text-green-500" />;
        default:
            return <BarChart className="w-5 h-5 text-gray-500" />;
    }
};

export default function DashboardHeader({ metrics }: DashboardHeaderProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
                <div key={metric.id} className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                                    {getMetricIcon(metric.name)}
                            <span className="text-sm text-gray-600">{metric.name}</span>
                        </div>
                    </div>
                    <div className="mt-4 flex items-baseline justify-between">
                        <span className="text-2xl font-semibold text-gray-900">
                            {metric.value}{nonPercentageMetrics.some(metricName => metricName === metric.name) ? '' : '%'}
                        </span>
                    </div>
                </div>
            ))}
        </div>
);
}