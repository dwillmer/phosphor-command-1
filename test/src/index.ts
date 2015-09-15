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

    it('should execute the handler', () => {

      var count = 0;
      var handler = () => { count += 1; };
      var options = {
        handler: handler,
        id: "test:id",
        caption: "Test Caption"
      };
      var comm = new DelegateCommand(options);
      expect(count).to.be(0);
      comm.execute();
      expect(count).to.be(1);

    });

    it('should emit when disabled state changes', () => {

      var handler = () => { console.log('Test'); };
      var options = {
        handler: handler,
        id: "test.id",
        caption: "Test Caption"
      };
      var comm = new DelegateCommand(options);
      var disabledState = false;
      var count = 0;
      var changeHandler = (sender: any, value: boolean) => { 
        disabledState = value; 
        count += 1;
      };
      comm.disabledChanged.connect(changeHandler, this);

      expect(disabledState).to.be(false);
      expect(count).to.be(0);
      comm.disabled = true;
      expect(disabledState).to.be(true);
      expect(count).to.be(1);

      // and check it doesn't fire when there's no change.
      comm.disabled = true;
      expect(count).to.be(1);

    });

    it('should not execute when disabled', () => {

      var count = 0;
      var handler = () => { count += 1; };
      var options = {
        handler: handler,
        id: "test:id",
        caption: "Test Caption"
      };
      var comm = new DelegateCommand(options);

      expect(count).to.be(0);
      comm.execute();
      expect(count).to.be(1);
      comm.disabled = true;
      comm.execute();
      expect(count).to.be(1);

    });

    it('should have read-only id', () => {

      var handler = () => {console.log('test');};
      var id = "test:id";
      var options = {
        handler: handler,
        id: id,
        caption: "Test Caption"
      };

      var comm = new DelegateCommand(options);

      expect(() => { comm.id = "should:error"; }).to.throwError();

    });

    it('should have read-only caption', () => {

      var handler = () => { console.log('test'); };
      var id = "test:id";
      var options = {
        handler: handler,
        id: id,
        caption: "Test Caption"
      };

      var comm = new DelegateCommand(options);

      expect(() => { comm.caption = "ShouldError"; }).to.throwError();
      
    });

  }); // DelegateCommand

}); // phosphor-command
