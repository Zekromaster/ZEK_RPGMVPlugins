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
