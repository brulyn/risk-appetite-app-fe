import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import * as _ from "lodash";
import { UserContext } from "../../../contexts/userContext";
import { QuaterContext } from "../../../contexts/quaterContext";

import { ConsoleIcon } from "evergreen-ui";

export default function TopList({ scores, changeCompany, companyList }) {
  const { user, setUser } = useContext(UserContext);
  const { globalQuater, setGlobalQuater } = useContext(QuaterContext);
  const [avgRiskScoreCompany, setAvgRiskScore] = useState([]);

  useEffect(() => {
    console.log(companyList);
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
        liqByCompany[company.name] &&
        busContByCompany[company.name] &&
        credRisByCompany[company.name] &&
        marketByCompany[company.name] &&
        operByCompany[company.name] &&
        profByCompany[company.name] &&
        complByCompany[company.name] &&
        finaByCompany[company.name] &&
        operQualByCompany[company.name] &&
        stratByCompany[company.name]
      ) {
        pool = [
          {
            value: liqByCompany[company.name][0]["scoreCurrentRatio"],
            title: "scoreCurrentRatio",
          },
          {
            value: liqByCompany[company.name][0]["scoreQuickRatio"],
            title: "scoreQuickRatio",
          },
          {
            value: busContByCompany[company.name][0]["scoreEmployeeTurnover"],
            title: "scoreEmployeeTurnover",
          },
          {
            value:
              busContByCompany[company.name][0]["scoreLossOnMajorUpheaval"],
            title: "scoreLossOnMajorUpheaval",
          },
          {
            value: busContByCompany[company.name][0]["scoreSolvencyRatio"],
            title: "scoreSolvencyRatio",
          },
          {
            value:
              credRisByCompany[company.name][0]["scoreAverageCollectionPeriod"],
            title: "scoreAverageCollectionPeriod",
          },
          {
            value:
              credRisByCompany[company.name][0]["scoreTotalReceivablePerSales"],
            title: "scoreTotalReceivablePerSales",
          },
          {
            value: marketByCompany[company.name][0]["scoreRevenueGrowth"],
            title: "scoreRevenueGrowth",
          },
          {
            value: marketByCompany[company.name][0]["scoreMarketShare"],
            title: "scoreMarketShare",
          },
          {
            value: marketByCompany[company.name][0]["scoreNewCustomers"],
            title: "scoreNewCustomers",
          },
          {
            value: operByCompany[company.name][0]["scoreOperatingExpenses"],
            title: "scoreOperatingExpenses",
          },
          {
            value: operByCompany[company.name][0]["scoreSystemUptime"],
            title: "scoreSystemUptime",
          },
          {
            value: operByCompany[company.name][0]["scoreMachineryUptime"],
            title: "scoreMachineryUptime",
          },
          {
            value: profByCompany[company.name][0]["scoreGpMargin"],
            title: "scoreGpMargin",
          },
          {
            value: profByCompany[company.name][0]["scoreEbitdaMargin"],
            title: "scoreEbitdaMargin",
          },
          {
            value: profByCompany[company.name][0]["scoreReturnOnEquity"],
            title: "scoreReturnOnEquity",
          },
          {
            value: profByCompany[company.name][0]["scoreReturnOnAsset"],
            title: "scoreReturnOnAsset",
          },
          {
            value: profByCompany[company.name][0]["scoreNetProfitMargin"],
            title: "scoreNetProfitMargin",
          },
          {
            value: complByCompany[company.name][0]["taxScore"],
            title: "taxScore",
          },
          {
            value: complByCompany[company.name][0]["contractScore"],
            title: "contractScore",
          },
          {
            value: complByCompany[company.name][0]["financialReportingScore"],
            title: "financialReportingScore",
          },
          {
            value: complByCompany[company.name][0]["govLicenceScore"],
            title: "govLicenceScore",
          },
          {
            value: finaByCompany[company.name][0]["customerDefaultRiskScore"],
            title: "customerDefaultRiskScore",
          },
          {
            value: finaByCompany[company.name][0]["cashFlowConstraintsScore"],
            title: "cashFlowConstraintsScore",
          },
          {
            value: finaByCompany[company.name][0]["fraudAndCorruptionScore"],
            title: "fraudAndCorruptionScore",
          },
          {
            value:
              finaByCompany[company.name][0]["errorsAndMisstatementsScore"],
            title: "errorsAndMisstatementsScore",
          },
          {
            value: finaByCompany[company.name][0]["underUtilCapitalScore"],
            title: "underUtilCapitalScore",
          },
          {
            value: operQualByCompany[company.name][0]["disruptionOpScore"],
            title: "disruptionOpScore",
          },
          {
            value: operQualByCompany[company.name][0]["lossOfKeyStaffScore"],
            title: "lossOfKeyStaffScore",
          },
          {
            value: operQualByCompany[company.name][0]["compromisePrdtScore"],
            title: "compromisePrdtScore",
          },
          {
            value: operQualByCompany[company.name][0]["serviceDelaysScore"],
            title: "serviceDelaysScore",
          },
          {
            value:
              operQualByCompany[company.name][0]["disruptionSupplyChainScore"],
            title: "disruptionSupplyChainScore",
          },
          {
            value: stratByCompany[company.name][0]["pdctDevScore"],
            title: "pdctDevScore",
          },
          {
            value: stratByCompany[company.name][0]["investNewTechScore"],
            title: "investNewTechScore",
          },
          {
            value: stratByCompany[company.name][0]["businessContScore"],
            title: "businessContScore",
          },
          {
            value: stratByCompany[company.name][0]["brandRiskScore"],
            title: "brandRiskScore",
          },
        ];
      }

      return {
        companyName: company.name,
        extreme: pool.filter((p) => {
          return p.value >= 4;
        }),
        extremCount: pool.filter((p) => {
          return p.value >= 4;
        }).length,
        high: pool.filter((p) => {
          return p.value < 4 && p.value >= 3;
        }),
        highCount: pool.filter((p) => {
          return p.value < 4 && p.value >= 3;
        }).length,

        avgRiskScore:
          liqByCompany[company.name] &&
          busContByCompany[company.name] &&
          credRisByCompany[company.name] &&
          marketByCompany[company.name] &&
          operByCompany[company.name] &&
          profByCompany[company.name] &&
          complByCompany[company.name] &&
          finaByCompany[company.name] &&
          operQualByCompany[company.name] &&
          stratByCompany[company.name]
            ? _.round(
                _.mean([
                  liqByCompany[company.name][0]["scoreCurrentRatio"],
                  liqByCompany[company.name][0]["scoreQuickRatio"],
                  busContByCompany[company.name][0]["scoreEmployeeTurnover"],
                  busContByCompany[company.name][0]["scoreLossOnMajorUpheaval"],
                  busContByCompany[company.name][0]["scoreSolvencyRatio"],
                  credRisByCompany[company.name][0][
                    "scoreAverageCollectionPeriod"
                  ],
                  credRisByCompany[company.name][0][
                    "scoreTotalReceivablePerSales"
                  ],
                  marketByCompany[company.name][0]["scoreRevenueGrowth"],
                  marketByCompany[company.name][0]["scoreMarketShare"],
                  marketByCompany[company.name][0]["scoreNewCustomers"],
                  operByCompany[company.name][0]["scoreOperatingExpenses"],
                  operByCompany[company.name][0]["scoreSystemUptime"],
                  operByCompany[company.name][0]["scoreMachineryUptime"],
                  profByCompany[company.name][0]["scoreGpMargin"],
                  profByCompany[company.name][0]["scoreEbitdaMargin"],
                  profByCompany[company.name][0]["scoreReturnOnEquity"],
                  profByCompany[company.name][0]["scoreReturnOnAsset"],
                  profByCompany[company.name][0]["scoreNetProfitMargin"],
                  complByCompany[company.name][0]["taxScore"],
                  complByCompany[company.name][0]["contractScore"],
                  complByCompany[company.name][0]["financialReportingScore"],
                  complByCompany[company.name][0]["govLicenceScore"],
                  finaByCompany[company.name][0]["customerDefaultRiskScore"],
                  finaByCompany[company.name][0]["cashFlowConstraintsScore"],
                  finaByCompany[company.name][0]["fraudAndCorruptionScore"],
                  finaByCompany[company.name][0]["errorsAndMisstatementsScore"],
                  finaByCompany[company.name][0]["underUtilCapitalScore"],
                  operQualByCompany[company.name][0]["disruptionOpScore"],
                  operQualByCompany[company.name][0]["lossOfKeyStaffScore"],
                  operQualByCompany[company.name][0]["compromisePrdtScore"],
                  operQualByCompany[company.name][0]["serviceDelaysScore"],
                  operQualByCompany[company.name][0][
                    "disruptionSupplyChainScore"
                  ],
                  stratByCompany[company.name][0]["pdctDevScore"],
                  stratByCompany[company.name][0]["investNewTechScore"],
                  stratByCompany[company.name][0]["businessContScore"],
                  stratByCompany[company.name][0]["brandRiskScore"],
                ]),
                0
              )
            : 0,
      };
    });

    console.log(_avgScoresByCompany);

    setAvgRiskScore(
      _.orderBy(
        _avgScoresByCompany,
        ["extremCount", "avgRiskScore", "companyName"],
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
                    index <= 9 && (
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
