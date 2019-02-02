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
 * FileName is ZEK_FontOutlineWidth.js
 * Version is 0.1
 * @plugindesc Define your own font outline width.
 * @author Zekromaster
 *
 * @param Font Outline Width
 * @desc The width of the font outline.
 * @type number
 * @default 4
 *
 * @help
 * Depends on:
 * ZEK_Core >= 0.2
 * =========================================
 * USAGE FOR JS DEVELOPERS
 * None
 * =========================================
 * USAGE FOR REGULAR USERS
 * The "Font Outline Width" parameter is self-explanatory.
 */

// Verifying ZEK_Core exists
(function() {
  if (window.ZEK === undefined) alert("You're missing ZEK_Core!")
})();

(
  function(_) {
    // Registering the Plugin
    var P = ZEK_Plugin.register("ZEK_FontOutlineWidth", 0.1);

    // Defining the local namespace
    _.snippets = {};
    var $ = _.snippets;

    // Reading the parameters
    var params = PluginManager.parameters(P.name);
    var fontOutline = params['Font Outline Width'];


    // Changing the Font Outline, conditionally
    var resetFontSettings = Window_Base.prototype.resetFontSettings;
    Window_Base.prototype.resetFontSettings = function() {
      resetFontSettings.call(this);
      this.contents.outlineWidth = fontOutline;
    };

  }
)(ZEK)
