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
 * FileName is ZEK_RandomSnippets.js
 * Version is 0.2
 * @plugindesc Random Snippets of useful JS.
 * @author Zekromaster
 *
 *
 * @help
 * =========================================
 * USAGE FOR JS DEVELOPERS
 * Adds the following accessible value:
 * ZEK.snippets.criticalFormula:
 * The current critical formula as a string. Basically the value of the "Critical Formula" parameter.
 * =========================================
 * USAGE FOR REGULAR USERS
 * The "Critical Formula" parameter contains any acceptable JS
 * evaluable formula. If you installed ZEK_DiceRoller, it
 * can also contain #_{diceRoll}s.
 * The "Font Outline Width" parameter is self-explanatory.
 */

/*
 * @param Critical Formula
 * @desc Formula for critical hits. Use "damage" for damage.
 * @type text
 * @default damage * 2
 *
 * @param Font Outline Width
 * @desc The width of the font outline.
 * @type number
 * @default 4
 */

// Verifying ZEK_Core exists
(function() {
  if (window.ZEK === undefined) alert("You're missing ZEK_Core!")
})();

(
  function(_) {
    // Registering the Plugin
    var P = ZEK_Plugin.register("ZEK_RandomSnippets", 0.2);

    // Defining the local namespace
    _.snippets = {};
    var $ = _.snippets;

    // Reading the parameters
    var params = PluginManager.parameters(P.name);
    $.criticalFormula = params["Critical Formula"];
    var fontOutline = params['Font Outline Width'];


    // Changing Critical Formula


    if (ZEK_Plugin.isRegistered("ZEK_DiceRoller")) {
      Game_Action.prototype.applyCritical = function(damage) {
        return _.roller.eval($.criticalFormula);
      }
    } else {
      Game_Action.prototype.applyCritical = function(damage) {
        return eval($.criticalFormula);
      }
    }

    // Removing the Font Outline, conditionally
    var resetFontSettings = Window_Base.prototype.resetFontSettings;
    Window_Base.prototype.resetFontSettings = function() {
      resetFontSettings.call(this);
      this.contents.outlineWidth = fontOutline;
    };

  }
)(ZEK)
