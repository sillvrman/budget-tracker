const BudgetDisplay = ({ remaining, spent, budget }) => {
  return (
    <div
      className="mb-4 p-4 border rounded bg-gray-100"
      style={{ height: "fit-content" }}
    >
      <h2 className="text-xl font-semibold mb-2">Default Budget: ${budget}</h2>
      <h2 className="text-xl font-semibold mb-2">
        Remaining Budget: ${remaining}
      </h2>
      <h2 className="text-xl font-semibold">Spent Budget: ${spent}</h2>
    </div>
  );
};

export default BudgetDisplay;
