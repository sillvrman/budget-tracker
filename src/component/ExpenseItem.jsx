import React, { useState } from "react";

const ExpenseItem = ({
  expense,
  deleteExpense,
  editExpense,
  remainingBudget,
}) => {
  const [editing, setEditing] = useState(false);
  const [editedName, setEditedName] = useState(expense.name);
  const [editedAmount, setEditedAmount] = useState(expense.amount);

  const handleDelete = () => {
    deleteExpense(expense.id);
  };

  const handleEdit = () => {
    // Check if edited amount exceeds remaining budget
    if (parseFloat(editedAmount) > remainingBudget) {
      alert("Edited amount cannot exceed the remaining budget!");
      return;
    }

    const updatedExpense = {
      ...expense,
      name: editedName,
      amount: parseFloat(editedAmount),
    };
    editExpense(updatedExpense);
    setEditing(false); // Close the edit modal after editing
  };

  return (
    <li className="mb-2 p-2 border rounded bg-white flex justify-between items-center">
      <span>
        {expense.name}: ${expense.amount} [{expense.category}]
      </span>
      <div>
        <button
          onClick={() => setEditing(true)}
          className="mr-2 bg-yellow-500 text-white p-1 rounded"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white p-1 rounded"
        >
          Delete
        </button>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Edit Expense</h2>
            <div className="mb-4">
              <label htmlFor="edit-name" className="block mb-1">
                Name:
              </label>
              <input
                type="text"
                id="edit-name"
                className="border rounded px-2 py-1 w-full"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="edit-amount" className="block mb-1">
                Amount:
              </label>
              <input
                type="number"
                id="edit-amount"
                className="border rounded px-2 py-1 w-full"
                value={editedAmount}
                onChange={(e) => setEditedAmount(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
              >
                Save
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </li>
  );
};

export default ExpenseItem;
