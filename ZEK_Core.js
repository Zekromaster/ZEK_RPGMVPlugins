// Copyright (c) 2019 Zekromaster <personal@zekromaster.net>
//
// DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
//         Version 2, December 2004
//
// Copyright (C) 2004 Sam Hocevar <sam@hocevar.net>
//
// Everyone is permitted to copy and distribute verbatim or modified
// copies of this license document, and changing it is allowed as long
// as the name is changed.
//
// DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
// TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION
//
// 0. You just DO WHAT THE FUCK YOU WANT TO.



/*:
 * FileName is ZEK_Core.js
 * Version is 0.1
 * @plugindesc Does nothing aside from defining some globals for plugin management and some common code.
 * @author Zekromaster
 *
 * This plugin defines the following global classes:
 * ZEK_Dependency: This class describes a dependency. It has a name, a version and a relationship. See the code for more details.
 * ZEK_Plugin: This class describes a plugin, as a name, version, and list of Dependendencies.
 * It also provides the following functions:
 * ZEK.getSwitch(pSwitch, defaultValue): Returns the value of the switch, or defaultValue (true if defaultValue is missing) if pSwitch is <= 0.
 *
 */

var ZEK = ZEK || {}; // This object will contain everything global, except for the Dependency Manager and the Plugin Manager

class ZEK_Dependency {
  constructor(name, version, relationship) {
    this.name = name;
    this.version = version;
    (relationship == undefined) ? this.relationship = "=": this.relationship = relationship;
  }

  checkVer(plugin) {
    if ([">", ">=", "<", "<=", "=="].includes(this.relationship)){
      return new Function("return " + plugin.version + this.relationship + this.version);
    }else{
      return plugin.version == this.version;
    }
  }

  isSatisfied() {
    var plugin = ZEK.definedPlugins.find(x => x.name == this.name);
    if (plugin == undefined) return false;
    return this.checkVer(plugin);
  }

  toString(){
    return this.name + " " + this.relationship + " " + this.version;
  }
}

class ZEK_Plugin {
  constructor(name, version, depList) {
    this.name = name;
    this.version = version;
    this.depList = depList || []; // A deplist is a list of Dependencies.
    this.checkDeps();
  }

  checkDeps() {
    for (var d of this.depList) {
      if (!d.isSatisfied()){
        alert(this.name + " " + this.version + " requires something providing " + d.toString() + "!");
      }
    }
  }
}

// The core itself
(
  function(_) {
    _.definedPlugins = _.definedPlugins || [];
    _.definedPlugins.push(new ZEK_Plugin("ZEK_Core", 0.1)) // An array of plugins, specifically of those registered through ZEK_Core

    // Utility function: Given a switch, or 0, it returns the value. It always returns defaultValue for 0, or true if defaultValue is missing.
    _.getSwitch = function(pSwitch, defaultValue) {
      if (pSwitch <= 0) return (defaultValue == undefined)? true : defaultValue;
      return $gameSwitches.value(defSwitch);
    }
  }
)(ZEK);
