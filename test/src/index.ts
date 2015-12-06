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
  Command, DelegateCommand
} from '../../lib/index';


class TestCommand extends Command {

  execute(args: any): void { }
}


describe('phosphor-command', () => {

  describe('Command', () => {

    describe('.canExecuteChangedSignal', () => {

      it('should be a signal', () => {
        expect(Command.changedSignal instanceof Signal).to.be(true);
      });

    });

    describe('#constructor()', () => {

      it('should accept an id', () => {
        let cmd = new TestCommand();
        expect(cmd instanceof Command).to.be(true);
      });

    });

    describe('#changed', () => {

      it('should be a pure delegate to the `changedSignal`', () => {
        let cmd = new TestCommand();
        let other = Command.changedSignal.bind(cmd);
        expect(cmd.changed).to.eql(other);
      });

    });

    describe('#isEnabled()', () => {

      it('should be `true` by default', () => {
        let cmd = new TestCommand();
        expect(cmd.isEnabled()).to.be(true);
      });

    });

    describe('isChecked()', () => {

      it('should be `false` by default', () => {
        let cmd = new TestCommand();
        expect(cmd.isChecked()).to.be(false);
      });

    });

  });

  describe('DelegateCommand', () => {

    describe('#constructor()', () => {

      it('should accept an id and delegate function', () => {
        let cmd = new DelegateCommand(() => {});
        expect(cmd instanceof DelegateCommand).to.be(true);
      });

    });

    describe('#enabled', () => {

      it('should get and set the enabled state', () => {
        let cmd = new DelegateCommand(() => {});
        expect(cmd.enabled).to.be(true);
        cmd.enabled = false;
        expect(cmd.enabled).to.be(false);
      });

      it('should emit the `changed` signal', () => {
        let cmd = new DelegateCommand(() => {});
        let count = 0;
        cmd.changed.connect(() => { count++ });
        expect(count).to.be(0);
        cmd.enabled = false;
        expect(count).to.be(1);
        cmd.enabled = true;
        expect(count).to.be(2);
        cmd.enabled = true;
        expect(count).to.be(2);
      });

    });

    describe('#checked', () => {

      it('should get and set the checked state', () => {
        let cmd = new DelegateCommand(() => {});
        expect(cmd.checked).to.be(false);
        cmd.checked = true;
        expect(cmd.checked).to.be(true);
      });

      it('should emit the `changed` signal', () => {
        let cmd = new DelegateCommand(() => {});
        let count = 0;
        cmd.changed.connect(() => { count++ });
        expect(count).to.be(0);
        cmd.checked = true;
        expect(count).to.be(1);
        cmd.checked = false;
        expect(count).to.be(2);
        cmd.checked = false;
        expect(count).to.be(2);
      });

    });

    describe('#isEnabled()', () => {

      it('should reflect the `enabled` state', () => {
        let cmd = new DelegateCommand(() => {});
        expect(cmd.isEnabled()).to.be(true);
        cmd.enabled = false;
        expect(cmd.isEnabled()).to.be(false);
      });

    });

    describe('#isChecked()', () => {

      it('should reflect the `checked` state', () => {
        let cmd = new DelegateCommand(() => {});
        expect(cmd.isChecked()).to.be(false);
        cmd.checked = true;
        expect(cmd.isChecked()).to.be(true);
      });

    });

    describe('#execute()', () => {

      it('should invoke the delegate function', () => {
        let args: any = null;
        let called = false;
        let func = (a: any) => { called = true; args = a; };
        let cmd = new DelegateCommand(func);
        let args1 = {};
        cmd.execute(args1);
        expect(called).to.be(true);
        expect(args).to.be(args1);
      });

    });

  });

});
