"use strict";
import React, { useState, useEffect, useContext } from "react";
import "react-datepicker/dist/react-datepicker.css";
import readXlsxFile from "read-excel-file";
import { Accordion, Button, Dropdown, Icon } from "semantic-ui-react";
import {
  Checkbox,
  classicTheme,
  ConsoleIcon,
  CornerDialog,
  Dialog,
  Switch,
  ThemeProvider,
} from "evergreen-ui";
import QualitativeInput from "../common/qualitativeInput";
import ToleranceTitle from "../common/toleranceTitle";
import _ from "lodash";
import { DataLoadedContext } from "../../contexts/dataLoadedContext";
import { UserContext } from "../../contexts/userContext";
import { ToleranceContext } from "../../contexts/toleranceContext";
import { QuaterContext } from "../../contexts/quaterContext";
import { toUpper, trim } from "lodash";
import { toast, ToastContainer } from "react-toastify";
import ToleranceMetric from "../common/toleranceMetric";
import { CreatorsContext } from "../../contexts/creatorsContext";

export default function InputView() {
  const { loaded, setLoaded } = useContext(DataLoadedContext);
  const { user, setUser } = useContext(UserContext);
  const { globalQuater, setGlobalQuater } = useContext(QuaterContext);
  const { toleranceValues, setToleranceValues } = useContext(ToleranceContext);
  const { creators, setCreators } = useContext(CreatorsContext);

  const [dataCanBeRead, setDataCanBeRead] = useState(false);
  const [confirmLegitData, setConfirmLegitData] = useState(false);

  const [isFinancialCreator, setIsFinancialCreator] = useState(false);
  const [isNonFinancialCreator, setIsNonFinancialCreator] = useState(false);

  const [queryCompany, setQueryCompany] = useState(user.selectedCompany);
  const [companies, setCompanies] = useState([]);
  const [multipleOfThou, setMultipleOfThou] = useState(true);

  const [startDate, setStartDate] = useState(new Date());
  const [fetchingData, setfetchingData] = useState(false);
  const [fileName, setFileName] = useState("INPUT 1");
  const [file1Uploaded, setFile1Uploaded] = useState(true);
  const [fileName2, setFileName2] = useState("Financial Report");
  const [dataUploaded, setDataUploaded] = useState(false);
  const [currentFigures, setCurrentFigures] = useState({});
  const [previousFigures, setPreviousFigures] = useState({});
  const [ytdFigures, setYtdFigures] = useState({});
  const [prevYtdFigures, setPrevYtdFigures] = useState({});
  const [currBalancesheetFigures, setCurrBalancesheetFigures] = useState({});
  const [prevBalancesheetFigures, setPrevBalancesheetFigures] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [dialogIsShown, setDialogIsShown] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");

  const [dErrorMessage, setDerrorMessage] = useState("");
  const [dDialogIsShown, setDdialogIsShown] = useState(false);
  const [dMessageTitle, setDmessageTitle] = useState("");

  const [systemUptime, setSystemUptime] = useState(90);
  const [systemUptimeP, setSystemUptimeP] = useState(70);
  const [machineryUptime, setMachineryUptime] = useState(90);
  const [machineryUptimeP, setMachineryUptimeP] = useState(70);

  const [marketShare, setMarketShare] = useState(60);
  const [marketShareP, setMarketShareP] = useState(60);
  const [newCustomers, setNewCustomers] = useState(30);
  const [newCustomersP, setNewCustomersP] = useState(30);

  //
  const [lossOnMajorUpheaval, setLossOnMajorUpheaval] = useState(5);
  const [lossOnMajorUpheavalP, setLossOnMajorUpheavalP] = useState(5);

  const [employeeTurnover, setEmployeeTurnover] = useState(2);
  const [employeeTurnoverP, setEmployeeTurnoverP] = useState(2);

  //Strategic Values
  const [pdctDev, setPdctDev] = useState(70);
  const [investNewTech, setInvestNewTech] = useState(60);
  const [businessCont, setBusinessCont] = useState(70);
  const [expToNewMarket, setExpToNewMarket] = useState(70);
  const [brandRisk, setBrandRisk] = useState(70);

  //Operational Values
  const [disruptionOp, setDisruptionOp] = useState(70);
  const [lossOfKeyStaff, setLossOfKeyStaff] = useState(70);
  const [compromisePrdt, setCompromisePrdt] = useState(60);
  const [serviceDelays, setServiceDelays] = useState(70);
  const [disruptionSupplyChain, setDisruptionSupplyChain] = useState(70);

  //Financial Values
  const [customerDefaultRisk, setCustomerDefaultRisk] = useState(60);
  const [cashFlowConstraints, setcashFlowConstraints] = useState(70);
  const [fraudAndCorruption, setFraudAndCorruption] = useState(90);
  const [errorsAndMisstatements, setErrorsAndMisstatements] = useState(80);
  const [underUtilCapital, setUnderUtilCapital] = useState(70);

  //Compliance
  const [tax, setTax] = useState(90);
  const [contract, setContract] = useState(90);
  const [financialReporting, setFinancialReporting] = useState(90);
  const [govLicence, setGovLicence] = useState(90);

  const [quater, setQuater] = globalQuater
    ? useState(globalQuater?.substr(0, 2))
    : useState(new Date().getFullYear());
  const [year, setYear] = globalQuater
    ? useState(globalQuater?.substr(globalQuater.length - 4))
    : useState(new Date().getFullYear());

  const [quaterYear, setQuaterYear] = useState(globalQuater);
  const [presetValues, setPresetValues] = useState({});

  const host = `http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001`;

  const [activeIndex, setActiveIndex] = useState(0);

  const quaterList = [
    {
      qtext: "Quarter 1",
      abbr: "Q1",
    },
    {
      qtext: "Quarter 2",
      abbr: "Q2",
    },
    {
      qtext: "Quarter 3",
      abbr: "Q3",
    },
    {
      qtext: "Quarter 4",
      abbr: "Q4",
    },
  ];
  const quaterOptions = _.map(quaterList, (quater, index) => ({
    key: quaterList[index].abbr,
    text: quaterList[index].qtext,
    value: quaterList[index].abbr,
  }));

  const sofpDataStructure = [
    {
      variable: "totalNonCurrentAssets",
      title: "TOTAL NON-CURRENT ASSETS",
      currentValue: 0,
      previousValue: 0,
      ytdValue: 0,
    },
    {
      variable: "totalCurrentAssets",
      title: "TOTAL CURRENT ASSETS",
      currentValue: 0,
      previousValue: 0,
      ytdValue: 0,
    },
    {
      variable: "totalAssets",
      title: "TOTAL ASSETS",
      currentValue: 0,
      previousValue: 0,
      ytdValue: 0,
    },
    {
      variable: "totalCapitalAndReserves",
      title: "TOTAL CAPITAL AND RESERVES",
      currentValue: 0,
      previousValue: 0,
      ytdValue: 0,
    },
    {
      variable: "totalNonCurrentLiabilities",
      title: "TOTAL NON-CURRENT LIABILITIES",
      currentValue: 0,
      previousValue: 0,
      ytdValue: 0,
    },
    {
      variable: "totalCurrentLiabilities",
      title: "TOTAL CURRENT LIABILITIES",
      currentValue: 0,
      previousValue: 0,
      ytdValue: 0,
    },
    {
      variable: "totalEquityAndLiabilities",
      title: "TOTAL EQUITY AND LIABILITIES",
      currentValue: 0,
      previousValue: 0,
      ytdValue: 0,
    },
    {
      variable: "inventories",
      title: "INVENTORIES",
      currentValue: 0,
      previousValue: 0,
      ytdValue: 0,
    },
    {
      variable: "totalReceivables",
      title: "TOTAL RECEIVABLES",
      currentValue: 0,
      previousValue: 0,
      ytdValue: 0,
    },
  ];

  const sociDataStructures = [
    {
      variable: "totalRevenues",
      title: "TURNOVER",
      currentValue: 0,
      previousValue: 0,
    },
    {
      variable: "grossProfit",
      title: "GROSS PROFIT",
      currentValue: 0,
      previousValue: 0,
    },
    {
      variable: "totalOperatingExpenses",
      title: "TOTAL OPERATING EXPENSES",
      currentValue: 0,
      previousValue: 0,
    },
    {
      variable: "operatingProfit",
      title: "EBIT (OPERATING PROFIT)",
      currentValue: 0,
      previousValue: 0,
    },
    {
      variable: "netProfit",
      title: "NET PROFIT",
      currentValue: 0,
      previousValue: 0,
    },
    {
      variable: "ebitda",
      title: "EBITDA",
      currentValue: 0,
      previousValue: 0,
    },
    {
      variable: "depreciation",
      title: "DEPRECIATION",
      currentValue: 0,
      previousValue: 0,
    },
  ];

  const saveData = () => {
    let dataObject = {
      operatingProfit: currentFigures["currentOperatingProfit"],
      operatingExpense: currentFigures["currentOperatingExpenses"],
      totalRevenues: currentFigures["currentTotalRevenues"],
      systemUptime,
      machineryUptime,
      systemUptimeP,
      machineryUptimeP,
      currentAsset: currBalancesheetFigures["currentTotalCurrentAssets"],
      currentLiability:
        currBalancesheetFigures["currentTotalCurrentLiabilities"],
      inventory: currBalancesheetFigures["currentInventories"],
      grossProfit: currentFigures["currentGrossProfit"],
      ebitda: currentFigures["currentEBITDA"],
      netProfit: currentFigures["currentNetProfit"],
      totalEquityAndReserve:
        currBalancesheetFigures["currentTotalCapitalAndReserves"],
      totalAssets: currBalancesheetFigures["currentTotalAssets"],
      totalReceivables: currBalancesheetFigures["currentTotalReceivables"],
      prevYtdTotalRevenue: previousFigures["prevTotalRevenues"],
      ytdTotalRevenue: ytdFigures["ytdTotalRevenues"],
      marketShare,
      newCustomers,
      marketShareP,
      newCustomersP,
      totalDepreciation: currentFigures["currentDepreciation"],
      nonCurrentLiabilities:
        currBalancesheetFigures["currentTotalNonCurrentLiabilites"],
      currentLiabilities:
        currBalancesheetFigures["currentTotalCurrentLiabilities"],
      employeeTurnover,
      employeeTurnoverP,
      lossOnMajorUpheaval,
      lossOnMajorUpheavalP,
      pdctDev,
      investNewTech,
      businessCont,
      expToNewMarket,
      brandRisk,
      disruptionOp,
      lossOfKeyStaff,
      compromisePrdt,
      serviceDelays,
      customerDefaultRisk,
      cashFlowConstraints,
      fraudAndCorruption,
      errorsAndMisstatements,
      underUtilCapital,
      tax,
      contract,
      financialReporting,
      govLicence,
    };

    let emptyProps = [];
    _.forIn(dataObject, (v, key) => {
      if (v?.length == 0) {
        emptyProps.push(key);
      }
    });

    if (dataCanBeRead) {
      if (emptyProps?.length > 0) {
        toast.error("Some fields are empty!");
      } else {
        Promise.all([
          //Operational Efficiency Current-- 0
          fetch(`${host}/operationalEfficiency/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              operatingProfit: currentFigures["currentOperatingProfit"],
              operatingExpense: currentFigures["currentOperatingExpenses"],
              totalRevenues: currentFigures["currentTotalRevenues"],
              systemUptime,
              machineryUptime,
              period: "current",
              username: user.username,
              company: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
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
              operatingExpense: previousFigures["prevOperatingExpenses"],
              totalRevenues: previousFigures["prevTotalRevenues"],
              systemUptime: systemUptimeP,
              machineryUptime: machineryUptimeP,
              period: "previous",
              username: user.username,
              company: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
            }),
          }),
          //Liquidity current --2
          fetch(`${host}/liquidity/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currentAsset:
                currBalancesheetFigures["currentTotalCurrentAssets"],
              currentLiability:
                currBalancesheetFigures["currentTotalCurrentLiabilities"],
              inventory: currBalancesheetFigures["currentInventories"],
              period: "current",
              username: user.username,
              company: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
            }),
          }),
          //liquidity Previous --3
          fetch(`${host}/liquidity/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              currentAsset:
                prevBalancesheetFigures["previousTotalCurrentAssets"],
              currentLiability:
                prevBalancesheetFigures["previousTotalCurrentLiabilities"],
              inventory: prevBalancesheetFigures["previousInventories"],
              period: "previous",
              username: user.username,
              company: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
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
              company: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
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
              company: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
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
              company: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
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
              company: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
            }),
          }),
          //Marketing Current-- 8
          fetch(`${host}/marketing/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prevYtdTotalRevenue: previousFigures["prevTotalRevenues"],
              ytdTotalRevenue: ytdFigures["ytdTotalRevenues"],
              marketShare,
              newCustomers,
              period: "current",
              username: user.username,
              company: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
            }),
          }),
          //Marketing Previous-- 9
          fetch(`${host}/marketing/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              prevYtdTotalRevenue: previousFigures["prevTotalRevenues"],
              ytdTotalRevenue: ytdFigures["ytdTotalRevenues"],
              marketShare: marketShareP,
              newCustomers: newCustomersP,
              period: "previous",
              username: user.username,
              company: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
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
              lossOnMajorUpheaval,
              employeeTurnover,
              period: "current",
              username: user.username,
              company: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
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
              lossOnMajorUpheaval: lossOnMajorUpheavalP,
              employeeTurnover: employeeTurnoverP,
              period: "previous",
              username: user.username,
              company: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
            }),
          }),

          //Qualitative Values
          fetch(`${host}/strategic/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              pdctDev,
              investNewTech,
              businessCont,
              expToNewMarket,
              brandRisk,
              period: "current",
              username: user.username,
              companyName: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
            }),
          }),

          fetch(`${host}/operational/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              disruptionOp,
              lossOfKeyStaff,
              compromisePrdt,
              serviceDelays,
              disruptionSupplyChain,
              period: "current",
              username: user.username,
              companyName: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
            }),
          }),

          fetch(`${host}/financial/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              customerDefaultRisk,
              cashFlowConstraints,
              fraudAndCorruption,
              errorsAndMisstatements,
              underUtilCapital,
              period: "current",
              username: user.username,
              companyName: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
            }),
          }),

          fetch(`${host}/compliance/`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              tax,
              contract,
              financialReporting,
              govLicence,
              period: "current",
              username: user.username,
              companyName: queryCompany,
              quater: quaterYear,
              year: year,
              createdBy: user.id,
            }),
          }),
        ])
          .then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(
              responses.map(function (response) {
                return response.json();
              })
            );
          })
          .then(function (data) {
            toast.success("Successfully Saved!");

            createEvent("perfomanceSaved", {
              title: "Perfomance Data Saved",
              description: `Performance data for ${queryCompany}, ${quater}-${year} saved`,
              payload: dataObject,
              author: user.username,
            });

            createEvent("sofpDataSaved", {
              title: "SOFP Data saved",
              description: `SOFP data for ${queryCompany}, ${quater}-${year} saved`,
              company: `${queryCompany}`,
              quarter: `${quater}${year}`,
              payload: {
                currBalancesheetFigures,
                prevBalancesheetFigures,
                multipleOfThou,
              },
              author: user.username,
            });

            createEvent("sociDataSaved", {
              title: "SOCI Data saved",
              description: `SOCI data for ${queryCompany}, ${quater}-${year} saved`,
              company: `${queryCompany}`,
              quarter: `${quater}${year}`,
              payload: {
                currentFigures,
                prevYtdFigures,
                previousFigures,
                multipleOfThou,
              },
              author: user.username,
            });

            sendBulkEmail();
            // setErrorMessage("Data successfully saved.");
            setDialogIsShown(false);
          })
          .catch((err) => {
            toast.error("Operation Failed!");
            setMessageTitle("Failure!");
            setErrorMessage(`An error occured : ${err}`);
            setDialogIsShown(true);
          });
      }
    } else {
      toast.error("Flash Report not available!");
    }
  };

  function sendBulkEmail() {
    fetch(
      `http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/users/company/${queryCompany}`,
      {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + "",
          "Content-Type": "application/json",
        }),
      }
    )
      .then((response) => response.json())
      .then((response) => {
        let emailList = response.map((r) => {
          return r.email;
        });

        if (emailList.length > 0) {
          fetch(
            `http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/email/send`,
            {
              method: "POST",
              headers: new Headers({
                Authorization: "Bearer " + "",
                "Content-Type": "application/json",
              }),
              body: JSON.stringify({
                from: "riskinfo@cvl.co.rw",
                to: emailList,
                subject: "Risk map updated.",
                messageType: "riskMapUpdated",
              }),
            }
          )
            .then((res) => res.json())
            .then((res) => {})
            .catch((err) => {
              toast.error("Error while sending bulk email!");
            });
        }
      })
      .catch((err) => {
        toast.error("Can't connect to server!");
      });
  }

  function createEvent(eventType, data) {
    fetch(`${host}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventType,
        data,
      }),
    })
      .then((res) => res.json())
      .then((response) => {})
      .catch((err) => {});
  }

  useEffect(() => {
    fetch(`http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001/companies/`, {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + "",
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((response) => setCompanies(response))
      .catch((err) => {
        toast.error("Failed to fetch data!");
      });

    if (!toleranceValues) {
      setDmessageTitle("Tolerance values missing!");
      setDerrorMessage(
        "You can not upload or set the perfomance data before setting the Tolerance Values!"
      );
      setDdialogIsShown(true);
    }
  }, []);

  useEffect(() => {
    setIsFinancialCreator(creators?.financialCreator === user.id);
    setIsNonFinancialCreator(creators?.nonFinancialCreator === user.id);
  }, [creators]);

  const handleExpand = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };
  return (
    <div className="overflow-y-auto h-screen pb-32">
      <div className="flex flex-col w-1/2 ">
        <CornerDialog
          title={messageTitle}
          hasFooter={false}
          isShown={dialogIsShown}
          onCloseComplete={() => setDialogIsShown(false)}
        >
          {errorMessage}
        </CornerDialog>
        <ToastContainer />

        <Dialog
          isShown={dDialogIsShown}
          title={dMessageTitle}
          intent="danger"
          hasCancel={false}
          onConfirm={() => setDdialogIsShown(false)}
          confirmLabel="Ok, i'll fix it"
        >
          {dErrorMessage}
        </Dialog>
        {/* Title */}
        {/* <div className="font-medium text-gray-600">Input</div> */}
        {/* Input form */}
        <div className="mt-1 mb-10">
          <form>
            <div className="flex flex-row w-2/5 mt-2 mr-5">
              {/* <label className="font-medium text-gray-500 text-sm mb-1 ml-1">
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
                <label className="font-medium text-gray-500 text-sm mb-1 ml-1">
                  Quarter
                </label>
                <Dropdown
                  placeholder="Quarter"
                  search
                  selection
                  value={quater}
                  options={quaterOptions}
                  onChange={(e, { value }) => {
                    setQuater(value);
                    setQuaterYear(value + " " + year);
                    setGlobalQuater(value + " " + year);
                  }}
                />
              </div>

              <div class="flex flex-col mr-5">
                <label className="font-medium text-gray-500 text-sm mb-1 ml-1">
                  Year
                </label>
                <input
                  className="focus:outline-none border-2 border-gray-200 focus:border-blue-cvl-400 py-2.5 px-3 text-sm text-gray-500 shadow-inner rounded-lg"
                  value={year}
                  type="number"
                  onChange={(e) => {
                    setYear(e.target.value);
                    setQuaterYear(quater + " " + e.target.value);
                    setGlobalQuater(quater + " " + e.target.value);
                  }}
                />
              </div>

              {(user.profile === "Admin" ||
                user.profile === "EXCO" ||
                user.profile === "Tech" ||
                user.profile === "RD" ||
                user.profile === "SROF") && (
                <div class="flex flex-col mr-10">
                  <label className="font-medium text-gray-500 text-sm mb-1 ml-1">
                    Company
                  </label>
                  <Dropdown
                    placeholder="Company"
                    search
                    selection
                    value={queryCompany}
                    options={companies.map((c) => {
                      return {
                        key: c.name,
                        value: c.name,
                        text: c.name,
                      };
                    })}
                    onChange={(e, { value }) => {
                      setQueryCompany(value);
                      let _user = { ...user };
                      _user.selectedCompany = value;
                      setUser(_user);
                    }}
                  />
                </div>
              )}
            </div>

            {(!loaded || (loaded && isFinancialCreator)) && (
              <div className="flex flex-row space-x-16 items-center mt-10">
                <div className="font-medium text-gray-600">
                  Quantitative Metrics
                </div>

                <div className="flex flex-row space-x-1 items-center">
                  <ThemeProvider value={classicTheme}>
                    <Checkbox
                      // label="Controlled usage"
                      checked={multipleOfThou}
                      onChange={(e) => setMultipleOfThou(e.target.checked)}
                    />
                  </ThemeProvider>
                  <div className="font-normal text-gray-600">
                    Statements in Thousands
                  </div>
                </div>
              </div>
            )}

            {(!loaded || (loaded && isFinancialCreator)) && (
              <div className="flex flex-row">
                <div className="flex h-16 pt-5 mr-10">
                  <label
                    className={
                      file1Uploaded
                        ? "w-48 flex flex-row justify-center items-center bg-white text-blue-cvl-900 rounded-lg shadow-lg tracking-wide uppercase border border-blue-cvl-900 cursor-pointer transition duration-150 ease-linear hover:bg-blue-cvl-700 hover:text-white"
                        : "w-48 flex flex-row justify-center items-center bg-white text-gray-400 rounded-lg shadow-lg tracking-wide uppercase border border-gray-400 cursor-not-allowed"
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
                    <span className="pl-2 text-sm font-medium leading-normal">
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
                        setDialogIsShown(false);
                        let fullIndexData = {};
                        let currentBalancesheetFigures = {};
                        let previousBalancesheetFigures = {};
                        // this.readFile(e);

                        readXlsxFile(e.target.files[0], { sheet: "SOFP" })
                          .then((rows) => {
                            try {
                              sofpDataStructure.map((record) => {
                                let indexData = {
                                  titleIndex: -1,
                                  rowIndex: -1,
                                };
                                rows.map((row, rowIndex) => {
                                  let titleIndex = row.findIndex(
                                    (element) =>
                                      toUpper(trim(element)).replace(
                                        /\s\s+/g,
                                        " "
                                      ) === toUpper(trim(record?.title))
                                  );

                                  let values = row.filter(
                                    (element) => element !== null
                                  );

                                  if (titleIndex !== -1) {
                                    indexData = {
                                      titleIndex,
                                      rowIndex,
                                      currentValue: values[1],
                                      previousValue: values[2],
                                    };
                                    fullIndexData[`${record.variable}`] =
                                      indexData;
                                  } else {
                                    indexData = {
                                      titleIndex,
                                      rowIndex,
                                      currentValue: 0,
                                      previousValue: 0,
                                    };
                                  }
                                });
                              });

                              sofpDataStructure.map((record) => {
                                if (!(`${record.variable}` in fullIndexData)) {
                                  fullIndexData[`${record.variable}`] = {
                                    titleIndex: -1,
                                    rowIndex: -1,
                                    currentValue: 0,
                                    previousValue: 0,
                                  };
                                }
                              });

                              currentBalancesheetFigures = {
                                currentTotalNonCurrentAssets:
                                  fullIndexData.totalNonCurrentAssets
                                    ?.currentValue,
                                currentTotalCurrentAssets:
                                  fullIndexData.totalCurrentAssets
                                    ?.currentValue,
                                currentTotalAssets:
                                  fullIndexData.totalAssets?.currentValue,
                                currentTotalReceivables:
                                  fullIndexData.totalReceivables?.currentValue,
                                currentTotalNonCurrentLiabilites:
                                  fullIndexData.totalNonCurrentLiabilities
                                    ?.currentValue,
                                currentTotalCurrentLiabilities:
                                  fullIndexData.totalCurrentLiabilities
                                    ?.currentValue,
                                currentInventories:
                                  fullIndexData.inventories?.currentValue,
                                currentTotalCapitalAndReserves:
                                  fullIndexData.totalCapitalAndReserves
                                    ?.currentValue,
                              };

                              previousBalancesheetFigures = {
                                previousTotalNonCurrentAssets:
                                  fullIndexData.totalNonCurrentAssets
                                    ?.previousValue,
                                previousTotalCurrentAssets:
                                  fullIndexData.totalCurrentAssets
                                    ?.previousValue,
                                previousTotalAssets:
                                  fullIndexData.totalAssets?.previousValue,
                                previousTotalReceivables:
                                  fullIndexData.totalReceivables?.previousValue,
                                previousTotalNonCurrentLiabilities:
                                  fullIndexData.totalNonCurrentLiabilities
                                    ?.previousValue,
                                previousTotalCurrentLiabilities:
                                  fullIndexData.totalCurrentLiabilities
                                    ?.currentValue,
                                previousInventories:
                                  fullIndexData.inventories?.currentValue,
                                previousTotalCapitalAndReserves:
                                  fullIndexData.totalCapitalAndReserves
                                    ?.currentValue,
                              };

                              setPrevBalancesheetFigures(
                                previousBalancesheetFigures
                              );
                              setCurrBalancesheetFigures(
                                currentBalancesheetFigures
                              );

                              // sofpDataStructure.map((record) => {

                              // });

                              let sofpMissingSections = [];
                              sofpDataStructure.forEach((section) => {
                                if (
                                  fullIndexData[`${section.variable}`][
                                    "currentValue"
                                  ] === -0
                                ) {
                                  sofpMissingSections.push(section.title);
                                }
                              });
                              if (sofpMissingSections.length > 0)
                                throw (
                                  "Missing rows in SOFP: " +
                                  JSON.stringify(sofpMissingSections) +
                                  ". Their values are currently set to 0. Please check and update the section titles and upload again."
                                );

                              setFileName2("SOFP 👍");
                              setMessageTitle("Success!");
                              setErrorMessage("SOFP Data successfully read.");
                              setDialogIsShown(true);

                              //SOCI
                              readXlsxFile(e.target.files[0], { sheet: "SOCI" })
                                .then((rows) => {
                                  let quaterLastYear =
                                    quater + " " + (year - 1);
                                  let ytdCurrent = "YTD " + year;
                                  let ytdPrevious = "YTD " + (year - 1);

                                  try {
                                    let currentQuaterColIndex = -1;
                                    let previousQuaterColIndex = -1;
                                    let ytdColIndex = -1;
                                    let ytdPrevColIndex = -1;

                                    //get both quater columns and YTD column
                                    rows.map((row) => {
                                      let indexFound = row.findIndex(
                                        (element) =>
                                          toUpper(trim(element)) === quaterYear
                                      );
                                      if (indexFound !== -1)
                                        currentQuaterColIndex = indexFound;

                                      // indexFound = row.findIndex(
                                      //   (element) =>
                                      //     toUpper(trim(element)) ===
                                      //     quaterLastYear
                                      // );
                                      // if (indexFound !== -1)
                                      //   previousQuaterColIndex = indexFound;

                                      indexFound = row.findIndex(
                                        (element) =>
                                          toUpper(trim(element)) ===
                                          toUpper(trim(ytdCurrent))
                                      );
                                      if (indexFound !== -1)
                                        ytdColIndex = indexFound;

                                      indexFound = row.findIndex(
                                        (element) =>
                                          toUpper(trim(element)) ===
                                          toUpper(trim(ytdPrevious))
                                      );
                                      if (indexFound !== -1)
                                        ytdPrevColIndex = indexFound;
                                    });

                                    if (currentQuaterColIndex === -1)
                                      throw "No data for " + quaterYear;

                                    // if (previousQuaterColIndex === -1)
                                    //   throw "No data for " + quaterLastYear;

                                    if (ytdColIndex === -1)
                                      throw "No data for " + ytdCurrent;

                                    if (ytdPrevColIndex === -1)
                                      throw "No data for " + ytdPrevious;
                                    //get rows for each section
                                    sociDataStructures.map((section) => {
                                      rows.map((row, rowIndex) => {
                                        let titleIndex = row.findIndex(
                                          (element) =>
                                            toUpper(trim(element)).replace(
                                              /\s\s+/g,
                                              " "
                                            ) === toUpper(trim(section?.title))
                                        );
                                        let currentValue = 0;
                                        let previousValue = 0;
                                        let ytdValue = 0;
                                        let previousYtdValue = 0;
                                        if (titleIndex !== -1) {
                                          currentValue =
                                            rows[rowIndex][ytdColIndex];

                                          previousValue =
                                            rows[rowIndex][ytdPrevColIndex];

                                          ytdValue =
                                            rows[rowIndex][ytdColIndex];

                                          fullIndexData[`${section.variable}`] =
                                            {
                                              currentValue,
                                              previousValue,
                                              ytdValue,
                                            };
                                        }
                                      });
                                    });

                                    sociDataStructures.map((section) => {
                                      if (
                                        !(
                                          `${section.variable}` in fullIndexData
                                        )
                                      ) {
                                        fullIndexData[`${section.variable}`] = {
                                          currentValue: 0,
                                          previousValue: 0,
                                          ytdValue: 0,
                                        };
                                      }
                                    });

                                    //current quater figures
                                    let currentTotalRevenues =
                                      fullIndexData.totalRevenues?.currentValue;
                                    let currentDepreciation =
                                      fullIndexData.depreciation.currentValue;
                                    let currentGrossProfit =
                                      fullIndexData.grossProfit.currentValue;
                                    let currentOperatingProfit =
                                      fullIndexData.operatingProfit
                                        .currentValue;
                                    let currentOperatingExpenses =
                                      fullIndexData.totalOperatingExpenses
                                        .currentValue;
                                    let currentNetProfit =
                                      fullIndexData.netProfit.currentValue;
                                    let currentEBITDA =
                                      fullIndexData.ebitda.currentValue;

                                    setCurrentFigures({
                                      currentTotalRevenues,
                                      currentDepreciation,
                                      currentGrossProfit,
                                      currentOperatingProfit,
                                      currentOperatingExpenses,
                                      currentNetProfit,
                                      currentEBITDA,
                                    });

                                    //YTD figures
                                    let ytdTotalRevenues =
                                      fullIndexData.totalRevenues?.ytdValue;
                                    let ytdDepreciation =
                                      fullIndexData.depreciation.ytdValue;
                                    let ytdGrossProfit =
                                      fullIndexData.grossProfit.ytdValue;
                                    let ytdOperatingProfit =
                                      fullIndexData.operatingProfit.ytdValue;
                                    let ytdOperatingExpenses =
                                      fullIndexData.totalOperatingExpenses
                                        .ytdValue;
                                    let ytdNetProfit =
                                      fullIndexData.netProfit.ytdValue;
                                    let ytdEBITDA =
                                      fullIndexData.ebitda.ytdValue;

                                    setYtdFigures({
                                      ytdTotalRevenues,
                                      ytdDepreciation,
                                      ytdGrossProfit,
                                      ytdOperatingProfit,
                                      ytdOperatingExpenses,
                                      ytdNetProfit,
                                      ytdEBITDA,
                                    });

                                    //previous quater figures
                                    let prevTotalRevenues =
                                      fullIndexData.totalRevenues
                                        ?.previousValue;
                                    let prevDepreciation =
                                      fullIndexData.depreciation?.previousValue;
                                    let prevGrossProfit =
                                      fullIndexData.grossProfit?.previousValue;
                                    let prevOperatingProfit =
                                      fullIndexData.operatingProfit
                                        ?.previousValue;
                                    let prevOperatingExpenses =
                                      fullIndexData.totalOperatingExpenses
                                        .ytdValue;
                                    let prevNetProfit =
                                      fullIndexData.netProfit?.previousValue;
                                    let prevEBITDA =
                                      fullIndexData.ebitda?.previousValue;

                                    setPreviousFigures({
                                      prevTotalRevenues,
                                      prevDepreciation,
                                      prevGrossProfit,
                                      prevOperatingProfit,
                                      prevOperatingExpenses,
                                      prevNetProfit,
                                      prevEBITDA,
                                    });

                                    let errors = [];
                                    sociDataStructures.forEach((section) => {
                                      if (
                                        fullIndexData[`${section.variable}`][
                                          "currentValue"
                                        ] === 0
                                      ) {
                                        errors.push(`${section.title}`);
                                      }
                                    });

                                    if (errors.length > 0)
                                      throw (
                                        "Missing rows in SOCI: " +
                                        JSON.stringify(errors) +
                                        ".Their values are currently set to 0. Please check and update the section titles and upload again."
                                      );

                                    if (!toleranceValues) {
                                      throw "No tolerance Data set for your company. Please set them first!";
                                    }

                                    setFileName2("Success 👍");
                                    setMessageTitle("Success!");
                                    setErrorMessage(
                                      "Both SOFP and SOCI Data successfully read."
                                    );
                                    setDialogIsShown(true);
                                    setDataCanBeRead(true);
                                    // setLoaded(true);
                                    setDataUploaded(true);
                                  } catch (error) {
                                    setFileName2("Error!");
                                    setDialogIsShown(false);
                                    setDmessageTitle("Something went wrong!");
                                    setDerrorMessage(`${error}`);
                                    setDdialogIsShown(true);
                                    setDataUploaded(false);
                                  }
                                })
                                .catch((err) => {
                                  setFileName2("Error!");
                                  setDialogIsShown(false);
                                  setDmessageTitle("File format Issue!");
                                  setDerrorMessage(`${err}`);
                                  setDdialogIsShown(true);
                                });
                            } catch (error) {
                              setDialogIsShown(false);
                              setDataUploaded(false);
                              setDdialogIsShown(true);
                              setDmessageTitle("File format Issue!");
                              setDerrorMessage(`${error}`);
                            }
                          })
                          .catch((err) => {
                            setFileName2("Error!");
                            setDialogIsShown(false);
                            setDmessageTitle("File format Issue!");
                            setDerrorMessage(`${error}`);
                            setDdialogIsShown(true);
                            setDataUploaded(false);
                          });
                      }}
                      onClick={(event) => {
                        event.target.value = null;
                      }}
                    />
                  </label>
                </div>
              </div>
            )}

            {(!loaded || (loaded && isFinancialCreator)) && (
              <div className="grid grid-cols-4 mt-5 items-center">
                <ToleranceMetric
                  name="System Uptime (%) - Current"
                  setValue={setSystemUptime}
                  value={systemUptime}
                  error={systemUptime.toString().length == 0}
                />

                <ToleranceMetric
                  name="System Uptime (%) - Previous"
                  setValue={setSystemUptimeP}
                  value={systemUptimeP}
                  error={systemUptimeP.toString().length == 0}
                />

                <ToleranceMetric
                  name="Machinery Uptime (%) - Current"
                  setValue={setMachineryUptime}
                  value={machineryUptime}
                  error={machineryUptime.toString().length == 0}
                />

                <ToleranceMetric
                  name="Machinery Uptime (%) - Previous"
                  setValue={setMachineryUptimeP}
                  value={machineryUptimeP}
                  error={machineryUptimeP.toString().length == 0}
                />

                <ToleranceMetric
                  name="Market Share (%) - Current"
                  setValue={setMarketShare}
                  value={marketShare}
                  error={marketShare.toString().length == 0}
                />
                <ToleranceMetric
                  name="Market Share (%) - Previous"
                  setValue={setMarketShareP}
                  value={marketShareP}
                  error={marketShareP.toString().length == 0}
                />

                <ToleranceMetric
                  name="New Customers - Current"
                  setValue={setNewCustomers}
                  value={newCustomers}
                  error={newCustomers.toString().length == 0}
                />

                <ToleranceMetric
                  name="New Customers - Previous"
                  setValue={setNewCustomersP}
                  value={newCustomersP}
                  error={newCustomersP.toString().length == 0}
                />

                <ToleranceMetric
                  name="Employee Turnover (%) - Current"
                  setValue={setEmployeeTurnover}
                  value={employeeTurnover}
                  error={employeeTurnover.toString().length == 0}
                />
                <ToleranceMetric
                  name="Employee Turnover (%) - Previous"
                  setValue={setEmployeeTurnoverP}
                  value={employeeTurnoverP}
                  error={employeeTurnoverP.toString().length == 0}
                />

                <ToleranceMetric
                  name="Loss on major upheaval (%) - Current"
                  setValue={setLossOnMajorUpheaval}
                  value={lossOnMajorUpheaval}
                  error={lossOnMajorUpheaval.toString().length == 0}
                />
                <ToleranceMetric
                  name="Loss on major upheaval (%) - Previous"
                  setValue={setLossOnMajorUpheavalP}
                  value={lossOnMajorUpheavalP}
                  error={lossOnMajorUpheavalP.toString().length == 0}
                />
              </div>
            )}

            {loaded && !isFinancialCreator && (
              <div className="font-medium text-red-400 mt-10">
                Quantitative Data aleady saved by another user!
              </div>
            )}

            {(!loaded || (loaded && isNonFinancialCreator)) && (
              <div className="font-medium text-gray-600 mt-10">
                Qualitative Metrics (Implementation Level)
              </div>
            )}
            {(!loaded || (loaded && isNonFinancialCreator)) && (
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
            )}

            {loaded && !isNonFinancialCreator && (
              <div className="font-medium text-red-400 mt-10">
                Qualitative Data aleady saved by another user!
              </div>
            )}
          </form>
          {dataCanBeRead && (
            <div className="flex flex-row space-x-2 items-center">
              <ThemeProvider value={classicTheme}>
                <Checkbox
                  // label="Controlled usage"
                  checked={confirmLegitData}
                  onChange={(e) => setConfirmLegitData(e.target.checked)}
                />
              </ThemeProvider>
              <div
                className="font-normal text-gray-600 pt-1 cursor-pointer"
                onClick={() => setConfirmLegitData(!confirmLegitData)}
              >
                I confirm the the data provided is correct.
              </div>
            </div>
          )}
          {confirmLegitData && (
            <div className="pt-5 mb-10">
              <Button
                disabled={!dataUploaded || !toleranceValues}
                onClick={() => saveData()}
                color="blue"
              >
                Save
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
