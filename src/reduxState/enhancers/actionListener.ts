import {
  StoreEnhancerStoreCreator,
  AnyAction
} from "redux";
// import { IDictionary } from "../../interfaces/IDictionary";
import { RootState } from "../stores/store";

export const actionListenerEnhancer: any =
 // @ts-ignore
  (createStore: StoreEnhancerStoreCreator): any =>
  (
	 // @ts-ignore
    reducer: any,
    initialState?: any
  ) => {
    const actionListeners: any = {};
    const store = createStore(reducer, initialState);
    const dispatch = store.dispatch;

    store.dispatch = (action) => {
      const result = dispatch(action);
      if (
        typeof action === "object" &&
        action.type &&
        actionListeners[action.type]
      ) {
        actionListeners[action.type].forEach(
          (listener: (a: AnyAction, s: RootState | {}) => void) =>
            listener(action, store.getState())
        );
      }

      return result;
    };

    // @ts-ignore
    store.addActionListener = (actionType: string, listener: () => void) => {
      actionListeners[actionType] = (actionListeners[actionType] || []).concat(
        listener
      );

      return () => {
        actionListeners[actionType] = actionListeners[actionType].filter(
          (l: () => void) => l !== listener
        );
      };
    };
    return store;
  };
