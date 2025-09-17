document.getElementById('report').innerHTML = `
<div class="mb-3">
  <label class="form-label">Enter Registration Number</label>
  <input type="text" id="report-reg-no" class="form-control rounded-pill">
</div>
<button class="btn btn-secondary rounded-pill mb-4" id="view-report">View Report</button>
<div id="report-details" style="display:none;">
  <h4>Student Details</h4>
  <div class="card p-3 mb-3">
    <p><strong>Name:</strong> <span id="report-name"></span></p>
    <p><strong>Reg No:</strong> <span id="report-reg"></span></p>
    <p><strong>Branch:</strong> <span id="report-branch"></span></p>
  </div>

  <h4>Semester-wise Marks</h4>
  <table class="table table-bordered text-center">
    <thead class="table-primary">
      <tr><th>Semester</th><th>Subject</th><th>Marks</th><th>Result</th></tr>
    </thead>
    <tbody id="marks-table-body"></tbody>
  </table>

  <h4>Backlogs</h4>
  <table class="table table-bordered text-center">
    <thead class="table-danger"><tr><th>Subject</th><th>Semester</th></tr></thead>
    <tbody id="backlog-table-body"></tbody>
  </table>
</div>
`;

document.getElementById('view-report').addEventListener('click', () => {
  const regNo = document.getElementById('report-reg-no').value.toUpperCase();
  const student = students[regNo];
  if (!student) { alert("Student not found!"); return; }

  document.getElementById('report-name').textContent = student.name;
  document.getElementById('report-reg').textContent = regNo;
  document.getElementById('report-branch').textContent = student.branch;

  let marksHtml = '', backlogsHtml = '';
  let backlogs = [];

  for (let sem=1; sem<=8; sem++) {
    if (student.marks[sem]) {
      for (const [sub, mark] of Object.entries(student.marks[sem])) {
        const status = mark < PASS_MARK ? "FAIL" : "PASS";
        const cls = mark < PASS_MARK ? "backlog" : "cleared";
        marksHtml += `<tr><td>${sem}</td><td>${sub}</td><td>${mark}</td><td class="${cls}">${status}</td></tr>`;
        if (mark < PASS_MARK) backlogs.push({sub, sem});
      }
    }
  }

  document.getElementById('marks-table-body').innerHTML = marksHtml || "<tr><td colspan=4>No data</td></tr>";
  document.getElementById('backlog-table-body').innerHTML = backlogs.length ?
    backlogs.map(b => `<tr><td>${b.sub}</td><td>${b.sem}</td></tr>`).join('') :
    "<tr><td colspan=2>No backlogs!</td></tr>";

  document.getElementById('report-details').style.display="block";
});
