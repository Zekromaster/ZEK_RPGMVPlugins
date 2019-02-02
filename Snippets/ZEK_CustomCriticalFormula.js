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
 * FileName is ZEK_CustomCriticalFormula.js
 * Version is 0.1
 * @plugindesc Allows definition of a custom critical formula.
 * @author Zekromaster
 *
 * @param Critical Formula
 * @desc Formula for critical hits. Use "damage" for damage.
 * @type note
 * @default return damage * 2
 *
 * @help
 * Depends on:
 * ZEK_Core >= 0.2
 * =========================================
 * USAGE FOR JS DEVELOPERS
 * Adds the following accessible value:
 * ZEK.criticalFormula.criticalFormula:
 * The current critical formula as a string. Basically the value of the "Critical Formula" parameter.
 * =========================================
 * USAGE FOR REGULAR USERS
 * The "Critical Formula" parameter contains any acceptable JS
 * function. THIS MEANS YOU MUST RETURN A VALUE.
 */

// Verifying ZEK_Core exists
(function() {
  if (window.ZEK === undefined) alert("You're missing ZEK_Core!")
})();

(
  function(_) {
    // Registering the Plugin
    var P = ZEK_Plugin.register("ZEK_CustomCriticalFormula", 0.1);

    // Defining the local namespace
    _.criticalFormula = {};
    var $ = _.criticalFormula;

    // Reading the parameters
    var params = PluginManager.parameters(P.name);
    $.criticalFormula = JSON.parse(params["Critical Formula"]);

    // Changing Critical Formula
    Game_Action.prototype.applyCritical = function(damage) {
      return new Function("damage", $.criticalFormula)(damage);
    }
  }
)(ZEK)
