import { useState } from 'react'
import './App.css'

function JobCard({
  title,
  salary,
  setSalary,
  commuteMinutes,
  setCommuteMinutes,
  yearlyCommuteHours,
  daysLost,
  commuteCost,
  effectiveIncome,
  isWinner,
  officeDays,
  setOfficeDays,
  dailyCost,
  setDailyCost,
  resetResults,
}) {
  return (
    <div
      style={{
        flex: "1 1 40%",
        minWidth: "300px",
        padding: "12px",
        borderRadius: "12px",
        backgroundColor: "white",
        color: "#222",
        border: "1px solid #e5e7eb",
        boxShadow: "0 6px 18px rgba(0,0,0,0.06)"
      }}
    >
      <h2>{title}</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
      <div style={{ flex: 1 }}>
        <label>💰 Salary</label>
        <input style={{
        width: "100%",
        padding: "6px",
        borderRadius: "6px",
        border: "1px solid #374151",
        outline: "none"
        }}
          type="number"
          value={salary}
          onChange={(e) => {
            setSalary(e.target.value);
            resetResults();
          }}
        />
        <small style={{ opacity: 0.6 }}>
        Dollars per year
        </small>
      </div>

      <div style={{ flex: 1 }}>
        <label>
        ⏱ Commute
        </label>
        <input style={{
        width: "100%",
        padding: "6px",
        borderRadius: "6px",
        border: "1px solid #374151",
        outline: "none"
        }}
          type="number"
          value={commuteMinutes}
          onChange={(e) => {
            setCommuteMinutes(e.target.value);
            resetResults();
          }}
        />
        <small style={{ opacity: 0.6 }}>
        Enter minutes per day
        </small>
      </div>
    </div>

    <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
      <div style={{ flex: 1 }}>
        <label>🏢 Days in office per week</label>
        <input
          type="range"
          min="0"
          max="5"
          value={officeDays}
          onChange={(e) => {
            setOfficeDays(e.target.value);
            resetResults();
          }}
          style={{ width: "100%", marginTop: "6px" }}
        />
        <p style={{ marginTop: "4px", fontSize: "14px", opacity: 0.7 }}>
          {officeDays == 0
            ? "Fully Remote"
            : officeDays == 5
            ? "Fully Onsite"
            : `${officeDays} days in office`}
        </p>
      </div>

      <div style={{ flex: 1 }}>
        <label>🚗 Direct cost</label>
        <input style={{
        width: "100%",
        padding: "6px",
        borderRadius: "6px",
        border: "1px solid #374151",
        outline: "none"
        }}
          type="number"
          value={dailyCost}
          onChange={(e) => {
            setDailyCost(e.target.value);
            resetResults();
          }}
        />
        <small style={{ opacity: 0.6 }}>
        Dollars per day
        </small>
      </div>
      </div>

      <p>Yearly commute hours: {yearlyCommuteHours.toFixed(1)}</p>
      <p>Full days lost per year: {daysLost.toFixed(1)}</p>
      <p>Commute cost: ${commuteCost.toFixed(0)}</p>
      <p>Effective income: ${effectiveIncome.toFixed(0)}</p>
    </div>
  );
}

