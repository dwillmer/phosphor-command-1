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
 *
 * **See also:** https://en.wikipedia.org/wiki/Command_pattern
 */
export
interface ICommand {
  /**
   * A signal emitted when the command's [[disabled]] state changes.
   *
   * #### Notes
   * The signal arg is the current `disabled` state of the command.
   */
  disabledChanged: ISignal<ICommand, boolean>;

  /**
   * A read-only unique identifier for the Command.
   *
   * #### Notes
   * The recommended id format is lower-cased, hyphen-separated,
   * and colon-namespaced: `'my-project-namespace:my-command-id'`.
   */
  id: string;

  /**
   * A read-only single-line description of the command.
   *
   * #### Notes
   * The caption will be used by some UIs to show a description of
   * the command to the user.
   */
  caption: string;

  /**
   * Whether the command is currently disabled.
   *
   * #### Notes
   * A disabled command cannot be executed.
   *
   * This will be read-only for some commands, and read-write for
   * others as appropriate.
   *
   * **See also:** [[disabledChanged]]
   */
  disabled: boolean;

  /**
   * A method called to execute the command.
   *
   * #### Notes
   * If this method is invoked when the command is disabled, it must
   * be a no-op. Preferably, the command implementation will log an
   * appropriate error message when this occurs.
   */
  execute(): void;
}


/**
 * The options object for instantiating a delegate command.
 */
export
interface IDelegateCommandOptions {
  /**
   * The id for the command.
   */
  id: string;

  /**
   * The caption for the command.
   */
  caption: string;

  /**
   * The callback for the command.
   */
  handler: () => void;
}


/**
 * A concrete implementation of [[ICommand]].
 *
 * A `DelegateCommand` wraps a callback to facilitate easy creation
 * of command objects without requiring subclassing or repetition.
 */
export
class DelegateCommand implements ICommand {
  /**
   * A signal emitted when the disabled state changes.
   *
   * **See also:** [[disabledChanged]]
   */
  static disabledChangedSignal = new Signal<DelegateCommand, boolean>();

  /**
   * Construct a new delegate command.
   *
   * @param options - The initialization options for the command.
   */
  constructor(options: IDelegateCommandOptions) {
    this._id = options.id;
    this._caption = options.caption;
    this._handler = options.handler;
  }

  /**
   * A signal emitted when the disabled stated changes.
   *
   * #### Notes
   * This is a pure delegate to the [[disabledChangedSignal]].
   */
  get disabledChanged(): ISignal<DelegateCommand, boolean> {
    return DelegateCommand.disabledChangedSignal.bind(this);
  }

  /**
   * Get the unique identifier for the command.
   *
   * #### Notes
   * This is a read-only property.
   */
  get id(): string {
    return this._id;
  }

  /**
   * Get the descriptive caption for the command.
   *
   * #### Notes
   * This is a read-only property.
   */
  get caption(): string {
    return this._caption;
  }

  /**
   * Get the disabled state of the command.
   */
  get disabled(): boolean {
    return this._disabled;
  }

  /**
   * Set the disabled state of the command.
   *
   * #### Notes
   * This will emit the [[disabledChangedSignal]] if the state changes.
   */
  set disabled(value: boolean) {
    if (this._disabled !== value) {
      this._disabled = value;
      this.disabledChanged.emit(value);
    }
  }

  /**
   * Execute the command and invoke its handler.
   *
   * #### Notes
   * If the command is disabled, the handler will not be invoked and
   * an error will be logged to the console.
   */
  execute() {
    if (this._disabled) {
      console.error("Command " + this._id + " is disabled.");
    } else {
      this._handler.call(void 0);
    }
  }

  private _id: string;
  private _caption: string;
  private _disabled = false;
  private _handler: () => void;
}
