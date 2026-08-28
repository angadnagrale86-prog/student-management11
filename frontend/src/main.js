import "./style.css";
import axios from "axios";
import { Login } from "./views/Login.jsx";
import { Signup } from "./views/Signup.jsx";

const API_URL =
  "https://student-management-backend-z9x5.onrender.com/api/students";

/* ========================================
   AUTHENTICATION
======================================== */

function showLogin() {
  const app = document.querySelector("#app");

  app.innerHTML = Login({
    onSignup: showSignup,
    onSuccess: showDashboard,
  });
}

function showSignup() {
  const app = document.querySelector("#app");

  app.innerHTML = Signup({
    onLogin: showLogin,
    onSuccess: showDashboard,
  });
}

function showDashboard() {
  window.location.reload();
}

/* ========================================
   CHECK LOGIN
======================================== */

const loggedInUser = localStorage.getItem("campusUser");

if (!loggedInUser) {
  showLogin();
} else {
  showDashboardPage();
}

/* ========================================
   DASHBOARD
======================================== */

function showDashboardPage() {

document.querySelector("#app").innerHTML = `

<div class="dashboard">

  <header class="navbar">

    <div class="logo-area">

      <div class="logo-icon">
        S
      </div>

      <h2>
        Student<span>Hub</span>
      </h2>

    </div>

    <div class="nav-right">

      <div class="nav-badge">
        Student Management
      </div>

      <button
        id="logoutButton"
        class="logout-btn"
      >
        Logout
      </button>

    </div>

  </header>


  <main class="container">

    <div class="page-header">

      <div>

        <h1>
          Student Management
        </h1>

        <p>
          Manage and monitor all students in one place.
        </p>

      </div>

      <button
        class="add-btn"
        id="showForm"
      >
        + Add Student
      </button>

    </div>


    <!-- STATISTICS -->

    <section class="stats">

      <div class="stat-card">

        <p>
          Total Students
        </p>

        <h3 id="totalStudents">
          0
        </h3>

      </div>


      <div class="stat-card">

        <p>
          Male Students
        </p>

        <h3 id="maleStudents">
          0
        </h3>

      </div>


      <div class="stat-card">

        <p>
          Female Students
        </p>

        <h3 id="femaleStudents">
          0
        </h3>

      </div>


      <div class="stat-card">

        <p>
          Courses
        </p>

        <h3 id="totalCourses">
          0
        </h3>

      </div>

    </section>


    <!-- ANALYTICS -->

    <section class="analytics">

      <div class="analytics-card">

        <div class="analytics-title">

          <h2>
            Gender Distribution
          </h2>

          <p>
            Students by gender
          </p>

        </div>


        <div class="gender-chart">

          <div
            class="chart-circle"
            id="genderCircle"
          >

            <div class="chart-center">

              <strong id="chartTotal">
                0
              </strong>

              <span>
                Students
              </span>

            </div>

          </div>


          <div class="chart-legend">

            <div>

              <span
                class="legend-dot male-dot"
              ></span>

              <span>
                Male
              </span>

              <strong id="chartMale">
                0
              </strong>

            </div>


            <div>

              <span
                class="legend-dot female-dot"
              ></span>

              <span>
                Female
              </span>

              <strong id="chartFemale">
                0
              </strong>

            </div>


            <div>

              <span
                class="legend-dot other-dot"
              ></span>

              <span>
                Other
              </span>

              <strong id="chartOther">
                0
              </strong>

            </div>

          </div>

        </div>

      </div>


      <div class="analytics-card">

        <div class="analytics-title">

          <h2>
            Course Overview
          </h2>

          <p>
            Students by course
          </p>

        </div>


        <div
          id="courseChart"
          class="course-chart"
        ></div>

      </div>

    </section>


    <!-- ADD / EDIT FORM -->

    <section
      class="form-card"
      id="formCard"
      style="display:none;"
    >

      <h2 id="formTitle">
        Add New Student
      </h2>


      <form
        id="student-form"
        class="student-form"
      >

        <div class="form-group">

          <label>
            Student ID
          </label>

          <input
            id="studentId"
            type="text"
            placeholder="STU001"
            required
          />

        </div>


        <div class="form-group">

          <label>
            Student Name
          </label>

          <input
            id="name"
            type="text"
            placeholder="Enter student name"
            required
          />

        </div>


        <div class="form-group">

          <label>
            Email
          </label>

          <input
            id="email"
            type="email"
            placeholder="student@example.com"
            required
          />

        </div>


        <div class="form-group">

          <label>
            Phone
          </label>

          <input
            id="phone"
            type="text"
            placeholder="9876543210"
            required
          />

        </div>


        <div class="form-group">

          <label>
            Course
          </label>

          <input
            id="course"
            type="text"
            placeholder="BCA"
            required
          />

        </div>


        <div class="form-group">

          <label>
            Year
          </label>

          <select
            id="year"
            required
          >

            <option value="">
              Select Year
            </option>

            <option value="1st Year">
              1st Year
            </option>

            <option value="2nd Year">
              2nd Year
            </option>

            <option value="3rd Year">
              3rd Year
            </option>

            <option value="4th Year">
              4th Year
            </option>

          </select>

        </div>


        <div class="form-group">

          <label>
            Gender
          </label>

          <select
            id="gender"
            required
          >

            <option value="">
              Select Gender
            </option>

            <option value="Male">
              Male
            </option>

            <option value="Female">
              Female
            </option>

            <option value="Other">
              Other
            </option>

          </select>

        </div>


        <div class="form-group">

          <label>
            Address
          </label>

          <input
            id="address"
            type="text"
            placeholder="Nagpur, Maharashtra"
            required
          />

        </div>


        <div class="form-actions">

          <button
            type="button"
            class="cancel-btn"
            id="cancelForm"
          >
            Cancel
          </button>

          <button
            type="submit"
            class="submit-btn"
            id="submitBtn"
          >
            Add Student
          </button>

        </div>

      </form>

    </section>


    <!-- STUDENT TABLE -->

    <section class="students-card">

      <div class="students-header">

        <h2>
          All Students
        </h2>

        <input
          id="searchInput"
          class="search-box"
          type="text"
          placeholder="Search students..."
        />

      </div>


      <div class="table-wrapper">

        <table class="student-table">

          <thead>

            <tr>

              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Course</th>
              <th>Year</th>
              <th>Gender</th>
              <th>Phone</th>
              <th>Actions</th>

            </tr>

          </thead>


          <tbody
            id="studentTableBody"
          ></tbody>

        </table>

      </div>


      <div
        id="emptyState"
        class="empty-state"
        style="display:none;"
      >

        <div class="empty-state-icon">
          🎓
        </div>

        <h3>
          No Students Found
        </h3>

        <p>
          Add your first student to get started.
        </p>

      </div>

    </section>

  </main>


  <footer class="footer">
    Student Management System © 2026
  </footer>

</div>

`;


/* ========================================
   LOGOUT
======================================== */

document
  .querySelector("#logoutButton")
  ?.addEventListener("click", () => {

    localStorage.removeItem("campusUser");

    window.location.reload();

  });


/* ========================================
   STUDENTS
======================================== */

let students = [];
let editingId = null;


/* ========================================
   LOAD STUDENTS
======================================== */

async function loadStudents() {

  try {

    const response =
      await axios.get(API_URL);

    students =
      Array.isArray(response.data)
        ? response.data
        : [];

    renderStudents(students);

    updateStats();

  } catch (error) {

    console.error(
      "Error loading students:",
      error
    );

  }

}


/* ========================================
   RENDER STUDENTS
======================================== */

function renderStudents(data) {

  const tbody =
    document.querySelector(
      "#studentTableBody"
    );

  const emptyState =
    document.querySelector(
      "#emptyState"
    );

  if (!tbody) return;

  tbody.innerHTML = "";

  if (
    !data ||
    data.length === 0
  ) {

    if (emptyState) {
      emptyState.style.display = "block";
    }

    return;

  }

  if (emptyState) {
    emptyState.style.display = "none";
  }


  data.forEach(student => {

    const row =
      document.createElement("tr");


    row.innerHTML = `

      <td>
        <span class="student-id">
          ${student.studentId || ""}
        </span>
      </td>

      <td>
        <span class="student-name">
          ${student.name || ""}
        </span>
      </td>

      <td>
        ${student.email || ""}
      </td>

      <td>
        ${student.course || ""}
      </td>

      <td>
        ${student.year || ""}
      </td>

      <td>
        <span class="gender-badge">
          ${student.gender || ""}
        </span>
      </td>

      <td>
        ${student.phone || ""}
      </td>

      <td>

        <div class="action-buttons">

          <button
            class="edit-btn"
            onclick="editStudent('${student._id}')"
          >
            Edit
          </button>

          <button
            class="delete-btn"
            onclick="deleteStudent('${student._id}')"
          >
            Delete
          </button>

        </div>

      </td>

    `;


    tbody.appendChild(row);

  });

}


/* ========================================
   STATISTICS
======================================== */

function updateStats() {

  const total =
    students.length;

  const male =
    students.filter(
      student =>
        student.gender === "Male"
    ).length;

  const female =
    students.filter(
      student =>
        student.gender === "Female"
    ).length;

  const courses =
    new Set(
      students
        .map(
          student =>
            student.course
        )
        .filter(Boolean)
    );


  const totalElement =
    document.querySelector(
      "#totalStudents"
    );

  const maleElement =
    document.querySelector(
      "#maleStudents"
    );

  const femaleElement =
    document.querySelector(
      "#femaleStudents"
    );

  const coursesElement =
    document.querySelector(
      "#totalCourses"
    );


  if (totalElement)
    totalElement.textContent = total;

  if (maleElement)
    maleElement.textContent = male;

  if (femaleElement)
    femaleElement.textContent = female;

  if (coursesElement)
    coursesElement.textContent =
      courses.size;


  updateAnalytics();

}


/* ========================================
   ANALYTICS
======================================== */

function updateAnalytics() {

  const total =
    students.length;

  const male =
    students.filter(
      student =>
        student.gender === "Male"
    ).length;

  const female =
    students.filter(
      student =>
        student.gender === "Female"
    ).length;

  const other =
    students.filter(
      student =>
        student.gender === "Other"
    ).length;


  const chartTotal =
    document.querySelector(
      "#chartTotal"
    );

  const chartMale =
    document.querySelector(
      "#chartMale"
    );

  const chartFemale =
    document.querySelector(
      "#chartFemale"
    );

  const chartOther =
    document.querySelector(
      "#chartOther"
    );


  if (chartTotal)
    chartTotal.textContent = total;

  if (chartMale)
    chartMale.textContent = male;

  if (chartFemale)
    chartFemale.textContent = female;

  if (chartOther)
    chartOther.textContent = other;


  const malePercent =
    total
      ? male / total * 100
      : 0;

  const femalePercent =
    total
      ? female / total * 100
      : 0;


  const circle =
    document.querySelector(
      "#genderCircle"
    );


  if (circle) {

    circle.style.background = `
      conic-gradient(
        #4169e1
        0% ${malePercent}%,

        #ec4899
        ${malePercent}%
        ${malePercent + femalePercent}%,

        #94a3b8
        ${malePercent + femalePercent}%
        100%
      )
    `;

  }


  const courseCounts = {};


  students.forEach(student => {

    const course =
      student.course || "Unknown";

    courseCounts[course] =
      (courseCounts[course] || 0) + 1;

  });


  const courseChart =
    document.querySelector(
      "#courseChart"
    );


  if (!courseChart) return;


  courseChart.innerHTML = "";


  const maxCourse =
    Math.max(
      ...Object.values(courseCounts),
      1
    );


  Object.entries(
    courseCounts
  ).forEach(
    ([course, count]) => {

      const percentage =
        count / maxCourse * 100;


      courseChart.innerHTML += `

        <div class="course-row">

          <div class="course-info">

            <span>
              ${course}
            </span>

            <strong>
              ${count}
            </strong>

          </div>


          <div class="course-bar">

            <div
              class="course-progress"
              style="width:${percentage}%"
            ></div>

          </div>

        </div>

      `;

    }
  );

}


/* ========================================
   SHOW FORM
======================================== */

document
  .querySelector("#showForm")
  ?.addEventListener(
    "click",
    () => {

      resetForm();

      document.querySelector(
        "#formCard"
      ).style.display = "block";

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });

    }
  );


