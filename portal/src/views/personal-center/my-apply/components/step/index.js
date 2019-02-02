import Step from './step';

/* istanbul ignore next */
Step.install = function(Vue) {
  Vue.component(Step.name, Step);
};

export default Step;
