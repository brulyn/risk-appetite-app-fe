import React, { useState, useEffect } from "react";
import ToleranceMetric from "./toleranceMetric";
import ToleranceTitle from "./toleranceTitle";

export default function ToleranceInput({ setPresetValues, savedData }) {
  const [currentRatio, setCurrentRatio] = useState("");
  const [quickRatio, setQuickRatio] = useState("");
  const [gpMargin, setGpMargin] = useState("");
  const [ebitda, setEbitda] = useState("");
  const [roe, setRoe] = useState("");
  const [roa, setRoa] = useState("");
  const [netProfitMargin, setNetProfitMargin] = useState("");
  const [operatingExpenses, setOperatingExpenses] = useState("");
  const [systemUptime, setSystemUptime] = useState("");
  const [machineryUptime, setMachineryUptime] = useState("");
  const [averageCollectionPeriod, setAverageCollectionPeriod] = useState("");
  const [totalReceivablePerSales, setTotalReceivablePerSales] = useState("");
  const [revenueGrowth, setRevenueGrowth] = useState("");
  const [marketShare, setMarketShare] = useState("");
  const [newCustomers, setNewCustomers] = useState("");
  const [employeeTurnover, setEmployeeTurnover] = useState("");
  const [lossOnMajorUpheaval, setLossOnMajorUpheaval] = useState("");
  const [solvencyRatio, setSolvencyRatio] = useState("");

  useEffect(() => {
    let riskToleranceValues =
      savedData.length > 0 ? savedData[0].riskToleranceValues : false;

    if (riskToleranceValues) {
      // setPresetValues(riskToleranceValues);
      setCurrentRatio(riskToleranceValues.currentRatio);
      setQuickRatio(riskToleranceValues.quickRatio);
      setAverageCollectionPeriod(riskToleranceValues.averageCollectionPeriod);
      setEbitda(riskToleranceValues.ebitda);
      setEmployeeTurnover(riskToleranceValues.employeeTurnover);
      setGpMargin(riskToleranceValues.gpMargin);
      setLossOnMajorUpheaval(riskToleranceValues.lossOnMajorUpheaval);
      setMachineryUptime(riskToleranceValues.machineryUptime);
      setSystemUptime(riskToleranceValues.systemUptime);
      setMarketShare(riskToleranceValues.marketShare);
      setNetProfitMargin(riskToleranceValues.netProfitMargin);
      setNewCustomers(riskToleranceValues.newCustomers);
      setOperatingExpenses(riskToleranceValues.operatingExpenses);
      setRevenueGrowth(riskToleranceValues.revenueGrowth);
      setRoa(riskToleranceValues.roa);
      setRoe(riskToleranceValues.roe);
      setSolvencyRatio(riskToleranceValues.solvencyRatio);
      setTotalReceivablePerSales(riskToleranceValues.totalReceivablePerSales);
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
    } else {
      setCurrentRatio("");
      setQuickRatio("");
      setAverageCollectionPeriod("");
      setEbitda("");
      setEmployeeTurnover("");
      setGpMargin("");
      setLossOnMajorUpheaval("");
      setMachineryUptime("");
      setSystemUptime("");
      setMarketShare("");
      setNetProfitMargin("");
      setNewCustomers("");
      setOperatingExpenses("");
      setRevenueGrowth("");
      setRoa("");
      setRoe("");
      setSolvencyRatio("");
      setTotalReceivablePerSales("");
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
    }
  }, [savedData]);

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
