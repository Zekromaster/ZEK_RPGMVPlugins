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
 * FileName is ZEK_RollizeVars.js
 * Version is 0.1
 * @plugindesc Makes it so EvalVars get all expressions in the form #_{XdY} evaluated.
 * @author Zekromaster
 *
 * @help
 * Depends on:
 * ZEK_Core >= 0.2
 * ZEK_DiceRoller >= 0.1
 * ZEK_EvalVars >= 0.3
 * =======================================
 * USAGE FOR JS DEVELOPERS
 * Literally none
 * =======================================
 * USAGE FOR REGULAR USERS
 * You can now use #_{diceroll}s in your evalvars.
 * Notice these will be rerolled each time, so you may associate a variable
 * with 1d6 to consistently be able to roll 1d6 anywhere a dice roll is needed.
 * NOTE THAT SETTING THE VALUE OF AN EVAL VAR IS USELESS.
 */

// Verifying ZEK_Core exists
(function() {
  if (window.ZEK === undefined) alert("You're missing ZEK_Core!")
})();

(
  function(_) {
    // Registering the plugin
    var P = ZEK_Plugin.register(
      "ZEK_RollizeVars",
      0.1,
      [
        new ZEK_Dependency("ZEK_DiceRoller", 0.1, ">="),
        new ZEK_Dependency("ZEK_EvalVars", 0.3, ">=")
      ],
      0.3
    )

    // Defining the local namespace
    _.roller = _.roller || {};
    var $ = _.roller;

    EvalVar.prototype.getEvalExp = function() {
      return $.rollize(this.evalExpression);
    }

  }
)(ZEK);
