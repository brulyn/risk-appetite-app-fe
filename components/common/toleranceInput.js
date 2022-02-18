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
          error={currentRatio.toString().length == 0 || currentRatio < 0}
        />
        <ToleranceMetric
          name="Quick Ratio (%)"
          setValue={setQuickRatio}
          value={quickRatio}
          error={quickRatio.toString().length == 0 || quickRatio < 0}
        />
      </div>

      <ToleranceTitle title="Profitability Tolerance" />

      <div className="flex flex-row w-3/5 space-x-4">
        <ToleranceMetric
          name="GP Margin (%)"
          setValue={setGpMargin}
          value={gpMargin}
          error={gpMargin.toString().length == 0 || gpMargin < 0}
        />

        <ToleranceMetric
          name="EBITDA (%)"
          setValue={setEbitda}
          value={ebitda}
          error={ebitda.toString().length == 0 || ebitda < 0}
        />

        <ToleranceMetric
          name="ROE (%)"
          setValue={setRoe}
          value={roe}
          error={roe.toString().length == 0 || roe < 0}
        />
      </div>

      <div className="flex flex-row w-3/5 space-x-4">
        <ToleranceMetric
          name="ROA (%)"
          setValue={setRoa}
          value={roa}
          error={roa.toString().length == 0 || roa < 0}
        />
        <ToleranceMetric
          name="Net Profit Margin (%)"
          setValue={setNetProfitMargin}
          value={netProfitMargin}
          error={netProfitMargin.toString().length == 0 || netProfitMargin < 0}
        />
      </div>

      <ToleranceTitle title="Operational Efficiency Tolerance" />

      <div className="flex flex-row w-3/5 space-x-4">
        <ToleranceMetric
          name="Operating Expenses (%)"
          setValue={setOperatingExpenses}
          value={operatingExpenses}
          error={
            operatingExpenses.toString().length == 0 || operatingExpenses < 0
          }
        />
        <ToleranceMetric
          name="System Uptime (%)"
          setValue={setSystemUptime}
          value={systemUptime}
          error={systemUptime.toString().length == 0 || systemUptime < 0}
        />
        <ToleranceMetric
          name="Machinery Uptime (%)"
          setValue={setMachineryUptime}
          value={machineryUptime}
          error={machineryUptime.toString().length == 0 || machineryUptime < 0}
        />
      </div>

      <ToleranceTitle title="Credit Risk Tolerance" />

      <div className="flex flex-row w-3/5 space-x-4">
        <ToleranceMetric
          name="Average Collection Period"
          setValue={setAverageCollectionPeriod}
          value={averageCollectionPeriod}
          error={
            averageCollectionPeriod.toString().length == 0 ||
            averageCollectionPeriod < 0
          }
        />
        <ToleranceMetric
          name="Total Receivables/Sales (%)"
          setValue={setTotalReceivablePerSales}
          value={totalReceivablePerSales}
          error={
            totalReceivablePerSales.toString().length == 0 ||
            totalReceivablePerSales < 0
          }
        />
      </div>

      <ToleranceTitle title="Marketing Tolerance" />

      <div className="flex flex-row w-3/5 space-x-4">
        <ToleranceMetric
          name="Revenue Growth (%)"
          setValue={setRevenueGrowth}
          value={revenueGrowth}
          error={revenueGrowth.toString().length == 0 || revenueGrowth < 0}
        />
        <ToleranceMetric
          name="Market Share (%)"
          setValue={setMarketShare}
          value={marketShare}
          error={marketShare.toString().length == 0 || marketShare < 0}
        />

        <ToleranceMetric
          name="New Customers"
          setValue={setNewCustomers}
          value={newCustomers}
          error={newCustomers.toString().length == 0 || newCustomers < 0}
        />
      </div>

      <ToleranceTitle title="Business Continuity Tolerance" />
      <div className="flex flex-row w-3/5 space-x-4">
        <ToleranceMetric
          name="Employee Turnover (%)"
          setValue={setEmployeeTurnover}
          value={employeeTurnover}
          error={
            employeeTurnover.toString().length == 0 || employeeTurnover < 0
          }
        />
        <ToleranceMetric
          name="Loss on major upheaval (%)"
          setValue={setLossOnMajorUpheaval}
          value={lossOnMajorUpheaval}
          error={
            lossOnMajorUpheaval.toString().length == 0 ||
            lossOnMajorUpheaval < 0
          }
        />

        <ToleranceMetric
          name="Solvency ratio (%)"
          setValue={setSolvencyRatio}
          value={solvencyRatio}
          error={solvencyRatio.toString().length == 0 || solvencyRatio < 0}
        />
      </div>
    </div>
  );
}
