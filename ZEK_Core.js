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
 * Version is 0.3
 * @plugindesc Does nothing aside from defining some globals for plugin management and some common code.
 * @author Zekromaster
 *
 * @help
 * =================================================
 * USAGE FOR JS DEVELOPERS
 * This plugin defines the following global classes:
 * ZEK_Dependency: This class describes a dependency. It has a name,
 * a version and a relationship. See the code for more details.
 * ZEK_Plugin: This class describes a plugin, as a name, version, and
 * list of Dependendencies.
 * It also provides the following functions:
 * ZEK.getSwitch(pSwitch, defaultValue):
 * Returns the value of the switch, or defaultValue
 * (true if defaultValue is missing) if pSwitch is <= 0.
 * =================================================
 */

var ZEK = ZEK || {}; // This object will contain everything global, except for the Dependency Manager and the Plugin Manager

class ZEK_Dependency {
  constructor(name, version, relationship) {
    this.name = name;
    this.version = version;
    this.relationship = relationship || "==";
  }

  checkVer() {
    var version = ZEK_Plugin.getVersion(this.name);
    if ([">", ">=", "<", "<=", "=="].includes(this.relationship)) {
      return new Function("return " + version + this.relationship + this.version)();
    } else {
      return version == this.version;
    }
  }

  isSatisfied() {
    return ZEK_Plugin.isRegistered(this.name) && this.checkVer();
  }

  toString() {
    return this.name + " " + this.relationship + " " + this.version;
  }
}

class ZEK_Plugin {
  constructor(name, version, depList, minZekCoreVers) {
    this.name = name;
    this.version = version;
    this.depList = depList || []; // A deplist is a list of Dependencies.
    this.minZekCoreVers = minZekCoreVers || 0.1
    if (this.name != "ZEK_Core") this.checkDeps();
  }

  checkDeps() {
    if (ZEK.definedPlugins.find(plugin => plugin.name == "ZEK_Core").version < this.minZekCoreVers) {
      alert("You need ZEK_Core version " + this.minZekCoreVers + " or greater for " + this.name);
    }
    for (var d of this.depList) {
      if (!d.isSatisfied()) {
        alert(this.name + " " + this.version + " requires something providing " + d.toString() + "!");
      }
    }
  }

  // Registers a plugin through ZEK_Core
  static register(name, version, depList, minZekCoreVers) {
    var plugin;
    if (!ZEK_Plugin.isRegistered(name)) {
      plugin = new ZEK_Plugin(
        name,
        version,
        depList || [],
        minZekCoreVers || 0.2
      )
      ZEK.definedPlugins.push(plugin)
    } else {
      plugin = ZEK.definedPlugins.find(plugin => plugin.name == name)
      alert("Two plugins are providing " + name + ".");
    }
    return plugin;
  }

  // Utility function for checking if a plugin is registered through ZEK_Core using its name
  static isRegistered(pluginName) {
    return ZEK.definedPlugins.some(plugin => plugin.name == pluginName);
  }

  // Gets version of a plugin from its name
  static getVersion(pluginName) {
    return ZEK_Plugin.isRegistered(pluginName) ? ZEK.definedPlugins.find(plugin => plugin.name == pluginName).version : 0;
  }
}

// The core itself
(
  function(_) {
    _.definedPlugins = [];
    ZEK_Plugin.register("ZEK_Core", 0.3) // An array of plugins, specifically of those registered through ZEK_Core

    // Utility function: Given a switch, or 0, it returns the value. It always returns defaultValue for 0, or true if defaultValue is missing.
    _.getSwitch = function(pSwitch, defaultValue) {
      if (pSwitch <= 0) return (defaultValue == undefined) ? true : defaultValue;
      return $gameSwitches.value(pSwitch);
    }
  }
)(ZEK);
