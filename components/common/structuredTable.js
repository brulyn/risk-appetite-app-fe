import React, { useContext, useEffect, useState } from "react";
import { Icon, Table, Label } from "semantic-ui-react";
import { RatioContext } from "../../contexts/ratioContext";

function StructuredTable() {
  const { ratios, setRatios } = useContext(RatioContext);

  const getRiskScore = (performance, tolerance) => {
    if (performance / tolerance >= 1 || tolerance === 0) return 0;
    if (performance / tolerance >= 0.8 && performance / tolerance < 1) return 1;
    if (performance / tolerance >= 0.5 && performance / tolerance < 0.8)
      return 2;
    if (performance / tolerance >= 0.2 && performance / tolerance < 0.5)
      return 3;
    if (performance / tolerance < 0.2) return 4;
  };

  const getFlagColor = (score) => {
    if (score === 0) return "green";
    if (score === 1) return "olive";
    if (score === 2) return "yellow";
    if (score === 3) return "orange";
    if (score === 4) return "red";
  };

  const getDirectionOfRisk = (
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
    let prevRiskScore = getRiskScore(prevPerformance, riskTolerance);
    let currRiskScore = getRiskScore(currPerformance, riskTolerance);

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
          <Table.HeaderCell>Current Risk Flag / Direction</Table.HeaderCell>
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
                  {getRiskScore(row.currentPerformance, row.riskTolerance)}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={getFlagColor(
                      getRiskScore(row.currentPerformance, row.riskTolerance)
                    )}
                  >
                    {getDirectionOfRisk(
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
                  {getRiskScore(row.currentPerformance, row.riskTolerance)}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={getFlagColor(
                      getRiskScore(row.currentPerformance, row.riskTolerance)
                    )}
                  >
                    {getDirectionOfRisk(
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
                  {getRiskScore(row.currentPerformance, row.riskTolerance)}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={getFlagColor(
                      getRiskScore(row.currentPerformance, row.riskTolerance)
                    )}
                  >
                    {getDirectionOfRisk(
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
                  {row.riskTolerance}{" "}
                  {row.metric !== "Average Collection Period" && "%"}
                </Table.Cell>
                <Table.Cell>
                  {getRiskScore(row.currentPerformance, row.riskTolerance)}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={getFlagColor(
                      getRiskScore(row.currentPerformance, row.riskTolerance)
                    )}
                  >
                    {getDirectionOfRisk(
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
                  {getRiskScore(row.currentPerformance, row.riskTolerance)}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={getFlagColor(
                      getRiskScore(row.currentPerformance, row.riskTolerance)
                    )}
                  >
                    {getDirectionOfRisk(
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
                  {getRiskScore(row.currentPerformance, row.riskTolerance)}
                </Table.Cell>
                <Table.Cell>
                  <Label
                    color={getFlagColor(
                      getRiskScore(row.currentPerformance, row.riskTolerance)
                    )}
                  >
                    {getDirectionOfRisk(
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
