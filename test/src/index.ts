/*-----------------------------------------------------------------------------
| Copyright (c) 2014-2015, PhosphorJS Contributors
|
| Distributed under the terms of the BSD 3-Clause License.
|
| The full license is in the file LICENSE, distributed with this software.
|----------------------------------------------------------------------------*/
'use strict';

import expect = require('expect.js');

import {
  Command, SimpleCommand, CommandItem, ICommandItemOptions
} from '../../lib/index';


class TestCommand extends Command {

  execute(args: any): void { }
}


describe('phosphor-command', () => {

  describe('Command', () => {

    describe('#constructor()', () => {

      it('should create a new command', () => {
        let cmd = new TestCommand();
        expect(cmd instanceof Command).to.be(true);
      });

    });

    describe('#text()', () => {

      it('should be an empty string by default', () => {
        let cmd = new TestCommand();
        expect(cmd.text(null)).to.be('');
      });

    });

    describe('#icon()', () => {

      it('should be an empty string by default', () => {
        let cmd = new TestCommand();
        expect(cmd.icon(null)).to.be('');
      });

    });

    describe('#caption()', () => {

      it('should be an empty string by default', () => {
        let cmd = new TestCommand();
        expect(cmd.caption(null)).to.be('');
      });

    });

    describe('#category()', () => {

      it('should be an empty string by default', () => {
        let cmd = new TestCommand();
        expect(cmd.category(null)).to.be('');
      });

    });

    describe('#className()', () => {

      it('should be an empty string by default', () => {
        let cmd = new TestCommand();
        expect(cmd.className(null)).to.be('');
      });

    });

    describe('#isEnabled()', () => {

      it('should be `true` by default', () => {
        let cmd = new TestCommand();
        expect(cmd.isEnabled(null)).to.be(true);
      });

    });

    describe('#isVisible()', () => {

      it('should be `true` by default', () => {
        let cmd = new TestCommand();
        expect(cmd.isVisible(null)).to.be(true);
      });

    });

    describe('isChecked()', () => {

      it('should be `false` by default', () => {
        let cmd = new TestCommand();
        expect(cmd.isChecked(null)).to.be(false);
      });

    });

  });

  describe('SimpleCommand', () => {

    describe('#constructor()', () => {

      it('should accept command options', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        expect(cmd instanceof SimpleCommand).to.be(true);
      });

    });

    describe('#text()', () => {

      it('should reflect the command text', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
          text: 'foo',
        });
        expect(cmd.text(null)).to.be('foo');
      });

    });

    describe('#icon()', () => {

      it('should reflect the command icon', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
          icon: 'fa fa-close',
        });
        expect(cmd.icon(null)).to.be('fa fa-close');
      });

    });

    describe('#caption()', () => {

      it('should reflect the command caption', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
          caption: 'green eggs and ham',
        });
        expect(cmd.caption(null)).to.be('green eggs and ham');
      });

    });

    describe('#category()', () => {

      it('should reflect the command category', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
          category: 'Seuss',
        });
        expect(cmd.category(null)).to.be('Seuss');
      });

    });

    describe('#className()', () => {

      it('should reflect the command class name', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
          className: 'blue',
        });
        expect(cmd.className(null)).to.be('blue');
      });

    });

    describe('#isEnabled()', () => {

      it('should reflect the command enabled state', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
          enabled: false,
        });
        expect(cmd.isEnabled(null)).to.be(false);
      });

    });

    describe('#isVisible()', () => {

      it('should reflect the command visible state', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
          visible: false,
        });
        expect(cmd.isVisible(null)).to.be(false);
      });

    });

    describe('isChecked()', () => {

      it('should reflect the command checked state', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
          checked: true,
        });
        expect(cmd.isChecked(null)).to.be(true);
      });

    });

    describe('#setText()', () => {

      it('should set the command text', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        cmd.setText('foo');
        expect(cmd.text(null)).to.be('foo');
      });

      it('should emit the changed signal if changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setText('foo');
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setText('');
        expect(tgt).to.be(null);
      });

    });

    describe('setIcon()', () => {

      it('should set the command icon', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        cmd.setIcon('fa fa-close');
        expect(cmd.icon(null)).to.be('fa fa-close');
      });

      it('should emit the changed signal if changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setIcon('fa fa-close');
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setIcon('');
        expect(tgt).to.be(null);
      });

    });

    describe('#setCaption()', () => {

      it('should set the command caption', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        cmd.setCaption('green eggs and ham');
        expect(cmd.caption(null)).to.be('green eggs and ham');
      });

      it('should emit the changed signal if changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setCaption('green eggs and ham');
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setCaption('');
        expect(tgt).to.be(null);
      });

    });

    describe('#setCategory()', () => {

      it('should set the command category', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        cmd.setCategory('Seuss');
        expect(cmd.category(null)).to.be('Seuss');
      });

      it('should emit the changed signal if changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setCategory('Seuss');
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setCategory('');
        expect(tgt).to.be(null);
      });

    });

    describe('#setClassName()', () => {

      it('should set the command class name', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        cmd.setClassName('blue');
        expect(cmd.className(null)).to.be('blue');
      });

      it('should emit the changed signal if changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setClassName('blue');
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setClassName('');
        expect(tgt).to.be(null);
      });

    });

    describe('#setEnabled()', () => {

      it('should set the command enabled state', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        cmd.setEnabled(false);
        expect(cmd.isEnabled(null)).to.be(false);
      });

      it('should emit the changed signal if changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setEnabled(false);
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setEnabled(true);
        expect(tgt).to.be(null);
      });

    });

    describe('#setVisible()', () => {

      it('should set the command visible state', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        cmd.setVisible(false);
        expect(cmd.isVisible(null)).to.be(false);
      });

      it('should emit the changed signal if changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setVisible(false);
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setVisible(true);
        expect(tgt).to.be(null);
      });

    });

    describe('#setChecked()', () => {

      it('should set the command checked state', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        cmd.setChecked(true);
        expect(cmd.isChecked(null)).to.be(true);
      });

      it('should emit the changed signal if changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setChecked(true);
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let tgt: Command = null;
        Command.changed.connect((s, c) => { tgt = c; });
        cmd.setChecked(false);
        expect(tgt).to.be(null);
      });

    });

    describe('#execute()', () => {

      it('should invoke the handler function', () => {
        let args: any = null;
        let called = false;
        let func = (a: any) => { called = true; args = a; };
        let cmd = new SimpleCommand({ handler: func });
        let args1 = {};
        cmd.execute(args1);
        expect(called).to.be(true);
        expect(args).to.be(args1);
      });

      it('should not propagate handler error', () => {
        let args: any = null;
        let called = false;
        let func = (a: any) => { called = true; throw "Should not propagate"; };
        let cmd = new SimpleCommand({ handler: func });
        cmd.execute(args);
        expect(called).to.be(true);
      });

    });

  });

  describe('CommandItem', () => {

    it('should accept an options object', () => {
      let called = false;
      let args = 1;
      let count = 0;
      let func = (a: any) => { called = true; count = a; }
      let cmd = new SimpleCommand({ handler: func });
      let options = {
        command: cmd,
        args: args
      } as ICommandItemOptions;

      let cmdItem = new CommandItem(options);

      expect(cmdItem.shortcut).to.be('');
      expect(cmdItem.text).to.be('');
      expect(cmdItem.icon).to.be('');
      expect(cmdItem.caption).to.be('');
      expect(cmdItem.category).to.be('');
      expect(cmdItem.command).to.be(cmd);
      expect(cmdItem.args).to.be(args);
      expect(cmdItem.className).to.be('');
      expect(cmdItem.isEnabled).to.be(true);
      expect(cmdItem.isVisible).to.be(true);
      expect(cmdItem.isChecked).to.be(false);
      expect(count).to.be(0);
      cmdItem.execute();
      expect(count).to.be(1);
    });

    describe('#constructor()', () => {

      it('should accept an options object', () => {

      });

    });

    describe('#command', () => {

      it('should be the command passed to the constructor', () => {

      });

      it('should be read-only', () => {

      });

    });

    describe('#args', () => {

      it('should be the args passed to the constructor', () => {

      });

      it('should be read-only', () => {

      });

    });

    describe('#shortcut', () => {

      it('should be the shortcut passed to the constructor', () => {

      });

      it('should be read-only', () => {

      });

    });

    describe('#text', () => {

      it('should delegate to the internal command', () => {

      });

      it('should be read-only', () => {

      });

    });

    describe('#icon', () => {

      it('should delegate to the internal command', () => {

      });

      it('should be read-only', () => {

      });

    });

    describe('#caption', () => {

      it('should delegate to the internal command', () => {

      });

      it('should be read-only', () => {

      });

    });

    describe('#category', () => {

      it('should delegate to the internal command', () => {

      });

      it('should be read-only', () => {

      });

    });

    describe('#className', () => {

      it('should delegate to the internal command', () => {

      });

      it('should be read-only', () => {

      });

    });

    describe('#isEnabled', () => {

      it('should delegate to the internal command', () => {

      });

      it('should be read-only', () => {

      });

    });

    describe('#isVisible', () => {

      it('should delegate to the internal command', () => {

      });

      it('should be read-only', () => {

      });

    });

    describe('#isChecked', () => {

      it('should delegate to the internal command', () => {

      });

      it('should be read-only', () => {

      });

    });

    describe('#execute()', () => {

      it('should delegate to the internal command', () => {

      });

      it('should be read-only', () => {

      });

    });

  });

});
