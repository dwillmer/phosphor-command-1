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
  Command, SimpleCommand, safeExecute
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

    describe('#className()', () => {

      it('should be an empty string by default', () => {
        let cmd = new TestCommand();
        expect(cmd.className(null)).to.be('');
      });

    });

    describe('#description()', () => {

      it('should be an empty string by default', () => {
        let cmd = new TestCommand();
        expect(cmd.description(null)).to.be('');
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

    describe('#className()', () => {

      it('should reflect the command class name', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
          className: 'blue',
        });
        expect(cmd.className(null)).to.be('blue');
      });

    });

    describe('#description()', () => {

      it('should reflect the command description', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
          description: 'green eggs and ham',
        });
        expect(cmd.description(null)).to.be('green eggs and ham');
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
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setText('foo');
        expect(called).to.be(true);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setText('');
        expect(called).to.be(false);
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
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setIcon('fa fa-close');
        expect(called).to.be(true);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setIcon('');
        expect(called).to.be(false);
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
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setClassName('blue');
        expect(called).to.be(true);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setClassName('');
        expect(called).to.be(false);
      });

    });

    describe('#setDescription()', () => {

      it('should set the command description', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        cmd.setDescription('green eggs and ham');
        expect(cmd.description(null)).to.be('green eggs and ham');
      });

      it('should emit the changed signal if changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setDescription('green eggs and ham');
        expect(called).to.be(true);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setDescription('');
        expect(called).to.be(false);
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
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setEnabled(false);
        expect(called).to.be(true);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setEnabled(true);
        expect(called).to.be(false);
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
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setVisible(false);
        expect(called).to.be(true);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setVisible(true);
        expect(called).to.be(false);
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
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setChecked(true);
        expect(called).to.be(true);
      });

      it('should not emit the changed signal if not changed', () => {
        let cmd = new SimpleCommand({
          handler: () => { },
        });
        let called = false;
        cmd.changed.connect(() => { called = true; });
        cmd.setChecked(false);
        expect(called).to.be(false);
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

    });

  });

  describe('safeExecute()', () => {

    it('should execute the command', () => {
      let args: any = null;
      let called = false;
      let func = (a: any) => { called = true; args = a; };
      let cmd = new SimpleCommand({ handler: func });
      let args1 = {};
      safeExecute(cmd, args1);
      expect(called).to.be(true);
      expect(args).to.be(args1);
    });

    it('should not propagate exceptions', () => {
      let args: any = null;
      let called = false;
      let func = (a: any) => { throw new Error('test'); };
      let cmd = new SimpleCommand({ handler: func });
      let args1 = {};
      safeExecute(cmd, args1);
      expect(called).to.be(false);
      expect(args).to.be(null);
    });

  });

});
