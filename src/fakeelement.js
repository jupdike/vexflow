// Vex Flow
// Mohit Muthanna <mohit@muthanna.com>
//
// Fake element type that can be passed to SVGContext constructor.
//
// Copyright Mohit Muthanna 2015
// @author Jared Updike (2016)

/** @constructor */
Vex.Flow.FakeElement = (function() {
  function FakeElement(width, height) {
    //
    this.init(width, height);
  }
  
  FakeElement.constantGuy = 42;
  
  FakeElement.prototype = {
    init: function(width, height) {
      this.width = width;
      this.height = height;
    },
    
    appendChild: function() {
      
    },
    
    render: function() {
      // TODO turn internal representation in SVG string
      return 'fake-representation';
    },
  };


  return FakeElement;
}());
