import _ from "lodash";

import * as modules from "../modules";

const reducers = {};

_.values(modules).forEach((module) => {
  _.values(module).forEach((section) => {
    if (_.has(section, "STATE_REDUCER_KEY") && _.has(section, "reducer")) {
      _.set(reducers, `${section.STATE_REDUCER_KEY}`, section.reducer);
    }
  });
});

const rootReducer = {
  ...reducers
};

export default rootReducer;
