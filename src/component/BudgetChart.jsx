import React from "react";
import { PieChart, Pie, Cell } from "recharts";

const BudgetChart = ({ spent, remaining, budget }) => {
  // Data for the PieChart
  const data = [
    { name: "Spent", value: spent },
    { name: "Remaining", value: remaining },
  ];

  // Colors for the PieChart segments
  const COLORS = ["#FF8042", "#0088FE"];

  // Conditional rendering based on budget value
  if (budget === 0) {
    return (
      <div className="max-w-4xl mx-auto p-4">
        <h2 className="text-2xl font-bold mb-2">Budget Overview</h2>
        <p className="text-gray-600">No budget set yet.</p>
      </div>
    );
  }

  // Render PieChart when budget is greater than 0
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">Budget Overview</h2>
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx={200}
          cy={200}
          innerRadius={60}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};

export default BudgetChart;
