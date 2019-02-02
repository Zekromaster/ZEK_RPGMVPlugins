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

/*~struct~varAssociation:
 * @param Variable
 * @type variable
 *
 * @param Eval Expression
 * @type note
 */

/*:
 * FileName is ZEK_EvalVars.js
 * Version is 0.1
 * @plugindesc Allows to assign JS expressions to some variables, thus getting the result of a JS function whenever the variable is called.
 * @author Zekromaster
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
 * If ZEK_DiceRoller is installed, you may use #_{diceRolls} in your evals.
 * Notice these will be rerolled each time, so you may associate a variable
 * with 1d6 to consistently be able to roll 1d6 anywhere a dice roll is needed.
 * NOTE THAT SETTING THE VALUE OF AN EVAL VAR IS USELESS.
 */

/*
 * @param Variables
 * @type struct<varAssociation>[]
 * @desc A list of the variables with the associated eval expressions
 */


// Verifying ZEK_Core exists
(function() {
  if (window.ZEK === undefined) alert("You're missing ZEK_Core!")
})();

(
  function(_) {
    // Registering the Plugin
    var P = ZEK_Plugin.register("ZEK_EvalVars", 0.2);

    // Defining the local namespace
    _.evalVars = _.evalVars || {};
    var $ = _.evalVars;

    // Making the EvalVar class
    class EvalVar {
      // (number, string) => void
      constructor(variableNumber, evalExpression) {
        this.variableNumber = variableNumber;
        this.evalExpression = evalExpression;
      }

      // void => string
      getEvalExp() {
        if (ZEK_Plugin.isRegistered("ZEK_DiceRoller")) {
          return ZEK.roller.rollize(this.evalExpression);
        } else {
          return this.evalExpression;
        }
      }

      // void => any
      getValue() {
        return new Function(this.getEvalExp())();
      }

      static isEvalVar(varId) {
        return $.evalVars.some(x => x.variableNumber == varId);
      }

      static getEvalVar(varId) {
        return $.evalVars.find(x => x.variableNumber == varId);
      }
    }


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
