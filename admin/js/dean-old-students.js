// Dean Old Students Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let students = [];
    let filteredStudents = [];
    let selectedSession = '';
    let selectedProgramme = '';
    let selectedDepartment = '';
    let selectedStatus = '';
    let searchTerm = '';

    const sessions = ['2020/2021', '2021/2022', '2022/2023', '2023/2024'];
    const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
    const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
    const statuses = ['Graduated', 'Withdrawn', 'Suspended', 'Transferred'];

    function init() {
        loadStudents();
        setupEventListeners();
    }

    function loadStudents() {
        // Mock data for old students across all departments
        students = [
            {
                id: 1,
                studentName: 'Alice Johnson',
                studentId: 'CS/2020/001',
                programme: 'Computer Science',
                department: 'Computer Science',
                admissionSession: '2020/2021',
                graduationSession: '2023/2024',
                status: 'Graduated',
                cgpa: '3.85',
                finalGrade: 'First Class',
                email: 'alice.johnson@email.com',
                phone: '+234-801-234-5678',
                currentEmployment: 'Software Engineer at TechCorp',
                thesis: 'Machine Learning Applications in Healthcare',
                supervisor: 'Dr. Smith Johnson'
            },
            {
                id: 2,
                studentName: 'Robert Williams',
                studentId: 'MATH/2021/002',
                programme: 'Mathematics',
                department: 'Mathematics',
                admissionSession: '2021/2022',
                graduationSession: '2024/2025',
                status: 'Graduated',
                cgpa: '3.92',
                finalGrade: 'First Class',
                email: 'robert.williams@email.com',
                phone: '+234-802-345-6789',
                currentEmployment: 'Data Scientist at Analytics Inc',
                thesis: 'Statistical Methods in Financial Modeling',
                supervisor: 'Prof. Lisa Anderson'
            },
            {
                id: 3,
                studentName: 'Emily Davis',
                studentId: 'PHY/2020/003',
                programme: 'Physics',
                department: 'Physics',
                admissionSession: '2020/2021',
                graduationSession: '2023/2024',
                status: 'Graduated',
                cgpa: '3.67',
                finalGrade: 'Second Class Upper',
                email: 'emily.davis@email.com',
                phone: '+234-803-456-7890',
                currentEmployment: 'Research Assistant at University',
                thesis: 'Quantum Mechanics in Modern Technology',
                supervisor: 'Dr. James Taylor'
            },
            {
                id: 4,
                studentName: 'James Wilson',
                studentId: 'CHEM/2021/004',
                programme: 'Chemistry',
                department: 'Chemistry',
                admissionSession: '2021/2022',
                graduationSession: null,
                status: 'Withdrawn',
                cgpa: '2.45',
                finalGrade: null,
                email: 'james.wilson@email.com',
                phone: '+234-804-567-8901',
                currentEmployment: 'Unknown',
                thesis: null,
                withdrawalReason: 'Personal reasons',
                withdrawalDate: '2023-03-15',
                supervisor: 'Dr. Patricia Moore'
            },
            {
                id: 5,
                studentName: 'Maria Garcia',
                studentId: 'BIO/2020/005',
                programme: 'Biology',
                department: 'Biology',
                admissionSession: '2020/2021',
                graduationSession: '2023/2024',
                status: 'Graduated',
                cgpa: '3.78',
                finalGrade: 'Second Class Upper',
                email: 'maria.garcia@email.com',
                phone: '+234-805-678-9012',
                currentEmployment: 'Laboratory Technician at PharmaCorp',
                thesis: 'Biodiversity Conservation in Tropical Ecosystems',
                supervisor: 'Dr. Maria Rodriguez'
            },
            {
                id: 6,
                studentName: 'Kevin Brown',
                studentId: 'CS/2021/006',
                programme: 'Computer Science',
                department: 'Computer Science',
                admissionSession: '2021/2022',
                graduationSession: null,
                status: 'Suspended',
                cgpa: '2.12',
                finalGrade: null,
                email: 'kevin.brown@email.com',
                phone: '+234-806-789-0123',
                currentEmployment: 'Unknown',
                thesis: null,
                suspensionReason: 'Academic misconduct',
                suspensionDate: '2023-09-20',
                supervisor: 'Dr. Smith Johnson'
            }
        ];
        
        filteredStudents = [...students];
        renderPage();
    }

    function renderPage() {
        const container = document.getElementById('dean-old-students-content');
        container.innerHTML = `
            <div class="old-students-page">
                <div class="page-header">
                    <h2>College Alumni & Former Students</h2>
                    <p>View and manage records of graduated, withdrawn, suspended, and transferred students across all departments</p>
                </div>

                <div class="filters-section">
                    <div class="filters-grid">
                        <div class="filter-group">
                            <label>Admission Session:</label>
                            <select id="session-filter">
                                <option value="">All Sessions</option>
                                ${sessions.map(session => `<option value="${session}">${session}</option>`).join('')}
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
                            <input type="text" id="search-input" placeholder="Search by name, ID, or email...">
                        </div>
                        
                        <div class="filter-actions">
                            <button class="btn btn-secondary" onclick="clearFilters()">
                                <i class="fas fa-times"></i> Clear Filters
                            </button>
                            <button class="btn btn-primary" onclick="exportAlumniList()">
                                <i class="fas fa-download"></i> Export Alumni List
                            </button>
                            <button class="btn btn-success" onclick="openAlumniNetwork()">
                                <i class="fas fa-users"></i> Alumni Network
                            </button>
                        </div>
                    </div>
                </div>

                <div class="results-summary">
                    <p>Showing ${filteredStudents.length} of ${students.length} former students</p>
                    <div class="summary-stats">
                        <span class="stat-item success">
                            Graduated: ${students.filter(s => s.status === 'Graduated').length}
                        </span>
                        <span class="stat-item warning">
                            Withdrawn: ${students.filter(s => s.status === 'Withdrawn').length}
                        </span>
                        <span class="stat-item danger">
                            Suspended: ${students.filter(s => s.status === 'Suspended').length}
                        </span>
                        <span class="stat-item info">
                            Transferred: ${students.filter(s => s.status === 'Transferred').length}
                        </span>
                    </div>
                </div>

                <div class="students-list">
                    ${renderStudentsList()}
                </div>
            </div>
        `;
    }

    function renderStudentsList() {
        if (filteredStudents.length === 0) {
            return `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No former students found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                </div>
            `;
        }

        return filteredStudents.map(student => `
            <div class="student-card">
                <div class="student-header">
                    <div class="student-info">
                        <h4>${student.studentName}</h4>
                        <p class="student-meta">
                            <strong>${student.studentId}</strong> • ${student.programme}
                        </p>
                        <p class="student-details">
                            ${student.department} Department • Admission: ${student.admissionSession}
                            ${student.graduationSession ? ` • Graduation: ${student.graduationSession}` : ''}
                        </p>
                    </div>
                    <div class="student-status ${getStatusColor(student.status)}">
                        ${student.status}
                    </div>
                </div>
                
                <div class="student-body">
                    <div class="student-academic">
                        ${student.cgpa ? `
                            <div class="academic-info">
                                <span><strong>CGPA:</strong> ${student.cgpa}</span>
                                ${student.finalGrade ? `
                                    <span class="grade-badge ${getGradeColor(student.finalGrade)}">
                                        ${student.finalGrade}
                                    </span>
                                ` : ''}
                            </div>
                        ` : ''}
                        
                        <div class="supervisor-info">
                            <strong>Supervisor:</strong> ${student.supervisor}
                        </div>
                        
                        ${student.thesis ? `
                            <div class="thesis-info">
                                <strong>Thesis:</strong> ${student.thesis}
                            </div>
                        ` : ''}
                        
                        ${student.withdrawalReason ? `
                            <div class="withdrawal-info">
                                <strong>Withdrawal Reason:</strong> ${student.withdrawalReason}<br>
                                <strong>Date:</strong> ${student.withdrawalDate}
                            </div>
                        ` : ''}
                        
                        ${student.suspensionReason ? `
                            <div class="suspension-info">
                                <strong>Suspension Reason:</strong> ${student.suspensionReason}<br>
                                <strong>Date:</strong> ${student.suspensionDate}
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="student-contact">
                        <div class="contact-info">
                            <span><i class="fas fa-envelope"></i> ${student.email}</span>
                            <span><i class="fas fa-phone"></i> ${student.phone}</span>
                        </div>
                        
                        ${student.currentEmployment && student.currentEmployment !== 'Unknown' ? `
                            <div class="employment-info">
                                <strong>Current Employment:</strong> ${student.currentEmployment}
                            </div>
                        ` : ''}
                    </div>
                </div>
                
                <div class="student-actions">
                    <button class="btn btn-primary" onclick="viewFullProfile(${student.id})">
                        <i class="fas fa-eye"></i> View Full Profile
                    </button>
                    <button class="btn btn-info" onclick="viewAcademicRecords(${student.id})">
                        <i class="fas fa-file-alt"></i> Academic Records
                    </button>
                    <button class="btn btn-success" onclick="generateCertificate(${student.id})">
                        <i class="fas fa-download"></i> Generate Certificate
                    </button>
                    <button class="btn btn-secondary" onclick="contactAlumni(${student.id})">
                        <i class="fas fa-envelope"></i> Contact Alumni
                    </button>
                    <button class="btn btn-warning" onclick="trackCareer(${student.id})">
                        <i class="fas fa-chart-line"></i> Career Tracking
                    </button>
                </div>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        document.addEventListener('change', function(e) {
            if (e.target.id === 'session-filter') {
                selectedSession = e.target.value;
                applyFilters();
            } else if (e.target.id === 'department-filter') {
                selectedDepartment = e.target.value;
                applyFilters();
            } else if (e.target.id === 'programme-filter') {
                selectedProgramme = e.target.value;
                applyFilters();
            } else if (e.target.id === 'status-filter') {
                selectedStatus = e.target.value;
                applyFilters();
            }
        });

        document.addEventListener('input', function(e) {
            if (e.target.id === 'search-input') {
                searchTerm = e.target.value;
                applyFilters();
            }
        });
    }

    function applyFilters() {
        let filtered = students;

        if (selectedSession) {
            filtered = filtered.filter(student => student.admissionSession === selectedSession);
        }
        if (selectedDepartment) {
            filtered = filtered.filter(student => student.department === selectedDepartment);
        }
        if (selectedProgramme) {
            filtered = filtered.filter(student => student.programme === selectedProgramme);
        }
        if (selectedStatus) {
            filtered = filtered.filter(student => student.status === selectedStatus);
        }
        if (searchTerm) {
            filtered = filtered.filter(student => 
                student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filteredStudents = filtered;
        renderPage();
    }

    function getStatusColor(status) {
        switch (status) {
            case 'Graduated': return 'success';
            case 'Withdrawn': return 'warning';
            case 'Suspended': return 'danger';
            case 'Transferred': return 'info';
            default: return 'primary';
        }
    }

    function getGradeColor(grade) {
        switch (grade) {
            case 'First Class': return 'success';
            case 'Second Class Upper': return 'info';
            case 'Second Class Lower': return 'warning';
            case 'Third Class': return 'secondary';
            default: return 'primary';
        }
    }

    // Global functions for button actions
    window.clearFilters = function() {
        selectedSession = '';
        selectedDepartment = '';
        selectedProgramme = '';
        selectedStatus = '';
        searchTerm = '';
        
        document.getElementById('session-filter').value = '';
        document.getElementById('department-filter').value = '';
        document.getElementById('programme-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('search-input').value = '';
        
        applyFilters();
    };

    window.exportAlumniList = function() {
        alert('Export alumni list functionality will be implemented here');
    };

    window.openAlumniNetwork = function() {
        alert('Alumni network functionality will be implemented here');
    };

    window.viewFullProfile = function(studentId) {
        alert(`View full profile for student ID: ${studentId}`);
    };

    window.viewAcademicRecords = function(studentId) {
        alert(`View academic records for student ID: ${studentId}`);
    };

    window.generateCertificate = function(studentId) {
        alert(`Generate certificate for student ID: ${studentId}`);
    };

    window.contactAlumni = function(studentId) {
        alert(`Contact alumni for student ID: ${studentId}`);
    };

    window.trackCareer = function(studentId) {
        alert(`Track career for student ID: ${studentId}`);
    };

    init();
});

