import React, { useEffect, useState, useContext } from "react";
import {
  LineChart,
  CartesianGrid,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Label,
} from "recharts";

import * as _ from "lodash";
import RiskMap from "../common/dashboard/riskMap";
import { UserContext } from "../../contexts/userContext";
import { QuaterContext } from "../../contexts/quaterContext";
import { Dropdown } from "semantic-ui-react";
import RiskMapQual from "../common/dashboard/riskMapQual";
import { DataLoadedContext } from "../../contexts/dataLoadedContext";
import { DocumentSearchIcon } from "@heroicons/react/outline";
import Image from "next/image";
import TopList from "../common/dashboard/topList";
import { toast, ToastContainer } from "react-toastify";

const host = `http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001`;

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

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

export default function DashboardView() {
  const { user, setUser } = useContext(UserContext);
  const { globalQuater, setGlobalQuater } = useContext(QuaterContext);
  const { loaded, setLoaded } = useContext(DataLoadedContext);

  const [queryCompany, setQueryCompany] = useState(user.selectedCompany);

  const [quater, setQuater] = globalQuater
    ? useState(globalQuater?.substr(0, 2))
    : useState("Q1");
  const [year, setYear] = globalQuater
    ? useState(globalQuater?.substr(globalQuater.length - 4))
    : useState(new Date().getFullYear());

  const [scoresResponse, setScoresResponse] = useState({});
  //scores
  const [liquidityScore, setLiquidityScore] = useState(0);
  const [businessContScore, setBusinessContScore] = useState(0);
  const [creditRiskScore, setCreditRiskScore] = useState(0);
  const [marketingScore, setMarketingScore] = useState(0);
  const [operationalEffScore, setOperationalEffScore] = useState(0);
  const [profitabilityScore, setProfitabilityScore] = useState(0);

  const [complianceScore, setComplianceScore] = useState(0);
  const [financialScore, setFinancialScore] = useState(0);
  const [operationalQualScore, setOperationalQualScore] = useState(0);
  const [strategicScore, setStrategicScore] = useState(0);

  //ratios
  const [liquidityRatios, setLiquidityRatios] = useState([]);
  const [profitabilityRatios, setProfitabilityRatios] = useState([]);
  const [operationalEfficiencyRatios, setOperationalEfficiencyRatios] =
    useState([]);
  const [creditRiskRatios, setCreditRiskRatios] = useState([]);
  const [marketingRatios, setMarketingRatios] = useState([]);
  const [businessContinuityRatios, setBusinessContinuityRatios] = useState([]);

  const [complianceRatios, setComplianceRatios] = useState([]);
  const [financialRatios, setFinancialRatios] = useState([]);
  const [operationalRatios, setOperationalRatios] = useState([]);
  const [strategicRatios, setStrategicRatios] = useState([]);

  const [companies, setCompanies] = useState([]);

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
        toast.error("Failed to fetch List of companies!");
      });
  }, []);

  useEffect(() => {
    if (globalQuater.length === 7) {
      fetch(`${host}/riskScore/${globalQuater}`, {
        method: "GET",
      })
        .then((response) => {
          return response.json();
        })
        .then((response) => {
          let {
            liquidScores,
            businessContinuityScores,
            creditRiskScores,
            marketingScores,
            operationalScores,
            profitabilityScores,
            complianceScores,
            financialScores,
            operationalQualScores,
            strategicScores,
          } = response;

          setScoresResponse({
            liquidScores,
            businessContinuityScores,
            creditRiskScores,
            marketingScores,
            operationalScores,
            profitabilityScores,
            complianceScores,
            financialScores,
            operationalQualScores,
            strategicScores,
          });

          let myCompanyLiquidityScore = _.filter(
            liquidScores,
            (record) => record.companyName === queryCompany
          );
          if (myCompanyLiquidityScore.length > 0) {
            setLiquidityScore(
              _.round(
                _.mean([
                  myCompanyLiquidityScore[0]["scoreCurrentRatio"],
                  myCompanyLiquidityScore[0]["scoreQuickRatio"],
                ]),
                0
              )
            );
          } else {
            setLiquidityScore(0);
          }

          let myCompanyBusinessContScore = _.filter(
            businessContinuityScores,
            (record) => record.companyName === queryCompany
          );

          if (myCompanyBusinessContScore.length > 0) {
            setBusinessContScore(
              _.round(
                _.mean(
                  [
                    myCompanyBusinessContScore[0]["scoreEmployeeTurnover"],
                    myCompanyBusinessContScore[0]["scoreLossOnMajorUpheaval"],
                    myCompanyBusinessContScore[0]["scoreSolvencyRatio"],
                  ],
                  0
                )
              )
            );
          } else {
            setBusinessContScore(0);
          }

          let myCompanyCreditRiskScore = _.filter(
            creditRiskScores,
            (record) => record.companyName === queryCompany
          );
          if (myCompanyCreditRiskScore.length > 0) {
            setCreditRiskScore(
              _.round(
                _.mean([
                  myCompanyCreditRiskScore[0]["scoreAverageCollectionPeriod"],
                  myCompanyCreditRiskScore[0]["scoreTotalReceivablePerSales"],
                ]),
                0
              )
            );
          } else {
            setCreditRiskScore(0);
          }

          let myCompanyMarketingScores = _.filter(
            marketingScores,
            (record) => record.companyName === queryCompany
          );
          if (myCompanyMarketingScores.length > 0) {
            setMarketingScore(
              _.round(
                _.mean([
                  myCompanyMarketingScores[0]["scoreRevenueGrowth"],
                  myCompanyMarketingScores[0]["scoreMarketShare"],
                  myCompanyMarketingScores[0]["scoreNewCustomers"],
                ]),
                0
              )
            );
          } else {
            setMarketingScore(0);
          }

          let myCompanyOperationalScores = _.filter(
            operationalScores,
            (record) => record.companyName === queryCompany
          );

          if (myCompanyOperationalScores.length > 0) {
            setOperationalEffScore(
              _.round(
                _.mean([
                  myCompanyOperationalScores[0]["scoreOperatingExpenses"],
                  myCompanyOperationalScores[0]["scoreSystemUptime"],
                  myCompanyOperationalScores[0]["scoreMachineryUptime"],
                ]),
                0
              )
            );
          } else {
            setOperationalEffScore(0);
          }

          let myCompanyProfitabilityScores = _.filter(
            profitabilityScores,
            (record) => record.companyName === queryCompany
          );
          if (myCompanyProfitabilityScores.length > 0) {
            setProfitabilityScore(
              _.round(
                _.mean([
                  myCompanyProfitabilityScores[0]["scoreGpMargin"],
                  myCompanyProfitabilityScores[0]["scoreEbitdaMargin"],
                  myCompanyProfitabilityScores[0]["scoreReturnOnEquity"],
                  myCompanyProfitabilityScores[0]["scoreReturnOnAsset"],
                  myCompanyProfitabilityScores[0]["scoreNetProfitMargin"],
                ]),
                0
              )
            );
          } else {
            setProfitabilityScore(0);
          }

          let myCompanyComplianceScores = _.filter(
            complianceScores,
            (record) => record.companyName === queryCompany
          );
          if (myCompanyComplianceScores.length > 0) {
            setComplianceScore(
              _.round(
                _.mean([
                  myCompanyComplianceScores[0]["taxScore"],
                  myCompanyComplianceScores[0]["contractScore"],
                  myCompanyComplianceScores[0]["financialReportingScore"],
                  myCompanyComplianceScores[0]["govLicenceScore"],
                ]),
                0
              )
            );
          } else {
            setComplianceScore(0);
          }

          let myCompanyFinancialScores = _.filter(
            financialScores,
            (record) => record.companyName === queryCompany
          );
          if (myCompanyFinancialScores.length > 0) {
            setFinancialScore(
              _.round(
                _.mean([
                  myCompanyFinancialScores[0]["customerDefaultRiskScore"],
                  myCompanyFinancialScores[0]["cashFlowConstraintsScore"],
                  myCompanyFinancialScores[0]["fraudAndCorruptionScore"],
                  myCompanyFinancialScores[0]["errorsAndMisstatementsScore"],
                  myCompanyFinancialScores[0]["underUtilCapitalScore"],
                ]),
                0
              )
            );
          } else {
            setFinancialScore(0);
          }

          let myCompanyOperationalQualScores = _.filter(
            operationalQualScores,
            (record) => record.companyName === queryCompany
          );
          if (myCompanyOperationalQualScores.length > 0) {
            setOperationalQualScore(
              _.round(
                _.mean([
                  myCompanyOperationalQualScores[0]["disruptionOpScore"],
                  myCompanyOperationalQualScores[0]["lossOfKeyStaffScore"],
                  myCompanyOperationalQualScores[0]["compromisePrdtScore"],
                  myCompanyOperationalQualScores[0]["serviceDelaysScore"],
                  myCompanyOperationalQualScores[0][
                    "disruptionSupplyChainScore"
                  ],
                ]),
                0
              )
            );
          } else {
            setOperationalQualScore(0);
          }

          let myCompanyStrategicScores = _.filter(
            strategicScores,
            (record) => record.companyName === queryCompany
          );
          if (myCompanyStrategicScores.length > 0) {
            setStrategicScore(
              _.round(
                _.mean([
                  myCompanyStrategicScores[0]["pdctDevScore"],
                  myCompanyStrategicScores[0]["investNewTechScore"],
                  myCompanyStrategicScores[0]["businessContScore"],
                  myCompanyStrategicScores[0]["brandRiskScore"],
                ]),
                0
              )
            );
          } else {
            setStrategicScore(0);
          }
        })
        .catch((err) => {
          toast.error("Failed to fetch Risk Scores!");
        });
    }
  }, [globalQuater, queryCompany]);

  useEffect(() => {
    fetch(`${host}/riskScore`)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        let {
          liquidityRatios,
          profitabilityRatios,
          operationalEfficiencyRatios,
          creditRiskRatios,
          marketingRatios,
          businessContinuityRatios,
          complianceRatios,
          financialRatios,
          operationalRatios,
          strategicRatios,
        } = response;

        let myCompanyLiquidityRatios = _.filter(
          liquidityRatios,
          (record) => record.companyName === queryCompany
        );
        if (myCompanyLiquidityRatios.length > 0)
          setLiquidityRatios(myCompanyLiquidityRatios);

        let myCompanyProfitabilityRatios = _.filter(
          profitabilityRatios,
          (record) => record.companyName === queryCompany
        );
        if (myCompanyProfitabilityRatios.length > 0)
          setProfitabilityRatios(myCompanyProfitabilityRatios);

        let myCompanyOperationalEfficiencyRatios = _.filter(
          operationalEfficiencyRatios,
          (record) => record.companyName === queryCompany
        );
        if (myCompanyOperationalEfficiencyRatios.length > 0) {
          setOperationalEfficiencyRatios(myCompanyOperationalEfficiencyRatios);
        }

        let myCompanyCreditRiskRatios = _.filter(
          creditRiskRatios,
          (record) => record.companyName === queryCompany
        );
        if (myCompanyCreditRiskRatios.length > 0) {
          setCreditRiskRatios(myCompanyCreditRiskRatios);
        }

        let myCompanyMarketingRatios = _.filter(
          marketingRatios,
          (record) => record.companyName === queryCompany
        );
        if (myCompanyMarketingRatios.length > 0) {
          setMarketingRatios(myCompanyMarketingRatios);
        }

        let myCompanyBusinessContinuityRatios = _.filter(
          businessContinuityRatios,
          (record) => record.companyName === queryCompany
        );
        if (myCompanyBusinessContinuityRatios.length > 0)
          setBusinessContinuityRatios(myCompanyBusinessContinuityRatios);

        let myCompanyComplianceRatios = _.filter(
          complianceRatios,
          (record) => record.companyName === queryCompany
        );
        if (myCompanyComplianceRatios.length > 0) {
          setComplianceRatios(myCompanyComplianceRatios);
        }

        let myCompanyFinancialRatios = _.filter(
          financialRatios,
          (record) => record.companyName === queryCompany
        );
        if (myCompanyFinancialRatios.length > 0) {
          setFinancialRatios(myCompanyFinancialRatios);
        }

        let myCompanyOperationalRatios = _.filter(
          operationalRatios,
          (record) => record.companyName === queryCompany
        );

        if (myCompanyOperationalRatios.length > 0) {
          setOperationalRatios(myCompanyOperationalRatios);
        }

        let myCompanyStrategicRatios = _.filter(
          strategicRatios,
          (record) => record.companyName === queryCompany
        );
        if (myCompanyStrategicRatios.length > 0) {
          setStrategicRatios(myCompanyStrategicRatios);
        }
      })
      .catch((err) => {
        toast.error("Failed to fetch Risk Scores!");
      });
  }, [queryCompany]);

  function getGraphColor(score) {
    if (score === 4) {
      return "#8c2020";
    } else if (score === 3) {
      return "#D97706";
    } else if (score === 2) {
      return "#FCD34D";
    } else {
      return "#10B981";
    }
  }

  return (
    <div className="overflow-y-auto h-screen pb-32 mr-1">
      <div className="flex mt-2 mr-5">
        <div class="flex flex-col mr-5">
          <ToastContainer />
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
              // setQuaterYear(value + " " + year);
              setGlobalQuater(value + " " + year);
            }}
          />
        </div>

        <div class="flex flex-col mr-5">
          <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
            Year
          </label>
          <input
            className="focus:outline-none border-2 border-gray-200 focus:border-blue-cvl-400 py-2.5  px-3 text-sm text-gray-500 shadow-inner rounded-lg "
            value={year}
            type="number"
            onChange={(e) => {
              setYear(e.target.value);
              // setQuaterYear(quater + " " + e.target.value);
              setGlobalQuater(quater + " " + e.target.value);
            }}
          />
        </div>

        {(user.profile === "Admin" ||
          user.profile === "Tech" ||
          user.profile === "RD" ||
          user.profile === "SROF") && (
          <div class="flex flex-col mr-5">
            <label className="font-semibold text-gray-500 text-sm mb-1 ml-1">
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

      {liquidityRatios.length > 0 && (
        <div>
          {loaded && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-4 mr-5">
                <RiskMap
                  businessContScore={businessContScore}
                  companyName={user.selectedCompany}
                  creditRiskScore={creditRiskScore}
                  liquidityScore={liquidityScore}
                  marketingScore={marketingScore}
                  operationalEffScore={operationalEffScore}
                  profitabilityScore={profitabilityScore}
                />

                <RiskMapQual
                  companyName={user.selectedCompany}
                  complianceScore={complianceScore}
                  financialScore={financialScore}
                  operationalQualScore={operationalQualScore}
                  strategicScore={strategicScore}
                />
              </div>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Quantitative Trends */}
            <div class="grid grid-cols-1 md:grid-cols-2 mt-5 mr-5 gap-5">
              {/* Liquidity */}
              <div className="flex flex-col bg-white p-2 rounded-md shadow-md cursor-pointer items-center">
                <div className="text-md font-semibold text-gray-600 uppercase">
                  Liquidity
                </div>
                <LineChart
                  width={300}
                  height={150}
                  data={liquidityRatios}

                  // margin={{ top: 5, bottom: 5 }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="quater" hide={true} />
                  {/* <YAxis /> */}
                  <Tooltip />
                  <Legend />
                  <Line
                    type="natural"
                    dataKey="currentRatio"
                    stroke="#8884d8"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                  <Line
                    type="natural"
                    dataKey="quickRatio"
                    stroke="#82ca9d"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                </LineChart>
              </div>

              {/* Profitability */}
              <div className="flex flex-col bg-white p-2 rounded-md shadow-md cursor-pointer items-center">
                <div className="text-md font-semibold text-gray-600 uppercase">
                  Profitability
                </div>
                <LineChart
                  width={300}
                  height={150}
                  data={profitabilityRatios}

                  // margin={{ top: 5, bottom: 5 }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <XAxis dataKey="quater" hide={true} />
                  {/* <YAxis /> */}
                  <Tooltip />
                  <Legend />
                  <Line
                    type="natural"
                    dataKey="gpMargin"
                    stroke="#8884d8"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                  <Line
                    type="natural"
                    dataKey="ebitdaMargin"
                    stroke="#82ca9d"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                  <Line
                    type="natural"
                    dataKey="returnOnEquity"
                    stroke="#8c2020"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                  <Line
                    type="natural"
                    dataKey="returnOnAsset"
                    stroke="#0b501f"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                  <Line
                    type="natural"
                    dataKey="netProfitMargin"
                    stroke="#d8a040"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                </LineChart>
              </div>

              {/* Operational Efficiency */}
              <div className="flex flex-col bg-white p-2 rounded-md shadow-md cursor-pointer items-center">
                <div className="text-md font-semibold text-gray-600 uppercase">
                  Operational Efficiency
                </div>
                <LineChart
                  width={300}
                  height={150}
                  data={operationalEfficiencyRatios}
                  // margin={{ top: 5, bottom: 5 }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}

                  <XAxis dataKey="quater" hide="true" />
                  <YAxis hide={true} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="natural"
                    dataKey="operatingExpenses"
                    stroke="#8884d8"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                  <Line
                    type="natural"
                    dataKey="systemUptime"
                    stroke="#82ca9d"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                  <Line
                    type="natural"
                    dataKey="machineryUptime"
                    stroke="#8c2020"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                </LineChart>
              </div>

              {/* Operational Efficiency */}
              <div className="flex flex-col bg-white p-2 rounded-md shadow-md cursor-pointer items-center">
                <div className="text-md font-semibold text-gray-600 uppercase">
                  Credit Risk
                </div>
                <LineChart
                  width={300}
                  height={150}
                  data={creditRiskRatios}
                  // margin={{ top: 5, bottom: 5 }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}

                  <XAxis dataKey="quater" hide="true" />
                  <YAxis hide={true} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="natural"
                    dataKey="averageCollectionPeriod"
                    stroke="#82ca9d"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                  <Line
                    type="natural"
                    dataKey="totalReceivablePerSales"
                    stroke="#8c2020"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                </LineChart>
              </div>

              {/* Marketing */}
              <div className="flex flex-col bg-white p-2 rounded-md shadow-md cursor-pointer items-center">
                <div className="text-md font-semibold text-gray-600 uppercase">
                  Marketing
                </div>
                <LineChart
                  width={300}
                  height={150}
                  data={marketingRatios}
                  // margin={{ top: 5, bottom: 5 }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}

                  <XAxis dataKey="quater" hide="true" />
                  <YAxis hide={true} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="natural"
                    dataKey="revenueGrowth"
                    stroke="#82ca9d"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                  <Line
                    type="natural"
                    dataKey="marketShare"
                    stroke="#8c2020"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                  <Line
                    type="natural"
                    dataKey="newCustomers"
                    stroke="#8884d8"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                </LineChart>
              </div>

              {/* Business Continuity */}
              <div className="flex flex-col bg-white p-2 rounded-md shadow-md cursor-pointer items-center">
                <div className="text-md font-semibold text-gray-600 uppercase">
                  Business Continuity
                </div>
                <LineChart
                  width={300}
                  height={150}
                  data={businessContinuityRatios}
                  // margin={{ top: 5, bottom: 5 }}
                >
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}

                  <XAxis dataKey="quater" hide="true" />
                  <YAxis hide={true} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="natural"
                    dataKey="employeeTurnover"
                    stroke="#82ca9d"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                  <Line
                    type="natural"
                    dataKey="lossOnMajorUpheaval"
                    stroke="#8c2020"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                  <Line
                    type="natural"
                    dataKey="solvencyRatioMetric"
                    stroke="#8884d8"
                    dot={false}
                    strokeWidth={2}
                    // isAnimationActive={false}
                  />
                </LineChart>
              </div>
            </div>

            {/* Qualitative Trends */}
            <div class="grid grid-cols-1 md:grid-cols-4 md:grid-rows-4 mt-5 mr-5 gap-5">
              <div className="flex flex-col bg-white p-1 rounded-md shadow-md cursor-pointer items-center justify-evenly">
                <div className="text-md font-semibold text-gray-600 uppercase">
                  Strategic
                </div>
                <AreaChart
                  width={150}
                  height={80}
                  data={strategicRatios}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="strategicColor"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={getGraphColor(strategicScore)}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={getGraphColor(strategicScore)}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="quater" hide={true} />
                  <YAxis hide={true} />
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="mean"
                    stroke={getGraphColor(strategicScore)}
                    fillOpacity={1}
                    fill="url(#strategicColor)"
                  />
                </AreaChart>
              </div>
              <div className="flex flex-col bg-white p-2 rounded-md shadow-md cursor-pointer items-center justify-evenly">
                <div className="text-md font-semibold text-gray-600 uppercase">
                  Financial
                </div>
                <AreaChart
                  width={150}
                  height={80}
                  data={financialRatios}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="financialColor"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={getGraphColor(financialScore)}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={getGraphColor(financialScore)}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="quater" hide={true} />
                  <YAxis hide={true} />
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="mean"
                    stroke={getGraphColor(financialScore)}
                    fillOpacity={1}
                    fill="url(#financialColor)"
                  />
                </AreaChart>
              </div>
              <div className="flex flex-col bg-white p-2 rounded-md shadow-md cursor-pointer items-center justify-evenly">
                <div className="text-md font-semibold text-gray-600 uppercase">
                  Operational
                </div>
                <AreaChart
                  width={150}
                  height={80}
                  data={operationalRatios}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="operationalColor"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={getGraphColor(operationalQualScore)}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={getGraphColor(operationalQualScore)}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="quater" hide={true} />
                  <YAxis hide={true} />
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="mean"
                    stroke={getGraphColor(operationalQualScore)}
                    fillOpacity={1}
                    fill="url(#operationalColor)"
                  />
                </AreaChart>
              </div>
              <div className="flex flex-col bg-white p-2 rounded-md shadow-md cursor-pointer items-center justify-evenly">
                <div className="text-md font-semibold text-gray-600 uppercase">
                  Compliance
                </div>

                <AreaChart
                  width={150}
                  height={80}
                  data={complianceRatios}
                  margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient
                      id="complianceColor"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor={getGraphColor(complianceScore)}
                        stopOpacity={0.8}
                      />
                      <stop
                        offset="95%"
                        stopColor={getGraphColor(complianceScore)}
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="quater" hide={true} />
                  <YAxis hide={true} />
                  {/* <CartesianGrid strokeDasharray="3 3" /> */}
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="mean"
                    stroke={getGraphColor(complianceScore)}
                    fillOpacity={1}
                    fill="url(#complianceColor)"
                  />
                </AreaChart>
              </div>

              {user.companyName === "CVL-Group" && (
                <div className="col-span-3 row-span-2">
                  {/* <div class="underline px-2 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Top 5 Companies (Risk Score)
                  </div> */}
                  <TopList
                    scores={scoresResponse}
                    companyList={companies}
                    changeCompany={(companyName) => {
                      setQueryCompany(companyName);
                      let _user = { ...user };
                      _user.selectedCompany = companyName;
                      setUser(_user);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {liquidityRatios.length <= 0 && (
        <div className="flex flex-col h-full justify-center items-center">
          <Image height="300" width="300" src="/nodata1.svg" />
          <div className="text-gray-500 text-lg">No data!</div>
        </div>
      )}
    </div>
  );
}
