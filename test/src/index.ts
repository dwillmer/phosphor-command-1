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
  Signal
} from 'phosphor-signaling';

import {
  CommandRegistry, DelegateCommand, ICommand
} from '../../lib/index';


describe('phosphor-command', () => {

  describe('DelegateCommand', () => {

    describe('.canExecuteChangedSignal', () => {

      it('should be a signal', () => {
        expect(DelegateCommand.canExecuteChangedSignal instanceof Signal).to.be(true);
      });

    });

    describe('#constructor()', () => {

      it('should accept a delegate function', () => {
        let cmd = new DelegateCommand('test', () => {});
        expect(cmd instanceof DelegateCommand).to.be(true);
      });

      it('should accept an optional delegate test function', () => {
        let cmd = new DelegateCommand('test', () => {}, () => false);
        expect(cmd instanceof DelegateCommand).to.be(true);
      });

    });

    describe('#canExecuteChanged', () => {

      it('should be emitted when the enabled state changes', () => {
        let cmd = new DelegateCommand('test', () => {});
        let count = 0;
        cmd.canExecuteChanged.connect(() => { count++ });
        expect(count).to.be(0);
        cmd.enabled = false;
        expect(count).to.be(1);
        cmd.enabled = true;
        expect(count).to.be(2);
        cmd.enabled = true;
        expect(count).to.be(2);
      });

    });

    describe('#id', () => {

      it('should return the command id', () => {
        let cmd = new DelegateCommand('test', () => {});
        expect(cmd.id).to.be('test');
      });

      it('should be read only', () => {
        let cmd = new DelegateCommand('test', () => {});
        expect(() => { cmd.id = 'foo' }).to.throwException();
      });

    });

    describe('#enabled', () => {

      it('should get and set the enabled state', () => {
        let cmd = new DelegateCommand('test', () => {});
        expect(cmd.enabled).to.be(true);
        cmd.enabled = false;
        expect(cmd.enabled).to.be(false);
      });

    });

    describe('#canExecute()', () => {

      it('should reflect the enabled state', () => {
        let cmd = new DelegateCommand('test', () => {});
        expect(cmd.canExecute(null)).to.be(true);
        cmd.enabled = false;
        expect(cmd.canExecute(null)).to.be(false);
      });

      it('should invoke the delegate function', () => {
        let args: any = null;
        let called = false;
        let func = (a: any) => { called = true; args = a; return false; };
        let cmd = new DelegateCommand('test', () => {}, func);
        let args1 = {};
        expect(cmd.canExecute(args1)).to.be(false);
        expect(called).to.be(true);
        expect(args).to.be(args1);
      });

      it('should not invoke the delegate function when disabled', () => {
        let called = false;
        let func = () => { called = true; return true; };
        let cmd = new DelegateCommand('test', () => {}, func);
        cmd.enabled = false;
        expect(cmd.canExecute(null)).to.be(false);
        expect(called).to.be(false);
      });

    });

    describe('#execute()', () => {

      it('should invoke the delegate function', () => {
        let args: any = null;
        let called = false;
        let func = (a: any) => { called = true; args = a; };
        let cmd = new DelegateCommand('test', func);
        let args1 = {};
        cmd.execute(args1);
        expect(called).to.be(true);
        expect(args).to.be(args1);
      });

    });

  });

  describe('CommandRegistry', () => {

    describe('.instance()', () => {

      it('should return a `CommandRegistry` instance', () => {
        expect(CommandRegistry.instance() instanceof CommandRegistry).to.be(true);
      });

      it('should always return the same instance', () => {
        let a = CommandRegistry.instance();
        let b = CommandRegistry.instance();
        let c = CommandRegistry.instance();
        expect(a).to.be(b);
        expect(b).to.be(c);
      });

      it('should be different from a new instance', () => {
        let a = CommandRegistry.instance();
        let b = new CommandRegistry();
        expect(a).to.not.be(b);
      });

    });

    describe('.commandsAddedSignal', () => {

      it('should be a signal', () => {
        expect(CommandRegistry.commandsAddedSignal instanceof Signal).to.be(true);
      });

    });

    describe('.commandsRemovedSignal', () => {

      it('should be a signal', () => {
        expect(CommandRegistry.commandsRemovedSignal instanceof Signal).to.be(true);
      });

    });

    describe('#constructor', () => {

      it('should accept no arguments', () => {
        let reg = new CommandRegistry();
        expect(reg instanceof CommandRegistry).to.be(true);
      });

    });

    describe('#commandsAdded', () => {

      it('should be emitted when commands are added', () => {
        let called = false;
        let reg = new CommandRegistry();
        let a = new DelegateCommand('a', () => { });
        let b = new DelegateCommand('b', () => { });
        let c = new DelegateCommand('c', () => { });
        reg.commandsAdded.connect(() => { called = true; });
        reg.add([a, b, c]);
        expect(called).to.be(true);
      });

      it('should pass the added commands', () => {
        let args: ICommand[];
        let reg = new CommandRegistry();
        let a = new DelegateCommand('a', () => { });
        let b = new DelegateCommand('b', () => { });
        let c = new DelegateCommand('c', () => { });
        reg.commandsAdded.connect((s, a) => { args = a });
        reg.add([a, b, c]);
        expect(args.length).to.be(3);
        expect(args[0]).to.be(a);
        expect(args[1]).to.be(b);
        expect(args[2]).to.be(c);
      });

      it('should ignore duplicate command ids', () => {
        let args: ICommand[];
        let reg = new CommandRegistry();
        let a = new DelegateCommand('a', () => { });
        let b = new DelegateCommand('b', () => { });
        let c = new DelegateCommand('b', () => { });
        reg.commandsAdded.connect((s, a) => { args = a });
        reg.add([a, b, c]);
        expect(args.length).to.be(2);
        expect(args[0]).to.be(a);
        expect(args[1]).to.be(b);
      });

    });

    describe('#commandRemoved', () => {

      it('should be emitted when commands are removed', () => {
        let called = false;
        let reg = new CommandRegistry();
        let a = new DelegateCommand('a', () => { });
        let b = new DelegateCommand('b', () => { });
        let c = new DelegateCommand('c', () => { });
        reg.commandsRemoved.connect(() => { called = true; });
        let d = reg.add([a, b, c]);
        expect(called).to.be(false);
        d.dispose();
        expect(called).to.be(true);
      });

      it('should pass the removed commands', () => {
        let args: ICommand[];
        let reg = new CommandRegistry();
        let a = new DelegateCommand('a', () => { });
        let b = new DelegateCommand('b', () => { });
        let c = new DelegateCommand('c', () => { });
        reg.commandsRemoved.connect((s, a) => { args = a });
        let d = reg.add([a, b, c]);
        expect(args).to.be(void 0);
        d.dispose();
        expect(args.length).to.be(3);
        expect(args[0]).to.be(a);
        expect(args[1]).to.be(b);
        expect(args[2]).to.be(c);
      });

      it('should ignore duplicate command ids', () => {
        let args: ICommand[];
        let reg = new CommandRegistry();
        let a = new DelegateCommand('a', () => { });
        let b = new DelegateCommand('b', () => { });
        let c = new DelegateCommand('b', () => { });
        reg.commandsRemoved.connect((s, a) => { args = a });
        let d = reg.add([a, b, c]);
        expect(args).to.be(void 0);
        d.dispose();
        expect(args.length).to.be(2);
        expect(args[0]).to.be(a);
        expect(args[1]).to.be(b);
      });

    });

    describe('list', () => {

      it('should list the currently registered commands', () => {
        let reg = new CommandRegistry();
        let a = new DelegateCommand('a', () => { });
        let b = new DelegateCommand('b', () => { });
        let c = new DelegateCommand('c', () => { });
        reg.add([a, b, c]);
        expect(reg.list().sort()).to.eql(['a', 'b', 'c']);
      });

      it('should ignore duplicate command ids', () => {
        let reg = new CommandRegistry();
        let a = new DelegateCommand('a', () => { });
        let b = new DelegateCommand('b', () => { });
        let c = new DelegateCommand('b', () => { });
        reg.add([a, b, c]);
        expect(reg.list().sort()).to.eql(['a', 'b']);
      });

    });

    describe('get', () => {

      it('should get the command for the given id', () => {
        let reg = new CommandRegistry();
        let a = new DelegateCommand('a', () => { });
        let b = new DelegateCommand('b', () => { });
        let c = new DelegateCommand('c', () => { });
        reg.add([a, b, c]);
        expect(reg.get('a')).to.be(a);
        expect(reg.get('b')).to.be(b);
        expect(reg.get('c')).to.be(c);
      });

      it('should return `undefined` for an unregistered command', () => {
        let reg = new CommandRegistry();
        let a = new DelegateCommand('a', () => { });
        let b = new DelegateCommand('b', () => { });
        let c = new DelegateCommand('c', () => { });
        reg.add([a, b, c]);
        expect(reg.get('d')).to.be(void 0);
        expect(reg.get('e')).to.be(void 0);
        expect(reg.get('f')).to.be(void 0);
      });

    });

    describe('add', () => {

      it('should add the commands to the registry', () => {
        let reg = new CommandRegistry();
        let a = new DelegateCommand('a', () => { });
        let b = new DelegateCommand('b', () => { });
        let c = new DelegateCommand('c', () => { });
        reg.add([a, b, c]);
        expect(reg.get('a')).to.be(a);
        expect(reg.get('b')).to.be(b);
      });

      it('should ignore duplicate command ids', () => {
        let reg = new CommandRegistry();
        let a = new DelegateCommand('a', () => { });
        let b = new DelegateCommand('b', () => { });
        let c = new DelegateCommand('b', () => { });
        reg.add([a, b, c]);
        expect(reg.get('a')).to.be(a);
        expect(reg.get('b')).to.be(b);
      });

      it('should return a disposable to remove commands', () => {
        let reg = new CommandRegistry();
        let a = new DelegateCommand('a', () => { });
        let b = new DelegateCommand('b', () => { });
        let c = new DelegateCommand('c', () => { });
        let d = new DelegateCommand('d', () => { });
        let e = new DelegateCommand('e', () => { });
        let f = new DelegateCommand('f', () => { });
        let d1 = reg.add([a, b, c]);
        let d2 = reg.add([d, e, f]);
        expect(reg.list().sort()).to.eql(['a', 'b', 'c', 'd', 'e', 'f']);
        d1.dispose();
        expect(reg.list().sort()).to.eql(['d', 'e', 'f']);
        d2.dispose();
        expect(reg.list().sort()).to.eql([]);
      });

    });

  });

});
