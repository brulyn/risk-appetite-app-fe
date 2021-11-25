import React, { useEffect, useState, useContext } from "react";
import {
  LineChart,
  CartesianGrid,
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

const host = "http://localhost:3001";

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

  const [quater, setQuater] = globalQuater
    ? useState(globalQuater?.substr(0, 2))
    : useState("Q1");
  const [year, setYear] = globalQuater
    ? useState(globalQuater?.substr(globalQuater.length - 4))
    : useState(new Date().getFullYear());

  const [liquidityScore, setLiquidityScore] = useState(0);
  const [businessContScore, setBusinessContScore] = useState(0);
  const [creditRiskScore, setCreditRiskScore] = useState(0);
  const [marketingScore, setMarketingScore] = useState(0);
  const [operationalEffScore, setOperationalEffScore] = useState(0);
  const [profitabilityScore, setProfitabilityScore] = useState(0);

  const [liquidityRatios, setLiquidityRatios] = useState([]);
  const [profitabilityRatios, setProfitabilityRatios] = useState([]);
  const [operationalEfficiencyRatios, setOperationalEfficiencyRatios] =
    useState([]);
  const [creditRiskRatios, setCreditRiskRatios] = useState([]);
  const [marketingRatios, setMarketingRatios] = useState([]);
  const [businessContinuityRatios, setBusinessContinuityRatios] = useState([]);

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
          } = response;

          let myCompanyLiquidityScore = _.filter(
            liquidScores,
            (record) => record.companyName === user.companyName
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
            (record) => record.companyName === user.companyName
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
            (record) => record.companyName === user.companyName
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
            (record) => record.companyName === user.companyName
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
            (record) => record.companyName === user.companyName
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
            (record) => record.companyName === user.companyName
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
        })
        .catch((err) => console.log(`${err}`));
    }
  }, [globalQuater]);

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
        } = response;

        let myCompanyLiquidityRatios = _.filter(
          liquidityRatios,
          (record) => record.companyName === user.companyName
        );
        if (myCompanyLiquidityRatios.length > 0)
          setLiquidityRatios(myCompanyLiquidityRatios);

        let myCompanyProfitabilityRatios = _.filter(
          profitabilityRatios,
          (record) => record.companyName === user.companyName
        );
        if (myCompanyProfitabilityRatios.length > 0)
          setProfitabilityRatios(myCompanyProfitabilityRatios);

        let myCompanyOperationalEfficiencyRatios = _.filter(
          operationalEfficiencyRatios,
          (record) => record.companyName === user.companyName
        );
        if (myCompanyOperationalEfficiencyRatios.length > 0) {
          setOperationalEfficiencyRatios(myCompanyOperationalEfficiencyRatios);
        }

        let myCompanyCreditRiskRatios = _.filter(
          creditRiskRatios,
          (record) => record.companyName === user.companyName
        );
        if (myCompanyCreditRiskRatios.length > 0) {
          setCreditRiskRatios(myCompanyCreditRiskRatios);
        }

        let myCompanyMarketingRatios = _.filter(
          marketingRatios,
          (record) => record.companyName === user.companyName
        );
        if (myCompanyMarketingRatios.length > 0) {
          setMarketingRatios(myCompanyMarketingRatios);
        }

        let myCompanyBusinessContinuityRatios = _.filter(
          businessContinuityRatios,
          (record) => record.companyName === user.companyName
        );
        if (myCompanyBusinessContinuityRatios.length > 0)
          setBusinessContinuityRatios(myCompanyBusinessContinuityRatios);
      });
  }, []);

  return (
    <div className="mb-6 mr-5">
      <div className="flex mt-2 mr-5">
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
            className="focus:outline-none border-2 border-gray-200 focus:border-blue-300 py-2 px-3 text-sm text-gray-500 shadow-inner rounded-lg "
            value={year}
            type="number"
            onChange={(e) => {
              setYear(e.target.value);
              // setQuaterYear(quater + " " + e.target.value);
              setGlobalQuater(quater + " " + e.target.value);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 mr-5">
        <RiskMap
          businessContScore={businessContScore}
          companyName={user.companyName}
          creditRiskScore={creditRiskScore}
          liquidityScore={liquidityScore}
          marketingScore={marketingScore}
          operationalEffScore={operationalEffScore}
          profitabilityScore={profitabilityScore}
        />
      </div>

      <div className="flex flex-row">
        <div className="flex flex-row">
          <div className="flex-1">
            {/* {(businessContScore !== 0 ||
              creditRiskScore !== 0 ||
              liquidityScore !== 0 ||
              marketingScore !== 0 ||
              operationalEffScore !== 0 ||
              profitabilityScore !== 0) && (
              <RiskMap
                businessContScore={businessContScore}
                companyName={user.companyName}
                creditRiskScore={creditRiskScore}
                liquidityScore={liquidityScore}
                marketingScore={marketingScore}
                operationalEffScore={operationalEffScore}
                profitabilityScore={profitabilityScore}
              />
            )} */}

            {/* <RiskMap
              businessContScore={businessContScore}
              companyName={user.companyName}
              creditRiskScore={creditRiskScore}
              liquidityScore={liquidityScore}
              marketingScore={marketingScore}
              operationalEffScore={operationalEffScore}
              profitabilityScore={profitabilityScore}
            /> */}
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-4 mt-5 mr-5 gap-5">
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
              isAnimationActive={false}
            />
            <Line
              type="natural"
              dataKey="quickRatio"
              stroke="#82ca9d"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
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
              isAnimationActive={false}
            />
            <Line
              type="natural"
              dataKey="ebitdaMargin"
              stroke="#82ca9d"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
            <Line
              type="natural"
              dataKey="returnOnEquity"
              stroke="#8c2020"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
            <Line
              type="natural"
              dataKey="returnOnAsset"
              stroke="#0b501f"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
            <Line
              type="natural"
              dataKey="netProfitMargin"
              stroke="#d8a040"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
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
              isAnimationActive={false}
            />
            <Line
              type="natural"
              dataKey="systemUptime"
              stroke="#82ca9d"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
            <Line
              type="natural"
              dataKey="machineryUptime"
              stroke="#8c2020"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
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
              isAnimationActive={false}
            />
            <Line
              type="natural"
              dataKey="totalReceivablePerSales"
              stroke="#8c2020"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
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
              isAnimationActive={false}
            />
            <Line
              type="natural"
              dataKey="marketShare"
              stroke="#8c2020"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
            <Line
              type="natural"
              dataKey="newCustomers"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
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
              isAnimationActive={false}
            />
            <Line
              type="natural"
              dataKey="lossOnMajorUpheaval"
              stroke="#8c2020"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
            <Line
              type="natural"
              dataKey="solvencyRatioMetric"
              stroke="#8884d8"
              dot={false}
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </div>
      </div>
    </div>
  );
}
