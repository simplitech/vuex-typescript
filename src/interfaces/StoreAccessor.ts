import {
  ActionHandlerNoPayload,
  ActionHandlerWithPayload,
  CommitAccessorNoPayload,
  CommitAccessorWithPayload,
  DispatchAccessorNoPayload,
  DispatchAccessorWithPayload,
  GetAccessor,
  GetterHandler,
  MutationHandlerNoPayload,
  MutationHandlerWithPayload
} from '../alias'

export interface StoreAccessor<TModuleState, TRootState> {
  /**
   * Returns a function committing mutations directed to the specified mutation handler.
   * This overload is for handlers which do not expect payload.
   */
  commit(
    handler: MutationHandlerNoPayload<TModuleState>
  ): CommitAccessorNoPayload<TModuleState, TRootState>
  /**
   * Returns a function committing mutations directed to the specified mutation handler.
   * This overload is for handlers which expect payload.
   */
  commit<TPayload>(
    handler: MutationHandlerWithPayload<TModuleState, TPayload>
  ): CommitAccessorWithPayload<TModuleState, TRootState, TPayload>

  /**
   * Returns a function dispatching actions directed to the specified action handler.
   * This overload is for handlers which do not expect payload.
   */
  dispatch<TResult>(
    handler: ActionHandlerNoPayload<TModuleState, TRootState, TResult>
  ): DispatchAccessorNoPayload<TModuleState, TRootState, TResult>
  /**
   * Returns a function dispatching actions directed to the specified action handler.
   * This overload is for handlers which expect payload.
   */
  dispatch<TPayload, TResult>(
    handler: ActionHandlerWithPayload<TModuleState, TRootState, TPayload, TResult>
  ): DispatchAccessorWithPayload<TModuleState, TRootState, TPayload, TResult>

  /**
   * Returns a function returning value of the specified getter.
   */
  read<TResult>(
    handler: GetterHandler<TModuleState, TRootState, TResult>
  ): GetAccessor<TModuleState, TRootState, TResult>
}
