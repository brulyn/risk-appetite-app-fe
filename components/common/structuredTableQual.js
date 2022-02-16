import React, { useContext, useEffect, useState } from "react";
import { Icon, Table, Label } from "semantic-ui-react";
import { RatioContext } from "../../contexts/ratioContext";
const host = `http://${process.env.NEXT_PUBLIC_HOST_SERVER_IP}:3001`;

function StructuredTableQual() {
  const { ratios, setRatios } = useContext(RatioContext);

  const tolFillZeroCell = (toleranceValue) => {
    if (toleranceValue <= 100) return true;
    else return false;
  };
  const tolFillLowCell = (toleranceValue) => {
    if (toleranceValue <= 80) return true;
    else return false;
  };
  const tolFillMediumCell = (toleranceValue) => {
    if (toleranceValue <= 60) return true;
    else return false;
  };
  const tolFillHighCell = (toleranceValue) => {
    if (toleranceValue <= 10) return true;
    else return false;
  };

  const valFillNoactionCell = (performanceValue) => {
    return performanceValue < 10;
  };
  const valFillLowCell = (performanceValue) => {
    return performanceValue >= 10 && performanceValue < 50;
  };
  const valFillMediumCell = (performanceValue) => {
    return performanceValue >= 50 && performanceValue < 80;
  };
  const valFillHighCell = (performanceValue) => {
    if (performanceValue >= 80) return true;
    else return false;
  };
  return (
    <Table structured compact>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell rowSpan="2" colSpan="2">
            Risk Cateogires
          </Table.HeaderCell>
          <Table.HeaderCell colSpan="4">Risk Tolerance</Table.HeaderCell>
          <Table.HeaderCell colSpan="4">Implementation Level</Table.HeaderCell>
        </Table.Row>
        <Table.Row>
          <Table.HeaderCell>Zero</Table.HeaderCell>
          <Table.HeaderCell>Low</Table.HeaderCell>
          <Table.HeaderCell>Medium</Table.HeaderCell>
          <Table.HeaderCell>High</Table.HeaderCell>

          <Table.HeaderCell>High</Table.HeaderCell>
          <Table.HeaderCell>Medium</Table.HeaderCell>
          <Table.HeaderCell>Low</Table.HeaderCell>
          <Table.HeaderCell>No action</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {/* Strategic */}
        <Table.Row>
          <Table.Cell rowSpan="6">Strategic</Table.Cell>
        </Table.Row>
        {ratios.map((row) => {
          if (row.category === "strategic") {
            return (
              <Table.Row>
                {/* Tolerance Values */}
                <Table.Cell>{row.metric}</Table.Cell>
                <Table.Cell
                  active={tolFillZeroCell(row.riskTolerance)}
                ></Table.Cell>
                <Table.Cell
                  active={tolFillLowCell(row.riskTolerance)}
                ></Table.Cell>
                <Table.Cell
                  active={tolFillMediumCell(row.riskTolerance)}
                ></Table.Cell>
                <Table.Cell
                  active={tolFillHighCell(row.riskTolerance)}
                ></Table.Cell>
                {/* Perfomance Values */}
                <Table.Cell positive={valFillHighCell(row.currentPerformance)}>
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center">
                      <Icon color="green" name="circle outline" size="small" />
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell
                  positive={valFillHighCell(row.currentPerformance)}
                  warning={valFillMediumCell(row.currentPerformance)}
                >
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillMediumCell(row.currentPerformance) && (
                    <div className="bg-yellow-200 h-10 flex -m-3 items-center">
                      {/* <Icon color="green" name="circle outline" size="small" /> */}
                      <Icon color="orange" name="circle outline" size="small" />
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell
                  positive={valFillHighCell(row.currentPerformance)}
                  warning={valFillMediumCell(row.currentPerformance)}
                  warning={valFillLowCell(row.currentPerformance)}
                >
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillLowCell(row.currentPerformance) && (
                    <div className="bg-yellow-600 h-10 flex -m-3 items-center">
                      <Icon color="yellow" name="circle outline" size="small" />
                    </div>
                  )}
                  {valFillMediumCell(row.currentPerformance) && (
                    <div className="bg-yellow-200 h-10 flex -m-3 items-center"></div>
                  )}
                </Table.Cell>
                <Table.Cell
                  positive={valFillHighCell(row.currentPerformance)}
                  warning={valFillMediumCell(row.currentPerformance)}
                  warning={valFillLowCell(row.currentPerformance)}
                  error={valFillNoactionCell(row.currentPerformance)}
                >
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillNoactionCell(row.currentPerformance) && (
                    <div className="bg-red-500 h-10 flex -m-3 items-center">
                      <Icon color="yellow" name="cancel" size="small" />
                    </div>
                  )}
                  {valFillMediumCell(row.currentPerformance) && (
                    <div className="bg-yellow-200 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillLowCell(row.currentPerformance) && (
                    <div className="bg-yellow-600 h-10 flex -m-3 items-center"></div>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          }
        })}

        {/* Operational */}
        <Table.Row>
          <Table.Cell rowSpan="6">Operational</Table.Cell>
        </Table.Row>
        {ratios.map((row) => {
          if (row.category === "operational") {
            return (
              <Table.Row>
                <Table.Cell>{row.metric}</Table.Cell>
                <Table.Cell
                  active={tolFillZeroCell(row.riskTolerance)}
                ></Table.Cell>
                <Table.Cell
                  active={tolFillLowCell(row.riskTolerance)}
                ></Table.Cell>
                <Table.Cell
                  active={tolFillMediumCell(row.riskTolerance)}
                ></Table.Cell>
                <Table.Cell
                  active={tolFillHighCell(row.riskTolerance)}
                ></Table.Cell>
                {/* Perfomance Values */}
                <Table.Cell positive={valFillHighCell(row.currentPerformance)}>
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center">
                      <Icon color="green" name="circle outline" size="small" />
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell
                  positive={valFillHighCell(row.currentPerformance)}
                  warning={valFillMediumCell(row.currentPerformance)}
                >
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillMediumCell(row.currentPerformance) && (
                    <div className="bg-yellow-200 h-10 flex -m-3 items-center">
                      {/* <Icon color="green" name="circle outline" size="small" /> */}
                      <Icon color="orange" name="circle outline" size="small" />
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell
                  positive={valFillHighCell(row.currentPerformance)}
                  warning={valFillMediumCell(row.currentPerformance)}
                  warning={valFillLowCell(row.currentPerformance)}
                >
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillLowCell(row.currentPerformance) && (
                    <div className="bg-yellow-600 h-10 flex -m-3 items-center">
                      <Icon color="yellow" name="circle outline" size="small" />
                    </div>
                  )}
                  {valFillMediumCell(row.currentPerformance) && (
                    <div className="bg-yellow-200 h-10 flex -m-3 items-center"></div>
                  )}
                </Table.Cell>
                <Table.Cell
                  positive={valFillHighCell(row.currentPerformance)}
                  warning={valFillMediumCell(row.currentPerformance)}
                  warning={valFillLowCell(row.currentPerformance)}
                  error={valFillNoactionCell(row.currentPerformance)}
                >
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillNoactionCell(row.currentPerformance) && (
                    <div className="bg-red-500 h-10 flex -m-3 items-center">
                      <Icon color="yellow" name="cancel" size="small" />
                    </div>
                  )}
                  {valFillMediumCell(row.currentPerformance) && (
                    <div className="bg-yellow-200 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillLowCell(row.currentPerformance) && (
                    <div className="bg-yellow-600 h-10 flex -m-3 items-center"></div>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          }
        })}

        {/* Financial */}
        <Table.Row>
          <Table.Cell rowSpan="6">Financial</Table.Cell>
        </Table.Row>
        {ratios.map((row) => {
          if (row.category === "financial") {
            return (
              <Table.Row>
                <Table.Cell>{row.metric}</Table.Cell>
                <Table.Cell
                  active={tolFillZeroCell(row.riskTolerance)}
                ></Table.Cell>
                <Table.Cell
                  active={tolFillLowCell(row.riskTolerance)}
                ></Table.Cell>
                <Table.Cell
                  active={tolFillMediumCell(row.riskTolerance)}
                ></Table.Cell>
                <Table.Cell
                  active={tolFillHighCell(row.riskTolerance)}
                ></Table.Cell>
                {/* Perfomance Values */}
                <Table.Cell positive={valFillHighCell(row.currentPerformance)}>
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center">
                      <Icon color="green" name="circle outline" size="small" />
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell
                  positive={valFillHighCell(row.currentPerformance)}
                  warning={valFillMediumCell(row.currentPerformance)}
                >
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillMediumCell(row.currentPerformance) && (
                    <div className="bg-yellow-200 h-10 flex -m-3 items-center">
                      {/* <Icon color="green" name="circle outline" size="small" /> */}
                      <Icon color="orange" name="circle outline" size="small" />
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell
                  positive={valFillHighCell(row.currentPerformance)}
                  warning={valFillMediumCell(row.currentPerformance)}
                  warning={valFillLowCell(row.currentPerformance)}
                >
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillLowCell(row.currentPerformance) && (
                    <div className="bg-yellow-600 h-10 flex -m-3 items-center">
                      <Icon color="yellow" name="circle outline" size="small" />
                    </div>
                  )}
                  {valFillMediumCell(row.currentPerformance) && (
                    <div className="bg-yellow-200 h-10 flex -m-3 items-center"></div>
                  )}
                </Table.Cell>
                <Table.Cell
                  positive={valFillHighCell(row.currentPerformance)}
                  warning={valFillMediumCell(row.currentPerformance)}
                  warning={valFillLowCell(row.currentPerformance)}
                  error={valFillNoactionCell(row.currentPerformance)}
                >
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillNoactionCell(row.currentPerformance) && (
                    <div className="bg-red-500 h-10 flex -m-3 items-center">
                      <Icon color="yellow" name="cancel" size="small" />
                    </div>
                  )}
                  {valFillMediumCell(row.currentPerformance) && (
                    <div className="bg-yellow-200 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillLowCell(row.currentPerformance) && (
                    <div className="bg-yellow-600 h-10 flex -m-3 items-center"></div>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          }
        })}

        {/* Compliance */}
        <Table.Row>
          <Table.Cell rowSpan="6">Compliance</Table.Cell>
        </Table.Row>
        {ratios.map((row) => {
          if (row.category === "compliance") {
            return (
              <Table.Row>
                <Table.Cell>{row.metric}</Table.Cell>
                <Table.Cell
                  active={tolFillZeroCell(row.riskTolerance)}
                ></Table.Cell>
                <Table.Cell
                  active={tolFillLowCell(row.riskTolerance)}
                ></Table.Cell>
                <Table.Cell
                  active={tolFillMediumCell(row.riskTolerance)}
                ></Table.Cell>
                <Table.Cell
                  active={tolFillHighCell(row.riskTolerance)}
                ></Table.Cell>
                {/* Perfomance Values */}
                <Table.Cell positive={valFillHighCell(row.currentPerformance)}>
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center">
                      <Icon color="green" name="circle outline" size="small" />
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell
                  positive={valFillHighCell(row.currentPerformance)}
                  warning={valFillMediumCell(row.currentPerformance)}
                >
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillMediumCell(row.currentPerformance) && (
                    <div className="bg-yellow-200 h-10 flex -m-3 items-center">
                      {/* <Icon color="green" name="circle outline" size="small" /> */}
                      <Icon color="orange" name="circle outline" size="small" />
                    </div>
                  )}
                </Table.Cell>
                <Table.Cell
                  positive={valFillHighCell(row.currentPerformance)}
                  warning={valFillMediumCell(row.currentPerformance)}
                  warning={valFillLowCell(row.currentPerformance)}
                >
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillLowCell(row.currentPerformance) && (
                    <div className="bg-yellow-600 h-10 flex -m-3 items-center">
                      <Icon color="yellow" name="circle outline" size="small" />
                    </div>
                  )}
                  {valFillMediumCell(row.currentPerformance) && (
                    <div className="bg-yellow-200 h-10 flex -m-3 items-center"></div>
                  )}
                </Table.Cell>
                <Table.Cell
                  positive={valFillHighCell(row.currentPerformance)}
                  warning={valFillMediumCell(row.currentPerformance)}
                  warning={valFillLowCell(row.currentPerformance)}
                  error={valFillNoactionCell(row.currentPerformance)}
                >
                  {valFillHighCell(row.currentPerformance) && (
                    // <Icon color="green" name="circle outline" size="small" />
                    <div className="bg-green-400 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillNoactionCell(row.currentPerformance) && (
                    <div className="bg-red-500 h-10 flex -m-3 items-center">
                      <Icon color="yellow" name="cancel" size="small" />
                    </div>
                  )}
                  {valFillMediumCell(row.currentPerformance) && (
                    <div className="bg-yellow-200 h-10 flex -m-3 items-center"></div>
                  )}
                  {valFillLowCell(row.currentPerformance) && (
                    <div className="bg-yellow-600 h-10 flex -m-3 items-center"></div>
                  )}
                </Table.Cell>
              </Table.Row>
            );
          }
        })}
      </Table.Body>
    </Table>
  );
}

export default StructuredTableQual;
