import * as IDEObjects from "../IDEObjects";

var db;
export var dbDoc;
export var jorf = new IDEObjects.JProgram(IDEObjects.jorf);
let revs = [];
let revIndex = -1;

$: bob = 3;
$: undoable = revIndex > 0;
$: redoable = revs.length-1 < revIndex;

export async function init(pouch) {
  // await pouch.destroy();
  db = pouch;
  // let prog = IDEObjects.jorf;
  let prog = jorf.Program;
  console.log(db);
  try {
    var response = await db.put({
      _id: "program",
      program: prog,
    });
    console.log(response);
  } catch (err) {
    console.log(err);
  }
  console.log("setup");
}

export async function boot(pouch) {
  // init(pouch);

  db = pouch;
  dbDoc = await db.get("program");
  console.log(dbDoc);
  revs.push(dbDoc._rev);
  revIndex = revs.length - 1;
}

export async function update() {
  // this is dumb - we will not update the whole database every time something changes, once we add _id everywhere.
  // do we need to nest everything, as opposed to stores for rules, actions, etc?
  // or a middle ground would be to just make a doc at the right level of granularity. Each rule gets an _id?
  dbDoc.program.Program.updated = new Date();
  var results = await db.put({
    _id: "program",
    _rev: revs[revs.length - 1],
    program: dbDoc.program,
  });
  revs.push(results.rev);
  revIndex = revs.length - 1;
  console.log("updated:", results);
  console.log(dbDoc.program.Program.updated);
  console.log(revs.length, revIndex);
  console.log('adding rev',revIndex,'of',revs.length-1, dbDoc.program.Program.updated);
}


export async function undo() {
  if (undoable) {
    let newRevIndex = revIndex - 1;
    dbDoc = await db.get("program", { rev: revs[newRevIndex] });
    revIndex = newRevIndex;
    console.log('rev',revIndex,'of',revs.length-1, dbDoc.program.Program.updated);
  }
}
export async function redo() {
  if (redoable) {
    let newRevIndex = revIndex + 1;
    dbDoc = await db.get("program", { rev: revs[newRevIndex] });
    revIndex = newRevIndex;
    console.log('rev',revIndex,'of',revs.length-1, dbDoc.program.Program.updated);
  }
}

export async function saveState(key, value, newKey) {
  if (value)
    dbDoc.state_vars[key] = value;
  if (newKey && newKey !== key) {
    Object.defineProperty(
      dbDoc.state_vars,
      newKey,
      Object.getOwnPropertyDescriptor(dbDoc.state_vars, key));
    delete dbDoc[key];
  }
  await update();
}
