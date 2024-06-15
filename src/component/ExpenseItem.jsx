const ExpenseItem = ({ expense, deleteExpense, editExpense }) => {
  const handleDelete = () => {
    deleteExpense(expense.id);
  };

  const handleEdit = () => {
    const updatedExpense = {
      ...expense,
      name: prompt("New name", expense.name),
      amount: parseFloat(prompt("New amount", expense.amount)),
      // category: prompt("New category", expense.category),
    };
    editExpense(updatedExpense);
  };

  return (
    <li className="mb-2 p-2 border rounded bg-white flex justify-between items-center">
      <span>
        {expense.name}: ${expense.amount} [{expense.category}]
      </span>
      <div>
        <button
          onClick={handleEdit}
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
    </li>
  );
};

export default ExpenseItem;
