import React from "react";

export default function RiskMap({
  companyName,
  liquidityScore,
  profitabilityScore,
  operationalEffScore,
  creditRiskScore,
  marketingScore,
  businessContScore,
}) {
  return (
    <div className="flex flex-col m-1 col-span-2 p-3 ">
      <div className="text-center font-bold text-gray-800 text-lg my-3">
        {companyName} - Risk Appetite Map (Quantitative)
      </div>

      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <div className="flex-row bg-yellow-600 mb-1 rounded-tl-2xl p-7 shadow-md">
            <div className="text-center font-bold text-gray-800 text-xl">
              High
            </div>
            {liquidityScore === 3 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Liquidity : {liquidityScore}
              </div>
            )}

            {profitabilityScore === 3 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Profitability : {profitabilityScore}
              </div>
            )}

            {operationalEffScore === 3 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Operational Efficiency : {operationalEffScore}
              </div>
            )}

            {creditRiskScore === 3 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Credit Risk : {creditRiskScore}
              </div>
            )}
            {marketingScore === 3 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Marketing : {marketingScore}
              </div>
            )}

            {businessContScore === 3 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Business Continuity : {businessContScore}
              </div>
            )}
          </div>

          <div className="flex-row bg-green-500 rounded-bl-2xl p-7 shadow-md">
            <div className="text-center font-bold text-gray-800 text-xl">
              Low
            </div>

            {liquidityScore <= 1 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Liquidity : {liquidityScore}
              </div>
            )}

            {profitabilityScore <= 1 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Profitability : {profitabilityScore}
              </div>
            )}

            {operationalEffScore <= 1 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Operational Efficiency : {operationalEffScore}
              </div>
            )}

            {creditRiskScore <= 1 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Credit Risk : {creditRiskScore}
              </div>
            )}
            {marketingScore <= 1 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Marketing : {marketingScore}
              </div>
            )}

            {businessContScore <= 1 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Business Continuity : {businessContScore}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-1/2 ml-1">
          <div className="flex-row bg-red-500 mb-1 rounded-tr-2xl p-7 shadow-md">
            <div className="text-center font-bold text-gray-800 text-xl">
              Extreme
            </div>
            {liquidityScore >= 4 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Liquidity : {liquidityScore}
              </div>
            )}

            {profitabilityScore >= 4 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Profitability : {profitabilityScore}
              </div>
            )}

            {operationalEffScore >= 4 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Operational Efficiency : {operationalEffScore}
              </div>
            )}

            {creditRiskScore >= 4 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Credit Risk : {creditRiskScore}
              </div>
            )}
            {marketingScore >= 4 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Marketing : {marketingScore}
              </div>
            )}

            {businessContScore >= 4 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Business Continuity : {businessContScore}
              </div>
            )}
          </div>

          <div className="flex-row bg-yellow-300 rounded-br-2xl p-7 shadow-md">
            <div className="text-center font-bold text-gray-800 text-xl cursor-help">
              Moderate
            </div>
            {liquidityScore === 2 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Liquidity : {liquidityScore}
              </div>
            )}

            {profitabilityScore === 2 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Profitability : {profitabilityScore}
              </div>
            )}

            {operationalEffScore === 2 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Operational Efficiency : {operationalEffScore}
              </div>
            )}

            {creditRiskScore === 2 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Credit Risk : {creditRiskScore}
              </div>
            )}
            {marketingScore === 2 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Marketing : {marketingScore}
              </div>
            )}

            {businessContScore === 2 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Business Continuity : {businessContScore}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
