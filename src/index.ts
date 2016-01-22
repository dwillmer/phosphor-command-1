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
 * An abstract base class for implementing concrete commands.
 */
export
abstract class Command {
  /**
   * Execute the command with the specified arguments.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * #### Notes
   * Calling `execute` when `isEnabled` returns `false` may result in
   * undefined behavior.
   *
   * This abstract method must be implemented by a subclass.
   */
  abstract execute(args: any): void;

  /**
   * A signal emitted when the command's state changes.
   *
   * #### Notes
   * A subclass should emit this signal when the command state changes.
   */
  get changed(): ISignal<Command, void> {
    return CommandPrivate.changedSignal.bind(this);
  }

  /**
   * Get the display text for the command.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns The display text for the command.
   *
   * #### Notes
   * A subclass may reimplement this method as needed. If the state
   * changes at runtime, the [[changed]] signal should be emitted.
   *
   * UI elements which have a visual representation of a command will
   * use this as the text for the primary DOM node for the command.
   *
   * The default implementation of this method returns an empty string.
   */
  text(args: any): string {
    return '';
  }

  /**
   * Get the class name(s) for the command icon.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns The class name(s) to add to the command icon node.
   *
   * #### Notes
   * A subclass may reimplement this method as needed. If the state
   * changes at runtime, the [[changed]] signal should be emitted.
   *
   * UI elements which have a visual representation of a command will
   * add the class name(s) to the DOM node for the command icon.
   *
   * Multiple class names can be separated with whitespace.
   *
   * The default implementation of this method returns an empty string.
   */
  icon(args: any): string {
    return '';
  }

  /**
   * Get the short caption for the command.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns The short caption for the command.
   *
   * #### Notes
   * A subclass may reimplement this method as needed. If the state
   * changes at runtime, the [[changed]] signal should be emitted.
   *
   * This value is used by UI elements where displaying a short command
   * description is relevant, such as tooltips and command palettes.
   *
   * The default implementation of this method returns an empty string.
   */
  caption(args: any): string {
    return '';
  }

  /**
   * Get the category for the command.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns The category for the command.
   *
   * #### Notes
   * A subclass may reimplement this method as needed. If the state
   * changes at runtime, the [[changed]] signal should be emitted.
   *
   * This value is used by UI elements which group commands together
   * based on category, such as toolbars and command palettes.
   *
   * The default implementation of this method returns an empty string.
   */
  category(args: any): string {
    return '';
  }

  /**
   * Get the class name(s) for the primary command node.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns The class name(s) to add to the primary command node.
   *
   * #### Notes
   * A subclass may reimplement this method as needed. If the state
   * changes at runtime, the [[changed]] signal should be emitted.
   *
   * UI elements which have a visual representation of a command will
   * add the class name(s) to the primary DOM node for the command.
   *
   * Multiple class names can be separated with whitespace.
   *
   * The default implementation of this method returns an empty string.
   */
  className(args: any): string {
    return '';
  }

  /**
   * Test whether the command is enabled for its current state.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns `true` if the command is enabled, `false` otherwise.
   *
   * #### Notes
   * A subclass may reimplement this method as needed. If the state
   * changes at runtime, the [[changed]] signal should be emitted.
   *
   * UI elements which have a visual representation of a command will
   * typically display a non-enabled command as greyed-out.
   *
   * The default implementation of this method returns `true`.
   */
  isEnabled(args: any): boolean {
    return true;
  }

  /**
   * Test whether the command is checked for its current state.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns `true` if the command is checked, `false` otherwise.
   *
   * #### Notes
   * A subclass may reimplement this method as needed. If the state
   * changes at runtime, the [[changed]] signal should be emitted.
   *
   * UI elements which have a visual representation of a command will
   * typically add extra class names to the node of a checked command.
   *
   * The default implementation of this method returns `false`.
   */
  isChecked(args: any): boolean {
    return false;
  }
}


/**
 * Safely execute a command.
 *
 * @param command - The command to execute.
 *
 * @param args - The arguments for the command. If the command does
 *   not require arguments, this may be `null`.
 *
 * #### Notes
 * If the commmand throws an exception, it will be caught and logged.
 */
export
function safeExecute(command: Command, args: any): void {
  try {
    command.execute(args);
  } catch (err) {
    console.error(err);
  }
}


/**
 * An options object for initializing a [[SimpleCommand]].
 */
export
interface ISimpleCommandOptions {
  /**
   * The handler function for the command.
   */
  handler: (args: any) => void;

  /**
   * The initial display text for the command.
   */
  text?: string;

  /**
   * The initial icon class for the command.
   */
  icon?: string;

  /**
   * The initial short caption for the command.
   */
  caption?: string;

  /**
   * The initial category for the command.
   */
  category?: string;

  /**
   * The initial extra class name for the command.
   */
  className?: string;

  /**
   * The initial enabled state of the command.
   */
  enabled?: boolean;

  /**
   * The initial checked state of the command.
   */
  checked?: boolean;
}


/**
 * A concrete implementation of [[Command]].
 *
 * A `SimpleCommand` is useful for creating commands which do not rely
 * on complex state and which can be implemented by a single function.
 *
 * A `SimpleCommand` should not be used when fine grained control over
 * the command state is required. For those cases, the `Command` class
 * should be subclassed directly.
 */
