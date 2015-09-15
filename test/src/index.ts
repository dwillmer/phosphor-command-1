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

    it('should build and run without error', () => {

      var handler = () => { console.log('Test-DelegateCommand'); };
      var comm = new DelegateCommand(handler, "test.id", "Test Caption");
      expect(comm.execute()).to.be(undefined);

    });

    it('should execute the handler', () => {

      var count = 0;
      var handler = () => { count += 1; };
      var comm = new DelegateCommand(handler, "test.id", "Test Caption");
      expect(count).to.be(0);
      comm.execute();
      expect(count).to.be(1);

    });

    it('should emit when disabled state changes', () => {

      var handler = () => { console.log('Test'); };
      var comm = new DelegateCommand(handler, "test.id", "Test Caption");

      var state = false;
      var changeHandler = (sender: any, value: boolean) => { 
        state = value; 
      };
      comm.disabledChanged.connect(changeHandler, this)

      expect(state).to.be(false);
      comm.disabled = true;
      expect(state).to.be(true);

    });

  }); // DelegateCommand

}); // phosphor-command
