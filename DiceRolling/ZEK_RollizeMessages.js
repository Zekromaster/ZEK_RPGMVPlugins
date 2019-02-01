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
 * FileName is ZEK_RollizeMessages.js
 * Version is 0.1
 * @plugindesc Makes it so messages get all expressions in the form #_{evaluable expression containing XdY} evaluated. Requires DiceRoller.js
 * @author Zekromaster
 *
 * @param Switch
 * @desc You may associate this plugin with a switch. In that case, expressions will only be evaluated if the switch is ON.
 * @type switch
 */

// Verifying ZEK_Core exists
(function() {if (window.ZEK === undefined) alert("You're missing ZEK_Core!")})();

(
  function(_){
    // Registering the plugin
    var P = new ZEK_Plugin(
      "ZEK_RollizeMessages",
      0.1,
      [
        new ZEK_Dependency("ZEK_DiceRoller", 0.1, ">=")
      ]
    )
    _.definedPlugins.push(P);


    // Defining the local namespace
    _.roller = _.roller || {};
    var $ = _.roller;

    // Reading the parameters
    var params = PluginManager.parameters(P.name);
    var defSwitch = params["Switch"];

    var sendMsg = Game_Message.prototype.add;
    Game_Message.prototype.add = function(text){
      sendMsg.call(this, ZEK.getSwitch(defSwitch)? [$.rollize(text)] : [text]);
    }

  }
)(ZEK);
