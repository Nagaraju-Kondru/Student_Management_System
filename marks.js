const PASS_MARK = 40;
const SUBJECTS = {
  1: ['Engineering Physics','Engineering Chemistry','Maths-I','BEE','C-Programming'],
  2: ['Engineering Mechanics','Data Structures','Maths-II','English','EVS'],
  3: ['Digital Electronics','DBMS','OS','Maths-III','OOPs with Java'],
  4: ['Computer Networks','Software Engineering','Automata Theory','Discrete Maths','DAA'],
  5: ['AI & ML','Web Technology','Computer Graphics','Data Science','Cryptography'],
  6: ['Cloud Computing','IoT','Mobile Computing','Big Data','Network Security'],
  7: ['Compiler Design','Image Processing','Cyber Security','Robotics','Deep Learning'],
  8: ['Distributed Systems','Parallel Computing','Embedded Systems','Bioinformatics','Project']
};

// Marks form
document.getElementById('marks').innerHTML = `
<form id="marks-form">
  <div class="mb-3">
    <label class="form-label">Registration Number</label>
    <input type="text" id="marks-reg-no" class="form-control rounded-pill" required>
  </div>
  <div class="mb-3">
    <label class="form-label">Semester</label>
    <select id="semester" class="form-select rounded-pill" required>
      <option value="">Select Semester</option>
      ${[...Array(8)].map((_,i)=>`<option value="${i+1}">Semester ${i+1}</option>`).join('')}
    </select>
  </div>
  <div id="subjects-container" class="row g-2 mb-3" style="display:none;"></div>
  <button class="btn btn-primary w-100 rounded-pill">Submit Marks</button>
</form>
`;

document.getElementById('semester').addEventListener('change', e => {
  const sem = e.target.value;
  const container = document.getElementById('subjects-container');
  if (!sem) { container.style.display="none"; return; }
  container.style.display="flex";
  container.innerHTML = SUBJECTS[sem].map(sub => `
    <div class="col-md-6">
      <div class="form-floating">
        <input type="number" class="form-control rounded-pill" id="sub-${sub.replace(/\s+/g,'-')}" min="0" max="100" required>
        <label>${sub}</label>
      </div>
    </div>
  `).join('');
});

document.getElementById('marks-form').addEventListener('submit', e => {
  e.preventDefault();
  const regNo = document.getElementById('marks-reg-no').value.toUpperCase();
  const sem = document.getElementById('semester').value;
  if (!students[regNo]) { alert("Student not found!"); return; }

  let marks = {};
  SUBJECTS[sem].forEach(sub => {
    const id = `sub-${sub.replace(/\s+/g,'-')}`;
    marks[sub] = parseInt(document.getElementById(id).value) || 0;
  });

  students[regNo].marks[sem] = marks;
  alert("Marks saved!");
  e.target.reset();
  document.getElementById('subjects-container').style.display="none";
});