/* ========================================
   CANCEL FORM
======================================== */

document
  .querySelector("#cancelForm")
  ?.addEventListener(
    "click",
    () => {

      resetForm();

      document.querySelector(
        "#formCard"
      ).style.display = "none";

    }
  );


/* ========================================
   ADD / UPDATE
======================================== */

document
  .querySelector("#student-form")
  ?.addEventListener(
    "submit",
    async event => {

      event.preventDefault();


      const studentData = {

        studentId:
          document.querySelector(
            "#studentId"
          ).value.trim(),

        name:
          document.querySelector(
            "#name"
          ).value.trim(),

        email:
          document.querySelector(
            "#email"
          ).value.trim(),

        phone:
          document.querySelector(
            "#phone"
          ).value.trim(),

        course:
          document.querySelector(
            "#course"
          ).value.trim(),

        year:
          document.querySelector(
            "#year"
          ).value,

        gender:
          document.querySelector(
            "#gender"
          ).value,

        address:
          document.querySelector(
            "#address"
          ).value.trim()

      };


      try {

        if (editingId) {

          await axios.put(
            `${API_URL}/${editingId}`,
            studentData
          );

          alert(
            "Student updated successfully!"
          );

        } else {

          await axios.post(
            API_URL,
            studentData
          );

          alert(
            "Student added successfully!"
          );

        }


        resetForm();


        document.querySelector(
          "#formCard"
        ).style.display = "none";


        await loadStudents();

      } catch (error) {

        console.error(error);

        alert(
          error.response?.data?.message ||
          "Something went wrong."
        );

      }

    }
  );


