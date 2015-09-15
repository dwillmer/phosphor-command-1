/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  ISignal
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
 * 
 * @param _handler - The callable to be executed when execute() is
 *        called on the DelegateCommand.
 *
 * @param id - A unique identifier for this command. Namespaces can
 *        be defined using ':' separators.
 *
 * @param caption - A longer descriptive string to inform users about
 *        the functionality/nuances of this command.
 */
export
  class DelegateCommand implements ICommand {
  disabled = false;
  id: string;
  caption: string;
  disabledChanged: ISignal<ICommand, boolean>;

  constructor(private _handler: any, id: string, caption: string) {
  }

  execute() {
    this._handler();
  }
}

