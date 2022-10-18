/**
 * hierarchy:
 * 
 * JProgram
 * - JRule[]
 *   - JCondition
 *     - JExpression
 *       - JLiteral
 *       - JOperator
 *       - JExpression
 *   - JAction
 *     - JCommand[]
 * - JStateVar[]
 */

export const jorf = {
  "Program": {
    "column": null,
    "lineno": 1,
    "name": "bob app",
    "updated": "yesterday",
    "rules": [  
      {
        "Rule": {
          "action": {
            "Action": {
              "column": 1,
              "commands": [
                {
                  "Command": {
                    "column": 5,
                    "command": "email",
                    "lineno": 7,
                    "params": []
                  }
                },
                {
                  "Command": {
                    "column": 5,
                    "command": "led",
                    "lineno": 7,
                    "params": []
                  }
                }              ],
              "lineno": 6
            }
          },
          "column": 1,
          "condition": {
            "Condition": {
              "column": 1,
              "expr": {
                "Expr": {
                  "column": 3,
                  "left": {
                    "Literal": {
                      "column": 5,
                      "lineno": 5,
                      "value": "meow"
                    }
                  },
                  "lineno": 32,
                  "op": {
                    "Operator": {
                      "column": 10,
                      "lineno": 5,
                      "op": "=="
                    }
                  },
                  "right": {
                    "Literal": {
                      "column": 5,
                      "lineno": 5,
                      "value": "1+2+3"
                    }
                  }
                }
              },
              "lineno": 4
            }
          },
          "lineno": 4,
          "name": 'dole rule'
        }
      }
    ],
    "state_vars": [
      {
        "StateVar": {
          "column": 5,
          "lineno": 2,
          "var_name": "meow"
        }
      }
    ]
  }
};

export const program = {
    "name": "bob app",
    "updated": "yesterday",
    "rules": [  
      {
        "name": 'dole rule',
        "action": {
          "commands": [
            {
                "command": "led",
                "params": []
            },
            {
                "command": "email",
                "params": []
            }
          ],
        },
        "condition": {
          "expressions": [
            {
              "left": {
                  "value": "meow"
              },
              "op": {
                  "op": "=="
              },
              "right": {
                  "value": "1+2+3"
              }
            }
          ]
        }
      }
    ],
    "state_vars": [
      {
          "var_name": "meow"
      }
    ]
};

export const program_structure = {
  "name": "",
  "updated": "",
  "rules": [
    {
      "name": "",
      "action": {
        "commands": [],
      },
      "condition": {
        "expressions": [ ]
      }
    }
  ],
  "state_vars": [
  ]
};
class JPart {
  id: number | undefined;
  name?: string | undefined;
  lineno: number | undefined;
  column: number | undefined;
  description: string | undefined; //documentation

  constructor() {
    //console.log(this.constructor.name);
  }

  summaryTemplate() { //for natural-language summary
    return 'to implement';
  }
  toJSON() {
    return 'to implement';
  }
}

export class JProgram extends JPart {
  rules: JRule[] | undefined;
  state_vars: JStateVar[] | undefined;

  constructor(jorfSON: any, rules?: JRule[], state_vars?: JStateVar[]) {
    super();
    if (!this.rules) this.rules = [];
    if (jorfSON) {
      try {
        this.name = jorfSON["Program"].name;
        for (const rule in jorfSON["Program"].rules) {
          const r = new JRule(jorfSON["Program"].rules[rule]);
          this.rules.push(r);
        }
      } catch (e) {
        console.log("Not valid jorfSON.");
      }
    } else {
      this.rules = rules;
      this.state_vars = state_vars;
    }
  }
}


export class JRule extends JPart {
  action: JAction | undefined;
  condition: JCondition | undefined;

  constructor(jorfSON: any, action?: JAction, condition?: JCondition) {
    super();
    if (jorfSON) {
      try {
        this.name = jorfSON["Rule"]?.name;
        this.condition = new JCondition(jorfSON["Rule"]?.condition);
        this.action = new JAction(jorfSON["Rule"]?.action);
      } catch (e) {
        console.log("Not valid jorfSON.");
      }
    } else {
      this.action = action;
      this.condition = condition;
    }
  }
}

export class JAction extends JPart {
  commands: JCommand[] = [];

  // constructor(commands: JCommand[]) {
  //   super();
  //   this.commands = commands;
  // }

  constructor(jorfSON: any) {
    super();
    try {
      this.name = jorfSON["Action"]?.name;
      for (const command in jorfSON["Action"]?.commands) {
        this.commands.push(new JCommand(jorfSON["Action"]?.commands[command]));
      }
    } catch (e) {
      console.log("Not valid jorfSON.");
    }
  }
}

export class JCommand extends JPart {
  command: string | undefined;
  params: string[] | undefined;

  constructor(jorfSON: any, command?: string, params?: string[]) {
    super();
    if (jorfSON) {
      try {
        this.name = jorfSON["Command"].name;
        this.command = jorfSON["Command"].command;
        this.params = jorfSON["Command"].params;
      } catch (e) {
        console.log("Not valid jorfSON.");
      }
    } else {
      this.command = command;
      this.params = params;
    }
  }
}


export class JCondition extends JPart {
  expressions: JExpression[] | undefined;
  allMustBeTrue = true;

  constructor(jorfSON: any, expressions?: JExpression[]) {
    super();
    if (jorfSON) {
      try {
        const c = jorfSON["Condition"];
        this.name = c.name;
        for (const expression in c.expr) {
          this.expressions?.push(new JExpression(c.expr[expression]));
        }
      } catch (e) {
        console.log("Not valid jorfSON.");
      }
    } else {
      this.expressions = expressions;
    }
  }
}

export class JExpression extends JPart {
  left: JLiteral | JExpression | undefined;
  operator: JOperator | undefined;
  right: JLiteral | JExpression | undefined;

  constructor(jorfSON: any, left?: JLiteral, operator?: JOperator, right?: JLiteral) {
    super();
    if (jorfSON) {
      try {
        console.log(jorfSON);
        this.name = jorfSON.name;
        this.left = jorfSON.left;
        this.operator = new JOperator(jorfSON.op);
        this.right = jorfSON.right;
      } catch (e) {
        console.log("Not valid jorfSON.");
      }
    } else {
      this.left = left;
      this.operator = operator;
      this.right = right;

    }
  }
}


export class JLiteral extends JPart {
  value: any | undefined;

  constructor(jorfSON: any, value?: any) {
    super();
    if (jorfSON)
      this.value = jorfSON["Literal"].value;
    else
      this.value = value;
  }
}

export class JOperator extends JPart {
  op: string | undefined;

  constructor(jorfSON: any, op?: string) {
    super();
    if (jorfSON)
      this.op = jorfSON["Operator"].op;
    else
      this.op = op;
  }
}


export class JStateVar extends JPart {
  var_name: string | undefined;
  value: any | undefined;

  constructor(var_name: string) {
    super();
    this.var_name = var_name;
    this.value = undefined;
  }
}


// i/o modules
export class JOutput {
  name: string;
  icon: string;

  constructor(name: string, icon: string) {
    this.name = name;
    this.icon = icon;
  }

  public static stock() {
    return [
      {"email": new JOutput("email","mailOutline") },
      {"text": new JOutput("text","phone-portrait-outline") },
      {"blink": new JOutput("blink","sunny-outline") },
      {"move": new JOutput("move","sync-outline") },
      {"http": new JOutput("http","server-outline") },
    ];
  }
}