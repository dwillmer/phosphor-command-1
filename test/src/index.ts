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
  DelegateCommand
} from '../../lib/index';


describe('phosphor-command', () => {

  describe('DelegateCommand', () => {

    describe('#disabledChanged', () => {

      it('should be emitted when the disabled state changes', () => {
        var cmd = new DelegateCommand({
          id: 'test.id',
          caption: 'Test Caption',
          handler: () => console.log('Test'),
        });
        var count = 0;
        var disabledState = false;
        cmd.disabledChanged.connect((sender: any, value: boolean) => {
          disabledState = value;
          count++;
        });
        expect(disabledState).to.be(false);
        expect(count).to.be(0);
        cmd.disabled = true;
        expect(disabledState).to.be(true);
        expect(count).to.be(1);
        cmd.disabled = true;
        expect(count).to.be(1);
        expect(disabledState).to.be(true);
        cmd.disabled = false;
        expect(count).to.be(2);
        expect(disabledState).to.be(false);
      });

    });

    describe('#id', () => {

      it('should return the command id', () => {
        var cmd = new DelegateCommand({
          id: 'test.id',
          caption: 'Test Caption',
          handler: () => console.log('Test'),
        });
        expect(cmd.id).to.be('test.id');
      });

      it('should be read-only', () => {
        var cmd = new DelegateCommand({
          id: 'test.id',
          caption: 'Test Caption',
          handler: () => console.log('Test'),
        });
        expect(() => { cmd.id = 'should:error'; }).to.throwError();
      });

    });

    describe('#caption', () => {

      it('should return the command caption', () => {
        var cmd = new DelegateCommand({
          id: 'test.id',
          caption: 'Test Caption',
          handler: () => console.log('Test'),
        });
        expect(cmd.caption).to.be('Test Caption');
      });

      it('should be read-only', () => {
        var cmd = new DelegateCommand({
          id: 'test.id',
          caption: 'Test Caption',
          handler: () => console.log('Test'),
        });
        expect(() => { cmd.caption = 'ShouldError'; }).to.throwError();
      });

    });

    describe('#disabled', () => {

      it('should return the disabled state', () => {
        var cmd = new DelegateCommand({
          id: 'test.id',
          caption: 'Test Caption',
          handler: () => console.log('Test'),
        });
        expect(cmd.disabled).to.be(false);
        cmd.disabled = true;
        expect(cmd.disabled).to.be(true);
      });

    });

    describe('#execute()', () => {

      it('should invoke the handler', () => {
        var count = 0;
        var cmd = new DelegateCommand({
          id: 'test:id',
          caption: 'Test Caption',
          handler: () => count++,
        });
        expect(count).to.be(0);
        cmd.execute();
        expect(count).to.be(1);
      });

      it('should not invoke the handler when disabled', () => {
        var count = 0;
        var cmd = new DelegateCommand({
          id: 'test:id',
          caption: 'Test Caption',
          handler: () => count++,
        });
        expect(count).to.be(0);
        cmd.execute();
        expect(count).to.be(1);
        cmd.disabled = true;
        cmd.execute();
        expect(count).to.be(1);
        cmd.disabled = false;
        cmd.execute();
        expect(count).to.be(2);
      });

    });

  });

});
