import { writable, readable, derived } from "svelte/store";
import * as IDEObjects from "../IDEObjects";

var db; // PouchDB (or whatever) instance
var dbDoc; // the doc in the db
// var jorf = new IDEObjects.JProgram(IDEObjects.jorf);
let revs = [];
let revIndex = -1;

export const program = writable(IDEObjects.program_structure)
export const undoable = writable(false)
export const redoable = writable(false)

export async function init(pouch) {
  try {
    //todo: use post instead?
    var response = await pouch.put({
      _id: "program",
      program: IDEObjects.program_structure,
    });
    console.log("init db: ", response);
  } catch (err) {
    console.log(err);
  }

  console.log("set up new program document");
  return await db.get("program");
}

export async function boot(pouch) {

  db = pouch;
  // if ((await db.info()).update_seq == 0) //newly created
  //   init(db)

  try {
    dbDoc = await db.get("program");
  } catch (err) {
    // no program yet?
    console.log(err);
    dbDoc = await init(db);
  }
  console.log(dbDoc);

  program.set(dbDoc.program);
  revs.push(dbDoc._rev);
  revIndex = revs.length - 1;
  undoable.set(revIndex > 0);
  redoable.set(revs.length-1 > revIndex);

  program.subscribe((newProgram) => {
    update();
  });
}

export async function update() {
  // TODO: this is dumb - we will not update the whole database every time something changes, once we add _id everywhere.
  // do we need to nest everything, as opposed to stores for rules, actions, etc?
  // or a middle ground would be to just make a doc at the right level of granularity. Each rule gets an _id?
  dbDoc.program.updated = new Date();
  var results = await db.put({
    _id: "program",
    _rev: revs[revs.length - 1],
    program: dbDoc.program,
  });
  revs.push(results.rev);
  revIndex = revs.length - 1;
  console.log('adding rev',revIndex,'of',revs.length-1, dbDoc.program.updated);

  undoable.set(revIndex > 0);
  redoable.set(revs.length-1 > revIndex);
}

// export function undoable() {
//   console.log(revIndex);
//   return revIndex > 0;
// }
// export function redoable() {
//   return revs.length-1 > revIndex;
// }

export async function undo() {
  if (undoable) {
    let newRevIndex = revIndex - 1;
    dbDoc = await db.get("program", { rev: revs[newRevIndex] });
    revIndex = newRevIndex;
    console.log('rev',revIndex,'of',revs.length-1, dbDoc.program.updated);
    program.set(dbDoc.program);
    undoable.set(revIndex > 0);
    redoable.set(revs.length-1 > revIndex);
  }
}
export async function redo() {
  if (redoable) {
    let newRevIndex = revIndex + 1;
    dbDoc = await db.get("program", { rev: revs[newRevIndex] });
    revIndex = newRevIndex;
    console.log('rev',revIndex,'of',revs.length-1, dbDoc.program.updated);
    program.set(dbDoc.program);
    undoable.set(revIndex > 0);
    redoable.set(revs.length-1 > revIndex);
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
