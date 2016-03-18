// Vex Flow
// Mohit Muthanna <mohit@muthanna.com>
//
// Fake element type that can be passed to SVGContext constructor.
//
// Copyright Mohit Muthanna 2015
// @author Jared Updike (2016)

/** @constructor */
Vex.Flow.FakeElement = (function() {
  function FakeElement(tag) {
    //
    this.init(tag);
  }
  
  function addslashes(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
  }

  FakeElement.constantGuy = 42;
  
  FakeElement.prototype = {
    init: function(tag) {
    // TODO deal with this
      this.width = 200; //width;
      this.height = 200; //height;
      this.tag = tag;
      this.children = [];
      this.attributes = {};
    },
    
    appendChild: function(child) {
      this.children.push(child);
    },
    
    // maybe make a second one: docCreate ?
    create: function(tag) {
      console.log("FakeElement.create TODO deal with width / height");
      return new FakeElement(tag);
    },
    
    setAttributeNS: function(nsDummy, k, v) {
      this.attributes[k] = v;
    },

    setAttribute: function(k, v) {
      this.attributes[k] = v;
    },

    _internalRender: function() {
      var ret = '<'+this.tag+' ';
      // TODO style tag string according to whether children and/or attributes or not!
      for (var prop in this.attributes) {
        ret += prop + '="' + addslashes(this.attributes[prop]) + '"' + ' '; // escape the string
      }
      ret += '>';
      for (var i = 0; i < this.children.length; i++) {
        ret += this.children[i]._internalRender() + '\n';
      }
      ret += '</'+this.tag+'>';
      return ret;
    },
    
    render: function() {
      var ret = '<? XML >\nTODO header\n';
      ret += this._internalRender();
      return ret;
    },
  };


  return FakeElement;
}());
