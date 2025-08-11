// Dean Admitted Students Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Mock data for admitted students
  const admittedStudents = [
    {
      id: 1,
      studentName: 'Jennifer Adams',
      applicationId: 'APP/2024/001',
      studentId: 'CS/2024/001',
      programme: 'Computer Science',
      department: 'Computer Science',
      session: '2024/2025',
      semester: 'First Semester',
      admissionDate: '2024-02-01',
      status: 'Enrolled',
      email: 'jennifer.adams@email.com',
      phone: '+234-801-111-2222',
      previousDegree: 'B.Sc Computer Science',
      previousInstitution: 'University of Lagos',
      cgpa: '3.75',
      researchArea: 'Artificial Intelligence',
      assignedSupervisor: 'Dr. Smith Johnson',
      enrollmentDate: '2024-02-15',
      feesStatus: 'Paid',
      hodRecommendation: 'Highly Recommended'
    },
    {
      id: 2,
      studentName: 'Michael Thompson',
      applicationId: 'APP/2024/002',
      studentId: 'MATH/2024/002',
      programme: 'Mathematics',
      department: 'Mathematics',
      session: '2024/2025',
      semester: 'First Semester',
      admissionDate: '2024-02-03',
      status: 'Enrolled',
      email: 'michael.thompson@email.com',
      phone: '+234-802-222-3333',
      previousDegree: 'B.Sc Mathematics',
      previousInstitution: 'Obafemi Awolowo University',
      cgpa: '3.82',
      researchArea: 'Statistical Methods',
      assignedSupervisor: 'Prof. Lisa Anderson',
      enrollmentDate: '2024-02-18',
      feesStatus: 'Paid',
      hodRecommendation: 'Recommended'
    },
    {
      id: 3,
      studentName: 'Sarah Mitchell',
      applicationId: 'APP/2024/003',
      studentId: 'PHY/2024/003',
      programme: 'Physics',
      department: 'Physics',
      session: '2024/2025',
      semester: 'First Semester',
      admissionDate: '2024-02-05',
      status: 'Admitted',
      email: 'sarah.mitchell@email.com',
      phone: '+234-803-333-4444',
      previousDegree: 'B.Sc Physics',
      previousInstitution: 'University of Ibadan',
      cgpa: '3.95',
      researchArea: 'Quantum Physics',
      assignedSupervisor: 'Dr. James Taylor',
      enrollmentDate: null,
      feesStatus: 'Pending',
      hodRecommendation: 'Highly Recommended'
    },
    {
      id: 4,
      studentName: 'David Rodriguez',
      applicationId: 'APP/2024/004',
      studentId: 'CHEM/2024/004',
      programme: 'Chemistry',
      department: 'Chemistry',
      session: '2024/2025',
      semester: 'First Semester',
      admissionDate: '2024-02-07',
      status: 'Deferred',
      email: 'david.rodriguez@email.com',
      phone: '+234-804-444-5555',
      previousDegree: 'B.Sc Chemistry',
      previousInstitution: 'Ahmadu Bello University',
      cgpa: '3.68',
      researchArea: 'Organic Chemistry',
      assignedSupervisor: 'Dr. Patricia Moore',
      enrollmentDate: null,
      feesStatus: 'Not Applicable',
      deferralReason: 'Personal circumstances',
      deferralPeriod: '2025/2026 Session',
      hodRecommendation: 'Recommended'
    },
    {
      id: 5,
      studentName: 'Lisa Chen',
      applicationId: 'APP/2024/005',
      studentId: 'BIO/2024/005',
      programme: 'Biology',
      department: 'Biology',
      session: '2024/2025',
      semester: 'First Semester',
      admissionDate: '2024-02-10',
      status: 'Enrolled',
      email: 'lisa.chen@email.com',
      phone: '+234-805-555-6666',
      previousDegree: 'B.Sc Biology',
      previousInstitution: 'University of Benin',
      cgpa: '3.85',
      researchArea: 'Molecular Biology',
      assignedSupervisor: 'Dr. Maria Rodriguez',
      enrollmentDate: '2024-02-22',
      feesStatus: 'Paid',
      hodRecommendation: 'Recommended'
    },
    {
      id: 6,
      studentName: 'Amanda Foster',
      applicationId: 'APP/2024/006',
      studentId: 'DS/2024/006',
      programme: 'Data Science',
      department: 'Computer Science',
      session: '2024/2025',
      semester: 'First Semester',
      admissionDate: '2024-02-12',
      status: 'Declined',
      email: 'amanda.foster@email.com',
      phone: '+234-806-666-7777',
      previousDegree: 'B.Sc Computer Science',
      previousInstitution: 'University of Port Harcourt',
      cgpa: '3.71',
      researchArea: 'Data Analytics',
      assignedSupervisor: 'Prof. Mary Wilson',
      enrollmentDate: null,
      feesStatus: 'Not Applicable',
      declineReason: 'Accepted offer from another institution',
      declineDate: '2024-02-20',
      hodRecommendation: 'Recommended'
    }
  ];

  let filteredStudents = [...admittedStudents];

  // Available options for filters
  const sessions = ['2024/2025', '2025/2026'];
  const semesters = ['First Semester', 'Second Semester'];
  const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
  const statuses = ['Admitted', 'Enrolled', 'Deferred', 'Declined'];

  // Get DOM elements
  const contentContainer = document.getElementById('dean-admitted-students-content');

  // Helper functions
  function getStatusColor(status) {
    switch (status) {
      case 'Enrolled': return 'success';
      case 'Admitted': return 'info';
      case 'Deferred': return 'warning';
      case 'Declined': return 'danger';
      default: return 'primary';
    }
  }

  function getFeesStatusColor(status) {
    switch (status) {
      case 'Paid': return 'success';
      case 'Pending': return 'warning';
      case 'Overdue': return 'danger';
      default: return 'secondary';
    }
  }

  function getHodRecommendationColor(recommendation) {
    switch (recommendation) {
      case 'Highly Recommended': return 'success';
      case 'Recommended': return 'info';
      case 'Recommended with Conditions': return 'warning';
      default: return 'secondary';
    }
  }

  function filterStudents() {
    const selectedSession = document.getElementById('session-filter').value;
    const selectedSemester = document.getElementById('semester-filter').value;
    const selectedProgramme = document.getElementById('programme-filter').value;
    const selectedDepartment = document.getElementById('department-filter').value;
    const selectedStatus = document.getElementById('status-filter').value;
    const searchTerm = document.getElementById('search-filter').value.toLowerCase();

    let filtered = admittedStudents;

    if (selectedSession) {
      filtered = filtered.filter(student => student.session === selectedSession);
    }
    if (selectedSemester) {
      filtered = filtered.filter(student => student.semester === selectedSemester);
    }
    if (selectedProgramme) {
      filtered = filtered.filter(student => student.programme === selectedProgramme);
    }
    if (selectedDepartment) {
      filtered = filtered.filter(student => student.department === selectedDepartment);
    }
    if (selectedStatus) {
      filtered = filtered.filter(student => student.status === selectedStatus);
    }
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.studentName.toLowerCase().includes(searchTerm) ||
        student.studentId.toLowerCase().includes(searchTerm) ||
        student.applicationId.toLowerCase().includes(searchTerm)
      );
    }

    filteredStudents = filtered;
    renderStudents();
    updateResultsSummary();
  }

  function clearFilters() {
    document.getElementById('session-filter').value = '';
    document.getElementById('semester-filter').value = '';
    document.getElementById('programme-filter').value = '';
    document.getElementById('department-filter').value = '';
    document.getElementById('status-filter').value = '';
    document.getElementById('search-filter').value = '';
    filterStudents();
  }

  function updateResultsSummary() {
    const summaryElement = document.querySelector('.results-summary');
    if (summaryElement) {
      summaryElement.innerHTML = `
        <p>Showing ${filteredStudents.length} of ${admittedStudents.length} admitted students</p>
        <div class="summary-stats">
          <span class="stat-item success">
            Enrolled: ${admittedStudents.filter(s => s.status === 'Enrolled').length}
          </span>
          <span class="stat-item info">
            Admitted: ${admittedStudents.filter(s => s.status === 'Admitted').length}
          </span>
          <span class="stat-item warning">
            Deferred: ${admittedStudents.filter(s => s.status === 'Deferred').length}
          </span>
          <span class="stat-item danger">
            Declined: ${admittedStudents.filter(s => s.status === 'Declined').length}
          </span>
        </div>
      `;
    }
  }

  function renderStudentCard(student) {
    return `
      <div class="student-card">
        <div class="student-header">
          <div class="student-info">
            <h4>${student.studentName}</h4>
            <p class="student-meta">
              <strong>${student.studentId}</strong> • ${student.programme}
            </p>
            <p class="student-details">
              ${student.department} Department • ${student.session} • ${student.semester}
            </p>
          </div>
          <div class="student-status ${getStatusColor(student.status)}">
            ${student.status}
          </div>
        </div>
        
        <div class="student-body">
          <div class="academic-info">
            <div class="degree-info">
              <strong>Previous Degree:</strong> ${student.previousDegree}
              <br />
              <strong>Institution:</strong> ${student.previousInstitution}
              <br />
              <strong>CGPA:</strong> ${student.cgpa}
            </div>
            
            <div class="research-info">
              <strong>Research Area:</strong> ${student.researchArea}
              <br />
              <strong>Assigned Supervisor:</strong> ${student.assignedSupervisor}
            </div>
          </div>
          
          <div class="hod-recommendation">
            <strong>HOD Recommendation:</strong>
            <span class="recommendation-badge ${getHodRecommendationColor(student.hodRecommendation)}">
              ${student.hodRecommendation}
            </span>
          </div>
          
          <div class="enrollment-info">
            <div class="admission-date">
              <strong>Admission Date:</strong> ${student.admissionDate}
            </div>
            
            ${student.enrollmentDate ? `
              <div class="enrollment-date">
                <strong>Enrollment Date:</strong> ${student.enrollmentDate}
              </div>
            ` : ''}
            
            <div class="fees-status">
              <strong>Fees Status:</strong> 
              <span class="fees-badge ${getFeesStatusColor(student.feesStatus)}">
                ${student.feesStatus}
              </span>
            </div>
          </div>
          
          <div class="contact-info">
            <span><i class="fas fa-envelope"></i> ${student.email}</span>
            <span><i class="fas fa-phone"></i> ${student.phone}</span>
          </div>
          
          ${student.deferralReason ? `
            <div class="deferral-info">
              <strong>Deferral Reason:</strong> ${student.deferralReason}
              <br />
              <strong>Deferred to:</strong> ${student.deferralPeriod}
            </div>
          ` : ''}
          
          ${student.declineReason ? `
            <div class="decline-info">
              <strong>Decline Reason:</strong> ${student.declineReason}
              <br />
              <strong>Decline Date:</strong> ${student.declineDate}
            </div>
          ` : ''}
        </div>
        
        <div class="student-actions">
          <button class="btn btn-primary">
            <i class="fas fa-eye"></i> View Profile
          </button>
          <button class="btn btn-info">
            <i class="fas fa-file-alt"></i> Academic Records
          </button>
          ${student.status === 'Admitted' ? `
            <button class="btn btn-success">
              <i class="fas fa-user-check"></i> Confirm Enrollment
            </button>
          ` : ''}
          <button class="btn btn-warning">
            <i class="fas fa-envelope"></i> Send Message
          </button>
          <button class="btn btn-secondary">
            <i class="fas fa-print"></i> Print Admission Letter
          </button>
          <button class="btn btn-info">
            <i class="fas fa-chart-line"></i> Track Progress
          </button>
        </div>
      </div>
    `;
  }

  function renderStudents() {
    const studentsListElement = document.querySelector('.students-list');
    if (studentsListElement) {
      if (filteredStudents.length > 0) {
        studentsListElement.innerHTML = filteredStudents.map(student => renderStudentCard(student)).join('');
      } else {
        studentsListElement.innerHTML = `
          <div class="no-results">
            <i class="fas fa-search"></i>
            <h3>No admitted students found</h3>
            <p>Try adjusting your filters or search criteria</p>
          </div>
        `;
      }
    }
  }

  function renderPage() {
    contentContainer.innerHTML = `
      <div class="admitted-students-page">
        <!-- Page Header -->
        <div class="page-header">
          <h2>College Admitted Students</h2>
          <p>View and manage students who have been admitted across all departments in your college</p>
        </div>

        <!-- Filters Section -->
        <div class="filters-section">
          <div class="filters-grid">
            <div class="filter-group">
              <label>Session:</label>
              <select id="session-filter">
                <option value="">All Sessions</option>
                ${sessions.map(session => `<option value="${session}">${session}</option>`).join('')}
              </select>
            </div>
            
            <div class="filter-group">
              <label>Semester:</label>
              <select id="semester-filter">
                <option value="">All Semesters</option>
                ${semesters.map(semester => `<option value="${semester}">${semester}</option>`).join('')}
              </select>
            </div>
            
            <div class="filter-group">
              <label>Department:</label>
              <select id="department-filter">
                <option value="">All Departments</option>
                ${departments.map(department => `<option value="${department}">${department}</option>`).join('')}
              </select>
            </div>
            
            <div class="filter-group">
              <label>Programme:</label>
              <select id="programme-filter">
                <option value="">All Programmes</option>
                ${programmes.map(programme => `<option value="${programme}">${programme}</option>`).join('')}
              </select>
            </div>
            
            <div class="filter-group">
              <label>Status:</label>
              <select id="status-filter">
                <option value="">All Statuses</option>
                ${statuses.map(status => `<option value="${status}">${status}</option>`).join('')}
              </select>
            </div>
            
            <div class="filter-group">
              <label>Search:</label>
              <input
                type="text"
                id="search-filter"
                placeholder="Search by name or ID..."
              />
            </div>
            
            <div class="filter-actions">
              <button class="btn btn-secondary" id="clear-filters">
                <i class="fas fa-times"></i> Clear Filters
              </button>
              <button class="btn btn-primary">
                <i class="fas fa-download"></i> Export List
              </button>
              <button class="btn btn-success">
                <i class="fas fa-chart-bar"></i> Enrollment Statistics
              </button>
            </div>
          </div>
        </div>

        <!-- Results Summary -->
        <div class="results-summary">
          <p>Showing ${filteredStudents.length} of ${admittedStudents.length} admitted students</p>
          <div class="summary-stats">
            <span class="stat-item success">
              Enrolled: ${admittedStudents.filter(s => s.status === 'Enrolled').length}
            </span>
            <span class="stat-item info">
              Admitted: ${admittedStudents.filter(s => s.status === 'Admitted').length}
            </span>
            <span class="stat-item warning">
              Deferred: ${admittedStudents.filter(s => s.status === 'Deferred').length}
            </span>
            <span class="stat-item danger">
              Declined: ${admittedStudents.filter(s => s.status === 'Declined').length}
            </span>
          </div>
        </div>

        <!-- Students List -->
        <div class="students-list">
          ${filteredStudents.length > 0 ? 
            filteredStudents.map(student => renderStudentCard(student)).join('') :
            `<div class="no-results">
              <i class="fas fa-search"></i>
              <h3>No admitted students found</h3>
              <p>Try adjusting your filters or search criteria</p>
            </div>`
          }
        </div>
      </div>
    `;

    // Add event listeners
    document.getElementById('session-filter').addEventListener('change', filterStudents);
    document.getElementById('semester-filter').addEventListener('change', filterStudents);
    document.getElementById('programme-filter').addEventListener('change', filterStudents);
    document.getElementById('department-filter').addEventListener('change', filterStudents);
    document.getElementById('status-filter').addEventListener('change', filterStudents);
    document.getElementById('search-filter').addEventListener('input', filterStudents);
    document.getElementById('clear-filters').addEventListener('click', clearFilters);
  }

  // Initialize the page
  renderPage();
});
