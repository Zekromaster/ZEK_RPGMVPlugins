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
 * FileName is ZEK_RollizeMessages.js
 * Version is 0.3
 * @plugindesc Makes it so messages get all expressions in the form #_{evaluable expression containing XdY} evaluated. Requires DiceRoller.js
 * @author Zekromaster
 *
 * @param Switch
 * @desc You may associate this plugin with a switch. In that case, expressions will only be evaluated if the switch is ON.
 * @type switch
 *
 * @help
 * Depends on:
 * ZEK_Core >= 0.3
 * ZEK_DiceRoller >= 0.1
 * =======================================
 * USAGE FOR JS DEVELOPERS
 * Literally none
 * =======================================
 * USAGE FOR REGULAR USERS
 * If the "Switch" parameter is set to a switch, expressions will only be
 * evaluated when the chosen switch is ON.
 * Otherwise, expressions will always be evaluated.
 * Expressions must be written as #_{EXPRESSION}, and be assignable to a variable
 * (this means you may not do multiline expressions, or anything that can't be
 * prefaced with "return". One-liners only). They can contain dice rolls in the
 * XdY form, and those will be automatically rolled.
 */

// Verifying ZEK_Core exists
(function() {
  if (window.ZEK === undefined) alert("You're missing ZEK_Core!")
})();

(
  function(_) {
    // Registering the plugin
    var P = ZEK_Plugin.register(
      "ZEK_RollizeMessages",
      0.3,
      [
        new ZEK_Dependency("ZEK_DiceRoller", 0.1, ">=")
      ],
      0.3
    )

    // Defining the local namespace
    _.roller = _.roller || {};
    var $ = _.roller;

    // Reading the parameters
    var params = PluginManager.parameters(P.name);
    var defSwitch = params["Switch"];

    var sendMsg = Game_Message.prototype.add;
    Game_Message.prototype.add = function(text) {
      sendMsg.call(this, ZEK.getSwitch(defSwitch) ? [$.rollize(text)] : [text]);
    }

  }
)(ZEK);
