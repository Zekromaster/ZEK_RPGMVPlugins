// Copyright (c) 2019 Zekromaster <personal@zekromaster.net>
//
// Zero-Clause BSD License
//
// Permission to use, copy, modify, and/or distribute this software for any
// purpose with or without fee is hereby granted.
//
// THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
// WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
// ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
// WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
// ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
// OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

/*:
 * FileName is ZEK_Core.js
 * Version is 0.4
 * @plugindesc Does nothing aside from defining some globals for plugin management and some common code.
 * @author Zekromaster
 *
 * @param Max Save Size
 * @desc Maximum size of a savefile. 0 for no limit.
 * @type number
 * @min 0
 * @default 0
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
    ZEK_Plugin.register("ZEK_Core", 0.4) // An array of plugins, specifically of those registered through ZEK_Core

    // Params
    var params = PluginManager.parameters("ZEK_Core");
    _.maxSaveSize = params["Max Save Size"];

    // Utility function: Given a switch, or 0, it returns the value. It always returns defaultValue for 0, or true if defaultValue is missing.
    _.getSwitch = function(pSwitch, defaultValue) {
      if (pSwitch <= 0) return (defaultValue == undefined) ? true : defaultValue;
      return $gameSwitches.value(pSwitch);
    }

    // Initialize an array
    _.initArray = function(size){
      var arr = [];
      for (let i = 0; i < size; i++){
        arr.push(null);
      }
      return arr;
    }

    // We fix saving - by removing that ugly hardcoded value
    DataManager.saveGameWithoutRescue = function(savefileId) {
        var json = JsonEx.stringify(this.makeSaveContents());
        if (_.maxSaveSize > 0 && json.length >= _.maxSaveSize) {
            console.warn('Save data too big!');
        }
        StorageManager.save(savefileId, json);
        this._lastAccessedId = savefileId;
        var globalInfo = this.loadGlobalInfo() || [];
        globalInfo[savefileId] = this.makeSavefileInfo();
        this.saveGlobalInfo(globalInfo);
        return true;
    };

  }
)(ZEK);
