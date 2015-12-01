/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  ISignal, Signal
} from 'phosphor-signaling';


/**
 * An object which implements the command pattern.
 */
export
interface ICommand {
  /**
   * A signal emitted when the command's [[canExecute]] state changes.
   *
   * #### Notes
   * Consumers of the command can subscribe to this signal in order to
   * know when to re-query for the current executable state and update
   * their visual representations accordingly.
   */
  canExecuteChanged: ISignal<ICommand, void>;

  /**
   * Test whether the command can execute in its current state.
   *
   * @param args - The proposed arguments for the command. These should
   *   be simple JSON types. If the command does not require arguments,
   *   this may be `null`.
   *
   * @returns `true` if the command can execute with the given args,
   *   `false` otherwise.
   *
   * #### Notes
   * When the potential result of this method changes at runtime, the
   * [[canExecuteChanged]] signal should be emitted.
   */
  canExecute(args: any): boolean;

  /**
   * Execute the command with the specified arguments.
   *
   * @param args - The arguments for the command. These should be
   *   simple JSON types. If the command does not require arguments,
   *   this may be `null`.
   *
   * #### Notes
   * Calling `execute` when `canExecute` returns `false` will result
   * in undefined behavior.
   */
  execute(args: any): void;
}


/**
 * A concrete implementation of [[ICommand]].
 *
 * A `DelegateCommand` wraps a pair of functions to facilitate the easy
 * creation of commands without requiring subclassing or boilerplate.
 */
export
class DelegateCommand implements ICommand {
  /**
   * A signal emitted when the command's [[canExecute]] state changes.
   *
   * **See also:** [[canExecuteChanged]]
   */
  static canExecuteChangedSignal = new Signal<DelegateCommand, void>();

  /**
   * Construct a new delegate command.
   *
   * @param execute - The function which executes the command logic.
   *
   * @param canExecute - An optional function which determines whether
   *   the command can execute in its current state.
   */
  constructor(execute: (args: any) => void, canExecute?: (args: any) => boolean) {
    this._execute = execute;
    this._canExecute = canExecute || null;
  }

  /**
   * A signal emitted when the command's [[canExecute]] state changes.
   *
   * #### Notes
   * This is emitted automatically when the [[enabled]] state changes.
   *
   * This can be emitted manually by the creator of the command when
   * the result of the `canExecute` delegate function changes.
   */
  get canExecuteChanged(): ISignal<DelegateCommand, void> {
    return DelegateCommand.canExecuteChangedSignal.bind(this);
  }

  /**
   * Get the enabled state of the delegate command.
   */
  get enabled(): boolean {
    return this._enabled;
  }

  /**
   * Set the enabled state of the delegate command.
   *
   * #### Notes
   * This will emit the [[canExecuteChanged]] if the state changes.
   */
  set enabled(value: boolean) {
    if (this._enabled === value) {
      return;
    }
    this._enabled = value;
    this.canExecuteChanged.emit(void 0);
  }

  /**
   * Test whether the command can execute in its current state.
   *
   * @param args - The proposed arguments for the command. These should
   *   be simple JSON types. If the command does not require arguments,
   *   this may be `null`.
   *
   * @returns `true` if the command can execute with the given args,
   *   `false` otherwise.
   *
   * #### Notes
   * If the [[enabled]] flag is set to `false`, this method will always
   * return `false`. If a `canExecute` function is provided, the result
   * of that function will be returned. Otherwise, this returns `true`.
   */
  canExecute(args: any): boolean {
    if (this._enabled && this._canExecute) {
      return this._canExecute.call(void 0, args);
    }
    return this._enabled;
  }

  /**
   * Execute the command with the specified arguments.
   *
   * @param args - The arguments for the command. These should be
   *   simple JSON types. If the command does not require arguments,
   *   this may be `null`.
   *
   * #### Notes
   * Calling `execute` when `canExecute` returns `false` will result
   * in undefined behavior.
   */
  execute(args: any) {
    this._execute.call(void 0, args);
  }

  private _enabled = true;
  private _execute: (args: any) => void;
  private _canExecute: (args: any) => boolean;
}
