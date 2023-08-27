interface DailySummaryProps {
  totals: {
    calories: number;
    fat: number;
    carbohydrates: number;
    protein: number;
  };
}

const DailySummary: React.FC<DailySummaryProps> = ({
  totals: { calories, fat, carbohydrates, protein },
}) => {
  return (
    <section className="w-1/2 mx-auto my-6  px-6 py-4 rounded-lg   bg-softred text-white">
      <div className="text-xl text-center md:text-start">
        <h2>Daily Totals</h2>
      </div>

      <div className="my-6 grid grid-cols-1 md:grid-cols-4">
        <div className="text-center">
          <h3>{calories}</h3>
          <p className=" text-lg font-bold">Calories</p>
        </div>
        <div className="text-center">
          <h3>{fat}</h3>
          <p className=" text-lg font-bold">Fat</p>
        </div>
        <div className="text-center">
          <h3>{carbohydrates}</h3>
          <p className=" text-lg font-bold">Carbohydrates</p>
        </div>
        <div className="text-center">
          <h3>{protein}</h3>
          <p className=" text-lg font-bold">Protein</p>
        </div>
      </div>
    </section>
  );
};

export default DailySummary;
