let editingId = null;

// Load students on page load
window.onload = () => {
  loadStudents();
};

// Handle form submit
document.getElementById("studentForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const student = {
    id: document.getElementById("studentId").value.trim(),
    first_name: document.getElementById("firstName").value.trim(),
    last_name: document.getElementById("lastName").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim(),
  };

  fetch("backend/save_student.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(student),
  })
    .then(res => res.json())
    .then(() => {
      loadStudents();
      clearForm();
    });
});

// Load students from PHP
function loadStudents() {
  fetch("backend/get_students.php")
    .then(res => res.json())
    .then(data => {
      renderTable(data);
    });
}

// Render table
function renderTable(students) {
  const tbody = document.getElementById("studentTableBody");
  tbody.innerHTML = "";
  students.forEach(student => {
    const row = `<tr>
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.phone}</td>
      <td>${student.email}</td>
      <td>
        <button onclick="editStudent('${student.id}', '${student.name}', '${student.phone}', '${student.email}')">Edit</button>
        <button onclick="deleteStudent('${student.id}')">Delete</button>
      </td>
    </tr>`;
    tbody.innerHTML += row;
  });
}

// Edit student (prefill form)
function editStudent(id, name, phone, email) {
  const [first, last] = name.split(" ");
  document.getElementById("studentId").value = id;
  document.getElementById("firstName").value = first;
  document.getElementById("lastName").value = last || "";
  document.getElementById("phone").value = phone;
  document.getElementById("email").value = email;
  editingId = id;
}

// Delete student
function deleteStudent(id) {
  fetch("backend/delete_student.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  })
    .then(res => res.json())
    .then(() => {
      loadStudents();
    });
}

// Clear form
function clearForm() {
  document.getElementById("studentForm").reset();
  editingId = null;
}

// Search students (client-side filter)
function searchStudent() {
  const query = document.getElementById("search").value.toLowerCase();
  fetch("backend/get_students.php")
    .then(res => res.json())
    .then(data => {
      const filtered = data.filter(s =>
        s.name.toLowerCase().includes(query) || s.id.toLowerCase().includes(query)
      );
      renderTable(filtered);
    });
}
