# ZEK_RPGMVPlugins

My RPGMaker MV plugins.

**Suggested load order and dependencies (Non ZEK\_ plugins in italics)**

| Plugin                     | Dependencies                                        |
| -------------------------- | --------------------------------------------------- |
| ZEK_Core                   | NONE                                                |
| ZEK_FontOutlineWidth       | ZEK_Core                                            |
| ZEK_DiceRoller             | ZEK_Core                                            |
| ZEK_RollizeMessages        | ZEK_Core, ZEK_DiceRoller                            |
| ZEK_EvalVars               | ZEK_Core                                            |
| ZEK_RollizeVars            | ZEK_Core, ZEK_EvalVars, ZEK_DiceRoller              |
| ZEK_CustomCriticalFormula  | ZEK_Core                                            |
| ZEK_RollizeCriticalFormula | ZEK_Core, ZEK_CustomCriticalFormula, ZEK_DiceRoller |
