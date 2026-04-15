/**
 * SIT725 – 5.4D Validation Tests
 */

const BASE_URL = process.env.BASE_URL || "http://localhost:3000";
const API_BASE = "/api/books";

const results = [];

const coverageTracker = {
  CREATE_FAIL: 0,
  UPDATE_FAIL: 0,
  TYPE: 0,
  REQUIRED: 0,
  BOUNDARY: 0,
  LENGTH: 0,
  TEMPORAL: 0,
  UNKNOWN_CREATE: 0,
  UNKNOWN_UPDATE: 0,
  IMMUTABLE: 0,
};

function logHeader(uniqueId) {
  console.log("SIT725_VALIDATION_TESTS");
  console.log(`BASE_URL=${BASE_URL}`);
  console.log(`API_BASE=${API_BASE}`);
  console.log(`INFO|Generated uniqueId=${uniqueId}`);
}

function logResult(r) {
  console.log(
    `TEST|${r.id}|${r.name}|${r.method}|${r.path}|expected=${r.expected}|actual=${r.actual}|pass=${r.pass ? "Y" : "N"}`
  );
}

function logSummary() {
  const failed = results.filter(r => !r.pass).length;
  console.log(
    `SUMMARY|pass=${failed === 0 ? "Y" : "N"}|failed=${failed}|total=${results.length}`
  );
  return failed === 0;
}

function logCoverage() {
  console.log(
    `COVERAGE|CREATE_FAIL=${coverageTracker.CREATE_FAIL}` +
    `|UPDATE_FAIL=${coverageTracker.UPDATE_FAIL}` +
    `|TYPE=${coverageTracker.TYPE}` +
    `|REQUIRED=${coverageTracker.REQUIRED}` +
    `|BOUNDARY=${coverageTracker.BOUNDARY}` +
    `|LENGTH=${coverageTracker.LENGTH}` +
    `|TEMPORAL=${coverageTracker.TEMPORAL}` +
    `|UNKNOWN_CREATE=${coverageTracker.UNKNOWN_CREATE}` +
    `|UNKNOWN_UPDATE=${coverageTracker.UNKNOWN_UPDATE}` +
    `|IMMUTABLE=${coverageTracker.IMMUTABLE}`
  );
}

async function http(method, path, body) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: { "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  return { status: res.status, text };
}

async function test({ id, name, method, path, expected, body, tags }) {
  const { status } = await http(method, path, body);
  const pass = status === expected;

  const result = { id, name, method, path, expected, actual: status, pass };
  results.push(result);
  logResult(result);

  const safeTags = Array.isArray(tags) ? tags : [];
  safeTags.forEach(tag => {
    if (coverageTracker.hasOwnProperty(tag)) {
      coverageTracker[tag]++;
    }
  });
}

// =============================
// VALID DATA (MATCH YOUR SCHEMA)
// =============================

function makeValidBook(id) {
  return {
    id,
    title: "Valid Title",
    author: "Valid Author",
    year: 2020,
    genre: "Other",
    summary: "This is a valid summary text.",
    price: "10.50"
  };
}

function makeValidUpdate() {
  return {
    title: "Updated Title",
    author: "Updated Author",
    year: 2021,
    genre: "Other",
    summary: "Updated summary text.",
    price: "12.00"
  };
}

// =============================
// TESTS
// =============================

async function run() {

  const uniqueId = `b${Date.now()}`;
  logHeader(uniqueId);

  const createPath = API_BASE;
  const updatePath = (id) => `${API_BASE}/${id}`;

  // ---- BASE TESTS ----
  await test({ id: "T01", name: "Valid create", method: "POST", path: createPath, expected: 201, body: makeValidBook(uniqueId) });
  await test({ id: "T02", name: "Duplicate ID", method: "POST", path: createPath, expected: 409, body: makeValidBook(uniqueId), tags: ["CREATE_FAIL"] });
  await test({ id: "T03", name: "Immutable ID", method: "PUT", path: updatePath(uniqueId), expected: 400, body: { ...makeValidUpdate(), id: "b999" }, tags: ["UPDATE_FAIL","IMMUTABLE"] });
  await test({ id: "T04", name: "Unknown CREATE", method: "POST", path: createPath, expected: 400, body: { ...makeValidBook(`b${Date.now()+1}`), hack: true }, tags: ["CREATE_FAIL","UNKNOWN_CREATE"] });
  await test({ id: "T05", name: "Unknown UPDATE", method: "PUT", path: updatePath(uniqueId), expected: 400, body: { ...makeValidUpdate(), hack: true }, tags: ["UPDATE_FAIL","UNKNOWN_UPDATE"] });

  // ---- REQUIRED ----
  await test({ id: "T06", name: "Missing title", method: "POST", path: createPath, expected: 400, body: { ...makeValidBook("b100"), title: undefined }, tags: ["CREATE_FAIL","REQUIRED"] });
  await test({ id: "T07", name: "Missing author", method: "POST", path: createPath, expected: 400, body: { ...makeValidBook("b101"), author: undefined }, tags: ["CREATE_FAIL","REQUIRED"] });

  // ---- TYPE ----
  await test({ id: "T08", name: "Year wrong type", method: "POST", path: createPath, expected: 400, body: { ...makeValidBook("b102"), year: "abc" }, tags: ["CREATE_FAIL","TYPE"] });
  await test({ id: "T09", name: "Price wrong type", method: "POST", path: createPath, expected: 400, body: { ...makeValidBook("b103"), price: "abc" }, tags: ["CREATE_FAIL","TYPE"] });

  // ---- BOUNDARY ----
  await test({ id: "T10", name: "Year too small", method: "POST", path: createPath, expected: 400, body: { ...makeValidBook("b104"), year: 1000 }, tags: ["CREATE_FAIL","BOUNDARY"] });
  await test({ id: "T11", name: "Year too large", method: "POST", path: createPath, expected: 400, body: { ...makeValidBook("b105"), year: 3000 }, tags: ["CREATE_FAIL","BOUNDARY","TEMPORAL"] });

  // ---- LENGTH ----
  await test({ id: "T12", name: "Title too short", method: "POST", path: createPath, expected: 400, body: { ...makeValidBook("b106"), title: "A" }, tags: ["CREATE_FAIL","LENGTH"] });
  await test({ id: "T13", name: "Summary too short", method: "POST", path: createPath, expected: 400, body: { ...makeValidBook("b107"), summary: "short" }, tags: ["CREATE_FAIL","LENGTH"] });

  // ---- UPDATE FAIL ----
  await test({ id: "T14", name: "Update invalid year", method: "PUT", path: updatePath(uniqueId), expected: 400, body: { ...makeValidUpdate(), year: 3000 }, tags: ["UPDATE_FAIL","BOUNDARY"] });

  // ---- NOT FOUND ----
  await test({ id: "T15", name: "Update non-existent", method: "PUT", path: updatePath("b999999"), expected: 404, body: makeValidUpdate(), tags: ["UPDATE_FAIL"] });

  // ---- VALID UPDATE ----
  await test({ id: "T16", name: "Valid update", method: "PUT", path: updatePath(uniqueId), expected: 200, body: makeValidUpdate() });

  // ---- MORE UNKNOWN ----
  await test({ id: "T17", name: "Extra field update", method: "PUT", path: updatePath(uniqueId), expected: 400, body: { ...makeValidUpdate(), extra: "bad" }, tags: ["UPDATE_FAIL","UNKNOWN_UPDATE"] });

  const pass = logSummary();
  logCoverage();

  process.exit(pass ? 0 : 1);
}

run().catch(err => {
  console.error("ERROR", err);
  process.exit(2);
});