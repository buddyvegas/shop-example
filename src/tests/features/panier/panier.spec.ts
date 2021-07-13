import { autoBindSteps, loadFeature } from 'jest-cucumber';
import { commonSteps } from '../common.steps';
import { ScenarioContext } from '../scenarioContext';
import { panierSteps } from './panier.steps';

const feature = loadFeature('src/tests/features/panier/panier.feature');
const context = new ScenarioContext();
// feature.scenarios.forEach((scenario) => {
//   const context = new ScenarioContext();
//   autoBindSteps([{ ...feature, scenarios: [scenario] }], [commonSteps(context), panierSteps(context)]);
// });

autoBindSteps([feature], [commonSteps(context), panierSteps(context)]);
