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

/*~struct~varAssociation:
 * @param Variable
 * @type variable
 *
 * @param Eval Expression
 * @type note
 */

/*:
 * FileName is ZEK_EvalVars.js
 * Version is 0.3
 * @plugindesc Allows to assign JS expressions to some variables, thus getting the result of a JS function whenever the variable is called.
 * @author Zekromaster
 *
 * @help
 * Depends on:
 * ZEK_Core >= 0.2
 *
 * @param Variables
 * @type struct<varAssociation>[]
 * @desc A list of the variables with the associated eval expressions
 *
 * @help
 * =======================================
 * USAGE FOR JS DEVELOPERS
 * Nothing, really. The whole point is to avoid making plugins.
 * If you really need it, a list of the EvalVars is available as
 * ZEK.evalVars.evalVars
 * =======================================
 * USAGE FOR REGULAR USERS
 * The only parameter is "Variable". It associates a variable with an evaluable
 * function, alias any JS code you can write which returns a value.
 */


// Verifying ZEK_Core exists
(function() {
  if (window.ZEK === undefined) alert("You're missing ZEK_Core!")
})();

// Creating the EvalVar class
class EvalVar {
  // (number, string) => void
  constructor(variableNumber, evalExpression) {
    this.variableNumber = variableNumber;
    this.evalExpression = evalExpression;
  }

  // void => string
  getEvalExp() {
      return this.evalExpression;
  }

  // void => any
  getValue() {
    return new Function(this.getEvalExp())();
  }

  static isEvalVar(varId) {
    return ZEK.evalVars.evalVars.some(x => x.variableNumber == varId);
  }

  static getEvalVar(varId) {
    return ZEK.evalVars.evalVars.find(x => x.variableNumber == varId);
  }
}

(
  function(_) {
    // Registering the Plugin
    var P = ZEK_Plugin.register("ZEK_EvalVars", 0.3);

    // Defining the local namespace
    _.evalVars = _.evalVars || {};
    var $ = _.evalVars;

    // Reading the parameters
    var params = PluginManager.parameters(P.name);
    var evalVarsRaw = params["Variables"];

    // Constructing the list of eval vars
    $.evalVars = $.evalVars || [];
    for (var e of JSON.parse(evalVarsRaw)) {
      e = JSON.parse(e);
      if (EvalVar.isEvalVar(e)) continue;
      if (e['Variable'] < 1) continue;
      $.evalVars.push(new EvalVar(e['Variable'], JSON.parse(e['Eval Expression'])))
    }

    // At this point, getting a variable's value is changed. Setting it is also changed because of safety reasons.
    var gvValue = Game_Variables.prototype.value;
    Game_Variables.prototype.value = function(variableId) {
      if (EvalVar.isEvalVar(variableId)) {
        return EvalVar.getEvalVar(variableId).getValue();
      } else {
        return gvValue.call(this, variableId);
      }
    };
  }
)(ZEK)