export
class SimpleCommand extends Command {
  /**
   * Construct a new simple command.
   *
   * @param options - The options for initializing the command.
   */
  constructor(options: ISimpleCommandOptions) {
    super();
    this._handler = options.handler;
    if (options.text !== void 0) {
      this._text = options.text;
    }
    if (options.icon !== void 0) {
      this._icon = options.icon;
    }
    if (options.caption !== void 0) {
      this._caption = options.caption;
    }
    if (options.category !== void 0) {
      this._category = options.category;
    }
    if (options.className !== void 0) {
      this._className = options.className;
    }
    if (options.enabled !== void 0) {
      this._enabled = options.enabled;
    }
    if (options.checked !== void 0) {
      this._checked = options.checked;
    }
  }

  /**
   * Get the display text for the command.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns The display text for the command.
   *
   * #### Notes
   * This method ignores the command arguments.
   *
   * **See also** [[setText]]
   */
  text(args: any): string {
    return this._text;
  }

  /**
   * Get the class name(s) for the command icon.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns The class name(s) to add to the command icon node.
   *
   * #### Notes
   * This method ignores the command arguments.
   *
   * **See also** [[setIcon]]
   */
  icon(args: any): string {
    return this._icon;
  }

  /**
   * Get the short caption for the command.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns The short caption for the command.
   *
   * #### Notes
   * This method ignores the command arguments.
   *
   * **See also** [[setCaption]]
   */
  caption(args: any): string {
    return this._caption;
  }

  /**
   * Get the category for the command.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns The category for the command.
   *
   * #### Notes
   * This method ignores the command arguments.
   *
   * **See also** [[setCategory]]
   */
  category(args: any): string {
    return this._category;
  }

  /**
   * Get the class name(s) for the primary command node.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns The class name(s) to add to the primary command node.
   *
   * #### Notes
   * This method ignores the command arguments.
   *
   * **See also** [[setClassName]]
   */
  className(args: any): string {
    return this._className;
  }

  /**
   * Test whether the command is enabled for its current state.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns `true` if the command is enabled, `false` otherwise.
   *
   * #### Notes
   * This method ignores the command arguments.
   *
   * **See also** [[setEnabled]]
   */
  isEnabled(args: any): boolean {
    return this._enabled;
  }

  /**
   * Test whether the command is checked for its current state.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * @returns `true` if the command is checked, `false` otherwise.
   *
   * #### Notes
   * This method ignores the command arguments.
   *
   * **See also** [[setChecked]]
   */
  isChecked(args: any): boolean {
    return this._checked;
  }

  /**
   * Set the text for the command.
   *
   * @param value - The text for the command.
   *
   * #### Notes
   * If the text changes, the [[changed]] signal will be emitted.
   */
  setText(value: string): void {
    if (this._text === value) {
      return;
    }
    this._text = value;
    this.changed.emit(void 0);
  }

  /**
   * Set the icon for the command.
   *
   * @param value - The icon for the command.
   *
   * #### Notes
   * If the icon changes, the [[changed]] signal will be emitted.
   */
  setIcon(value: string): void {
    if (this._icon === value) {
      return;
    }
    this._icon = value;
    this.changed.emit(void 0);
  }

  /**
   * Set the caption for the command.
   *
   * @param value - The caption for the command.
   *
   * #### Notes
   * If the caption changes, the [[changed]] signal will be emitted.
   */
  setCaption(value: string): void {
    if (this._caption === value) {
      return;
    }
    this._caption = value;
    this.changed.emit(void 0);
  }

  /**
   * Set the category for the command.
   *
   * @param value - The category for the command.
   *
   * #### Notes
   * If the category changes, the [[changed]] signal will be emitted.
   */
  setCategory(value: string): void {
    if (this._category === value) {
      return;
    }
    this._category = value;
    this.changed.emit(void 0);
  }

  /**
   * Set the class name for the command.
   *
   * @param value - The class name for the command.
   *
   * #### Notes
   * If the class name changes, the [[changed]] signal will be emitted.
   */
  setClassName(value: string): void {
    if (this._className === value) {
      return;
    }
    this._className = value;
    this.changed.emit(void 0);
  }

  /**
   * Set the enabled state for the command.
   *
   * @param value - The enabled state for the command.
   *
   * #### Notes
   * If the state changes, the [[changed]] signal will be emitted.
   */
  setEnabled(value: boolean): void {
    if (this._enabled === value) {
      return;
    }
    this._enabled = value;
    this.changed.emit(void 0);
  }

  /**
   * Set the checked state for the command.
   *
   * @param value - The checked state for the command.
   *
   * #### Notes
   * If the state changes, the [[changed]] signal will be emitted.
   */
  setChecked(value: boolean): void {
    if (this._checked === value) {
      return;
    }
    this._checked = value;
    this.changed.emit(void 0);
  }

  /**
   * Execute the command with the specified arguments.
   *
   * @param args - The arguments for the command. If the command does
   *   not require arguments, this may be `null`.
   *
   * #### Notes
   * Calling `execute` when `isEnabled` returns `false` may result in
   * undefined behavior.
   */
  execute(args: any) {
    this._handler.call(void 0, args);
  }

  private _text = '';
  private _icon = '';
  private _caption = '';
  private _category = '';
  private _className = '';
  private _enabled = true;
  private _checked = false;
  private _handler: (args: any) => void;
}


/**
 * The namespace for the `Command` class private data.
 */
namespace CommandPrivate {
  /**
   * A signal emitted when a command's state changes.
   */
  export
  const changedSignal = new Signal<Command, void>();
}
