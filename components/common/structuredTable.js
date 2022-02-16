import React, { useContext, useEffect, useState } from "react";
import { Icon, Table, Label } from "semantic-ui-react";
import { RatioContext } from "../../contexts/ratioContext";
import _ from "lodash";

function StructuredTable() {
  const { ratios, setRatios } = useContext(RatioContext);

  const getRiskScoreGB = (performance, tolerance) => {
    if (performance / tolerance >= 1 || tolerance === 0) return 0;
    if (performance / tolerance >= 0.8 && performance / tolerance < 1) return 1;
    if (performance / tolerance >= 0.5 && performance / tolerance < 0.8)
      return 2;
    if (performance / tolerance >= 0.2 && performance / tolerance < 0.5)
      return 3;
    if (performance / tolerance < 0.2) return 4;
  };

  const getRiskScoreLB = (performance, tolerance) => {
    let diff = performance - tolerance;
    let diff_by_percent = (diff / tolerance) * 100;

    if (diff_by_percent <= 0) return 0;
    else if (diff_by_percent <= 20) return 1;
    else if (diff_by_percent <= 30) return 2;
    else if (diff_by_percent <= 40) return 3;
    else return 4;
  };

  const getFlagColor = (score) => {
    if (score === 0) return "green";
    if (score === 1) return "olive";
    if (score === 2) return "yellow";
    if (score === 3) return "orange";
    if (score === 4) return "red";
  };

  const getDirectionOfRiskGB = (
    currPerformance,
    prevPerformance,
    riskTolerance,
    criteria = "greater"
  ) => {
    /**
     *
     * if previous performance vs risk tolerance is greater than current performance vd risk tolerance then decresin
     * else increasing
     */
    let prevRiskScore = getRiskScoreGB(prevPerformance, riskTolerance);
    let currRiskScore = getRiskScoreGB(currPerformance, riskTolerance);

    if (prevRiskScore > currRiskScore) return "Decreasing";
    else if (prevRiskScore < currRiskScore) return "Increasing";
    else return "Stable";
  };

  const getDirectionOfRiskLB = (
    currPerformance,
    prevPerformance,
    riskTolerance,
    criteria = "greater"
  ) => {
    /**
     *
     * if previous performance vs risk tolerance is greater than current performance vd risk tolerance then decresin
     * else increasing
     */
    let prevRiskScore = getRiskScoreLB(prevPerformance, riskTolerance);
    let currRiskScore = getRiskScoreLB(currPerformance, riskTolerance);

    if (prevRiskScore > currRiskScore) return "Decreasing";
    else if (prevRiskScore < currRiskScore) return "Increasing";
    else return "Stable";
  };
  return (
    <Table celled structured compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Risk Metric</Table.HeaderCell>
          <Table.HeaderCell>Current Performance</Table.HeaderCell>
          <Table.HeaderCell>Previous Performance</Table.HeaderCell>
          <Table.HeaderCell>Risk Tolerance</Table.HeaderCell>
          <Table.HeaderCell>Risk Score</Table.HeaderCell>
          <Table.HeaderCell>Current Risk Flag and Direction</Table.HeaderCell>
          {/* <Table.HeaderCell rowSpan="2">Direction of risk</Table.HeaderCell> */}
          {/* <Table.HeaderCell colSpan="3">Risk Tolerance</Table.HeaderCell> */}
        </Table.Row>
      </Table.Header>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="7">Liquidity</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {ratios.map((row) => {
          if (row.category === "liquidity")
            return (
              <Table.Row key={row.metric}>
                <Table.Cell>{row.metric}</Table.Cell>
                <Table.Cell>{_.round(row.currentPerformance, 2)}%</Table.Cell>
                <Table.Cell>{_.round(row.previousPerformance, 2)}%</Table.Cell>
                <Table.Cell>{_.round(row.riskTolerance, 2)}%</Table.Cell>
                <Table.Cell>
                  {getRiskScoreGB(
                    _.round(row.currentPerformance, 2),
                    _.round(row.riskTolerance, 2)
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={getFlagColor(
                      getRiskScoreGB(
                        _.round(row.currentPerformance, 2),
                        _.round(row.riskTolerance, 2)
                      )
                    )}
                  >
                    {getDirectionOfRiskGB(
                      _.round(row.currentPerformance, 2),
                      _.round(row.previousPerformance, 2),
                      _.round(row.riskTolerance, 2),
                      "greater"
                    )}
                  </Label>
                </Table.Cell>
                {/* <Table.Cell>3</Table.Cell> */}
              </Table.Row>
            );
        })}
      </Table.Body>

      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="7">Profitability</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {ratios.map((row) => {
          if (row.category === "profitability")
            return (
              <Table.Row key={row.metric}>
                <Table.Cell>{row.metric}</Table.Cell>
                <Table.Cell>{_.round(row.currentPerformance, 2)}%</Table.Cell>
                <Table.Cell>{_.round(row.previousPerformance, 2)}%</Table.Cell>
                <Table.Cell>{_.round(row.riskTolerance, 2)}%</Table.Cell>
                <Table.Cell>
                  {getRiskScoreGB(
                    _.round(row.currentPerformance, 2),
                    _.round(row.riskTolerance, 2)
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={getFlagColor(
                      getRiskScoreGB(
                        _.round(row.currentPerformance, 2),
                        _.round(row.riskTolerance, 2)
                      )
                    )}
                  >
                    {getDirectionOfRiskGB(
                      _.round(row.currentPerformance, 2),
                      _.round(row.previousPerformance, 2),
                      _.round(row.riskTolerance, 2),
                      "greater"
                    )}
                  </Label>
                </Table.Cell>
                {/* <Table.Cell>3</Table.Cell> */}
              </Table.Row>
            );
        })}
      </Table.Body>

      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="7">
            Operational Efficiency
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {ratios.map((row) => {
          if (row.category === "operationalEfficiency")
            return (
              <Table.Row key={row.metric}>
                <Table.Cell>{row.metric}</Table.Cell>
                <Table.Cell>{_.round(row.currentPerformance, 2)}%</Table.Cell>
                <Table.Cell>{_.round(row.previousPerformance, 2)}%</Table.Cell>
                <Table.Cell>{_.round(row.riskTolerance, 2)}%</Table.Cell>
                <Table.Cell>
                  {row.metric === "Operating Expenses" &&
                    getRiskScoreLB(
                      _.round(row.currentPerformance, 2),
                      _.round(row.riskTolerance, 2)
                    )}
                  {row.metric !== "Operating Expenses" &&
                    getRiskScoreGB(
                      _.round(row.currentPerformance, 2),
                      _.round(row.riskTolerance, 2)
                    )}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={
                      row.metric !== "Operating Expenses"
                        ? getFlagColor(
                            getRiskScoreGB(
                              _.round(row.currentPerformance, 2),
                              _.round(row.riskTolerance, 2)
                            )
                          )
                        : getFlagColor(
                            getRiskScoreLB(
                              _.round(row.currentPerformance, 2),
                              _.round(row.riskTolerance, 2)
                            )
                          )
                    }
                  >
                    {row.metric !== "Operating Expenses" &&
                      getDirectionOfRiskGB(
                        _.round(row.currentPerformance, 2),
                        _.round(row.previousPerformance, 2),
                        _.round(row.riskTolerance, 2),
                        "greater"
                      )}

                    {row.metric === "Operating Expenses" &&
                      getDirectionOfRiskLB(
                        _.round(row.currentPerformance, 2),
                        _.round(row.previousPerformance, 2),
                        _.round(row.riskTolerance, 2),
                        "greater"
                      )}
                  </Label>
                </Table.Cell>
                {/* <Table.Cell>3</Table.Cell> */}
              </Table.Row>
            );
        })}
      </Table.Body>

      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="7">Credit Risk</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {ratios.map((row) => {
          if (row.category === "creditRisk")
            return (
              <Table.Row key={row.metric}>
                <Table.Cell>{row.metric}</Table.Cell>
                <Table.Cell>
                  {_.round(row.currentPerformance, 2)}{" "}
                  {row.metric !== "Average Collection Period" && "%"}
                </Table.Cell>
                <Table.Cell>
                  {_.round(row.previousPerformance, 2)}{" "}
                  {row.metric !== "Average Collection Period" && "%"}
                </Table.Cell>
                <Table.Cell>
                  {_.round(row.riskTolerance, 2)}
                  {row.metric !== "Average Collection Period" && "%"}
                </Table.Cell>
                <Table.Cell>
                  {row.metric !== "Average Collection Period"
                    ? getRiskScoreLB(
                        _.round(row.currentPerformance, 2),
                        _.round(row.riskTolerance, 2)
                      )
                    : getRiskScoreLB(
                        _.round(row.currentPerformance, 2),
                        _.round(row.riskTolerance, 2)
                      )}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={
                      row.metric !== "Average Collection Period"
                        ? getFlagColor(
                            getRiskScoreLB(
                              _.round(row.currentPerformance, 2),
                              _.round(row.riskTolerance, 2)
                            )
                          )
                        : getFlagColor(
                            getRiskScoreLB(
                              _.round(row.currentPerformance, 2),
                              _.round(row.riskTolerance, 2)
                            )
                          )
                    }
                  >
                    {row.metric !== "Average Collection Period"
                      ? getDirectionOfRiskLB(
                          _.round(row.currentPerformance, 2),
                          _.round(row.previousPerformance, 2),
                          _.round(row.riskTolerance, 2),
                          "greater"
                        )
                      : getDirectionOfRiskLB(
                          _.round(row.currentPerformance, 2),
                          _.round(row.previousPerformance, 2),
                          _.round(row.riskTolerance, 2),
                          "greater"
                        )}
                  </Label>
                </Table.Cell>
                {/* <Table.Cell>3</Table.Cell> */}
              </Table.Row>
            );
        })}
      </Table.Body>

      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="7">Marketing</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {ratios.map((row) => {
          if (row.category === "marketing")
            return (
              <Table.Row key={row.metric}>
                <Table.Cell>{row.metric}</Table.Cell>
                <Table.Cell>{_.round(row.currentPerformance, 2)}%</Table.Cell>
                <Table.Cell>{_.round(row.previousPerformance, 2)}%</Table.Cell>
                <Table.Cell>{_.round(row.riskTolerance, 2)}%</Table.Cell>
                <Table.Cell>
                  {getRiskScoreGB(
                    _.round(row.currentPerformance, 2),
                    _.round(row.riskTolerance, 2)
                  )}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={getFlagColor(
                      getRiskScoreGB(
                        _.round(row.currentPerformance, 2),
                        _.round(row.riskTolerance, 2)
                      )
                    )}
                  >
                    {getDirectionOfRiskGB(
                      _.round(row.currentPerformance, 2),
                      _.round(row.previousPerformance, 2),
                      _.round(row.riskTolerance, 2),
                      "greater"
                    )}
                  </Label>
                </Table.Cell>
                {/* <Table.Cell>3</Table.Cell> */}
              </Table.Row>
            );
        })}
      </Table.Body>

      <Table.Header>
        <Table.Row>
          <Table.HeaderCell colSpan="7">Business Continuity</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {ratios.map((row) => {
          if (row.category === "businessContinuity")
            return (
              <Table.Row key={row.metric}>
                <Table.Cell>{row.metric}</Table.Cell>
                <Table.Cell>{_.round(row.currentPerformance, 2)}%</Table.Cell>
                <Table.Cell>{_.round(row.previousPerformance, 2)}%</Table.Cell>
                <Table.Cell>{_.round(row.riskTolerance, 2)}%</Table.Cell>
                <Table.Cell>
                  {row.metric !== "Loss on major Upheaval"
                    ? getRiskScoreGB(
                        _.round(row.currentPerformance, 2),
                        _.round(row.riskTolerance, 2)
                      )
                    : getRiskScoreGB(
                        _.round(row.currentPerformance, 2),
                        _.round(row.riskTolerance, 2)
                      )}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={
                      row.metric !== "Loss on major Upheaval"
                        ? getFlagColor(
                            getRiskScoreGB(
                              _.round(row.currentPerformance, 2),
                              _.round(row.riskTolerance, 2)
                            )
                          )
                        : getFlagColor(
                            getRiskScoreLB(
                              _.round(row.currentPerformance, 2),
                              _.round(row.riskTolerance, 2)
                            )
                          )
                    }
                  >
                    {row.metric !== "Loss on major Upheaval"
                      ? getDirectionOfRiskGB(
                          _.round(row.currentPerformance, 2),
                          _.round(row.previousPerformance, 2),
                          _.round(row.riskTolerance, 2),
                          "greater"
                        )
                      : getDirectionOfRiskLB(
                          _.round(row.currentPerformance, 2),
                          _.round(row.previousPerformance, 2),
                          _.round(row.riskTolerance, 2),
                          "greater"
                        )}
                  </Label>
                </Table.Cell>
                {/* <Table.Cell>3</Table.Cell> */}
              </Table.Row>
            );
        })}
      </Table.Body>
    </Table>
  );
}

export default StructuredTable;
