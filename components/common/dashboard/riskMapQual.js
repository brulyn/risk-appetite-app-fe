import React from "react";

export default function RiskMapQual({
  companyName,
  strategicScore,
  financialScore,
  operationalQualScore,
  complianceScore,
}) {
  return (
    <div className="flex flex-col m-1 col-span-2 p-3 ">
      <div className="text-center font-bold text-gray-800 text-lg my-3">
        {companyName} - Risk Appetite Map (Qualitative)
      </div>

      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <div className="flex-row bg-yellow-600 mb-1 rounded-tl-2xl p-7 shadow-md">
            <div className="text-center font-bold text-gray-800 text-xl">
              High
            </div>
            {strategicScore === 3 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Strategic : {strategicScore}
              </div>
            )}

            {financialScore === 3 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Financial : {financialScore}
              </div>
            )}

            {operationalQualScore === 3 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Operational : {operationalQualScore}
              </div>
            )}

            {complianceScore === 3 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Compliance : {complianceScore}
              </div>
            )}
          </div>

          <div className="flex-row bg-green-500 rounded-bl-2xl p-7 shadow-md">
            <div className="text-center font-bold text-gray-800 text-xl">
              Low
            </div>

            {strategicScore <= 1 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Strategic : {strategicScore}
              </div>
            )}

            {financialScore <= 1 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Financial : {financialScore}
              </div>
            )}

            {operationalQualScore <= 1 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Operational : {operationalQualScore}
              </div>
            )}

            {complianceScore <= 1 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Compliance : {complianceScore}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col w-1/2 ml-1">
          <div className="flex-row bg-red-500 mb-1 rounded-tr-2xl p-7 shadow-md">
            <div className="text-center font-bold text-gray-800 text-xl">
              Extreme
            </div>
            {strategicScore >= 4 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Strategic : {strategicScore}
              </div>
            )}

            {financialScore >= 4 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Financial : {financialScore}
              </div>
            )}

            {operationalQualScore >= 4 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Operational : {operationalQualScore}
              </div>
            )}

            {complianceScore >= 4 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Compliance : {complianceScore}
              </div>
            )}
          </div>

          <div className="flex-row bg-yellow-300 rounded-br-2xl p-7 shadow-md">
            <div className="text-center font-bold text-gray-800 text-xl cursor-help">
              Moderate
            </div>
            {strategicScore === 2 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Strategic : {strategicScore}
              </div>
            )}

            {financialScore === 2 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Financial : {financialScore}
              </div>
            )}

            {operationalQualScore === 2 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Operational : {operationalQualScore}
              </div>
            )}

            {complianceScore === 2 && (
              <div className="font-bold text-gray-800 text-base cursor-pointer">
                Compliance : {complianceScore}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
