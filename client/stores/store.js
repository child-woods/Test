import AppStateClass from './app-store'

export const AppState = AppStateClass

export default {
  AppState,
}

export const createStoreMap = () => {  // eslint-disable-line
  return {
    appState: new AppState(),
  }
}
