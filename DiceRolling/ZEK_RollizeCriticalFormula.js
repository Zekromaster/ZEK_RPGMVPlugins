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
