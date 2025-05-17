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
  ResponsiveContainer,
  Cell,
} from "recharts";
import TopNavigation from "@/components/TopNavigation";

// Pure ML Binary Classification Accuracy (DDTI dataset)
const data = [
  { model: "SVM", accuracy: 95.59 },
  { model: "XGBoost", accuracy: 95.59 },
  { model: "Random Forest", accuracy: 91.18 },
  { model: "Decision Tree", accuracy: 88.24 },
];


const colors = ["#3B82F6", "#10B981", "#F59E0B", "#EF4444"];

export default function PureMLBinaryChart() {
  return (
    <div className="w-full px-2 pt-20 pb-10">
      <TopNavigation />
      <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
        Pure ML Accuracy on DDTI Binary Classification
      </h2>

      <div className="w-11/12 sm:w-3/4 md:w-1/2 h-[300px] sm:h-[400px] mx-auto">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 10, bottom: 50 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="model"
              tick={{ fontSize: 12 }}
              interval={0}
              height={40}
            />
            <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Bar dataKey="accuracy" >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
