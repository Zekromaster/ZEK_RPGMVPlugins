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
 * Version is 0.1
 * @plugindesc Random Snippets of useful JS.
 * @author Zekromaster
 *
 * @param Critical Formula
 * @desc Formula for critical hits. Use "damage" for damage.
 * @type text
 * @default damage * 2
 *
 * @param Font Outline Width
 * @desc The width of the font outline.
 * @type number
 * @default 4
 *
 *
 *
 * Adds the following accessible value:
 * ZEK.snippets.criticalFormula:
 * The current critical formula as a string. Basically the value of the "Critical Formula" parameter.
 */

// Verifying ZEK_Core exists
(function() {if (window.ZEK === undefined) alert("You're missing ZEK_Core!")})();

(
  function(_) {
    // Registering the Plugin
    var P = new ZEK_Plugin("ZEK_RandomSnippets", 0.1);
    _.definedPlugins.push(P);

    // Defining the local namespace
    _.snippets = {};
    var $ = _.snippets;

    // Reading the parameters
    var params = PluginManager.parameters(P.name);
    $.criticalFormula = params["Critical Formula"];
    var fontOutline = params['Font Outline Width'];


    // Changing Critical Formula
    Game_Action.prototype.applyCritical = function(damage) {
      return eval($.criticalFormula);
    };

    // Removing the Font Outline, conditionally
    var resetFontSettings = Window_Base.prototype.resetFontSettings;
    Window_Base.prototype.resetFontSettings = function() {
      resetFontSettings.call(this);
      this.contents.outlineWidth = fontOutline;
    };

  }
)(ZEK)
