import { useState } from 'react';
import Hero from './Hero';
import Acknowledgement from './Acknowledgement';
import ReasonCards from './ReasonCards';
import PromiseList from './PromiseList';
import Memories from './Memories';
import ForgiveButton from './ForgiveButton';
import ForgivenessResult from './ForgivenessResult';

const STEPS = {
  HERO: 'hero',
  ACKNOWLEDGEMENT: 'acknowledgement',
  REASONS: 'reasons',
  PROMISES: 'promises',
  MEMORIES: 'memories',
  FORGIVE: 'forgive',
  RESULT: 'result'
};

const StepFlow = () => {
  const [currentStep, setCurrentStep] = useState(STEPS.HERO);
  const [forgiven, setForgiven] = useState(false);

  const stepOrder = [
    STEPS.HERO,
    STEPS.ACKNOWLEDGEMENT,
    STEPS.REASONS,
    STEPS.PROMISES,
    STEPS.MEMORIES,
    STEPS.FORGIVE
  ];

  const handleNext = () => {
    const currentIndex = stepOrder.indexOf(currentStep);
    if (currentIndex < stepOrder.length - 1) {
      setCurrentStep(stepOrder[currentIndex + 1]);
    }
  };

  const handleBack = () => {
    if (currentStep === STEPS.RESULT) {
      // Go back to FORGIVE step from RESULT
      setCurrentStep(STEPS.FORGIVE);
    } else {
      const currentIndex = stepOrder.indexOf(currentStep);
      if (currentIndex > 0) {
        setCurrentStep(stepOrder[currentIndex - 1]);
      }
    }
  };

  const handleForgive = () => {
    setForgiven(true);
    setCurrentStep(STEPS.RESULT);
  };

  const handleReject = () => {
    // If NO is clicked, maybe show a message or loop back
    // For now, we'll just keep showing the forgive screen
    // You can customize this behavior
  };

  const canGoBack = stepOrder.indexOf(currentStep) > 0;

  switch (currentStep) {
    case STEPS.HERO:
      return <Hero onNext={handleNext} onBack={null} canGoBack={false} />;
    case STEPS.ACKNOWLEDGEMENT:
      return <Acknowledgement onNext={handleNext} onBack={handleBack} canGoBack={canGoBack} />;
    case STEPS.REASONS:
      return <ReasonCards onNext={handleNext} onBack={handleBack} canGoBack={canGoBack} />;
    case STEPS.PROMISES:
      return <PromiseList onNext={handleNext} onBack={handleBack} canGoBack={canGoBack} />;
    case STEPS.MEMORIES:
      return <Memories onNext={handleNext} onBack={handleBack} canGoBack={canGoBack} />;
    case STEPS.FORGIVE:
      return <ForgiveButton onForgive={handleForgive} onReject={handleReject} onBack={handleBack} canGoBack={canGoBack} />;
    case STEPS.RESULT:
      return <ForgivenessResult onBack={handleBack} canGoBack={true} />;
    default:
      return <Hero onNext={handleNext} onBack={null} canGoBack={false} />;
  }
};

export default StepFlow;

