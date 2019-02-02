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
