// @ts-nocheck
import React, { useState, useEffect } from "react";
//import { Ejercicio1 } from "./EjerciciosTH";
import { MathComponent } from "../../MathJax";
//import { Accordion,Card } from 'react-bootstrap';
import { BreadcrumbTutor } from "../tools/BreadcrumbTutor";
import { APstep1 } from "./steps/APstep1";
import { APstep2 } from "./steps/APstep2";
import { APstep3 } from "./steps/APstep3";
import { APstepF } from "./steps/APstepF";

//import thales_1 from "/Users/rmira/tutor-geometria/thales_1.png"
import { Summary4 } from "../tools/Summary";
import { Conclusion } from "../tools/Conclusion";
import { Loading } from "../tools/Spinner";
import ejercicioAP1 from "./ejercicioAP1.json"
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Alert,
  Wrap,
  Center,
  Spacer,
  Stack,
  Button,
  Image, 
  VStack
} from "@chakra-ui/react"; 
//import { VideoScreen } from "../tools/VideoScreen";  //aun no usado
import { SelectStep } from "../tools/SelectStep";
//import { useAction } from "../../../utils/action";
//import { LoadContentAction } from "../tools/LoadContentAction";

const AP1 = ({ exercise }) => {
    exercise = ejercicioAP1[0];
  //LoadContentAction(exercise); // report action loadContent
  const Mq2 = dynamic(
    () => {
        return import("../../Mq2");
    },
    { ssr: false }
  );
  const [step1Valid, setStep1Valid] = useState(null); //change the value "null" when step 1 is completed
  const [step2Valid, setStep2Valid] = useState(null); //change the value "null" when step 2 is completed
  const [step3Valid, setStep3Valid] = useState(null); //change the value "null" when step 2 is completed
  const [step4Valid, setStep4Valid] = useState(null); //change the value "null" when step 2 is completed
  const [index, setIndex] = useState([0]); //list with to indexes of tabs open, initial 0 (only tab 1 open (step 1))
  const [select, setSelect] = useState(exercise.selectSteps); //select is false when the student select the step 1 correct
  const [select2, setSelect2] = useState(exercise.selectSteps); //select is false when the student select the step 2 correct
  const [select3, setSelect3] = useState(exercise.selectSteps); //select is false when the student select the step 2 correct
  const [select4, setSelect4] = useState(exercise.selectSteps); //select is false when the student select the step 2 correct
  const steps = exercise.steps.map((i) => i.stepTitle); //list of all stepTitle for selectStep
  const [loading, setLoading] = useState(true); //loading icon when not charge the math formula

  const [submit,setSubmit]=useState(false);
  const [defaultIndex,setDefaultIndex]=useState([0]);
  const [submitValues,setSubmitValues]=useState({ans:"",att:0,hints:0,lasthint:false,fail:false,duration:0})
  const [cdateE,setCdateE]=useState(Date.now());

 // const action = useAction(); //send action to central system
  useEffect(() => {
    //when step 1 is completed, open new tab of step 2
    if (step1Valid != null) {
      setIndex([1]);
    }
  }, [step1Valid]);

  useEffect(() => {
    //when step 1 is completed, open new tab of step 2
    if (step2Valid != null) {
      setIndex([2]);
    }
  }, [step2Valid]);

  useEffect(() => {
    //when step 1 is completed, open new tab of step 2
    if (step3Valid != null) {
      setIndex([3]);
    }
  }, [step3Valid]);

  useEffect(() => {
    //when step 1 is completed, open new tab of step 2
    if (step4Valid != null) {
      setIndex([4]);
    }
  }, [step4Valid]);

  const change = () => setLoading(false); //function that disable loading icon when charge the math formula

  return (
    <>
      <BreadcrumbTutor
        root="Área y Perímetro"
        item={exercise.title}
      ></BreadcrumbTutor>

      <Wrap>
        {exercise.text}

        {

          //<Spacer/>
          //<VideoScreen></VideoScreen>
        }
      </Wrap>
      

      <Accordion allowToggle allowMultiple index={index} style={{ padding: 0 }}>
        <AccordionItem isFocusable={true} isDisabled={select}>
          <Alert colorScheme={step1Valid == null ? "blue" : "green"}>
            <AccordionButton
              onClick={() => {
                if (index.some((element) => element === 0)) {
                  setIndex(index.filter((e) => e !== 0));
                 /* action({
                    verbName: "closeStep",
                    stepID: "" + exercise.steps[0].stepId,
                    contentID: exercise.code,
                    topicID: exercise.type,
                  });*/
                } else {
                  setIndex(index.concat(0));
                  /*action({
                    verbName: "openStep",
                    stepID: "" + exercise.steps[0].stepId,
                    contentID: exercise.code,
                    topicID: exercise.type,
                  });*/
                }
              }}
            >
              <Box flex="1" textAlign="left">
                <Wrap>
                  <Center>
                    {!select && exercise.steps[0].stepTitle}&nbsp;&nbsp;
                    {step1Valid != null && !select && "✔ "}
                    {select && (
                      <Wrap>
                        Paso 1:
                        <SelectStep
                          correct={0}
                          steps={steps}
                          setSelect={setSelect}
                          contentID={exercise.code}
                          topic={exercise.type}
                        ></SelectStep>
                      </Wrap>
                    )}
                  </Center>
                </Wrap>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Alert>
          <AccordionPanel style={{ padding: 0 }}>
            {!select && (
              <APstep1
                step={exercise.steps[0]}
                setStepValid={setStep1Valid}
                stepValid={step1Valid}
                contentID={exercise.code}
                topicID={exercise.type}
                last={true}
              ></APstep1>
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem isFocusable={true} isDisabled={select2}>
          <Alert colorScheme={
              step2Valid == null
                ? step1Valid == null
                  ? "gray"
                  : "blue"
                : "green"
            }>
            <AccordionButton
              onClick={() => {
                if (index.some((element) => element === 1)) {
                  setIndex(index.filter((e) => e !== 1));
                 /* action({
                    verbName: "closeStep",
                    stepID: "" + exercise.steps[0].stepId,
                    contentID: exercise.code,
                    topicID: exercise.type,
                  });*/
                } else {
                  setIndex(index.concat(1));
                  /*action({
                    verbName: "openStep",
                    stepID: "" + exercise.steps[0].stepId,
                    contentID: exercise.code,
                    topicID: exercise.type,
                  });*/
                }
              }}
            >
              <Box flex="1" textAlign="left">
                <Wrap>
                  <Center>
                    {!select2 && exercise.steps[1].stepTitle}&nbsp;&nbsp;
                    {step2Valid != null && !select2 && "✔ "}
                    {select2 && (
                      <Wrap>
                        Paso 1:
                        <SelectStep
                          correct={0}
                          steps={steps}
                          setSelect={setSelect}
                          contentID={exercise.code}
                          topic={exercise.type}
                        ></SelectStep>
                      </Wrap>
                    )}
                  </Center>
                </Wrap>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Alert>
          <AccordionPanel style={{ padding: 0 }}>
            {step1Valid != null && !select2 && (
              <APstep2
                step={exercise.steps[1]}
                setStepValid={setStep2Valid}
                stepValid={step2Valid}
                contentID={exercise.code}
                topicID={exercise.type}
              ></APstep2>
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem isFocusable={true} isDisabled={select3}>
          <Alert colorScheme={
              step3Valid == null
                ? step2Valid == null
                  ? "gray"
                  : "blue"
                : "green"
            }>
            <AccordionButton
              onClick={() => {
                if (index.some((element) => element === 2)) {
                  setIndex(index.filter((e) => e !== 2));
                 /* action({
                    verbName: "closeStep",
                    stepID: "" + exercise.steps[0].stepId,
                    contentID: exercise.code,
                    topicID: exercise.type,
                  });*/
                } else {
                  setIndex(index.concat(2));
                  /*action({
                    verbName: "openStep",
                    stepID: "" + exercise.steps[0].stepId,
                    contentID: exercise.code,
                    topicID: exercise.type,
                  });*/
                }
              }}
            >
              <Box flex="1" textAlign="left">
                <Wrap>
                  <Center>
                    {!select3 && exercise.steps[2].stepTitle}&nbsp;&nbsp;
                    {step3Valid != null && !select3 && "✔ "}
                    {select3 && (
                      <Wrap>
                        Paso 1:
                        <SelectStep
                          correct={0}
                          steps={steps}
                          setSelect={setSelect}
                          contentID={exercise.code}
                          topic={exercise.type}
                        ></SelectStep>
                      </Wrap>
                    )}
                  </Center>
                </Wrap>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Alert>
          <AccordionPanel style={{ padding: 0 }}>
            {step2Valid != null && !select3 && (
              <APstep3
                step={exercise.steps[2]}
                setStepValid={setStep3Valid}
                stepValid={step3Valid}
                contentID={exercise.code}
                topicID={exercise.type}
              ></APstep3>
            )}
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem isFocusable={true} isDisabled={select4}>
          <Alert colorScheme={
              step4Valid == null
                ? step3Valid == null
                  ? "gray"
                  : "blue"
                : "green"
            }>
            <AccordionButton
              onClick={() => {
                if (index.some((element) => element === 3)) {
                  setIndex(index.filter((e) => e !== 3));
                 /* action({
                    verbName: "closeStep",
                    stepID: "" + exercise.steps[0].stepId,
                    contentID: exercise.code,
                    topicID: exercise.type,
                  });*/
                } else {
                  setIndex(index.concat(3));
                  /*action({
                    verbName: "openStep",
                    stepID: "" + exercise.steps[0].stepId,
                    contentID: exercise.code,
                    topicID: exercise.type,
                  });*/
                }
              }}
            >
              <Box flex="1" textAlign="left">
                <Wrap>
                  <Center>
                    {!select4 && exercise.steps[3].stepTitle}&nbsp;&nbsp;
                    {step4Valid != null && !select4 && "✔ "}
                    {select4 && (
                      <Wrap>
                        Paso 1:
                        <SelectStep
                          correct={0}
                          steps={steps}
                          setSelect={setSelect}
                          contentID={exercise.code}
                          topic={exercise.type}
                        ></SelectStep>
                      </Wrap>
                    )}
                  </Center>
                </Wrap>
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Alert>
          <AccordionPanel style={{ padding: 0 }}>
            {step3Valid != null && !select4 && (
              <APstepF
                step={exercise.steps[3]}
                setStepValid={setStep4Valid}
                stepValid={step4Valid}
                contentID={exercise.code}
                topicID={exercise.type}
              ></APstepF>
            )}
          </AccordionPanel>
        </AccordionItem>
        
      </Accordion>
      {step4Valid != null && (  
        <>
        <VStack mt={2}>
          <Conclusion
            expression={exercise.conclusion}
          />
          <Summary4
            expression={exercise.text}
            step1={exercise.steps[0]}
            step2={exercise.steps[1]}
            step3={exercise.steps[2]}
            step4={exercise.steps[3]}
          />
        </VStack>
          
        </>
      )}
    </>
  );
};

export default AP1;
