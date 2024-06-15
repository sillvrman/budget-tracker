import React, { useState } from "react";
import BudgetDisplay from "./component/BudgetDisplay";
import ExpenseForm from "./component/ExpenseForm";
import ExpenseList from "./component/ExpenseList";
import BudgetChart from "./component/BudgetChart";

const BudgetTracker = () => {
  const [budget, setBudget] = useState(0);
  const [expenses, setExpenses] = useState([]);
  const [budgetInput, setBudgetInput] = useState("");
  const [error, setError] = useState("");

  const addExpense = (expense) => {
    // Check if expense amount exceeds remaining budget
    if (
      expense.amount >
      budget - expenses.reduce((acc, exp) => acc + exp.amount, 0)
    ) {
      setError("Expense amount exceeds remaining budget.");
      return;
    }

    setExpenses([...expenses, expense]);
    setError("");
  };

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  };

  const editExpense = (updatedExpense) => {
    setExpenses(
      expenses.map((expense) =>
        expense.id === updatedExpense.id ? updatedExpense : expense
      )
    );
  };

  const handleBudgetChange = (e) => {
    setBudgetInput(e.target.value);
  };

  const handleBudgetSubmit = (e) => {
    e.preventDefault();
    const newBudget = parseFloat(budgetInput);
    const spent = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    if (newBudget < spent) {
      setError("Default budget cannot be less than the already spent budget.");
    } else {
      setBudget(newBudget);
      setBudgetInput("");
      setError("");
    }
  };

  const spent = expenses.reduce((acc, expense) => acc + expense.amount, 0);
  const remaining = budget - spent;

  // Generate a key that changes when the budget or expenses change
  const keyProp = `${budget}_${expenses.length}`;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-center">Budget Tracker</h1>
      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
      <form onSubmit={handleBudgetSubmit} className="mb-4">
        <div className="flex items-center space-x-2">
          <input
            type="number"
            placeholder="Enter your default budget"
            value={budgetInput}
            onChange={handleBudgetChange}
            className="border border-gray-300 p-2 rounded w-full"
            required
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded whitespace-nowrap"
          >
            Set Budget
          </button>
        </div>
      </form>
      <div className="grid grid-cols-2">
        <BudgetDisplay remaining={remaining} spent={spent} budget={budget} />
        {budget !== 0 ? (
          <BudgetChart key={keyProp} spent={spent} remaining={remaining} />
        ) : (
          <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-2">Budget Overview</h2>
            <p className="text-gray-600">No budget set yet.</p>
          </div>
        )}
      </div>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList
        expenses={expenses}
        deleteExpense={deleteExpense}
        editExpense={editExpense}
      />
    </div>
  );
};

export default BudgetTracker;