/* ========================================
   EDIT STUDENT
======================================== */

window.editStudent =
  function (id) {

    const student =
      students.find(
        item =>
          item._id === id
      );

    if (!student) return;


    editingId = id;


    document.querySelector(
      "#studentId"
    ).value =
      student.studentId || "";


    document.querySelector(
      "#name"
    ).value =
      student.name || "";


    document.querySelector(
      "#email"
    ).value =
      student.email || "";


    document.querySelector(
      "#phone"
    ).value =
      student.phone || "";


    document.querySelector(
      "#course"
    ).value =
      student.course || "";


    document.querySelector(
      "#year"
    ).value =
      student.year || "";


    document.querySelector(
      "#gender"
    ).value =
      student.gender || "";


    document.querySelector(
      "#address"
    ).value =
      student.address || "";


    document.querySelector(
      "#formTitle"
    ).textContent =
      "Edit Student";


    document.querySelector(
      "#submitBtn"
    ).textContent =
      "Update Student";


    document.querySelector(
      "#formCard"
    ).style.display =
      "block";


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  };


/* ========================================
   DELETE STUDENT
======================================== */

window.deleteStudent =
  async function (id) {

    const student =
      students.find(
        item =>
          item._id === id
      );

    if (!student) return;


    const confirmed =
      confirm(
        `Are you sure you want to delete ${student.name}?`
      );


    if (!confirmed) return;


    try {

      await axios.delete(
        `${API_URL}/${id}`
      );


      alert(
        "Student deleted successfully!"
      );


      await loadStudents();

    } catch (error) {

      console.error(error);

      alert(
        error.response?.data?.message ||
        "Unable to delete student."
      );

    }

  };


