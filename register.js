// Student data store
let students = {};

// Register student form
document.getElementById('register').innerHTML = `
<form id="registration-form">
  <div class="mb-3">
    <label class="form-label">Registration Number</label>
    <input type="text" id="reg-no" class="form-control rounded-pill" required>
  </div>
  <div class="mb-3">
    <label class="form-label">Student Name</label>
    <input type="text" id="student-name" class="form-control rounded-pill" required>
  </div>
  <div class="mb-3">
    <label class="form-label">Branch</label>
    <input type="text" id="branch" class="form-control rounded-pill" required>
  </div>
  <button class="btn btn-primary w-100 rounded-pill">Register Student</button>
</form>
`;

document.getElementById('registration-form').addEventListener('submit', e => {
  e.preventDefault();
  const regNo = document.getElementById('reg-no').value.toUpperCase();
  const name = document.getElementById('student-name').value;
  const branch = document.getElementById('branch').value;

  if (students[regNo]) { alert("Student already exists!"); return; }

  students[regNo] = { name, branch, marks: {} };
  alert("Student registered successfully!");
  e.target.reset();
});
