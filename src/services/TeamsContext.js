
import React from 'react';
import appViewModel from "./appViewModel.meta"

const api = appViewModel.getApi("teams");
const viewModel = appViewModel.entities["teams"];
export const TeamsContext = React.createContext({ api, viewModel });
