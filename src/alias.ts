import { ActionContext, Store } from 'vuex'

/**
 * Vuex getter handler specified in Vuex options.
 */
export type GetterHandler<TModuleState, TRootState, TResult> = (
  state: TModuleState,
  rootState: TRootState
) => TResult

/**
 * Vuex action handler which takes payload as specified in Vuex options.
 */
export type ActionHandlerWithPayload<TModuleState, TRootState, TPayload, TResult> = (
  injectee: ActionContext<TModuleState, TRootState>,
  payload: TPayload
) => void | Promise<TResult>

/**
 * Vuex action handler which does not take payload as specified in Vuex options.
 */
export type ActionHandlerNoPayload<TModuleState, TRootState, TResult> = (
  injectee: ActionContext<TModuleState, TRootState>
) => void | Promise<TResult>

/**
 * Vuex mutation handler which takes payload as specified in Vuex options.
 */
export type MutationHandlerWithPayload<TModuleState, TPayload> = (
  state: TModuleState,
  payload: TPayload
) => void

/**
 * Vuex mutation handler which does not take payload as specified in Vuex options.
 */
export type MutationHandlerNoPayload<TModuleState> = (state: TModuleState) => void

/**
 * Function which gets value of a concrete Vuex getter.
 */
export type GetAccessor<TModuleState, TRootState, TResult> = (
  store: Store<TRootState> | ActionContext<TModuleState, TRootState>
) => TResult

/**
 * Function which dispatches a concrete Vuex action with payload.
 */
export type DispatchAccessorWithPayload<TModuleState, TRootState, TPayload, TResult> = (
  store: Store<TRootState> | ActionContext<TModuleState, TRootState>,
  payload: TPayload
) => Promise<TResult>

/**
 * Function which dispatches a concrete Vuex action without payload.
 */
export type DispatchAccessorNoPayload<TModuleState, TRootState, TResult> = (
  store: Store<TRootState> | ActionContext<TModuleState, TRootState>
) => Promise<TResult>

/**
 * Function which commits a concrete Vuex mutation with payload.
 */
export type CommitAccessorWithPayload<TModuleState, TRootState, TPayload> = (
  store: Store<TRootState> | ActionContext<TModuleState, TRootState>,
  payload: TPayload
) => void

/**
 * Function which commits a concrete Vuex mutation without payload.
 */
export type CommitAccessorNoPayload<TModuleState, TRootState> = (
  store: Store<TRootState> | ActionContext<TModuleState, TRootState>
) => void
