import { GenericState } from './generic-state';

export class SelectorUtil {
  static isLoading({status}: GenericState<unknown>) {
    return status === 'loading';
  }

  static isDone({status}: GenericState<unknown>) {
    return status === 'success' || status === 'error';
  }

  static error({error}: GenericState<unknown>) {
    return error;
  }
}
