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
 * Convenience implementation of a DelegateCommand, which
 * wraps objects conforming to ICommand, providing the ICommand
 * interface without requiring a subclass.
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
   */
  constructor(handler: any, id: string, caption: string) {
    this._handler = handler;
    this.id = id;
    this.caption = caption;
  }

  /**
   * Runs the handler, part of the ICommand interface.
   */
  execute() {
    this._handler();
  }

  /**
   * Get the disabled state.
   */
  get disabled(): boolean {
    return this._disabled;
  }
 
  /**
   * Set the disabled state.
   *
   * #### Notes
   * Fires the disabledChanged signal if the new value is different
   * to the old one.
   */
  set disabled(value: boolean) {
    var oldValue = this._disabled;
    this._disabled = value;

    if(oldValue !== this._disabled) {
      this.disabledChanged.emit(this._disabled);
    }
  }

  /**
   * Unique identifier for the command
   */
  id: string;

  /**
   * A longer descriptive string for the command behaviour.
   */
  caption: string;

  /**
   * A signal that is fired when the disabled flag changes.
   *
   * #### Notes
   * This is a pure delegate to the [[disabledChangedSignal]].
   */ 
  get disabledChanged(): ISignal<ICommand, boolean> {
    return DelegateCommand.disabledChangedSignal.bind(this);
  }

  /**
   * A flag to define whether the command is disabled.
   */
  private _disabled = false;

  /**
   * The callable to be run when the command is executed.
   */
  private _handler: any;
}

