import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import * as _ from "lodash";
import { UserContext } from "../../../contexts/userContext";
import { QuaterContext } from "../../../contexts/quaterContext";

import { ConsoleIcon } from "evergreen-ui";

export default function TopList({ scores, changeCompany }) {
  let companyList = [
    {
      companyName: "INYANGE",
      metric: "Credit Risk",
      riskScore: 4,
      extremCount: 5,
      highCount: 1,
    },

    {
      companyName: "RULIBA",
      metric: "Credit Risk",
      riskScore: 4,
      extremCount: 3,
      highCount: 3,
    },

    {
      companyName: "REAL",
      metric: "Credit Risk",
      riskScore: 3,
      extremCount: 4,
      highCount: 2,
    },

    {
      companyName: "INTARE",
      metric: "Credit Risk",
      riskScore: 3,
      extremCount: 2,
      highCount: 1,
    },
    {
      companyName: "CVL",
      metric: "Credit Risk",
      riskScore: 3,
      extremCount: 2,
      highCount: 1,
    },
    {
      companyName: "NPD",
      metric: "Credit Risk",
      riskScore: 3,
      extremCount: 2,
      highCount: 1,
    },
    {
      companyName: "SAWMIL",
      metric: "Credit Risk",
      riskScore: 3,
      extremCount: 2,
      highCount: 1,
    },
    {
      companyName: "MUKAMIRA",
      metric: "Credit Risk",
      riskScore: 3,
      extremCount: 2,
      highCount: 1,
    },
    {
      companyName: "ISCO",
      metric: "Credit Risk",
      riskScore: 3,
      extremCount: 2,
      highCount: 1,
    },
    {
      companyName: "EAGI",
      metric: "Credit Risk",
      riskScore: 3,
      extremCount: 2,
      highCount: 1,
    },
    {
      companyName: "STONECRAFT",
      metric: "Credit Risk",
      riskScore: 3,
      extremCount: 2,
      highCount: 1,
    },
  ];

  const { user, setUser } = useContext(UserContext);
  const { globalQuater, setGlobalQuater } = useContext(QuaterContext);
  const [avgRiskScoreCompany, setAvgRiskScore] = useState([]);

  useEffect(() => {
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
    } = scores;

    let liqByCompany = _.groupBy(liquidScores, "companyName");
    let busContByCompany = _.groupBy(businessContinuityScores, "companyName");
    let credRisByCompany = _.groupBy(creditRiskScores, "companyName");
    let marketByCompany = _.groupBy(marketingScores, "companyName");
    let operByCompany = _.groupBy(operationalScores, "companyName");
    let profByCompany = _.groupBy(profitabilityScores, "companyName");
    let complByCompany = _.groupBy(complianceScores, "companyName");
    let finaByCompany = _.groupBy(financialScores, "companyName");
    let operQualByCompany = _.groupBy(operationalQualScores, "companyName");
    let stratByCompany = _.groupBy(strategicScores, "companyName");
    let _avgScoresByCompany = companyList.map((company) => {
      let pool = [];

      if (
        liqByCompany[company.companyName] &&
        busContByCompany[company.companyName] &&
        credRisByCompany[company.companyName] &&
        marketByCompany[company.companyName] &&
        operByCompany[company.companyName] &&
        profByCompany[company.companyName] &&
        complByCompany[company.companyName] &&
        finaByCompany[company.companyName] &&
        operQualByCompany[company.companyName] &&
        stratByCompany[company.companyName]
      ) {
        pool = [
          liqByCompany[company.companyName][0]["scoreCurrentRatio"],
          liqByCompany[company.companyName][0]["scoreQuickRatio"],
          busContByCompany[company.companyName][0]["scoreEmployeeTurnover"],
          busContByCompany[company.companyName][0]["scoreLossOnMajorUpheaval"],
          busContByCompany[company.companyName][0]["scoreSolvencyRatio"],
          credRisByCompany[company.companyName][0][
            "scoreAverageCollectionPeriod"
          ],
          credRisByCompany[company.companyName][0][
            "scoreTotalReceivablePerSales"
          ],
          marketByCompany[company.companyName][0]["scoreRevenueGrowth"],
          marketByCompany[company.companyName][0]["scoreMarketShare"],
          marketByCompany[company.companyName][0]["scoreNewCustomers"],
          operByCompany[company.companyName][0]["scoreOperatingExpenses"],
          operByCompany[company.companyName][0]["scoreSystemUptime"],
          operByCompany[company.companyName][0]["scoreMachineryUptime"],
          profByCompany[company.companyName][0]["scoreGpMargin"],
          profByCompany[company.companyName][0]["scoreEbitdaMargin"],
          profByCompany[company.companyName][0]["scoreReturnOnEquity"],
          profByCompany[company.companyName][0]["scoreReturnOnAsset"],
          profByCompany[company.companyName][0]["scoreNetProfitMargin"],
          complByCompany[company.companyName][0]["taxScore"],
          complByCompany[company.companyName][0]["contractScore"],
          complByCompany[company.companyName][0]["financialReportingScore"],
          complByCompany[company.companyName][0]["govLicenceScore"],
          finaByCompany[company.companyName][0]["customerDefaultRiskScore"],
          finaByCompany[company.companyName][0]["cashFlowConstraintsScore"],
          finaByCompany[company.companyName][0]["fraudAndCorruptionScore"],
          finaByCompany[company.companyName][0]["errorsAndMisstatementsScore"],
          finaByCompany[company.companyName][0]["underUtilCapitalScore"],
          operQualByCompany[company.companyName][0]["disruptionOpScore"],
          operQualByCompany[company.companyName][0]["lossOfKeyStaffScore"],
          operQualByCompany[company.companyName][0]["compromisePrdtScore"],
          operQualByCompany[company.companyName][0]["serviceDelaysScore"],
          operQualByCompany[company.companyName][0][
            "disruptionSupplyChainScore"
          ],
          stratByCompany[company.companyName][0]["pdctDevScore"],
          stratByCompany[company.companyName][0]["investNewTechScore"],
          stratByCompany[company.companyName][0]["businessContScore"],
          stratByCompany[company.companyName][0]["brandRiskScore"],
        ];
      }

      return {
        companyName: company.companyName,
        extremCount: pool.filter((p) => {
          return p >= 4;
        }).length,

        highCount: pool.filter((p) => {
          return p < 4 && p >= 3;
        }).length,
        avgRiskScore:
          liqByCompany[company.companyName] &&
          busContByCompany[company.companyName] &&
          credRisByCompany[company.companyName] &&
          marketByCompany[company.companyName] &&
          operByCompany[company.companyName] &&
          profByCompany[company.companyName] &&
          complByCompany[company.companyName] &&
          finaByCompany[company.companyName] &&
          operQualByCompany[company.companyName] &&
          stratByCompany[company.companyName]
            ? _.round(
                _.mean([
                  liqByCompany[company.companyName][0]["scoreCurrentRatio"],
                  liqByCompany[company.companyName][0]["scoreQuickRatio"],
                  busContByCompany[company.companyName][0][
                    "scoreEmployeeTurnover"
                  ],
                  busContByCompany[company.companyName][0][
                    "scoreLossOnMajorUpheaval"
                  ],
                  busContByCompany[company.companyName][0][
                    "scoreSolvencyRatio"
                  ],
                  credRisByCompany[company.companyName][0][
                    "scoreAverageCollectionPeriod"
                  ],
                  credRisByCompany[company.companyName][0][
                    "scoreTotalReceivablePerSales"
                  ],
                  marketByCompany[company.companyName][0]["scoreRevenueGrowth"],
                  marketByCompany[company.companyName][0]["scoreMarketShare"],
                  marketByCompany[company.companyName][0]["scoreNewCustomers"],
                  operByCompany[company.companyName][0][
                    "scoreOperatingExpenses"
                  ],
                  operByCompany[company.companyName][0]["scoreSystemUptime"],
                  operByCompany[company.companyName][0]["scoreMachineryUptime"],
                  profByCompany[company.companyName][0]["scoreGpMargin"],
                  profByCompany[company.companyName][0]["scoreEbitdaMargin"],
                  profByCompany[company.companyName][0]["scoreReturnOnEquity"],
                  profByCompany[company.companyName][0]["scoreReturnOnAsset"],
                  profByCompany[company.companyName][0]["scoreNetProfitMargin"],
                  complByCompany[company.companyName][0]["taxScore"],
                  complByCompany[company.companyName][0]["contractScore"],
                  complByCompany[company.companyName][0][
                    "financialReportingScore"
                  ],
                  complByCompany[company.companyName][0]["govLicenceScore"],
                  finaByCompany[company.companyName][0][
                    "customerDefaultRiskScore"
                  ],
                  finaByCompany[company.companyName][0][
                    "cashFlowConstraintsScore"
                  ],
                  finaByCompany[company.companyName][0][
                    "fraudAndCorruptionScore"
                  ],
                  finaByCompany[company.companyName][0][
                    "errorsAndMisstatementsScore"
                  ],
                  finaByCompany[company.companyName][0][
                    "underUtilCapitalScore"
                  ],
                  operQualByCompany[company.companyName][0][
                    "disruptionOpScore"
                  ],
                  operQualByCompany[company.companyName][0][
                    "lossOfKeyStaffScore"
                  ],
                  operQualByCompany[company.companyName][0][
                    "compromisePrdtScore"
                  ],
                  operQualByCompany[company.companyName][0][
                    "serviceDelaysScore"
                  ],
                  operQualByCompany[company.companyName][0][
                    "disruptionSupplyChainScore"
                  ],
                  stratByCompany[company.companyName][0]["pdctDevScore"],
                  stratByCompany[company.companyName][0]["investNewTechScore"],
                  stratByCompany[company.companyName][0]["businessContScore"],
                  stratByCompany[company.companyName][0]["brandRiskScore"],
                ]),
                0
              )
            : 0,
      };
    });

    setAvgRiskScore(
      _.orderBy(
        _avgScoresByCompany,
        ["avgRiskScore", "companyName"],
        ["desc"]
      ).filter((c) => {
        return c.avgRiskScore !== 0;
      })
    );
  }, [scores]);

  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow-md ring-1 ring-gray-300 overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Company
                  </th>

                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider items-center"
                  >
                    Avg Risk Score
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    Extreme
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                  >
                    High
                  </th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {avgRiskScoreCompany.map((row, index) => {
                  return (
                    index < 5 && (
                      <tr
                        className="hover:bg-gray-50"
                        key={row.companyName}
                        onClick={() => changeCompany(row.companyName)}
                      >
                        <td className="px-3 py-2 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full shadow-md p-1">
                              <Image
                                height="100"
                                width="100"
                                className="rounded-full object-contain"
                                src={`/logos/${row.companyName}.jpg`}
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-500">
                                {row.companyName}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-3 py-2 whitespace-nowrap ">
                          <div className="text-sm text-gray-600">
                            {row.avgRiskScore}
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 items-center">
                          <div className="flex flex-row items-center space-x-1">
                            <div className="text-sm text-gray-600">
                              {row.extremCount}
                            </div>
                            <div className="text-xs text-gray-400">
                              out of 37 items
                            </div>
                          </div>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500 items-center">
                          <div className="flex flex-row items-center space-x-1">
                            <div className="text-sm text-gray-600">
                              {row.highCount}
                            </div>
                            <div className="text-xs text-gray-400">
                              out of 37 items
                            </div>
                          </div>
                        </td>
                      </tr>
                    )
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
