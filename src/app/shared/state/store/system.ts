export namespace SystemStore {

  export interface State {
    loading: boolean,
    erreurTitre: string,
    erreurMessage: string,
  };
  export const initialState: State = {
    loading: false,
    erreurTitre: '',
    erreurMessage: '',
  };
}
