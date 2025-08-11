// Dean PG School Admitted Students Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let admittedStudents = [];
    let filteredStudents = [];
    let selectedSession = '';
    let selectedSemester = '';
    let selectedProgramme = '';
    let selectedLevel = '';
    let selectedStatus = '';
    let searchTerm = '';
    const sessions = ['2024/2025', '2025/2026'];
    const semesters = ['First Semester', 'Second Semester'];
    const programmes = ['M.Sc Computer Science', 'Ph.D Computer Science', 'M.Sc Data Science', 'MBA', 'M.Sc Mathematics', 'Ph.D Mathematics', 'M.Sc Physics', 'Ph.D Physics'];
    const levels = ['Masters', 'PhD', 'Postgraduate Diploma'];
    const statuses = ['Admitted', 'Enrolled', 'Deferred', 'Declined'];

    // Mock data for admitted PG students
    const mockStudents = [
        {
            id: 1,
            studentName: 'Jennifer Adams',
            applicationId: 'PG/APP/2024/001',
            studentId: 'PG/CS/2024/001',
            programme: 'Ph.D Computer Science',
            level: 'PhD',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2024-02-01',
            status: 'Enrolled',
            email: 'jennifer.adams@email.com',
            phone: '+234-801-111-2222',
            previousDegree: 'M.Sc Computer Science',
            previousInstitution: 'University of Lagos',
            cgpa: '4.75',
            researchArea: 'Artificial Intelligence',
            assignedSupervisor: 'Prof. Smith Johnson',
            coSupervisor: 'Dr. Mary Wilson',
            enrollmentDate: '2024-02-15',
            feesStatus: 'Paid',
            researchProposal: 'Advanced Neural Networks for Medical Diagnosis',
            expectedGraduation: '2027/2028',
            fundingSource: 'University Fellowship'
        },
        {
            id: 2,
            studentName: 'Michael Thompson',
            applicationId: 'PG/APP/2024/002',
            studentId: 'PG/MBA/2024/002',
            programme: 'MBA',
            level: 'Masters',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2024-02-03',
            status: 'Enrolled',
            email: 'michael.thompson@email.com',
            phone: '+234-802-222-3333',
            previousDegree: 'B.Sc Business Administration',
            previousInstitution: 'Obafemi Awolowo University',
            cgpa: '3.82',
            researchArea: 'Strategic Management',
            assignedSupervisor: 'Prof. Mary Wilson',
            coSupervisor: null,
            enrollmentDate: '2024-02-18',
            feesStatus: 'Paid',
            researchProposal: 'Digital Strategy Implementation in Nigerian SMEs',
            expectedGraduation: '2025/2026',
            fundingSource: 'Self-Funded'
        },
        {
            id: 3,
            studentName: 'Sarah Mitchell',
            applicationId: 'PG/APP/2024/003',
            studentId: 'PG/MATH/2024/003',
            programme: 'Ph.D Mathematics',
            level: 'PhD',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2024-02-05',
            status: 'Admitted',
            email: 'sarah.mitchell@email.com',
            phone: '+234-803-333-4444',
            previousDegree: 'M.Sc Mathematics',
            previousInstitution: 'University of Ibadan',
            cgpa: '4.95',
            researchArea: 'Applied Mathematics',
            assignedSupervisor: 'Dr. Lisa Anderson',
            coSupervisor: 'Prof. Robert Davis',
            enrollmentDate: null,
            feesStatus: 'Pending',
            researchProposal: 'Advanced Numerical Methods for Partial Differential Equations',
            expectedGraduation: '2028/2029',
            fundingSource: 'Research Grant'
        },
        {
            id: 4,
            studentName: 'David Rodriguez',
            applicationId: 'PG/APP/2024/004',
            studentId: 'PG/PHY/2024/004',
            programme: 'M.Sc Physics',
            level: 'Masters',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2024-02-07',
            status: 'Deferred',
            email: 'david.rodriguez@email.com',
            phone: '+234-804-444-5555',
            previousDegree: 'B.Sc Physics',
            previousInstitution: 'Ahmadu Bello University',
            cgpa: '3.68',
            researchArea: 'Quantum Physics',
            assignedSupervisor: 'Dr. James Taylor',
            coSupervisor: null,
            enrollmentDate: null,
            feesStatus: 'Not Applicable',
            deferralReason: 'Visa processing delay',
            deferralPeriod: '2025/2026 Session',
            researchProposal: 'Quantum Entanglement in Solid State Systems',
            expectedGraduation: '2026/2027',
            fundingSource: 'International Scholarship'
        },
        {
            id: 5,
            studentName: 'Lisa Chen',
            applicationId: 'PG/APP/2024/005',
            studentId: 'PG/DS/2024/005',
            programme: 'M.Sc Data Science',
            level: 'Masters',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2024-02-10',
            status: 'Enrolled',
            email: 'lisa.chen@email.com',
            phone: '+234-805-555-6666',
            previousDegree: 'B.Sc Computer Science',
            previousInstitution: 'University of Benin',
            cgpa: '3.85',
            researchArea: 'Machine Learning',
            assignedSupervisor: 'Prof. James Taylor',
            coSupervisor: 'Dr. Patricia Moore',
            enrollmentDate: '2024-02-22',
            feesStatus: 'Paid',
            researchProposal: 'Predictive Analytics for Healthcare Systems',
            expectedGraduation: '2025/2026',
            fundingSource: 'Industry Sponsorship'
        },
        {
            id: 6,
            studentName: 'Amanda Foster',
            applicationId: 'PG/APP/2024/006',
            studentId: 'PG/CS/2024/006',
            programme: 'M.Sc Computer Science',
            level: 'Masters',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2024-02-12',
            status: 'Declined',
            email: 'amanda.foster@email.com',
            phone: '+234-806-666-7777',
            previousDegree: 'B.Sc Computer Science',
            previousInstitution: 'University of Port Harcourt',
            cgpa: '3.71',
            researchArea: 'Software Engineering',
            assignedSupervisor: 'Dr. Smith Johnson',
            coSupervisor: null,
            enrollmentDate: null,
            feesStatus: 'Not Applicable',
            declineReason: 'Accepted offer from international university',
            declineDate: '2024-02-20',
            researchProposal: 'Automated Software Testing Frameworks',
            expectedGraduation: '2025/2026',
            fundingSource: 'Self-Funded'
        }
    ];

    function init() {
        loadStudents();
        renderPage();
        setupEventListeners();
    }

    function loadStudents() {
        admittedStudents = [...mockStudents];
        filteredStudents = [...admittedStudents];
    }

    function renderPage() {
        const content = document.getElementById('admitted-students-page-content');
        if (!content) return;

        content.innerHTML = `
            <div class="page-header">
                <h2>Postgraduate School Admitted Students</h2>
                <p>View and manage postgraduate students who have been admitted across all programs</p>
            </div>

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
                        <label>Programme:</label>
                        <select id="programme-filter">
                            <option value="">All Programmes</option>
                            ${programmes.map(programme => `<option value="${programme}">${programme}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Level:</label>
                        <select id="level-filter">
                            <option value="">All Levels</option>
                            ${levels.map(level => `<option value="${level}">${level}</option>`).join('')}
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
                        <input type="text" id="search-input" placeholder="Search by name or ID...">
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
                        <button class="btn btn-info">
                            <i class="fas fa-flask"></i> Research Overview
                        </button>
                    </div>
                </div>
            </div>

            <div class="results-summary">
                <p>Showing ${filteredStudents.length} of ${admittedStudents.length} admitted PG students</p>
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

            <div class="students-list" id="students-list"></div>
        `;

        renderStudentsList();
    }

    function renderStudentsList() {
        const listContainer = document.getElementById('students-list');
        if (!listContainer) return;

        if (filteredStudents.length > 0) {
            listContainer.innerHTML = filteredStudents.map(student => `
                <div class="student-card">
                    <div class="student-header">
                        <div class="student-info">
                            <h4>${student.studentName}</h4>
                            <p class="student-meta">
                                <strong>${student.studentId}</strong> • ${student.programme}
                            </p>
                            <p class="student-details">
                                ${student.level} • ${student.session} • ${student.semester}
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
                                <strong>Research Proposal:</strong> ${student.researchProposal}
                                <br />
                                <strong>Supervisor:</strong> ${student.assignedSupervisor}
                                ${student.coSupervisor ? `
                                    <br />
                                    <strong>Co-Supervisor:</strong> ${student.coSupervisor}
                                ` : ''}
                            </div>
                        </div>
                        
                        <div class="program-details">
                            <div class="program-info">
                                <strong>Expected Graduation:</strong> ${student.expectedGraduation}
                                <br />
                                <strong>Funding Source:</strong>
                                <span class="funding-badge ${getFundingSourceColor(student.fundingSource)}">
                                    ${student.fundingSource}
                                </span>
                            </div>
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
                            <i class="fas fa-flask"></i> Research Progress
                        </button>
                        <button class="btn btn-success">
                            <i class="fas fa-users"></i> Supervisor Meeting
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            listContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No admitted PG students found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                </div>
            `;
        }
    }

    function setupEventListeners() {
        // Filter event listeners
        document.getElementById('session-filter')?.addEventListener('change', (e) => {
            selectedSession = e.target.value;
            applyFilters();
        });

        document.getElementById('semester-filter')?.addEventListener('change', (e) => {
            selectedSemester = e.target.value;
            applyFilters();
        });

        document.getElementById('programme-filter')?.addEventListener('change', (e) => {
            selectedProgramme = e.target.value;
            applyFilters();
        });

        document.getElementById('level-filter')?.addEventListener('change', (e) => {
            selectedLevel = e.target.value;
            applyFilters();
        });

        document.getElementById('status-filter')?.addEventListener('change', (e) => {
            selectedStatus = e.target.value;
            applyFilters();
        });

        document.getElementById('search-input')?.addEventListener('input', (e) => {
            searchTerm = e.target.value;
            applyFilters();
        });

        document.getElementById('clear-filters')?.addEventListener('click', clearFilters);
    }

    function applyFilters() {
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
        if (selectedLevel) {
            filtered = filtered.filter(student => student.level === selectedLevel);
        }
        if (selectedStatus) {
            filtered = filtered.filter(student => student.status === selectedStatus);
        }
        if (searchTerm) {
            filtered = filtered.filter(student => 
                student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.applicationId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filteredStudents = filtered;
        renderPage();
    }

    function clearFilters() {
        selectedSession = '';
        selectedSemester = '';
        selectedProgramme = '';
        selectedLevel = '';
        selectedStatus = '';
        searchTerm = '';
        
        // Reset form elements
        document.getElementById('session-filter').value = '';
        document.getElementById('semester-filter').value = '';
        document.getElementById('programme-filter').value = '';
        document.getElementById('level-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('search-input').value = '';
        
        applyFilters();
    }

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

    function getFundingSourceColor(source) {
        switch (source) {
            case 'University Fellowship': return 'success';
            case 'Research Grant': return 'info';
            case 'International Scholarship': return 'primary';
            case 'Industry Sponsorship': return 'warning';
            case 'Self-Funded': return 'secondary';
            default: return 'secondary';
        }
    }

    // Initialize the page
    init();
});
