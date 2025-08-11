// Dean PG School Old Students Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let students = [];
    let filteredStudents = [];
    let selectedSession = '';
    let selectedProgramme = '';
    let selectedLevel = '';
    let selectedStatus = '';
    let searchTerm = '';
    const sessions = ['2018/2019', '2019/2020', '2020/2021', '2021/2022', '2022/2023', '2023/2024'];
    const programmes = ['M.Sc Computer Science', 'Ph.D Computer Science', 'M.Sc Data Science', 'MBA', 'M.Sc Mathematics', 'Ph.D Mathematics', 'M.Sc Physics', 'Ph.D Physics'];
    const levels = ['Masters', 'PhD', 'Postgraduate Diploma'];
    const statuses = ['Graduated', 'Withdrawn', 'Suspended', 'Transferred'];

    // Mock data for PG old students/alumni
    const mockStudents = [
        {
            id: 1,
            studentName: 'Dr. Alice Johnson',
            studentId: 'PG/CS/2020/001',
            programme: 'Ph.D Computer Science',
            level: 'PhD',
            admissionSession: '2020/2021',
            graduationSession: '2023/2024',
            status: 'Graduated',
            cgpa: '4.85',
            finalGrade: 'Distinction',
            email: 'alice.johnson@email.com',
            phone: '+234-801-234-5678',
            currentEmployment: 'Senior Research Scientist at Google AI',
            thesis: 'Deep Learning Architectures for Natural Language Understanding',
            supervisor: 'Prof. Smith Johnson',
            coSupervisor: 'Dr. Mary Wilson',
            researchArea: 'Artificial Intelligence',
            publicationsCount: 12,
            citationsCount: 245,
            awards: ['Best PhD Thesis Award 2024', 'Outstanding Research Publication Award']
        },
        {
            id: 2,
            studentName: 'Robert Williams',
            studentId: 'PG/MBA/2021/002',
            programme: 'MBA',
            level: 'Masters',
            admissionSession: '2021/2022',
            graduationSession: '2023/2024',
            status: 'Graduated',
            cgpa: '4.92',
            finalGrade: 'Distinction',
            email: 'robert.williams@email.com',
            phone: '+234-802-345-6789',
            currentEmployment: 'Chief Strategy Officer at Fintech Startup',
            thesis: 'Digital Transformation Strategies in African Financial Services',
            supervisor: 'Prof. Mary Wilson',
            coSupervisor: null,
            researchArea: 'Strategic Management',
            publicationsCount: 3,
            citationsCount: 45,
            awards: ['MBA Excellence Award', 'Leadership in Innovation Award']
        },
        {
            id: 3,
            studentName: 'Dr. Emily Davis',
            studentId: 'PG/MATH/2019/003',
            programme: 'Ph.D Mathematics',
            level: 'PhD',
            admissionSession: '2019/2020',
            graduationSession: '2023/2024',
            status: 'Graduated',
            cgpa: '4.67',
            finalGrade: 'Distinction',
            email: 'emily.davis@email.com',
            phone: '+234-803-456-7890',
            currentEmployment: 'Assistant Professor at MIT',
            thesis: 'Advanced Statistical Methods in Machine Learning Applications',
            supervisor: 'Dr. Robert Davis',
            coSupervisor: 'Prof. Lisa Anderson',
            researchArea: 'Applied Statistics',
            publicationsCount: 18,
            citationsCount: 387,
            awards: ['International Mathematics Research Award', 'Young Researcher Excellence Award']
        },
        {
            id: 4,
            studentName: 'James Wilson',
            studentId: 'PG/PHY/2021/004',
            programme: 'M.Sc Physics',
            level: 'Masters',
            admissionSession: '2021/2022',
            graduationSession: null,
            status: 'Withdrawn',
            cgpa: '3.45',
            finalGrade: null,
            email: 'james.wilson@email.com',
            phone: '+234-804-567-8901',
            currentEmployment: 'Unknown',
            thesis: null,
            withdrawalReason: 'Health issues',
            withdrawalDate: '2023-03-15',
            supervisor: 'Dr. James Taylor',
            coSupervisor: null,
            researchArea: 'Quantum Physics',
            publicationsCount: 0,
            citationsCount: 0,
            awards: []
        },
        {
            id: 5,
            studentName: 'Maria Garcia',
            studentId: 'PG/DS/2020/005',
            programme: 'M.Sc Data Science',
            level: 'Masters',
            admissionSession: '2020/2021',
            graduationSession: '2022/2023',
            status: 'Graduated',
            cgpa: '4.78',
            finalGrade: 'Distinction',
            email: 'maria.garcia@email.com',
            phone: '+234-805-678-9012',
            currentEmployment: 'Lead Data Scientist at Netflix',
            thesis: 'Predictive Analytics for Personalized Content Recommendation Systems',
            supervisor: 'Prof. James Taylor',
            coSupervisor: 'Dr. Patricia Moore',
            researchArea: 'Data Science',
            publicationsCount: 6,
            citationsCount: 89,
            awards: ['Data Science Innovation Award', 'Industry Collaboration Excellence']
        },
        {
            id: 6,
            studentName: 'Kevin Brown',
            studentId: 'PG/CS/2021/006',
            programme: 'M.Sc Computer Science',
            level: 'Masters',
            admissionSession: '2021/2022',
            graduationSession: null,
            status: 'Suspended',
            cgpa: '2.12',
            finalGrade: null,
            email: 'kevin.brown@email.com',
            phone: '+234-806-789-0123',
            currentEmployment: 'Unknown',
            thesis: null,
            suspensionReason: 'Academic misconduct - plagiarism',
            suspensionDate: '2023-09-20',
            supervisor: 'Dr. Smith Johnson',
            coSupervisor: null,
            researchArea: 'Software Engineering',
            publicationsCount: 0,
            citationsCount: 0,
            awards: []
        }
    ];

    function init() {
        loadStudents();
        renderPage();
        setupEventListeners();
    }

    function loadStudents() {
        students = [...mockStudents];
        filteredStudents = [...students];
    }

    function renderPage() {
        const content = document.getElementById('old-students-page-content');
        if (!content) return;

        content.innerHTML = `
            <div class="page-header">
                <h2>Postgraduate School Alumni & Former Students</h2>
                <p>View and manage records of graduated, withdrawn, suspended, and transferred postgraduate students</p>
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
                        <input type="text" id="search-input" placeholder="Search by name, ID, or email...">
                    </div>
                    
                    <div class="filter-actions">
                        <button class="btn btn-secondary" id="clear-filters">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                        <button class="btn btn-primary">
                            <i class="fas fa-download"></i> Export Alumni List
                        </button>
                        <button class="btn btn-success">
                            <i class="fas fa-users"></i> Alumni Network
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-chart-bar"></i> Impact Report
                        </button>
                    </div>
                </div>
            </div>

            <div class="results-summary">
                <p>Showing ${filteredStudents.length} of ${students.length} PG alumni & former students</p>
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
                                ${student.level} • Admission: ${student.admissionSession}
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
                                ${student.coSupervisor ? `
                                    <br />
                                    <strong>Co-Supervisor:</strong> ${student.coSupervisor}
                                ` : ''}
                            </div>
                            
                            <div class="research-info">
                                <strong>Research Area:</strong> ${student.researchArea}
                            </div>
                            
                            ${student.thesis ? `
                                <div class="thesis-info">
                                    <strong>Thesis:</strong> ${student.thesis}
                                </div>
                            ` : ''}
                            
                            ${student.status === 'Graduated' ? `
                                <div class="research-metrics">
                                    <div class="metrics-grid">
                                        <div class="metric-item">
                                            <span class="metric-number">${student.publicationsCount}</span>
                                            <span class="metric-label">Publications</span>
                                        </div>
                                        <div class="metric-item">
                                            <span class="metric-number">${student.citationsCount}</span>
                                            <span class="metric-label">Citations</span>
                                        </div>
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${student.awards && student.awards.length > 0 ? `
                                <div class="awards-section">
                                    <strong>Awards & Recognition:</strong>
                                    <div class="awards-list">
                                        ${student.awards.map(award => 
                                            `<span class="award-badge">${award}</span>`
                                        ).join('')}
                                    </div>
                                </div>
                            ` : ''}
                            
                            ${student.withdrawalReason ? `
                                <div class="withdrawal-info">
                                    <strong>Withdrawal Reason:</strong> ${student.withdrawalReason}
                                    <br />
                                    <strong>Date:</strong> ${student.withdrawalDate}
                                </div>
                            ` : ''}
                            
                            ${student.suspensionReason ? `
                                <div class="suspension-info">
                                    <strong>Suspension Reason:</strong> ${student.suspensionReason}
                                    <br />
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
                                    <strong>Current Position:</strong> ${student.currentEmployment}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                    
                    <div class="student-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-eye"></i> View Full Profile
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-file-alt"></i> Academic Records
                        </button>
                        ${student.status === 'Graduated' ? `
                            <button class="btn btn-success">
                                <i class="fas fa-download"></i> Generate Certificate
                            </button>
                            <button class="btn btn-warning">
                                <i class="fas fa-users"></i> Alumni Network
                            </button>
                        ` : ''}
                        <button class="btn btn-secondary">
                            <i class="fas fa-envelope"></i> Contact
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-chart-line"></i> Research Impact
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            listContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No PG alumni found</h3>
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
        let filtered = students;

        if (selectedSession) {
            filtered = filtered.filter(student => student.admissionSession === selectedSession);
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
                student.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filteredStudents = filtered;
        renderPage();
    }

    function clearFilters() {
        selectedSession = '';
        selectedProgramme = '';
        selectedLevel = '';
        selectedStatus = '';
        searchTerm = '';
        
        // Reset form elements
        document.getElementById('session-filter').value = '';
        document.getElementById('programme-filter').value = '';
        document.getElementById('level-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('search-input').value = '';
        
        applyFilters();
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
            case 'Distinction': return 'success';
            case 'Credit': return 'info';
            case 'Pass': return 'warning';
            default: return 'primary';
        }
    }

    // Initialize the page
    init();
});