function App() {

  const [showResults, setShowResults] = useState(false);

  const handleCompare = () => {
  setShowResults(true);
  };

  const resetResults = () => {
  setShowResults(false);
  };

  const handleReset = () => {
  setSalary("");
  setCommuteMinutes("");
  setSalaryB("");
  setCommuteMinutesB("");
  setOfficeDaysA("5");
  setOfficeDaysB("5");
  setDailyCostA("");
  setDailyCostB("");
  setShowResults(false);
  };

  const [salary, setSalary] = useState("");
  const [commuteMinutes, setCommuteMinutes] = useState("");

  const [salaryB, setSalaryB] = useState("");
  const [commuteMinutesB, setCommuteMinutesB] = useState("");

  const [officeDaysA, setOfficeDaysA] = useState("5");
  const [officeDaysB, setOfficeDaysB] = useState("5");

  const [dailyCostA, setDailyCostA] = useState("");
  const [dailyCostB, setDailyCostB] = useState("");

  const salaryNumberA = Number(salary) || 0;
  const commuteNumberA = Number(commuteMinutes) || 0;

  const salaryNumberB = Number(salaryB) || 0;
  const commuteNumberB = Number(commuteMinutesB) || 0;

  const officeDaysNumberA = Number(officeDaysA) || 0;
  const officeDaysNumberB = Number(officeDaysB) || 0;

  const dailyCostNumberA = Number(dailyCostA) || 0;
  const dailyCostNumberB = Number(dailyCostB) || 0;

  const yearlyCommuteHoursA = (commuteNumberA * officeDaysNumberA * 52) / 60;
  const yearlyCommuteHoursB = (commuteNumberB * officeDaysNumberB * 52) / 60;

  const hourlyRateA = salaryNumberA / 2080;
  const hourlyRateB = salaryNumberB / 2080;

  const yearlyDirectCostA = dailyCostNumberA * officeDaysNumberA * 52;
  const yearlyDirectCostB = dailyCostNumberB * officeDaysNumberB * 52;

  const timeCostA = yearlyCommuteHoursA * hourlyRateA;
  const timeCostB = yearlyCommuteHoursB * hourlyRateB;

  const commuteCostA = timeCostA + yearlyDirectCostA;
  const commuteCostB = timeCostB + yearlyDirectCostB;

  const effectiveIncomeA = salaryNumberA - commuteCostA;
  const effectiveIncomeB = salaryNumberB - commuteCostB;

  const incomeDelta = Math.abs(effectiveIncomeA - effectiveIncomeB);

  const daysLostA = yearlyCommuteHoursA / 24;
  const daysLostB = yearlyCommuteHoursB / 24;

  let winnerText = "";
  let comparisonMessage = "";


  if (salary || salaryB || commuteMinutes || commuteMinutesB) {
    if (effectiveIncomeA === effectiveIncomeB) {
      winnerText = "Both jobs provide similar effective value.";
      comparisonMessage = "There is no meaningful difference in commute impact.";
    } else if (effectiveIncomeA > effectiveIncomeB) {
      const daysDiff = Math.abs(daysLostA - daysLostB).toFixed(1);
      winnerText = "Job A provides higher effective value.";
      comparisonMessage = `Choosing Job A saves you ${daysDiff} full days of commuting per year.`;
    } else {
      const daysDiff = Math.abs(daysLostA - daysLostB).toFixed(1);
      winnerText = "Job B provides higher effective value.";
      comparisonMessage = `Choosing Job B saves you ${daysDiff} full days of commuting per year.`;
    }
}

  const hasInput = salary || salaryB || commuteMinutes || commuteMinutesB || officeDaysA || officeDaysB || dailyCostA || dailyCostB;

  const isAWinner =
  showResults && effectiveIncomeA > effectiveIncomeB;

  const isBWinner =
  showResults && effectiveIncomeB > effectiveIncomeA;

  const hoursSaved = Math.abs(yearlyCommuteHoursA - yearlyCommuteHoursB);

  return (
  <div style={{ fontFamily: "Arial", maxWidth: "1000px", margin: "0 auto", minHeight: "100vh" }}>
    <p style={{
    fontSize: "12px",
    letterSpacing: "1px",
    opacity: 0.6,
    marginBottom: "6px"
    }}>
    COMPLENS
    </p>

    <h1 style={{
    fontSize: "28px",
    fontWeight: "600",
    margin: 0
    }}>
    Your commute might be stealing your life. Want to find out?
    </h1>

  <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", marginTop: "20px", textAlign: "left" }}>

    <JobCard
    title="Job A"
    salary={salary}
    setSalary={setSalary}
    commuteMinutes={commuteMinutes}
    setCommuteMinutes={setCommuteMinutes}
    officeDays={officeDaysA}
    setOfficeDays={setOfficeDaysA}
    yearlyCommuteHours={yearlyCommuteHoursA}
    daysLost={daysLostA}
    commuteCost={commuteCostA}
    effectiveIncome={effectiveIncomeA}
    isWinner={isAWinner}
    dailyCost={dailyCostA}
    setDailyCost={setDailyCostA}
    resetResults={resetResults}
    />

    <JobCard
    title="Job B"
    salary={salaryB}
    setSalary={setSalaryB}
    commuteMinutes={commuteMinutesB}
    setCommuteMinutes={setCommuteMinutesB}
    officeDays={officeDaysB}
    setOfficeDays={setOfficeDaysB}
    yearlyCommuteHours={yearlyCommuteHoursB}
    daysLost={daysLostB}
    commuteCost={commuteCostB}
    effectiveIncome={effectiveIncomeB}
    isWinner={isBWinner}
    dailyCost={dailyCostB}
    setDailyCost={setDailyCostB}
    resetResults={resetResults}
    />

  </div>

<div style={{ textAlign: "center", marginTop: "20px" }}>
  {!showResults ? (
    <button
      onClick={handleCompare}
      style={{
        padding: "10px 22px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        backgroundColor: "#22c55e",
        color: "white",
        fontWeight: "600",
      }}
    >
      Compare Jobs
    </button>
  ) : (
    <button
      onClick={handleReset}
      style={{
        padding: "10px 22px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        backgroundColor: "#1f2937",
        color: "white",
        fontWeight: "600",
      }}
    >
      Reset
    </button>
  )}
  </div>



{showResults && winnerText && (
  <div style={{ marginTop: "20px", textAlign: "center" }}>

    <div style={{
      display: "flex",
      justifyContent: "center",
      gap: "40px",
      flexWrap: "wrap",
      fontSize: "18px",
      fontWeight: "600"
    }}>
      
      <div>
        {effectiveIncomeA > effectiveIncomeB
          ? `💰 Job A gives you $${incomeDelta.toFixed(0)} more real income`
          : `💰 Job B gives you $${incomeDelta.toFixed(0)} more real income`}
      </div>

      <div>
        {yearlyCommuteHoursA < yearlyCommuteHoursB
          ? `⏱ Job A gives you ${hoursSaved.toFixed(0)} hours of life back`
          : `⏱ Job B gives you ${hoursSaved.toFixed(0)} hours of life back`}
      </div>

    </div>

    <p style={{ marginTop: "10px", opacity: 0.85 }}>
      That’s {(hoursSaved / 8).toFixed(0)} full days of your life back every year.
    </p>

  </div>
  </div>
)}


  </div>
);
}

export default App

