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
   * A signal emitted when the command's state changes.
   *
   * #### Notes
   * Consumers of the command can subscribe to this signal in order to
   * update their visual representation of the command when it changes.
   */
  changed: ISignal<ICommand, void>;

  /**
   * A unique identifier for the command.
   *
   * #### Notes
   * This is assumed to be a read-only constant property.
   */
  id: string;

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
   * Construct a new command.
   *
   * @param id - The identifier for the command.
   */
  constructor(id: string) {
    this._id = id;
  }

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
   * Get the identifier for the command.
   *
   * #### Notes
   * This is a read-only constant property.
   */
  get id(): string {
    return this._id;
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

  private _id: string;
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
   * @param id - The identifier for the command.
   *
   * @param execute - The function which executes the command logic.
   */
  constructor(id: string, execute: (args: any) => void) {
    super(id);
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
