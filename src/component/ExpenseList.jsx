import { useState } from "react";
import ExpenseItem from "./ExpenseItem";

const ExpenseList = ({
  expenses,
  deleteExpense,
  editExpense,
  remainingBudget,
}) => {
  const [filter, setFilter] = useState("");

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const filteredExpenses = filter
    ? expenses.filter((expense) => expense.category === filter)
    : expenses;

  return (
    <div className="mb-4 p-4 border rounded bg-gray-100">
      <h2 className="text-xl font-semibold mb-2">Expenses</h2>
      <select
        value={filter}
        onChange={handleFilterChange}
        className="mb-2 border border-gray-300 p-2 rounded w-full"
      >
        <option value="">All Categories</option>
        <option value="Food">Food</option>
        <option value="Transportation">Transportation</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
      </select>
      <ul>
        {filteredExpenses.map((expense) => (
          <ExpenseItem
            key={expense.id}
            expense={expense}
            deleteExpense={deleteExpense}
            editExpense={editExpense}
            remainingBudget={remainingBudget}
          />
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
