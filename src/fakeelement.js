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
    
    create: function(tag) {
      console.log("FakeElement.create");
      return new FakeElement(tag);
    },
    
    setAttributeNS: function(nsDummy, k, v) {
      console.log("FakeElement.setAttributeNS");
      this.attributes[k] = v;
    },

    setAttribute: function(k, v) {
      console.log("FakeElement.setAttribute");
      this.attributes[k] = v;
    },
    
    render: function() {
      var ret = '<'+this.tag+' ';
      for (var prop in this.attributes) {
        ret += prop + '="' + addslashes(this.attributes[prop]) + '"' + ' '; // escape the string
      }
      ret += '>';
      for (var i = 0; i < this.children.length; i++) {
        ret += this.children[i].render() + '\n';
      }
      ret += '</'+this.tag+'>';
      return ret;
    },
  };


  return FakeElement;
}());
