import _ from "lodash";
import { all, fork } from "redux-saga/effects";

import * as modules from "../modules";

let sagas = [];

// Here you can include all the saga which you write for components
_.values(modules).forEach((module) => {
  _.values(module).forEach((section) => {
    if (_.has(section, "STATE_REDUCER_KEY") && _.has(section, "saga")) {
      sagas.push(fork(section.saga));
    }
  });
});

export default function* rootSaga() {
  yield all([...sagas]);
}
