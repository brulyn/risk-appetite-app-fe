import React, { useState, useContext } from "react";
import ToleranceInput from "../common/toleranceInput";
import { Button, Accordion, Icon } from "semantic-ui-react";
import QualitativeInput from "../common/qualitativeInput";
import TolQualitativeInput from "../common/tolqualitativeInput";
import ToleranceTitle from "../common/toleranceTitle";
import { UserContext } from "../../contexts/userContext";
import { CornerDialog } from "evergreen-ui";

export default function SettingsView() {
  const [errorMessage, setErrorMessage] = useState("");
  const [dialogIsShown, setDialogIsShown] = useState(false);
  const [messageTitle, setMessageTitle] = useState("");
  //Strategic Values
  const [pdctDev, setPdctDev] = useState(40);
  const [investNewTech, setInvestNewTech] = useState(15);
  const [businessCont, setBusinessCont] = useState(40);
  const [expToNewMarket, setExpToNewMarket] = useState(40);
  const [brandRisk, setBrandRisk] = useState(15);

  //Operational Values
  const [disruptionOp, setDisruptionOp] = useState(40);
  const [lossOfKeyStaff, setLossOfKeyStaff] = useState(40);
  const [compromisePrdt, setCompromisePrdt] = useState(15);
  const [serviceDelays, setServiceDelays] = useState(40);
  const [disruptionSupplyChain, setDisruptionSupplyChain] = useState(40);

  //Financial Values
  const [customerDefaultRisk, setCustomerDefaultRisk] = useState(60);
  const [cashFlowConstraints, setcashFlowConstraints] = useState(40);
  const [fraudAndCorruption, setFraudAndCorruption] = useState(15);
  const [errorsAndMisstatements, setErrorsAndMisstatements] = useState(10);
  const [underUtilCapital, setUnderUtilCapital] = useState(40);

  //Compliance
  const [tax, setTax] = useState(15);
  const [contract, setContract] = useState(15);
  const [financialReporting, setFinancialReporting] = useState(15);
  const [govLicence, setGovLicence] = useState(15);

  const [activeIndex, setActiveIndex] = useState(0);
  const { user, setUser } = useContext(UserContext);

  const handleExpand = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };
  const [presetValues, setPresetValues] = useState({});
  const host = "http://localhost:3001";

  const saveData = () => {
    Promise.all([
      fetch(`${host}/riskTolerance/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName: user.companyName,
          username: user.username,
          riskToleranceValues: presetValues,
        }),
      }),

      fetch(`${host}/strategicTolerance/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pdctDev,
          investNewTech,
          businessCont,
          expToNewMarket,
          brandRisk,
          companyName: user.companyName,
          username: user.username,
        }),
      }),

      fetch(`${host}/operationalTolerance/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          disruptionOp,
          lossOfKeyStaff,
          compromisePrdt,
          serviceDelays,
          disruptionSupplyChain,
          companyName: user.companyName,
          username: user.username,
        }),
      }),

      fetch(`${host}/financialTolerance/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerDefaultRisk,
          cashFlowConstraints,
          fraudAndCorruption,
          errorsAndMisstatements,
          underUtilCapital,
          companyName: user.companyName,
          username: user.username,
        }),
      }),

      fetch(`${host}/complianceTolerance/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tax,
          contract,
          financialReporting,
          govLicence,
          companyName: user.companyName,
          username: user.username,
        }),
      }),
    ])
      .then((responses) => {
        return Promise.all(
          responses.map(function (response) {
            console.log(response);
            return response.json();
          })
        );
      })
      .then((response) => {
        setMessageTitle("Success!");
        setErrorMessage(`Data successfully saved.`);
        setDialogIsShown(true);
      })
      .catch((err) => {
        setMessageTitle("Operation Failed!");
        setErrorMessage(`An error occured : ${err}`);
        setDialogIsShown(true);
      });
  };
  return (
    <div className="flex flex-col">
      <CornerDialog
        title={messageTitle}
        hasFooter={false}
        isShown={dialogIsShown}
        onCloseComplete={() => setDialogIsShown(false)}
      >
        {errorMessage}
      </CornerDialog>
      {/* <div className="font-semibold text-gray-500">Settings</div> */}
      <div className="flex flex-row">
        <div className="flex flex-col w-1/2">
          <div className="font-semibold text-gray-600 mt-5">
            Quantitative Metrics
          </div>
          <ToleranceInput setPresetValues={setPresetValues} />
          <div className="pt-5">
            <Button onClick={() => saveData()} color="blue">
              Save
            </Button>
          </div>
        </div>

        <div className="flex flex-col w-1/2">
          <div className="font-semibold text-gray-600 mt-5">
            Qualitative Metrics
          </div>
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={handleExpand}
            >
              <div className="flex flex-row items-center">
                <ToleranceTitle title="Strategic" />
                <div className="mt-5">
                  <Icon name="dropdown" />
                </div>
              </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <TolQualitativeInput
                direction="lesser"
                title="Product dev. and innovation"
                setQualValues={setPdctDev}
                value={pdctDev}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Investment in new Technologies"
                setQualValues={setInvestNewTech}
                value={investNewTech}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Business continuity and disaster recovery"
                setQualValues={setBusinessCont}
                value={businessCont}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Expansion to new markets"
                setQualValues={setExpToNewMarket}
                value={expToNewMarket}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Brand/reputation risk"
                setQualValues={setBrandRisk}
                value={brandRisk}
              />
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 1}
              index={1}
              onClick={handleExpand}
            >
              <div className="flex flex-row items-center">
                <ToleranceTitle title="Operational" />
                <div className="mt-5">
                  <Icon name="dropdown" />
                </div>
              </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 1}>
              <TolQualitativeInput
                direction="lesser"
                title="Disruption of operations"
                setQualValues={setDisruptionOp}
                value={disruptionOp}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Loss of key staff"
                setQualValues={setLossOfKeyStaff}
                value={lossOfKeyStaff}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Compromise of product and service quality"
                setQualValues={setCompromisePrdt}
                value={compromisePrdt}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Service delays"
                setQualValues={setServiceDelays}
                value={serviceDelays}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Disruptions to supply chain"
                setQualValues={setDisruptionSupplyChain}
                value={disruptionSupplyChain}
              />
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 2}
              index={2}
              onClick={handleExpand}
            >
              <div className="flex flex-row items-center">
                <ToleranceTitle title="Financial" />
                <div className="mt-5">
                  <Icon name="dropdown" />
                </div>
              </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 2}>
              <TolQualitativeInput
                direction="lesser"
                title="Customer default risk"
                setQualValues={setCustomerDefaultRisk}
                value={customerDefaultRisk}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Cash-flow constraints"
                setQualValues={setcashFlowConstraints}
                value={cashFlowConstraints}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Fraud and corruption"
                setQualValues={setFraudAndCorruption}
                value={fraudAndCorruption}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Errors and misstatements"
                setQualValues={setErrorsAndMisstatements}
                value={errorsAndMisstatements}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Under-utilization of capital"
                setQualValues={setUnderUtilCapital}
                value={underUtilCapital}
              />
            </Accordion.Content>

            <Accordion.Title
              active={activeIndex === 3}
              index={3}
              onClick={handleExpand}
            >
              <div className="flex flex-row items-center">
                <ToleranceTitle title="Compliance" />
                <div className="mt-5">
                  <Icon name="dropdown" />
                </div>
              </div>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 3}>
              <TolQualitativeInput
                direction="lesser"
                title="Tax compliance"
                setQualValues={setTax}
                value={tax}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Contract compliance"
                setQualValues={setContract}
                value={contract}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Financial reporting compliance"
                setQualValues={setFinancialReporting}
                value={financialReporting}
              />
              <TolQualitativeInput
                direction="lesser"
                title="Government licenses and regulations"
                setQualValues={setGovLicence}
                value={govLicence}
              />
            </Accordion.Content>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
