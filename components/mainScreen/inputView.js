"use strict";
import React, { useState, useEffect, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import readXlsxFile from "read-excel-file";
import { Accordion, Button, Dropdown, Icon } from "semantic-ui-react";
import { CornerDialog } from "evergreen-ui";
import QualitativeInput from "../common/qualitativeInput";
import ToleranceTitle from "../common/toleranceTitle";

import { RatioContext } from "../../contexts/ratioContext";
import { DataLoadedContext } from "../../contexts/dataLoadedContext";
import { UserContext } from "../../contexts/userContext";

export default function InputView() {
  const [startDate, setStartDate] = useState(new Date());
  const [fetchingData, setfetchingData] = useState(false);
  const [fileName, setFileName] = useState("INPUT 1");
  const [file1Uploaded, setFile1Uploaded] = useState(false);
  const [fileName2, setFileName2] = useState("INPUT 2");
  const [currentFigures, setCurrentFigures] = useState({});
  const [previousFigures, setPreviousFigures] = useState({});
  const [ytdFigures, setYtdFigures] = useState({});
  const [currBalancesheetFigures, setCurrBalancesheetFigures] = useState({});
  const [prevBalancesheetFigures, setPrevBalancesheetFigures] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [dialogIsShown, setDialogIsShown] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");

  //Strategic Values
  const [pdctDev, setPdctDev] = useState(40);
  const [investNewTech, setInvestNewTech] = useState(15);
  const [businessCont, setBusinessCont] = useState(40);
  const [expToNewMarket, setExpToNewMarket] = useState(40);
  const [brandRisk, setBrandRisk] = useState(15);

  //Operational Values
  const [disruptionOp, setDisruptionOp] = useState(40);
  const [lossOfKeyStaff, setLossOfKeyStaff] = useState(40);
  const [compromisePrdt, setCompromisePrdt] = useState(15);
  const [serviceDelays, setServiceDelays] = useState(40);
  const [disruptionSupplyChain, setDisruptionSupplyChain] = useState(40);

  //Financial Values
  const [customerDefaultRisk, setCustomerDefaultRisk] = useState(60);
  const [cashFlowConstraints, setcashFlowConstraints] = useState(40);
  const [fraudAndCorruption, setFraudAndCorruption] = useState(15);
  const [errorsAndMisstatements, setErrorsAndMisstatements] = useState(10);
  const [underUtilCapital, setUnderUtilCapital] = useState(40);

  //Compliance
  const [tax, setTax] = useState(15);
  const [contract, setContract] = useState(15);
  const [financialReporting, setFinancialReporting] = useState(15);
  const [govLicence, setGovLicence] = useState(15);

  const [quater, setQuater] = useState("Q1");
  const [year, setYear] = useState(new Date().getFullYear());
  const [quaterYear, setQuaterYear] = useState(`Q1${new Date().getFullYear()}`);
  const { ratios, setRatios } = useContext(RatioContext);
  const { loaded, setLoaded } = useContext(DataLoadedContext);
  const { user, setUser } = useContext(UserContext);
  const host = "http://localhost:3001";

  const [activeIndex, setActiveIndex] = useState(0);

  const quaterList = [
    {
      qtext: "Quater 1",
      abbr: "Q1",
    },
    {
      qtext: "Quater 2",
      abbr: "Q2",
    },
    {
      qtext: "Quater 3",
      abbr: "Q3",
    },
    {
      qtext: "Quater 4",
      abbr: "Q4",
    },
  ];

  const quaterOptions = _.map(quaterList, (quater, index) => ({
    key: quaterList[index].abbr,
    text: quaterList[index].qtext,
    value: quaterList[index].abbr,
  }));

  const saveData = () => {
    if (loaded) {
      Promise.all([
        //Operational Efficiency Current-- 0
        fetch(`${host}/operationalEfficiency/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operatingProfit: currentFigures["currentOperatingProfit"],
            totalRevenues: currentFigures["currentTotalRevenues"],
            period: "current",
            username: user.username,
            company: user.companyName,
            quater: quaterYear,
          }),
        }),
        // Operational Efficiency Previous 1
        fetch(`${host}/operationalEfficiency/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            operatingProfit: previousFigures["prevOperatingProfit"],
            totalRevenues: previousFigures["prevTotalRevenues"],
            period: "previous",
            username: user.username,
            company: user.companyName,
            quater: quaterYear,
          }),
        }),
        //Liquidity current --2
        fetch(`${host}/liquidity/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentAsset: currBalancesheetFigures["currentTotalCurrentAssets"],
            currentLiability:
              currBalancesheetFigures["currentTotalCurrentLiabilities"],
            inventory: currBalancesheetFigures["currentInventories"],
            period: "current",
            username: user.username,
            company: user.companyName,
            quater: quaterYear,
          }),
        }),
        //liquidity Previous --3
        fetch(`${host}/liquidity/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentAsset: prevBalancesheetFigures["previousTotalCurrentAssets"],
            currentLiability:
              prevBalancesheetFigures["previousTotalCurrentLiabilities"],
            inventory: prevBalancesheetFigures["previousInventories"],
            period: "previous",
            username: user.username,
            company: user.companyName,
            quater: quaterYear,
          }),
        }),
        //Profitability  Current-- 4
        fetch(`${host}/profitability/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            grossProfit: currentFigures["currentGrossProfit"],
            totalRevenues: currentFigures["currentTotalRevenues"],
            ebitda: currentFigures["currentEBITDA"],
            netProfit: currentFigures["currentNetProfit"],
            totalEquityAndReserve:
              currBalancesheetFigures["currentTotalCapitalAndReserves"],
            totalAssets: currBalancesheetFigures["currentTotalAssets"],
            period: "current",
            username: user.username,
            company: user.companyName,
            quater: quaterYear,
          }),
        }),
        //Profitability Previous--5
        fetch(`${host}/profitability/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            grossProfit: previousFigures["prevGrossProfit"],
            totalRevenues: previousFigures["prevTotalRevenues"],
            ebitda: previousFigures["prevEBITDA"],
            netProfit: previousFigures["prevNetProfit"],
            totalEquityAndReserve:
              prevBalancesheetFigures["previousTotalCapitalAndReserves"],
            totalAssets: prevBalancesheetFigures["previousTotalAssets"],
            period: "previous",
            username: user.username,
            company: user.companyName,
            quater: quaterYear,
          }),
        }),
        //Credit Risk Current -- 6
        fetch(`${host}/creditRisk/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalRevenues: currentFigures["currentTotalRevenues"],
            totalReceivables:
              currBalancesheetFigures["currentTotalReceivables"],
            period: "current",
            username: user.username,
            company: user.companyName,
            quater: quaterYear,
          }),
        }),
        //Credit Risk Previous--7
        fetch(`${host}/creditRisk/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalRevenues: previousFigures["prevTotalRevenues"],
            totalReceivables:
              prevBalancesheetFigures["previousTotalReceivables"],
            period: "previous",
            username: user.username,
            company: user.companyName,
            quater: quaterYear,
          }),
        }),
        //Marketing Current-- 8
        fetch(`${host}/marketing/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentTotalRevenues: currentFigures["currentTotalRevenues"],
            ytdTotalRevenue: ytdFigures["ytdTotalRevenues"],
            period: "current",
            username: user.username,
            company: user.companyName,
            quater: quaterYear,
          }),
        }),
        //Marketing Previous-- 9
        fetch(`${host}/marketing/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentTotalRevenues: previousFigures["prevTotalRevenues"],
            ytdTotalRevenue: ytdFigures["ytdTotalRevenues"],
            period: "previous",
            username: user.username,
            company: user.companyName,
            quater: quaterYear,
          }),
        }),
        //Business Continuity Current-- 10
        fetch(`${host}/businessContinuity/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            netProfit: currentFigures["currentNetProfit"],
            totalDepreciation: currentFigures["currentDepreciation"],
            nonCurrentLiabilities:
              currBalancesheetFigures["currentTotalNonCurrentLiabilites"],
            currentLiabilities:
              currBalancesheetFigures["currentTotalCurrentLiabilities"],
            period: "current",
            username: user.username,
            company: user.companyName,
            quater: quaterYear,
          }),
        }),
        //Business Continuity Previous-- 11
        fetch(`${host}/businessContinuity/`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            netProfit: previousFigures["prevNetProfit"],
            totalDepreciation: previousFigures["prevDepreciation"],
            nonCurrentLiabilities:
              prevBalancesheetFigures["previousTotalNonCurrentLiabilities"],
            currentLiabilities:
              prevBalancesheetFigures["previousTotalCurrentLiabilities"],
            period: "previous",
            username: user.username,
            company: user.companyName,
            quater: quaterYear,
          }),
        }),
      ])
        .then(function (responses) {
          // Get a JSON object from each of the responses
          return Promise.all(
            responses.map(function (response) {
              console.log(response);
              return response.json();
            })
          );
        })
        .then(function (data) {
          // Log the data to the console
          // You would do something with both sets of data here
          let _ratios = [
            {
              metric: "Operating Expenses",
              category: "operationalEfficiency",
              currentPerformance: data[0].operatingExpenses,
              previousPerformance: data[1].operatingExpenses, //TODO
              riskTolerance: presetValues["operatingExpenses"],
            },
            {
              metric: "System Uptime",
              category: "operationalEfficiency",
              currentPerformance: data[0].systemUptime,
              previousPerformance: data[1].systemUptime, //TODO
              riskTolerance: presetValues["systemUptime"],
            },
            {
              metric: "Machinery Uptime",
              category: "operationalEfficiency",
              currentPerformance: data[0].machineryUptime,
              previousPerformance: data[1].machineryUptime, //TODO
              riskTolerance: presetValues["machineryUptime"],
            },
            {
              metric: "Current Ratio",
              category: "liquidity",
              currentPerformance: data[2].currentRatio,
              previousPerformance: data[3].currentRatio,
              riskTolerance: presetValues["currentRatio"],
            },
            {
              metric: "Quick Ratio",
              category: "liquidity",
              currentPerformance: data[2].quickRatio,
              previousPerformance: data[3].quickRatio, //TODO
              riskTolerance: presetValues["quickRatio"],
            },
            {
              metric: "GP Margin",
              category: "profitability",
              currentPerformance: data[4].gpMargin,
              previousPerformance: data[5].gpMargin, //TODO
              riskTolerance: presetValues["gpMargin"],
            },

            {
              metric: "EBITDA Margin",
              category: "profitability",
              currentPerformance: data[4].ebitdaMargin,
              previousPerformance: data[5].ebitdaMargin, //TODO
              riskTolerance: presetValues["ebitda"],
            },
            {
              metric: "Return On Equity",
              category: "profitability",
              currentPerformance: data[4].returnOnEquity,
              previousPerformance: data[5].returnOnEquity, //TODO
              riskTolerance: presetValues["roe"],
            },
            {
              metric: "Return On Assets",
              category: "profitability",
              currentPerformance: data[4].returnOnAsset,
              previousPerformance: data[5].returnOnAsset,
              riskTolerance: presetValues["roa"],
            },
            {
              metric: "Net Profit Margin",
              category: "profitability",
              currentPerformance: data[4].netProfitMargin,
              previousPerformance: data[5].netProfitMargin, //TODO
              riskTolerance: presetValues["netProfitMargin"],
            },
            {
              metric: "Average Collection Period",
              category: "creditRisk",
              currentPerformance: data[6].averageCollectionPeriod,
              previousPerformance: data[7].averageCollectionPeriod, //TODO
              riskTolerance: presetValues["averageCollectionPeriod"],
            },
            {
              metric: "Total Receivables/Sales",
              category: "creditRisk",
              currentPerformance: data[6].totalReceivablePerSales,
              previousPerformance: data[7].totalReceivablePerSales, //TODO
              riskTolerance: presetValues["totalReceivablePerSales"],
            },
            {
              metric: "Revenue Growth",
              category: "marketing",
              currentPerformance: data[8].revenueGrowth,
              previousPerformance: data[9].revenueGrowth, //TODO
              riskTolerance: presetValues["revenueGrowth"],
            },
            {
              metric: "Market Share",
              category: "marketing",
              currentPerformance: data[8].marketShare,
              previousPerformance: data[9].marketShare, //TODO
              riskTolerance: presetValues["marketShare"],
            },
            {
              metric: "New Customers",
              category: "marketing",
              currentPerformance: data[8].newCustomers,
              previousPerformance: data[9].newCustomers, //TODO
              riskTolerance: presetValues["newCustomers"],
            },
            {
              metric: "Employee Turnover",
              category: "businessContinuity",
              currentPerformance: data[10].employeeTurnover,
              previousPerformance: data[11].employeeTurnover, //TODO
              riskTolerance: presetValues["employeeTurnover"],
            },
            {
              metric: "Loss on major Upheaval",
              category: "businessContinuity",
              currentPerformance: data[10].lossOnMajorUpheaval,
              previousPerformance: data[11].lossOnMajorUpheaval, //TODO
              riskTolerance: presetValues["lossOnMajorUpheaval"],
            },
            {
              metric: "Solvency Ratio",
              category: "businessContinuity",
              currentPerformance: data[10].solvencyRatioMetric,
              previousPerformance: data[11].solvencyRatioMetric, //TODO
              riskTolerance: presetValues["solvencyRatio"],
            },
          ];
          setRatios(_ratios);
          setErrorMessage("Data successfully saved.");
          setDialogIsShown(true);
        })
        .catch((err) => {
          setMessageTitle("Operation Failed!");
          setErrorMessage(`An error occured : ${err}`);
          setDialogIsShown(true);
        });
    } else {
      console.log("No data loaded");
    }
  };

  useEffect(() => {
    setLoaded(false);
  }, []);

  const handleExpand = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };
  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-1/2">
        <CornerDialog
          title={messageTitle}
          hasFooter={false}
          isShown={dialogIsShown}
          onCloseComplete={() => setDialogIsShown(false)}
        >
          {errorMessage}
        </CornerDialog>
        {/* Title */}
        <div className="font-semibold text-gray-600">Input</div>
        {/* Input form */}
        <div className="mt-10 mb-10">
          <form>
            <div className="flex flex-row w-2/5 mt-2 mr-5">
              {/* <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
              Reporting Date
            </label>
            <DatePicker
              className="border-2 py-2 px-3 text-sm text-gray-500 focus:border-gray-100 rounded-lg "
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              placeholderText="Reporting Date"
              showPopperArrow={false}
            /> */}

              <div class="flex flex-col mr-5">
                <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                  Quater
                </label>
                <Dropdown
                  placeholder="Quater"
                  search
                  selection
                  value={quater}
                  options={quaterOptions}
                  onChange={(e, { value }) => {
                    setQuater(value);
                    setQuaterYear(value + year);
                  }}
                />
              </div>

              <div class="flex flex-col mr-5">
                <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
                  Year
                </label>
                <input
                  className="border-2 py-2 px-3 text-sm text-gray-500  border-gray-100 focus:border-gray-400  rounded-lg "
                  value={year}
                  type="number"
                  onChange={(e) => {
                    setYear(e.target.value);
                    setQuaterYear(quater + e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="font-semibold text-gray-600 mt-10">
              Quantitative Metrics
            </div>

            <div className="flex flex-row w-3/5">
              <div className="flex h-16 pt-5 mr-10">
                <label className="w-36 flex flex-row justify-center items-center bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-400 hover:text-white">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="pl-2 text-sm font-semibold leading-normal">
                    {fileName}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    webkitdirectory
                    directory
                    multiple
                    // value={fileName}
                    onChange={(e) => {
                      setFileName("Done!");
                      readXlsxFile(e.target.files[0])
                        .then((rows) => {
                          // console.log(rows);
                          //previous quater figures
                          let prevTotalRevenues = rows[12][10];
                          let prevDepreciation = rows[17][10];
                          let prevGrossProfit = rows[21][10];
                          let prevOperatingProfit = rows[27][10];
                          let prevNetProfit = rows[32][10];
                          let prevEBITDA = rows[34][10];

                          setPreviousFigures({
                            prevTotalRevenues,
                            prevDepreciation,
                            prevGrossProfit,
                            prevOperatingProfit,
                            prevNetProfit,
                            prevEBITDA,
                          });
                          //current quater figures
                          let currentTotalRevenues = rows[12][15];
                          let currentDepreciation = rows[17][15];
                          let currentGrossProfit = rows[21][15];
                          let currentOperatingProfit = rows[27][15];
                          let currentNetProfit = rows[32][15];
                          let currentEBITDA = rows[34][15];

                          setCurrentFigures({
                            currentTotalRevenues,
                            currentDepreciation,
                            currentGrossProfit,
                            currentOperatingProfit,
                            currentNetProfit,
                            currentEBITDA,
                          });

                          //YTD figures
                          let ytdTotalRevenues = rows[12][16];
                          let ytdDepreciation = rows[17][16];
                          let ytdGrossProfit = rows[21][16];
                          let ytdOperatingProfit = rows[27][16];
                          let ytdNetProfit = rows[32][16];
                          let ytdEBITDA = rows[34][16];

                          setYtdFigures({
                            ytdTotalRevenues,
                            ytdDepreciation,
                            ytdGrossProfit,
                            ytdOperatingProfit,
                            ytdNetProfit,
                            ytdEBITDA,
                          });

                          setMessageTitle("Success!");
                          setErrorMessage(
                            "INPUT 1 Data successfully read. Please Upload INPUT 2 data also."
                          );
                          setDialogIsShown(true);
                          setFile1Uploaded(true);
                        })
                        .catch((err) => {
                          setFileName2("Error!");
                          setMessageTitle("File format Issue!");
                          setErrorMessage(
                            "There was an issue uploading the file. Please check the file format against the template excel template!"
                          );
                          setDialogIsShown(true);
                        });
                    }}
                  />
                </label>
              </div>

              <div className="flex h-16 pt-5 mr-10">
                <label
                  className={
                    file1Uploaded
                      ? "w-36 flex flex-row justify-center items-center bg-white text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border border-blue-400 cursor-pointer transition duration-300 ease-in-out hover:bg-blue-400 hover:text-white"
                      : "w-36 flex flex-row justify-center items-center bg-white text-gray-400 rounded-lg shadow-lg tracking-wide uppercase border border-gray-400 cursor-not-allowed"
                  }
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                  </svg>
                  <span className="pl-2 text-sm font-semibold leading-normal">
                    {fileName2}
                  </span>
                  <input
                    disabled={!file1Uploaded}
                    type="file"
                    className="hidden"
                    webkitdirectory
                    directory
                    multiple
                    // value={fileName}
                    onChange={(e) => {
                      setFileName2("Done!");
                      readXlsxFile(e.target.files[0])
                        .then((rows) => {
                          let currentTotalNonCurrentAssets = rows[11][2];
                          let currentTotalCurrentAssets = rows[18][2];
                          let currentTotalAssets = rows[19][2];
                          let currentTradeReceivables = rows[14][2];
                          let currentRelatedPartyReceivables = rows[16][2];
                          let currentTotalReceivables =
                            currentTradeReceivables +
                            currentRelatedPartyReceivables;
                          let currentTotalNonCurrentLiabilites = rows[32][2];
                          let currentTotalCurrentLiabilities = rows[39][2];
                          let currentInventories = rows[13][2];
                          let currentTotalCapitalAndReserves = rows[28][2];

                          let currentBalancesheetFigures = {
                            currentTotalNonCurrentAssets,
                            currentTotalCurrentAssets,
                            currentTotalAssets,
                            currentTotalReceivables,
                            currentTotalNonCurrentLiabilites,
                            currentTotalCurrentLiabilities,
                            currentInventories,
                            currentTotalCapitalAndReserves,
                          };

                          setCurrBalancesheetFigures(
                            currentBalancesheetFigures
                          );

                          let previousTotalNonCurrentAssets = rows[11][3];
                          let previousTotalCurrentAssets = rows[18][3];
                          let previousTotalAssets = rows[19][3];
                          let previousTradeReceivables = rows[14][3];
                          let previousRelatedPartyReceivables = rows[16][3];
                          let previousTotalReceivables =
                            previousTradeReceivables +
                            previousRelatedPartyReceivables;
                          let previousTotalNonCurrentLiabilities = rows[32][3];
                          let previousTotalCurrentLiabilities = rows[39][3];
                          let previousInventories = rows[13][3];
                          let previousTotalCapitalAndReserves = rows[28][3];

                          let previousBalancesheetFigures = {
                            previousTotalNonCurrentAssets,
                            previousTotalCurrentAssets,
                            previousTotalAssets,
                            previousTotalReceivables,
                            previousTotalNonCurrentLiabilities,
                            previousTotalCurrentLiabilities,
                            previousInventories,
                            previousTotalCapitalAndReserves,
                          };
                          setMessageTitle("Success!");
                          setErrorMessage("INPUT 2 Data successfully read.");
                          setDialogIsShown(true);

                          setPrevBalancesheetFigures(
                            previousBalancesheetFigures
                          );
                          setLoaded(true);
                        })
                        .catch((err) => {
                          setFileName2("Error!");
                          setMessageTitle("File format Issue!");
                          setErrorMessage(
                            "There was an issue uploading the file. Please check the file format against the excel template!"
                          );
                          setDialogIsShown(true);
                        });
                    }}
                  />
                </label>
              </div>
            </div>

            <div className="font-semibold text-gray-600 mt-10">
              Qualitative Metrics (Implementation Level)
            </div>
            <Accordion>
              <Accordion.Title
                active={activeIndex === 0}
                index={0}
                onClick={handleExpand}
              >
                <div className="flex flex-row items-center">
                  <ToleranceTitle title="Strategic" />
                  <div className="mt-5">
                    <Icon name="dropdown" />
                  </div>
                </div>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 0}>
                <QualitativeInput
                  title="Product dev. and innovation"
                  setQualValues={setPdctDev}
                  value={pdctDev}
                />
                <QualitativeInput
                  title="Investment in new Technologies"
                  setQualValues={setInvestNewTech}
                  value={investNewTech}
                />
                <QualitativeInput
                  title="Business continuity and disaster recovery"
                  setQualValues={setBusinessCont}
                  value={businessCont}
                />
                <QualitativeInput
                  title="Expansion to new markets"
                  setQualValues={setExpToNewMarket}
                  value={expToNewMarket}
                />
                <QualitativeInput
                  title="Brand/reputation risk"
                  setQualValues={setBrandRisk}
                  value={brandRisk}
                />
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 1}
                index={1}
                onClick={handleExpand}
              >
                <div className="flex flex-row items-center">
                  <ToleranceTitle title="Operational" />
                  <div className="mt-5">
                    <Icon name="dropdown" />
                  </div>
                </div>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 1}>
                <QualitativeInput
                  title="Disruption of operations"
                  setQualValues={setDisruptionOp}
                  value={disruptionOp}
                />
                <QualitativeInput
                  title="Loss of key staff"
                  setQualValues={setLossOfKeyStaff}
                  value={lossOfKeyStaff}
                />
                <QualitativeInput
                  title="Compromise of product and service quality"
                  setQualValues={setCompromisePrdt}
                  value={compromisePrdt}
                />
                <QualitativeInput
                  title="Service delays"
                  setQualValues={setServiceDelays}
                  value={serviceDelays}
                />
                <QualitativeInput
                  title="Disruptions to supply chain"
                  setQualValues={setDisruptionSupplyChain}
                  value={disruptionSupplyChain}
                />
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 2}
                index={2}
                onClick={handleExpand}
              >
                <div className="flex flex-row items-center">
                  <ToleranceTitle title="Financial" />
                  <div className="mt-5">
                    <Icon name="dropdown" />
                  </div>
                </div>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 2}>
                <QualitativeInput
                  title="Customer default risk"
                  setQualValues={setCustomerDefaultRisk}
                  value={customerDefaultRisk}
                />
                <QualitativeInput
                  title="Cash-flow constraints"
                  setQualValues={setcashFlowConstraints}
                  value={cashFlowConstraints}
                />
                <QualitativeInput
                  title="Fraud and corruption"
                  setQualValues={setFraudAndCorruption}
                  value={fraudAndCorruption}
                />
                <QualitativeInput
                  title="Errors and misstatements"
                  setQualValues={setErrorsAndMisstatements}
                  value={errorsAndMisstatements}
                />
                <QualitativeInput
                  title="Under-utilization of capital"
                  setQualValues={setUnderUtilCapital}
                  value={underUtilCapital}
                />
              </Accordion.Content>

              <Accordion.Title
                active={activeIndex === 3}
                index={3}
                onClick={handleExpand}
              >
                <div className="flex flex-row items-center">
                  <ToleranceTitle title="Compliance" />
                  <div className="mt-5">
                    <Icon name="dropdown" />
                  </div>
                </div>
              </Accordion.Title>
              <Accordion.Content active={activeIndex === 3}>
                <QualitativeInput
                  title="Tax compliance"
                  setQualValues={setTax}
                  value={tax}
                />
                <QualitativeInput
                  title="Contract compliance"
                  setQualValues={setContract}
                  value={contract}
                />
                <QualitativeInput
                  title="Financial reporting compliance"
                  setQualValues={setFinancialReporting}
                  value={financialReporting}
                />
                <QualitativeInput
                  title="Government licenses and regulations"
                  setQualValues={setGovLicence}
                  value={govLicence}
                />
              </Accordion.Content>
            </Accordion>
          </form>
          <div className="pt-5">
            <Button disabled={!loaded} onClick={() => saveData()} color="blue">
              Save
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
