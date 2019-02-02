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
 * FileName is ZEK_RollizeCriticalFormula.js
 * Version is 0.1
 * @plugindesc Allows usage of #_{diceroll}s in critical formulas.
 * @author Zekromaster
 *
 *
 * @help
 * Depends on:
 * ZEK_Core >= 0.3
 * ZEK_DiceRoller >= 0.3
 * ZEK_CustomCriticalFormula >= 0.1
 * =========================================
 * USAGE FOR JS DEVELOPERS
 * None.
 * =========================================
 * USAGE FOR REGULAR USERS
 * Just use #_{diceroll}s in the critical formula in ZEK_CustomCriticalFormula
 */

// Verifying ZEK_Core exists
(function() {
  if (window.ZEK === undefined) alert("You're missing ZEK_Core!")
})();

(
  function(_) {
    // Registering the Plugin
    var P = ZEK_Plugin.register(
      "ZEK_RollizeCriticalFormula",
      0.1,
      [
        new ZEK_Dependency("ZEK_DiceRoller", 0.3, ">="),
        new ZEK_Dependency("ZEK_CustomCriticalFormula", 0.1, ">=")
      ],
      0.3
    );

    // Local namespace
    var $c = _.criticalFormula;
    var $r = _.roller;

    // Changing Critical Formula
    Game_Action.prototype.applyCritical = function(damage) {
      return new Function("damage", $r.rollize($c.criticalFormula))(damage);
    }
  }
)(ZEK)
