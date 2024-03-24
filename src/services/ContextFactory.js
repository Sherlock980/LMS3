import { createContext } from 'react';

import AppViewModel from "./appViewModel.meta"

export function getContext(entity){

    let api = AppViewModel.getApi(entity);

    let viewModel=AppViewModel.entities[entity];

    return createContext({api:api,viewModel:viewModel});

}