/* ========================================
   SEARCH
======================================== */

document
  .querySelector("#searchInput")
  ?.addEventListener(
    "input",
    event => {

      const search =
        event.target.value
          .trim()
          .toLowerCase();


      const filtered =
        students.filter(
          student => {

            return (

              String(
                student.studentId || ""
              )
                .toLowerCase()
                .includes(search)

              ||

              String(
                student.name || ""
              )
                .toLowerCase()
                .includes(search)

              ||

              String(
                student.email || ""
              )
                .toLowerCase()
                .includes(search)

              ||

              String(
                student.course || ""
              )
                .toLowerCase()
                .includes(search)

              ||

              String(
                student.phone || ""
              )
                .toLowerCase()
                .includes(search)

              ||

              String(
                student.year || ""
              )
                .toLowerCase()
                .includes(search)

            );

          }
        );


      renderStudents(filtered);

    }
  );


/* ========================================
   RESET FORM
======================================== */

function resetForm() {

  const form =
    document.querySelector(
      "#student-form"
    );

  if (form) {
    form.reset();
  }


  editingId = null;


  const title =
    document.querySelector(
      "#formTitle"
    );

  const button =
    document.querySelector(
      "#submitBtn"
    );


  if (title)
    title.textContent =
      "Add New Student";

  if (button)
    button.textContent =
      "Add Student";

}


/* ========================================
   START
======================================== */

loadStudents();

}
