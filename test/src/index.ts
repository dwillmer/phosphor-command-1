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
    let cmd = new TestCommand();

    describe('#constructor()', () => {

      it('should create a new command', () => {
        expect(cmd instanceof Command).to.be(true);
      });

    });

    describe('#text()', () => {

      it('should be an empty string by default', () => {
        expect(cmd.text(null)).to.be('');
      });

    });

    describe('#icon()', () => {

      it('should be an empty string by default', () => {
        expect(cmd.icon(null)).to.be('');
      });

    });

    describe('#caption()', () => {

      it('should be an empty string by default', () => {
        expect(cmd.caption(null)).to.be('');
      });

    });

    describe('#category()', () => {

      it('should be an empty string by default', () => {
        expect(cmd.category(null)).to.be('');
      });

    });

    describe('#className()', () => {

      it('should be an empty string by default', () => {
        expect(cmd.className(null)).to.be('');
      });

    });

    describe('#isEnabled()', () => {

      it('should be `true` by default', () => {
        expect(cmd.isEnabled(null)).to.be(true);
      });

    });

    describe('#isVisible()', () => {

      it('should be `true` by default', () => {
        expect(cmd.isVisible(null)).to.be(true);
      });

    });

    describe('#isChecked()', () => {

      it('should be `false` by default', () => {
        expect(cmd.isChecked(null)).to.be(false);
      });

    });

  });

  describe('SimpleCommand', () => {
    let cmd: SimpleCommand = null;
    let tgt: Command = null;

    beforeEach(() => {
      cmd = new SimpleCommand({
        handler: () => { },
        text: 'testText',
        icon: 'testIcon',
        caption: 'testCaption',
        category: 'testCategory',
        className: 'testClassName',
        enabled: false,
        visible: false,
        checked: true
      });
      tgt = null;
      Command.changed.connect((s, c) => { tgt = c; });
    });

    describe('#constructor()', () => {

      it('should accept command options', () => {
        expect(cmd instanceof SimpleCommand).to.be(true);
      });

    });

    describe('#text()', () => {

      it('should reflect the command text', () => {
        cmd.setText('foo');
        expect(cmd.text(null)).to.be('foo');
      });

      it('should be settable via the options object', () => {
        expect(cmd.text(null)).to.be('testText');
      });

    });

    describe('#icon()', () => {

      it('should reflect the command icon', () => {
        cmd.setIcon('fa fa-close');
        expect(cmd.icon(null)).to.be('fa fa-close');
      });

      it('should be settable via the options object', () => {
        expect(cmd.icon(null)).to.be('testIcon');
      });

    });

    describe('#caption()', () => {

      it('should reflect the command caption', () => {
        cmd.setCaption('green eggs and ham');
        expect(cmd.caption(null)).to.be('green eggs and ham');
      });

      it('should be settable via the options object', () => {
        expect(cmd.caption('null')).to.be('testCaption');
      });

    });

    describe('#category()', () => {

      it('should reflect the command category', () => {
        cmd.setCategory('Seuss');
        expect(cmd.category(null)).to.be('Seuss');
      });

      it('should be settable via the options object', () => {
        expect(cmd.category(null)).to.be('testCategory');
      });

    });

    describe('#className()', () => {

      it('should reflect the command class name', () => {
        cmd.setClassName('blue');
        expect(cmd.className(null)).to.be('blue');
      });

      it('should be settable via the options object', () => {
        expect(cmd.className(null)).to.be('testClassName');
      });

    });

    describe('#isEnabled()', () => {

      it('should default to true', () => {
        let cmd = new SimpleCommand({ handler: () => { } });
        expect(cmd.isEnabled(null)).to.be(true);
      });

      it('should reflect the command enabled state', () => {
        cmd.setEnabled(false);
        expect(cmd.isEnabled(null)).to.be(false);
      });

      it('should be settable via the command object', () => {
        expect(cmd.isEnabled(null)).to.be(false);
      });

    });

    describe('#isVisible()', () => {

      it('should default to true', () => {
        let cmd = new SimpleCommand({ handler: () => { } });
        expect(cmd.isEnabled(null)).to.be(true);
      })

      it('should reflect the command visible state', () => {
        cmd.setVisible(true);
        expect(cmd.isVisible(null)).to.be(true);
        cmd.setVisible(false);
        expect(cmd.isVisible(null)).to.be(false);
      });

      it('should be settable via the command object', () => {
        expect(cmd.isVisible(null)).to.be(false);
      });

    });

    describe('#isChecked()', () => {

      it('should default to true', () => {
        let cmd = new SimpleCommand({ handler: () => { } });
        expect(cmd.isChecked(null)).to.be(false);
      });

      it('should reflect the command checked state', () => {
        cmd.setChecked(false);
        expect(cmd.isChecked(null)).to.be(false);
        cmd.setChecked(true);
        expect(cmd.isChecked(null)).to.be(true);
      });

      it('should be settable via the options object', () => {
        expect(cmd.isChecked(null)).to.be(true);
      })

    });

    describe('#setText()', () => {

      it('should set the command text', () => {
        cmd.setText('foo');
        expect(cmd.text(null)).to.be('foo');
      });

      it('should emit the changed signal if changed', () => {
        cmd.setText('foo');
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        cmd.setText('testText');
        expect(tgt).to.be(null);
      });

    });

    describe('#setIcon()', () => {

      it('should set the command icon', () => {
        cmd.setIcon('fa fa-close');
        expect(cmd.icon(null)).to.be('fa fa-close');
      });

      it('should emit the changed signal if changed', () => {
        cmd.setIcon('fa fa-close');
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        cmd.setIcon('testIcon');
        expect(tgt).to.be(null);
      });

    });

    describe('#setCaption()', () => {

      it('should set the command caption', () => {
        cmd.setCaption('green eggs and ham');
        expect(cmd.caption(null)).to.be('green eggs and ham');
      });

      it('should emit the changed signal if changed', () => {
        cmd.setCaption('green eggs and ham');
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        cmd.setCaption('testCaption');
        expect(tgt).to.be(null);
      });

    });

    describe('#setCategory()', () => {

      it('should set the command category', () => {
        cmd.setCategory('Seuss');
        expect(cmd.category(null)).to.be('Seuss');
      });

      it('should emit the changed signal if changed', () => {
        cmd.setCategory('Seuss');
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        cmd.setCategory('testCategory');
        expect(tgt).to.be(null);
      });

    });

    describe('#setClassName()', () => {

      it('should set the command class name', () => {
        cmd.setClassName('blue');
        expect(cmd.className(null)).to.be('blue');
      });

      it('should emit the changed signal if changed', () => {
        cmd.setClassName('blue');
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        cmd.setClassName('testClassName');
        expect(tgt).to.be(null);
      });

    });

    describe('#setEnabled()', () => {

      it('should set the command enabled state', () => {
        cmd.setEnabled(false);
        expect(cmd.isEnabled(null)).to.be(false);
      });

      it('should emit the changed signal if changed', () => {
        cmd.setEnabled(true);
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        cmd.setEnabled(false);
        expect(tgt).to.be(null);
      });

    });

    describe('#setVisible()', () => {

      it('should set the command visible state', () => {
        cmd.setVisible(false);
        expect(cmd.isVisible(null)).to.be(false);
      });

      it('should emit the changed signal if changed', () => {
        cmd.setVisible(true);
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        cmd.setVisible(false);
        expect(tgt).to.be(null);
      });

    });

    describe('#setChecked()', () => {

      it('should set the command checked state', () => {
        cmd.setChecked(true);
        expect(cmd.isChecked(null)).to.be(true);
      });

      it('should emit the changed signal if changed', () => {
        cmd.setChecked(false);
        expect(tgt).to.be(cmd);
      });

      it('should not emit the changed signal if not changed', () => {
        cmd.setChecked(true);
        expect(tgt).to.be(null);
      });

    });

    describe('#execute()', () => {
      let args: any = null;

      it('should invoke the handler function', () => {
        let called = false;
        let func = (a: any) => { called = true; args = a; };
        let cmd = new SimpleCommand({ handler: func });
        let args1 = {};
        cmd.execute(args1);
        expect(called).to.be(true);
        expect(args).to.be(args1);
      });

      it('should not propagate handler error', () => {
        let called = false;
        let func = (a: any) => { called = true; throw "Should not propagate"; };
        let cmd = new SimpleCommand({ handler: func });
        cmd.execute(args);
        expect(called).to.be(true);
      });

    });

  });

  describe('CommandItem', () => {
    let cmd: SimpleCommand = null;
    let cmdItem: CommandItem = null;
    let options: ICommandItemOptions = null;
    let count = 0;
    let args = 1;

    beforeEach(() => {
      count = 0;
      let func = (a: any) => { count = a; };
      cmd = new SimpleCommand({ handler: func });
      options = {
        command: cmd,
        args: args,
        shortcut: 'testShortcut',
      };
      cmdItem = new CommandItem(options);
    });

    describe('#constructor()', () => {

      it('should accept an options object with just command', () => {
        let cmdItem = new CommandItem({ command: cmd, args: args });
        expect(cmdItem.command).to.be(cmd);
      });

    });

    describe('#command', () => {

      it('should be the command passed to the constructor', () => {
        expect(cmdItem.command).to.be(cmd);
      });

      it('should execute without error', () => {
        expect(count).to.be(0);
        cmdItem.execute();
        expect(count).to.be(1);
      });

      it('should be read-only', () => {
        let newCmd = new SimpleCommand({ handler: () => { } });
        expect(() => { cmdItem.command = newCmd; }).to.throwError();
      });

    });

    describe('#args', () => {

      it('should be null by default', () => {
        let cmdItem = new CommandItem({ command: cmd });
        expect(cmdItem.args).to.be(null);
      });

      it('should be the args passed to the constructor', () => {
        expect(cmdItem.args).to.be(args);
      });

      it('should be read-only', () => {
        expect(() => { cmdItem.args = 0; }).to.throwError();
      });

    });

    describe('#shortcut', () => {

      it('should be an empty string by default', () => {
        let cmdItem = new CommandItem({ command: cmd, args: args });
        expect(cmdItem.shortcut).to.be('');
      });

      it('should be the shortcut passed to the constructor', () => {
        expect(cmdItem.shortcut).to.be('testShortcut');
      });

      it('should be read-only', () => {
        expect(() => { cmdItem.shortcut = 'test'; }).to.throwError();
      });

    });

    describe('#text', () => {

      it('delegate to the internal command', () => {
        expect(cmdItem.text).to.be('');
      });

      it('should be settable via the command setText method', () => {
        cmd.setText('otherText');
        expect(cmdItem.text).to.be('otherText');
      });

      it('should be read-only', () => {
        expect(() => { cmdItem.text = 'test'; }).to.throwError();
      });

    });

    describe('#icon', () => {

      it('delegate to the internal command', () => {
        expect(cmdItem.icon).to.be('');
      });

      it('should be settable via the command setIcon method', () => {
        cmd.setIcon('otherIcon');
        expect(cmdItem.icon).to.be('otherIcon');
      });

      it('should be read-only', () => {
        expect(() => { cmdItem.icon = 'test'; }).to.throwError();
      });

    });

    describe('#caption', () => {

      it('should delegate to the internal command', () => {
        expect(cmdItem.caption).to.be('');
      });

      it('should be settable via the command setCaption method', () => {
        cmd.setCaption('otherCaption');
        expect(cmdItem.caption).to.be('otherCaption');
      });

      it('should be read-only', () => {
        expect(() => { cmdItem.caption = 'test'; }).to.throwError();
      });

    });

    describe('#category', () => {

      it('should delegate to the internal command', () => {
        expect(cmdItem.category).to.be('');
      });

      it('should be settable via the command setCategory method', () => {
        cmd.setCategory('otherCategory');
        expect(cmdItem.category).to.be('otherCategory');
      });

      it('should be read-only', () => {
        expect(() => { cmdItem.category = 'test'; }).to.throwError();
      });

    });

    describe('#className', () => {

      it('should delegate to the internal command', () => {
        expect(cmdItem.className).to.be('');
      });

      it('should be settable via the command setClassName method', () => {
        cmd.setClassName('otherClassName');
        expect(cmdItem.className).to.be('otherClassName');
      });

      it('should be read-only', () => {
        expect(() => { cmdItem.className = 'test'; }).to.throwError();
      });

    });

    describe('#isEnabled', () => {

      it('should delegate to the internal command', () => {
        expect(cmdItem.isEnabled).to.be(true);
      });

      it('should be settable via the command setEnabled method', () => {
        cmd.setEnabled(false);
        expect(cmdItem.isEnabled).to.be(false);
      });

    });

    describe('#isVisible', () => {

      it('should be true by default', () => {
        expect(cmdItem.isVisible).to.be(true);
      });

      it('should be settable via the command setVisible method', () => {
        cmd.setVisible(false);
        expect(cmdItem.isVisible).to.be(false);
      });

      it('should be read-only', () => {
        expect(() => { cmdItem.isVisible = false; }).to.throwError();
      });

    });

    describe('#isChecked', () => {

      it('should be false by default', () => {
        let cmdItem = new CommandItem({ command: cmd, args: args });
        expect(cmdItem.isChecked).to.be(false);
      });

      it('should be settable via the command setChecked method', () => {
        cmd.setChecked(false);
        expect(cmdItem.isChecked).to.be(false);
      });

      it('should be read-only', () => {
        expect(() => { cmdItem.isChecked = true; }).to.throwError();
      });

    });

  });

});
