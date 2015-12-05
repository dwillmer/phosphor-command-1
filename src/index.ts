/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import {
  DisposableDelegate, IDisposable
} from 'phosphor-disposable';

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
   * A unique identifier for the command.
   *
   * #### Notes
   * This is assumed to be a read-only constant property.
   */
  id: string;

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
   * @param id - The identifier for the command.
   *
   * @param execute - The function which executes the command logic.
   *
   * @param canExecute - An optional function which determines whether
   *   the command can execute in its current state.
   */
  constructor(id: string, execute: (args: any) => void, canExecute?: (args: any) => boolean) {
    this._id = id;
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
   * Get the identifier for the command.
   *
   * #### Notes
   * This is a read-only property.
   */
  get id(): string {
    return this._id;
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

  private _id: string;
  private _enabled = true;
  private _execute: (args: any) => void;
  private _canExecute: (args: any) => boolean;
}


/**
 * A simple command registry class.
 */
export
class CommandRegistry {
  /**
   * Get a singleton instance of `CommandRegistry`.
   *
   * This singleton is useful for applications where all (or most) of
   * the commands should be centrally registered and accessible. This
   * method will always return the same command registry instance.
   */
  static instance(): CommandRegistry {
    return this._instance || (this._instance = new CommandRegistry());
  }

  /**
   * A signal emitted when commands are added to the registry.
   *
   * **See also:** [[commandsAdded]]
   */
  static commandsAddedSignal = new Signal<CommandRegistry, ICommand[]>();

  /**
   * A signal emitted when commands are removed from the registry.
   *
   * **See also:** [[commandsAdded]]
   */
  static commandsRemovedSignal = new Signal<CommandRegistry, ICommand[]>();

  /**
   * Construct a new command registry.
   */
  constructor() {
    this._commands = Object.create(null);
  }

  /**
   * A signal emitted when commands are added to the registry.
   *
   * #### Notes
   * This is a pure delegate to the [[commandsAddedSignal]].
   */
  get commandsAdded(): ISignal<CommandRegistry, ICommand[]> {
    return CommandRegistry.commandsAddedSignal.bind(this);
  }

  /**
   * A signal emitted when commands are removed from the registry.
   *
   * #### Notes
   * This is a pure delegate to the [[commandsRemovedSignal]].
   */
  get commandsRemoved(): ISignal<CommandRegistry, ICommand[]> {
    return CommandRegistry.commandsRemovedSignal.bind(this);
  }

  /**
   * List the ids of the currently registered commands.
   *
   * @returns A new array of the current command ids.
   */
  list(): string[] {
    return Object.keys(this._commands);
  }

  /**
   * Get the command with the specified id.
   *
   * @param id - The id of the command of interest.
   *
   * @returns The command with the specified id, or `undefined`.
   */
  get(id: string): ICommand {
    return this._commands[id];
  }

  /**
   * Add commands to the registry.
   *
   * @param commands - The commands to add to the registry.
   *
   * @returns A disposable which will remove the added commands.
   *
   * #### Notes
   * If the `id` for a command is already registered, a warning will be
   * logged and that specific command will be ignored.
   *
   * The `id` of a command must be constant. Mutating the command `id`
   * while the command is registered will result in undefined behavior.
   */
  add(commands: ICommand[]): IDisposable {
    // Register the commands and warn for duplicate command ids.
    let added: ICommand[] = [];
    for (let cmd of commands) {
      if (cmd.id in this._commands) {
        console.warn(`Command '${cmd.id}' is already registered.`);
      } else {
        added.push(cmd);
        this._commands[cmd.id] = cmd;
      }
    }

    // If there are no new commands, there is nothing to do.
    if (added.length === 0) {
      return new DisposableDelegate(() => { });
    }

    // Emit the `commandsAdded` signal with a copy of the array
    // to protect the internal state from external modification.
    this.commandsAdded.emit(added.slice());

    // Return a dispospable which will remove the the commands.
    return new DisposableDelegate(() => {
      for (let cmd of added) {
        delete this._commands[cmd.id];
      }
      this.commandsRemoved.emit(added.slice());
    });
  }

  private _commands: { [id: string]: ICommand };
  private static _instance: CommandRegistry = null;
}
