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
  DelegateCommand
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
        let cmd = new DelegateCommand(() => {});
        expect(cmd instanceof DelegateCommand).to.be(true);
      });

      it('should accept an optional delegate test function', () => {
        let cmd = new DelegateCommand(() => {}, () => false);
        expect(cmd instanceof DelegateCommand).to.be(true);
      });

    });

    describe('#canExecuteChanged', () => {

      it('should be emitted when the enabled state changes', () => {
        let cmd = new DelegateCommand(() => {});
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

    describe('#enabled', () => {

      it('should get and set the enabled state', () => {
        let cmd = new DelegateCommand(() => {});
        expect(cmd.enabled).to.be(true);
        cmd.enabled = false;
        expect(cmd.enabled).to.be(false);
      });

    });

    describe('#canExecute()', () => {

      it('should reflect the enabled state', () => {
        let cmd = new DelegateCommand(() => {});
        expect(cmd.canExecute(null)).to.be(true);
        cmd.enabled = false;
        expect(cmd.canExecute(null)).to.be(false);
      });

      it('should invoke the delegate function', () => {
        let args: any = null;
        let called = false;
        let func = (a: any) => { called = true; args = a; return false; };
        let cmd = new DelegateCommand(() => {}, func);
        let args1 = {};
        expect(cmd.canExecute(args1)).to.be(false);
        expect(called).to.be(true);
        expect(args).to.be(args1);
      });

      it('should not invoke the delegate function when disabled', () => {
        let called = false;
        let func = () => { called = true; return true; };
        let cmd = new DelegateCommand(() => {}, func);
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
        let cmd = new DelegateCommand(func);
        let args1 = {};
        cmd.execute(args1);
        expect(called).to.be(true);
        expect(args).to.be(args1);
      });

    });

  });

});
