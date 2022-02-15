import React, { useState, useEffect } from "react";
import ToleranceMetric from "./toleranceMetric";
import ToleranceTitle from "./toleranceTitle";

export default function ToleranceInput({ setPresetValues, savedData }) {
  const [currentRatio, setCurrentRatio] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.currentRatio : 200
  );
  const [quickRatio, setQuickRatio] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.quickRatio : 100
  );
  const [gpMargin, setGpMargin] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.gpMargin : 50
  );
  const [ebitda, setEbitda] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.ebitda : 35
  );
  const [roe, setRoe] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.roe : 6
  );
  const [roa, setRoa] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.roa : 4
  );
  const [netProfitMargin, setNetProfitMargin] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.netProfitMargin : 12
  );
  const [operatingExpenses, setOperatingExpenses] = useState(
    savedData.length > 0
      ? savedData[0].riskToleranceValues.operatingExpenses
      : 69
  );
  const [systemUptime, setSystemUptime] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.systemUptime : 95
  );
  const [machineryUptime, setMachineryUptime] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.machineryUptime : 95
  );
  const [averageCollectionPeriod, setAverageCollectionPeriod] = useState(
    savedData.length > 0
      ? savedData[0].riskToleranceValues.averageCollectionPeriod
      : 35
  );
  const [totalReceivablePerSales, setTotalReceivablePerSales] = useState(
    savedData.length > 0
      ? savedData[0].riskToleranceValues.totalReceivablePerSales
      : 25
  );
  const [revenueGrowth, setRevenueGrowth] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.revenueGrowth : 50
  );
  const [marketShare, setMarketShare] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.marketShare : 33
  );
  const [newCustomers, setNewCustomers] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.newCustomers : 0
  );
  const [employeeTurnover, setEmployeeTurnover] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.employeeTurnover : 5
  );
  const [lossOnMajorUpheaval, setLossOnMajorUpheaval] = useState(
    savedData.length > 0
      ? savedData[0].riskToleranceValues.lossOnMajorUpheaval
      : 10
  );
  const [solvencyRatio, setSolvencyRatio] = useState(
    savedData.length > 0 ? savedData[0].riskToleranceValues.solvencyRatio : 25
  );

  useEffect(() => {
    setPresetValues({
      currentRatio,
      quickRatio,
      gpMargin,
      ebitda,
      roe,
      roa,
      netProfitMargin,
      operatingExpenses,
      systemUptime,
      machineryUptime,
      averageCollectionPeriod,
      totalReceivablePerSales,
      revenueGrowth,
      marketShare,
      newCustomers,
      employeeTurnover,
      lossOnMajorUpheaval,
      solvencyRatio,
    });
  }, [
    currentRatio,
    quickRatio,
    gpMargin,
    ebitda,
    roe,
    roa,
    netProfitMargin,
    operatingExpenses,
    systemUptime,
    machineryUptime,
    averageCollectionPeriod,
    totalReceivablePerSales,
    revenueGrowth,
    marketShare,
    newCustomers,
    employeeTurnover,
    lossOnMajorUpheaval,
    solvencyRatio,
  ]);

  return (
    <div className="mt-5">
      <ToleranceTitle title="Liquidity" />

      <div className="flex flex-row w-3/5 space-x-4">
        <ToleranceMetric
          name="Current Ratio (%)"
          setValue={setCurrentRatio}
          value={currentRatio}
        />
        <ToleranceMetric
          name="Quick Ratio (%)"
          setValue={setQuickRatio}
          value={quickRatio}
        />
      </div>

      <ToleranceTitle title="Profitability Tolerance" />

      <div className="flex flex-row w-3/5 space-x-4">
        <ToleranceMetric
          name="GP Margin (%)"
          setValue={setGpMargin}
          value={gpMargin}
        />

        <ToleranceMetric
          name="EBITDA (%)"
          setValue={setEbitda}
          value={ebitda}
        />

        <ToleranceMetric name="ROE (%)" setValue={setRoe} value={roe} />
      </div>

      <div className="flex flex-row w-3/5 space-x-4">
        <ToleranceMetric name="ROA (%)" setValue={setRoa} value={roa} />
        <ToleranceMetric
          name="Net Profit Margin (%)"
          setValue={setNetProfitMargin}
          value={netProfitMargin}
        />
      </div>

      <ToleranceTitle title="Operational Efficiency Tolerance" />

      <div className="flex flex-row w-3/5 space-x-4">
        <ToleranceMetric
          name="Operating Expenses (%)"
          setValue={setOperatingExpenses}
          value={operatingExpenses}
        />
        <ToleranceMetric
          name="System Uptime (%)"
          setValue={setSystemUptime}
          value={systemUptime}
        />
        <ToleranceMetric
          name="Machinery Uptime (%)"
          setValue={setMachineryUptime}
          value={machineryUptime}
        />
      </div>

      <ToleranceTitle title="Credit Risk Tolerance" />

      <div className="flex flex-row w-3/5 space-x-4">
        <ToleranceMetric
          name="Average Collection Period"
          setValue={setAverageCollectionPeriod}
          value={averageCollectionPeriod}
        />
        <ToleranceMetric
          name="Total Receivables/Sales (%)"
          setValue={setTotalReceivablePerSales}
          value={totalReceivablePerSales}
        />
      </div>

      <ToleranceTitle title="Marketing Tolerance" />

      <div className="flex flex-row w-3/5 space-x-4">
        <ToleranceMetric
          name="Revenue Growth (%)"
          setValue={setRevenueGrowth}
          value={revenueGrowth}
        />
        <ToleranceMetric
          name="Market Share (%)"
          setValue={setMarketShare}
          value={marketShare}
        />

        <ToleranceMetric
          name="New Customers"
          setValue={setNewCustomers}
          value={newCustomers}
        />
      </div>

      <ToleranceTitle title="Business Continuity Tolerance" />
      <div className="flex flex-row w-3/5 space-x-4">
        <ToleranceMetric
          name="Employee Turnover (%)"
          setValue={setEmployeeTurnover}
          value={employeeTurnover}
        />
        <ToleranceMetric
          name="Loss on major upheaval (%)"
          setValue={setLossOnMajorUpheaval}
          value={lossOnMajorUpheaval}
        />

        <ToleranceMetric
          name="Solvency ratio (%)"
          setValue={setSolvencyRatio}
          value={solvencyRatio}
        />
      </div>
    </div>
  );
}
