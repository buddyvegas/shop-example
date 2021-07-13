import { autoBindSteps, loadFeature } from 'jest-cucumber';
import { commonSteps } from '../common.steps';
import { ScenarioContext } from '../scenarioContext';
import { commandeSteps } from './commande.steps';

const feature = loadFeature('src/tests/features/commande/commande.feature');
const context = new ScenarioContext();

autoBindSteps([feature], [commonSteps(context), commandeSteps()]);
