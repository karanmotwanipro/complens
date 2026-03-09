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
      <h2 style={{ margin: "0 0 8px 0" }}>{title}</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>

      <div style={{ flex: 1 }}>
        <label>
        ⏱ Total daily commute (round trip)
        </label>
        <input style={{
        width: "100%",
        padding: "6px",
        borderRadius: "6px",
        border: "1px solid #374151",
        outline: "none",
        boxSizing: "border-box"
        }}
          type="number"
          value={commuteMinutes}
          onChange={(e) => {
            setCommuteMinutes(e.target.value);
            resetResults();
          }}
        />
        <small style={{ opacity: 0.6 }}>
        Minutes spent commuting per workday
        </small>
      </div>

      <div style={{ flex: 1 }}>
        <label>🏢 Office days per week</label>
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


    </div>

    <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>

    <div style={{ flex: 1 }}>
      <label>💰 Salary</label>
      <input style={{
      width: "100%",
      padding: "6px",
      borderRadius: "6px",
      border: "1px solid #374151",
      outline: "none",
      boxSizing: "border-box"
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

      <p style={{ fontSize: "12px", opacity: 0.7, marginTop: "6px" }}>
      🔒 Your numbers stay in your browser. Nothing is stored.
      </p>
    </div>

    <div style={{ flex: 1 }}>
      <label>🚗 Daily commute spending (optional)</label>
      <input style={{
      width: "100%",
      padding: "6px",
      borderRadius: "6px",
      border: "1px solid #374151",
      outline: "none",
      boxSizing: "border-box"
      }}
        type="number"
        value={dailyCost}
        onChange={(e) => {
          setDailyCost(e.target.value);
          resetResults();
        }}
      />

      <small style={{ opacity: 0.6 }}>
      $ per day (gas, train, parking, Uber, etc.)
      </small>
    </div>

  </div>

      <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
        <p style={{ flex: 1 }}>
          Hours spent commuting per year: {yearlyCommuteHours.toFixed(1)}
        </p>
        <p style={{ flex: 1 }}>
          Days lost per year: {daysLost.toFixed(1)}
        </p>
      </div>

      <div style={{ display: "flex", gap: "20px" }}>
        <p style={{ flex: 1 }}>
          Commute cost: ${commuteCost.toLocaleString()}
        </p>
        <p style={{ flex: 1 }}>
          Effective income: ${effectiveIncome.toFixed(0)}
        </p>
      </div>
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

  function calculateJob(salary, commuteMinutes, officeDays, dailyCost) {
  const salaryNumber = Number(salary) || 0;
  const commuteNumber = Number(commuteMinutes) || 0;
  const officeDaysNumber = Number(officeDays) || 0;
  const dailyCostNumber = Number(dailyCost) || 0;

  const yearlyCommuteHours = (commuteNumber * officeDaysNumber * 52) / 60;

  const hourlyRate = salaryNumber / 2080;

  const yearlyDirectCost = dailyCostNumber * officeDaysNumber * 52;

  const timeCost = yearlyCommuteHours * hourlyRate;

  const commuteCost = timeCost + yearlyDirectCost;

  const effectiveIncome = salaryNumber - commuteCost;

  const daysLost = yearlyCommuteHours / 24;

  return {
    yearlyCommuteHours,
    commuteCost,
    effectiveIncome,
    daysLost
  };
}


  const jobA = calculateJob(salary, commuteMinutes, officeDaysA, dailyCostA);
  const jobB = calculateJob(salaryB, commuteMinutesB, officeDaysB, dailyCostB);

  const yearlyCommuteHoursA = jobA.yearlyCommuteHours;
  const yearlyCommuteHoursB = jobB.yearlyCommuteHours;

  const commuteCostA = jobA.commuteCost;
  const commuteCostB = jobB.commuteCost;

  const effectiveIncomeA = jobA.effectiveIncome;
  const effectiveIncomeB = jobB.effectiveIncome;

  const incomeDelta = Math.abs(effectiveIncomeA - effectiveIncomeB);

  const daysLostA = jobA.daysLost;
  const daysLostB = jobB.daysLost;

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
  const careerMonthsSaved = Math.round((hoursSaved * 30) / 24 / 30);

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
    fontSize: "20px",
    fontWeight: "600",
    margin: 0,
    lineHeight: "1.4"
    }}>
    Your commute might be stealing years of your life. <br />
    Compare two job options and see the hidden time cost of commuting.
    </h1>


  <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", marginTop: "20px", textAlign: "left" }}>

    <JobCard
    title="Job Option A"
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
    title="Job Option B"
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
    <div style={{
    marginTop: "16px",
    textAlign: "center",
    animation: "fadeIn 0.25s ease"
  }}>

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
          ? `💰 Job A nets you $${incomeDelta.toLocaleString()} more per year`
          : `💰 Job B nets you $${incomeDelta.toLocaleString()} more per year`}
      </div>

      <div style={{ fontWeight: "700" }}>
        {yearlyCommuteHoursA < yearlyCommuteHoursB
          ? `⏱ Job A gives you ${hoursSaved.toFixed(0)} hours of your life back`
          : `⏱ Job B gives you ${hoursSaved.toFixed(0)} hours of your life back`}
      </div>

    </div>


    <p style={{ marginTop: "8px", fontSize: "14px", opacity: 0.9 }}>
    <i>Over a 30-year career, the difference between these jobs is about <b>{careerMonthsSaved}</b> months of your life.</i>
    </p>

    <p style={{ marginTop: "6px", fontSize: "13px", opacity: 0.7 }}>
    Time that could be spent with family, riding, traveling — or simply not sitting in traffic.
    </p>

    <p style={{ marginTop: "6px", fontSize: "12px", opacity: 0.6 }}>
    Most people underestimate commute impact by 3–5× over a career.
    </p>

  </div>
)}


  </div>
);
}

export default App

