"use client";

import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from "recharts";
import TopNavigation from "@/components/TopNavigation";

const rawData = [
  { dl: "VGG16", ml: "Random Forest", "DDTI Binary": 90.34, "TR 12345 Binary": 98.96, "DDTI Multiclass": 89.27, "TR 12345 Multiclass": 88.89 },
  { dl: "VGG16", ml: "Decision Tree", "DDTI Binary": 90.34, "TR 12345 Binary": 95.14, "DDTI Multiclass": 84.08, "TR 12345 Multiclass": 82.90 },
  { dl: "VGG16", ml: "SVM", "DDTI Binary": 93.92, "TR 12345 Binary": 99.22, "DDTI Multiclass": 92.67, "TR 12345 Multiclass": 91.31 },
  { dl: "VGG16", ml: "XGBoost", "DDTI Binary": 90.88, "TR 12345 Binary": 98.70, "DDTI Multiclass": 87.66, "TR 12345 Multiclass": 87.50 },
  { dl: "EfficientNetB0", ml: "Random Forest", "DDTI Binary": 90.88, "TR 12345 Binary": 98.61, "DDTI Multiclass": 93.38, "TR 12345 Multiclass": 89.95 },
  { dl: "EfficientNetB0", ml: "Decision Tree", "DDTI Binary": 90.34, "TR 12345 Binary": 96.87, "DDTI Multiclass": 86.76, "TR 12345 Multiclass": 83.68 },
  { dl: "EfficientNetB0", ml: "SVM", "DDTI Binary": 95.53, "TR 12345 Binary": 99.48, "DDTI Multiclass": 95.53, "TR 12345 Multiclass": 91.49 },
  { dl: "EfficientNetB0", ml: "XGBoost", "DDTI Binary": 92.13, "TR 12345 Binary": 98.35, "DDTI Multiclass": 89.08, "TR 12345 Multiclass": 87.59 },
];

const data = rawData.map(item => ({
  name: `${item.dl} + ${item.ml}`,
  "DDTI Binary": item["DDTI Binary"],
  "TR 12345 Binary": item["TR 12345 Binary"],
  "DDTI Multiclass": item["DDTI Multiclass"],
  "TR 12345 Multiclass": item["TR 12345 Multiclass"],
}));

export default function ModelEvaluationChart() {
  return (
    <div className="w-full px-2 pt-20 pb-10">
      <TopNavigation />
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
        Accuracy of DL + ML Model Combinations
      </h2>

      <div className="w-full h-[400px] sm:h-[500px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 80 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="name"
              angle={-45}
              textAnchor="end"
              interval={0}
              height={90}
              tick={{ fontSize: 12 }}
            />
            <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend verticalAlign="top" wrapperStyle={{ fontSize: '12px' }} />
            <Bar dataKey="DDTI Binary" fill="#3B82F6" />
            <Bar dataKey="TR 12345 Binary" fill="#10B981" />
            <Bar dataKey="DDTI Multiclass" fill="#F59E0B" />
            <Bar dataKey="TR 12345 Multiclass" fill="#EF4444" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
