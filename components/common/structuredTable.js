import React, { useContext, useEffect, useState } from "react";
import { Icon, Table, Label } from "semantic-ui-react";
import { RatioContext } from "../../contexts/ratioContext";

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
    if (performance / tolerance >= 1 || tolerance === 0) return 4;
    if (performance / tolerance >= 0.8 && performance / tolerance < 1) return 3;
    if (performance / tolerance >= 0.5 && performance / tolerance < 0.8)
      return 2;
    if (performance / tolerance >= 0.2 && performance / tolerance < 0.5)
      return 1;
    if (performance / tolerance < 0.2) return 0;
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

  // useEffect(() => {
  //   setRatios(ratios ? ratios : []);
  //   console.log(ratios);
  // }, [ratios]);

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
                <Table.Cell>{row.currentPerformance}%</Table.Cell>
                <Table.Cell>{row.previousPerformance}%</Table.Cell>
                <Table.Cell>{row.riskTolerance}%</Table.Cell>
                <Table.Cell>
                  {getRiskScoreGB(row.currentPerformance, row.riskTolerance)}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={getFlagColor(
                      getRiskScoreGB(row.currentPerformance, row.riskTolerance)
                    )}
                  >
                    {getDirectionOfRiskGB(
                      row.currentPerformance,
                      row.previousPerformance,
                      row.riskTolerance,
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
                <Table.Cell>{row.currentPerformance}%</Table.Cell>
                <Table.Cell>{row.previousPerformance}%</Table.Cell>
                <Table.Cell>{row.riskTolerance}%</Table.Cell>
                <Table.Cell>
                  {getRiskScoreGB(row.currentPerformance, row.riskTolerance)}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={getFlagColor(
                      getRiskScoreGB(row.currentPerformance, row.riskTolerance)
                    )}
                  >
                    {getDirectionOfRiskGB(
                      row.currentPerformance,
                      row.previousPerformance,
                      row.riskTolerance,
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
                <Table.Cell>{row.currentPerformance}%</Table.Cell>
                <Table.Cell>{row.previousPerformance}%</Table.Cell>
                <Table.Cell>{row.riskTolerance}%</Table.Cell>
                <Table.Cell>
                  {row.metric === "Operating Expenses" &&
                    getRiskScoreLB(row.currentPerformance, row.riskTolerance)}
                  {row.metric !== "Operating Expenses" &&
                    getRiskScoreGB(row.currentPerformance, row.riskTolerance)}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={
                      row.metric !== "Operating Expenses"
                        ? getFlagColor(
                            getRiskScoreGB(
                              row.currentPerformance,
                              row.riskTolerance
                            )
                          )
                        : getFlagColor(
                            getRiskScoreLB(
                              row.currentPerformance,
                              row.riskTolerance
                            )
                          )
                    }
                  >
                    {row.metric !== "Operating Expenses" &&
                      getDirectionOfRiskGB(
                        row.currentPerformance,
                        row.previousPerformance,
                        row.riskTolerance,
                        "greater"
                      )}

                    {row.metric === "Operating Expenses" &&
                      getDirectionOfRiskLB(
                        row.currentPerformance,
                        row.previousPerformance,
                        row.riskTolerance,
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
                  {row.currentPerformance}{" "}
                  {row.metric !== "Average Collection Period" && "%"}
                </Table.Cell>
                <Table.Cell>
                  {row.previousPerformance}{" "}
                  {row.metric !== "Average Collection Period" && "%"}
                </Table.Cell>
                <Table.Cell>
                  {row.riskTolerance}
                  {row.metric !== "Average Collection Period" && "%"}
                </Table.Cell>
                <Table.Cell>
                  {row.metric !== "Average Collection Period"
                    ? getRiskScoreLB(row.currentPerformance, row.riskTolerance)
                    : getRiskScoreLB(row.currentPerformance, row.riskTolerance)}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={
                      row.metric !== "Average Collection Period"
                        ? getFlagColor(
                            getRiskScoreLB(
                              row.currentPerformance,
                              row.riskTolerance
                            )
                          )
                        : getFlagColor(
                            getRiskScoreLB(
                              row.currentPerformance,
                              row.riskTolerance
                            )
                          )
                    }
                  >
                    {row.metric !== "Average Collection Period"
                      ? getDirectionOfRiskLB(
                          row.currentPerformance,
                          row.previousPerformance,
                          row.riskTolerance,
                          "greater"
                        )
                      : getDirectionOfRiskLB(
                          row.currentPerformance,
                          row.previousPerformance,
                          row.riskTolerance,
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
                <Table.Cell>{row.currentPerformance}%</Table.Cell>
                <Table.Cell>{row.previousPerformance}%</Table.Cell>
                <Table.Cell>{row.riskTolerance}%</Table.Cell>
                <Table.Cell>
                  {getRiskScoreGB(row.currentPerformance, row.riskTolerance)}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={getFlagColor(
                      getRiskScoreGB(row.currentPerformance, row.riskTolerance)
                    )}
                  >
                    {getDirectionOfRiskGB(
                      row.currentPerformance,
                      row.previousPerformance,
                      row.riskTolerance,
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
                <Table.Cell>{row.currentPerformance}%</Table.Cell>
                <Table.Cell>{row.previousPerformance}%</Table.Cell>
                <Table.Cell>{row.riskTolerance}%</Table.Cell>
                <Table.Cell>
                  {row.metric !== "Loss on major Upheaval"
                    ? getRiskScoreGB(row.currentPerformance, row.riskTolerance)
                    : getRiskScoreGB(row.currentPerformance, row.riskTolerance)}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={
                      row.metric !== "Loss on major Upheaval"
                        ? getFlagColor(
                            getRiskScoreGB(
                              row.currentPerformance,
                              row.riskTolerance
                            )
                          )
                        : getFlagColor(
                            getRiskScoreLB(
                              row.currentPerformance,
                              row.riskTolerance
                            )
                          )
                    }
                  >
                    {row.metric !== "Loss on major Upheaval"
                      ? getDirectionOfRiskGB(
                          row.currentPerformance,
                          row.previousPerformance,
                          row.riskTolerance,
                          "greater"
                        )
                      : getDirectionOfRiskLB(
                          row.currentPerformance,
                          row.previousPerformance,
                          row.riskTolerance,
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
