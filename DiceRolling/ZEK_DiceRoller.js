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
 * FileName is ZEK_DiceRoller.js
 * Version is 0.3
 * @plugindesc Does some simple dice rolling.
 * @author Zekromaster
 *
 * @help
 * Depends on:
 * ZEK_Core >= 0.3
 * =======================================
 * USAGE FOR JS DEVELOPERS
 * ZEK.roller.rollize(string):
 * Takes string and returns the same string, with any dice roll in the
 * form #_{XdY} (or any other evaluable expression) converted to
 * the same string with all the expressions evaluated and die rolled.
 *
 * ZEK.roller.eval(string):
 * Given a string in the same format as rollize(string)
 * (see above) input, return the result of evaluating it as
 * if it was one long JS expression
 * =======================================
 */

// Verifying ZEK_Core exists
(function() {
  if (window.ZEK === undefined) alert("You're missing ZEK_Core!")
})();

(
  function(_) {
    // Registering the plugin
    var P = ZEK_Plugin.register("ZEK_DiceRoller", 0.3, [], 0.3);

    // Defining the local namespace
    _.roller = {};
    var $ = _.roller;

    // Start of the Dice Roller
    var diceRollRegexp = /([\d]*)d([\d])+/;

    var rollDice = function(nDice, sDice) {
      var sum = 0;
      for (var i = 0; i < nDice; i++) {
        sum += Math.ceil(Math.random() * sDice);
      }
      return sum;
    }

    // Convert a string in the form (n)d(S) by rolling n d sized die. Invalid expressions become zero.
    var singleRoll = function(string) {
      if (diceRollRegexp.test(string)) {
        var matches = string.match(diceRollRegexp);
        var nDice = matches[1];
        var sDice = matches[2];
        return rollDice(nDice, sDice);
      }
      return 0;
    }

    // This evaluates an expression in the form #_{EXPRESSION}, converting all strings of the form XdY to the rolled number
    var evaluabilize = function(string) {
      var escape = /#_{(.*?)}/g
      return string.replace(escape, (_s, substring) => {
        return substring.replace(diceRollRegexp, (diceroll) => {
          return singleRoll(diceroll)
        })
      })
    }

    // Takes an expression containing the evaluabilize escape code and replaces all the appeareances with evaluations
    $.rollize = function(string) {
      var escape = /#_{(.*?)}/g
      var s = string.replace(
        escape,
        (s_) => eval(evaluabilize(s_))
      )
      return s;
    }

    // Actually evaluates the whole expression. Use when you only want to eval something containing dice rolls, and get the result.
    $.eval = function(string) {
      return new Function("return " + $.rollize(string))()
    }

  }
)(ZEK)
