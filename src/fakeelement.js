// Vex Flow
// Mohit Muthanna <mohit@muthanna.com>
//
// Fake element type that can be passed to SVGContext constructor to create
// SVG strings, offline, without resorting to jsdom or xmldom
//
// Copyright Mohit Muthanna 2015
// @author Jared Updike (2016)

/** @constructor */
Vex.Flow.FakeElement = (function() {
  function FakeElement(width, height) {
    //
    this.init(width, height);
  }
  
  function addSlashes(str) {
    return (str + '').replace(/[\\"']/g, '\\$&').replace(/\u0000/g, '\\0');
  }

  FakeElement.outsideWrapper = 'outside-wrapper';
  
  FakeElement.prototype = {
    init: function(width, height) {
      this.width = width;
      this.height = height;
      this.tag = FakeElement.outsideWrapper;
      this.children = [];
      this.attributes = {};
    },
    
    appendChild: function(child) {
      this.children.push(child);
    },
    
    create: function(tag) {
      var el = new FakeElement(0, 0);
      el.tag = tag;
      return el;
    },
    
    setAttributeNS: function(nsDummy, k, v) {
      this.attributes[k] = v;
    },

    setAttribute: function(k, v) {
      this.attributes[k] = v;
    },

    toDataUri: function() {
      var svgAsString = this.render();
      var encoded = btoa(svgAsString);
      var uri = 'data:image/svg+xml;base64,' + encoded;
      return uri;
    },
    
    render: function(moreAttribs) {
      var ret;
      // fancy case of rendering out the container to a nice standalone string,
      // equivalent to an SVG file that can be loaded into a browser as an .svg image file,
      // or converted into a data URL (see toDataUri() method)
      if (this.tag === FakeElement.outsideWrapper && this.children && this.children.length == 1 &&
        this.children[0].tag === 'svg') {
        var w = this.width;
        var h = this.height;
        ret = '<?xml version="1.0" encoding="utf-8"?>\n';
        ret += '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n';
        var attribs = ' version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"\n';
        attribs += '     xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"\n';
        attribs += '     width="'+w+'px" height="'+h+'px" viewBox="0 0 '+w+' '+h+'"\n';
        attribs += '     enable-background="new 0 0 '+w+' '+h+'" xml:space="preserve"';
        ret += this.children[0].render(attribs);
        return ret;
      }
      
      // normal case of rendering simple nested XML bits to string
      moreAttribs = moreAttribs || '';
      if (Object.keys(this.attributes).length > 0) {
        moreAttribs = ' ';
      }
      ret = '<' + this.tag + moreAttribs;
      // TODO style tag string according to whether children and/or attributes or not!
      for (var prop in this.attributes) {
        ret += prop + '="' + addSlashes(this.attributes[prop]) + '"' + ' '; // escape the string
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
