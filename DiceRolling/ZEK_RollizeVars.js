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
 * NOTICE THAT SETTING THE VALUE OF AN EVAL VAR IS USELESS.
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
