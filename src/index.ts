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
   * A signal emitted when the command's state changes.
   *
   * #### Notes
   * Consumers of the command can subscribe to this signal in order to
   * update their visual representation of the command when it changes.
   */
  changed: ISignal<ICommand, void>;

  /**
   * Test whether the command is enabled.
   *
   * @returns `true` if the command is enabled, `false` otherwise.
   *
   * #### Notes
   * The [[changed]] signal should be emitted if the return value
   * changes at runtime.
   */
  isEnabled(): boolean;

  /**
   * Test whether the command is checked.
   *
   * @returns `true` if the command is checked, `false` otherwise.
   *
   * #### Notes
   * The [[changed]] signal should be emitted if the return value
   * changes at runtime.
   */
  isChecked(): boolean;

  /**
   * Execute the command with the specified arguments.
   *
   * @param args - The arguments for the command. The args should be
   *   simple JSON types. If the command does not require arguments,
   *   this may be `null`.
   *
   * #### Notes
   * Calling `execute` when `isEnabled` returns `false` will result
   * in undefined behavior.
   */
  execute(args: any): void;
}


/**
 * An abstract base class for implementing concrete commands.
 */
export
abstract class Command implements ICommand {
  /**
   * A signal emitted when the command's state changes.
   *
   * **See also:** [[changed]]
   */
  static changedSignal = new Signal<Command, void>();

  /**
   * A signal emitted when the command's state changes.
   *
   * #### Notes
   * This should be emitted by a subclass as necessary.
   *
   * This is a pure delegate to the [[changedSignal]].
   */
  get changed(): ISignal<Command, void> {
    return Command.changedSignal.bind(this);
  }

  /**
   * Test whether the command is enabled.
   *
   * @returns `true` if the command is enabled, `false` otherwise.
   *
   * #### Notes
   * A subclass may reimplement this method as needed. If the state
   * changes at runtime, the [[changed]] signal should be emitted.
   *
   * The default implementation of this method returns `true`.
   */
  isEnabled(): boolean {
    return true;
  }

  /**
   * Test whether the command is checked.
   *
   * @returns `true` if the command is checked, `false` otherwise.
   *
   * #### Notes
   * A subclass may reimplement this method as needed. If the state
   * changes at runtime, the [[changed]] signal should be emitted.
   *
   * The default implementation of this method returns `false`.
   */
  isChecked(): boolean {
    return false;
  }

  /**
   * Execute the command with the specified arguments.
   *
   * @param args - The arguments for the command. The args should be
   *   simple JSON types. If the command does not require arguments,
   *   this may be `null`.
   *
   * #### Notes
   * Calling `execute` when `isEnabled` returns `false` will result
   * in undefined behavior.
   *
   * This abstract method must be implemented by a subclass.
   */
  abstract execute(args: any): void;
}


/**
 * A concrete implementation of [[ICommand]].
 *
 * A `DelegateCommand` wraps a function to facilitate the creation of
 * simple commands without requiring subclassing or extra boilerplate.
 */
export
class DelegateCommand extends Command {
  /**
   * Construct a new delegate command.
   *
   * @param execute - The function which executes the command logic.
   */
  constructor(execute: (args: any) => void) {
    super();
    this._execute = execute;
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
   * This will emit the [[changed]] signal if the state changes.
   */
  set enabled(value: boolean) {
    if (this._enabled === value) {
      return;
    }
    this._enabled = value;
    this.changed.emit(void 0);
  }

  /**
   * Get the checked state of the delegate command.
   */
  get checked(): boolean {
    return this._checked;
  }

  /**
   * Set the checked state of the delegate command.
   *
   * #### Notes
   * This will emit the [[changed]] signal if the state changes.
   */
  set checked(value: boolean) {
    if (this._checked === value) {
      return;
    }
    this._checked = value;
    this.changed.emit(void 0);
  }

  /**
   * Test whether the command is enabled.
   *
   * @returns `true` if the command is enabled, `false` otherwise.
   *
   * #### Notes
   * This returns the command's [[enabled]] state.
   */
  isEnabled(): boolean {
    return this._enabled;
  }

  /**
   * Test whether the command is checked.
   *
   * @returns `true` if the command is checked, `false` otherwise.
   *
   * #### Notes
   * This returns the command's [[checked]] state.
   */
  isChecked(): boolean {
    return this._checked;
  }

  /**
   * Execute the command with the specified arguments.
   *
   * @param args - The arguments for the command. The args should be
   *   simple JSON types. If the command does not require arguments,
   *   this may be `null`.
   *
   * #### Notes
   * Calling `execute` when `isEnabled` returns `false` will result
   * in undefined behavior.
   */
  execute(args: any) {
    this._execute.call(void 0, args);
  }

  private _enabled = true;
  private _checked = false;
  private _execute: (args: any) => void;
}
