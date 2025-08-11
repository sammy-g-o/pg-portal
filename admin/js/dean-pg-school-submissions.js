// Dean PG School Submissions Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let submissions = [];
    let filteredSubmissions = [];
    let selectedSession = '';
    let selectedSemester = '';
    let selectedProgramme = '';
    let selectedLevel = '';
    let selectedStatus = '';
    let searchTerm = '';
    const sessions = ['2023/2024', '2024/2025', '2025/2026'];
    const semesters = ['First Semester', 'Second Semester'];
    const programmes = ['M.Sc Computer Science', 'Ph.D Computer Science', 'M.Sc Data Science', 'MBA', 'M.Sc Mathematics', 'Ph.D Mathematics', 'M.Sc Physics', 'Ph.D Physics'];
    const levels = ['Masters', 'PhD', 'Postgraduate Diploma'];
    const statuses = ['Pending', 'Under Review', 'Supervisor Approved', 'Dean Review', 'External Review', 'Approved', 'Rejected', 'Requires Revision'];

    // Mock data for PG submissions
    const mockSubmissions = [
        {
            id: 1,
            studentName: 'Dr. John Doe',
            studentId: 'PG/CS/2023/001',
            programme: 'Ph.D Computer Science',
            level: 'PhD',
            session: '2023/2024',
            semester: 'First Semester',
            submissionType: 'Thesis Defense Proposal',
            title: 'Advanced Machine Learning Algorithms for Healthcare Diagnostics',
            submissionDate: '2024-01-15',
            status: 'Dean Review',
            supervisor: 'Prof. Smith Johnson',
            coSupervisor: 'Dr. Mary Wilson',
            supervisorRecommendation: 'Approved',
            expectedDefenseDate: '2024-03-15',
            description: 'Comprehensive research on developing advanced ML algorithms for early disease detection and diagnosis in healthcare systems.',
            researchArea: 'Artificial Intelligence',
            yearOfStudy: '3rd Year'
        },
        {
            id: 2,
            studentName: 'Jane Smith',
            studentId: 'PG/MBA/2023/002',
            programme: 'MBA',
            level: 'Masters',
            session: '2023/2024',
            semester: 'First Semester',
            submissionType: 'Dissertation Proposal',
            title: 'Strategic Management in Digital Transformation Era',
            submissionDate: '2024-01-12',
            status: 'External Review',
            supervisor: 'Prof. Mary Wilson',
            coSupervisor: null,
            supervisorRecommendation: 'Approved',
            expectedDefenseDate: '2024-04-20',
            description: 'Analysis of strategic management approaches for organizations undergoing digital transformation.',
            researchArea: 'Strategic Management',
            yearOfStudy: '2nd Year'
        },
        {
            id: 3,
            studentName: 'Michael Brown',
            studentId: 'PG/MATH/2022/003',
            programme: 'Ph.D Mathematics',
            level: 'PhD',
            session: '2023/2024',
            semester: 'Second Semester',
            submissionType: 'Final Thesis',
            title: 'Advanced Statistical Methods in Financial Risk Assessment',
            submissionDate: '2024-01-10',
            status: 'Approved',
            supervisor: 'Dr. Robert Davis',
            coSupervisor: 'Prof. Lisa Anderson',
            supervisorRecommendation: 'Highly Recommended',
            expectedDefenseDate: '2024-02-28',
            description: 'Development of novel statistical methodologies for comprehensive financial risk evaluation and management.',
            researchArea: 'Applied Statistics',
            yearOfStudy: '4th Year'
        },
        {
            id: 4,
            studentName: 'Sarah Wilson',
            studentId: 'PG/PHY/2023/004',
            programme: 'M.Sc Physics',
            level: 'Masters',
            session: '2023/2024',
            semester: 'First Semester',
            submissionType: 'Research Proposal',
            title: 'Quantum Computing Applications in Cryptography',
            submissionDate: '2024-01-08',
            status: 'Requires Revision',
            supervisor: 'Dr. Lisa Anderson',
            coSupervisor: null,
            supervisorRecommendation: 'Approved with Conditions',
            expectedDefenseDate: '2024-05-15',
            description: 'Exploration of quantum computing principles and their applications in modern cryptographic systems.',
            researchArea: 'Quantum Physics',
            yearOfStudy: '1st Year'
        },
        {
            id: 5,
            studentName: 'David Lee',
            studentId: 'PG/DS/2023/005',
            programme: 'M.Sc Data Science',
            level: 'Masters',
            session: '2023/2024',
            semester: 'First Semester',
            submissionType: 'Project Report',
            title: 'Big Data Analytics for Smart City Infrastructure',
            submissionDate: '2024-01-05',
            status: 'Supervisor Approved',
            supervisor: 'Prof. James Taylor',
            coSupervisor: 'Dr. Patricia Moore',
            supervisorRecommendation: 'Recommended',
            expectedDefenseDate: '2024-06-10',
            description: 'Implementation of big data analytics solutions for optimizing smart city infrastructure and services.',
            researchArea: 'Data Analytics',
            yearOfStudy: '2nd Year'
        }
    ];

    function init() {
        loadSubmissions();
        renderPage();
        setupEventListeners();
    }

    function loadSubmissions() {
        submissions = [...mockSubmissions];
        filteredSubmissions = [...submissions];
    }

    function renderPage() {
        const content = document.getElementById('submissions-page-content');
        if (!content) return;

        content.innerHTML = `
            <div class="page-header">
                <h2>Postgraduate School Submissions</h2>
                <p>Review and manage postgraduate student research submissions, thesis proposals, and defense documents</p>
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
                        <input type="text" id="search-input" placeholder="Search by name, ID, or title...">
                    </div>
                    
                    <div class="filter-actions">
                        <button class="btn btn-secondary" id="clear-filters">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                        <button class="btn btn-primary">
                            <i class="fas fa-download"></i> Export Report
                        </button>
                        <button class="btn btn-success">
                            <i class="fas fa-calendar"></i> Defense Schedule
                        </button>
                    </div>
                </div>
            </div>

            <div class="results-summary">
                <p>Showing ${filteredSubmissions.length} of ${submissions.length} PG submissions</p>
                <div class="summary-stats">
                    <span class="stat-item light">
                        Pending: ${submissions.filter(s => s.status === 'Pending').length}
                    </span>
                    <span class="stat-item secondary">
                        Under Review: ${submissions.filter(s => s.status === 'Under Review').length}
                    </span>
                    <span class="stat-item warning">
                        Dean Review: ${submissions.filter(s => s.status === 'Dean Review').length}
                    </span>
                    <span class="stat-item primary">
                        External Review: ${submissions.filter(s => s.status === 'External Review').length}
                    </span>
                    <span class="stat-item success">
                        Approved: ${submissions.filter(s => s.status === 'Approved').length}
                    </span>
                </div>
            </div>

            <div class="submissions-list" id="submissions-list"></div>
        `;

        renderSubmissionsList();
    }

    function renderSubmissionsList() {
        const listContainer = document.getElementById('submissions-list');
        if (!listContainer) return;

        if (filteredSubmissions.length > 0) {
            listContainer.innerHTML = filteredSubmissions.map(submission => `
                <div class="submission-card">
                    <div class="submission-header">
                        <div class="submission-info">
                            <h4>${submission.title}</h4>
                            <p class="submission-meta">
                                <strong>${submission.studentName}</strong> (${submission.studentId}) • ${submission.programme}
                            </p>
                            <p class="submission-details">
                                ${submission.submissionType} • ${submission.level} • ${submission.yearOfStudy} • ${submission.session}
                            </p>
                        </div>
                        <div class="submission-status ${getStatusColor(submission.status)}">
                            ${submission.status}
                        </div>
                    </div>
                    
                    <div class="submission-body">
                        <p class="submission-description">${submission.description}</p>
                        
                        <div class="submission-metadata">
                            <div class="metadata-grid">
                                <span><i class="fas fa-user"></i> Supervisor: ${submission.supervisor}</span>
                                ${submission.coSupervisor ? `
                                    <span><i class="fas fa-user-plus"></i> Co-Supervisor: ${submission.coSupervisor}</span>
                                ` : ''}
                                <span><i class="fas fa-calendar"></i> Submitted: ${submission.submissionDate}</span>
                                <span><i class="fas fa-calendar-check"></i> Expected Defense: ${submission.expectedDefenseDate}</span>
                                <span><i class="fas fa-flask"></i> Research Area: ${submission.researchArea}</span>
                            </div>
                        </div>
                        
                        <div class="supervisor-recommendation">
                            <strong>Supervisor Recommendation:</strong>
                            <span class="recommendation-badge ${getSupervisorRecommendationColor(submission.supervisorRecommendation)}">
                                ${submission.supervisorRecommendation}
                            </span>
                        </div>
                    </div>
                    
                    <div class="submission-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-download"></i> Download
                        </button>
                        <select class="status-select" data-submission-id="${submission.id}">
                            ${statuses.map(status => 
                                `<option value="${status}" ${status === submission.status ? 'selected' : ''}>${status}</option>`
                            ).join('')}
                        </select>
                        <button class="btn btn-success">
                            <i class="fas fa-comment"></i> Add Comment
                        </button>
                        <button class="btn btn-warning">
                            <i class="fas fa-users"></i> Assign External Examiner
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-calendar-alt"></i> Schedule Defense
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            listContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No PG submissions found</h3>
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

        // Status change event listeners
        document.addEventListener('change', (e) => {
            if (e.target.classList.contains('status-select')) {
                const submissionId = parseInt(e.target.dataset.submissionId);
                const newStatus = e.target.value;
                handleStatusChange(submissionId, newStatus);
            }
        });
    }

    function applyFilters() {
        let filtered = submissions;

        if (selectedSession) {
            filtered = filtered.filter(sub => sub.session === selectedSession);
        }
        if (selectedSemester) {
            filtered = filtered.filter(sub => sub.semester === selectedSemester);
        }
        if (selectedProgramme) {
            filtered = filtered.filter(sub => sub.programme === selectedProgramme);
        }
        if (selectedLevel) {
            filtered = filtered.filter(sub => sub.level === selectedLevel);
        }
        if (selectedStatus) {
            filtered = filtered.filter(sub => sub.status === selectedStatus);
        }
        if (searchTerm) {
            filtered = filtered.filter(sub => 
                sub.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sub.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                sub.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filteredSubmissions = filtered;
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

    function handleStatusChange(submissionId, newStatus) {
        submissions = submissions.map(sub => 
            sub.id === submissionId ? { ...sub, status: newStatus } : sub
        );
        applyFilters();
    }

    function getStatusColor(status) {
        switch (status) {
            case 'Approved': return 'success';
            case 'Supervisor Approved': return 'info';
            case 'Dean Review': return 'warning';
            case 'External Review': return 'primary';
            case 'Under Review': return 'secondary';
            case 'Pending': return 'light';
            case 'Rejected': return 'danger';
            case 'Requires Revision': return 'warning';
            default: return 'primary';
        }
    }

    function getSupervisorRecommendationColor(recommendation) {
        switch (recommendation) {
            case 'Highly Recommended': return 'success';
            case 'Recommended': return 'info';
            case 'Approved': return 'success';
            case 'Approved with Conditions': return 'warning';
            case 'Not Recommended': return 'danger';
            default: return 'secondary';
        }
    }

    // Initialize the page
    init();
});
