// Dean PG School Current Applicants Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let applicants = [];
    let filteredApplicants = [];
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
    const statuses = ['Submitted', 'Document Review', 'Supervisor Assignment', 'Interview Scheduled', 'Dean Review', 'Approved', 'Rejected', 'Waitlisted'];

    // Mock data for current PG applicants
    const mockApplicants = [
        {
            id: 1,
            applicantName: 'Jennifer Adams',
            applicationId: 'PG/APP/2024/001',
            programme: 'Ph.D Computer Science',
            level: 'PhD',
            session: '2024/2025',
            semester: 'First Semester',
            applicationDate: '2024-01-20',
            status: 'Dean Review',
            email: 'jennifer.adams@email.com',
            phone: '+234-801-111-2222',
            previousDegree: 'M.Sc Computer Science',
            previousInstitution: 'University of Lagos',
            cgpa: '4.75',
            researchInterest: 'Artificial Intelligence and Machine Learning',
            proposedSupervisor: 'Prof. Smith Johnson',
            supervisorApproval: 'Approved',
            researchProposal: 'Advanced Neural Networks for Medical Diagnosis',
            documents: ['Transcript', 'CV', 'Research Proposal', 'References', 'Statement of Purpose'],
            gre: '325',
            toefl: '110',
            workExperience: '3 years as Software Engineer at Microsoft'
        },
        {
            id: 2,
            applicantName: 'Michael Thompson',
            applicationId: 'PG/APP/2024/002',
            programme: 'MBA',
            level: 'Masters',
            session: '2024/2025',
            semester: 'First Semester',
            applicationDate: '2024-01-18',
            status: 'Interview Scheduled',
            email: 'michael.thompson@email.com',
            phone: '+234-802-222-3333',
            previousDegree: 'B.Sc Business Administration',
            previousInstitution: 'Obafemi Awolowo University',
            cgpa: '3.82',
            researchInterest: 'Strategic Management and Digital Transformation',
            proposedSupervisor: 'Prof. Mary Wilson',
            supervisorApproval: 'Approved',
            researchProposal: 'Digital Strategy Implementation in Nigerian SMEs',
            documents: ['Transcript', 'CV', 'Essays', 'References', 'GMAT Score'],
            gmat: '680',
            workExperience: '5 years as Business Analyst at Deloitte',
            interviewDate: '2024-02-15',
            interviewTime: '10:00 AM'
        },
        {
            id: 3,
            applicantName: 'Sarah Mitchell',
            applicationId: 'PG/APP/2024/003',
            programme: 'Ph.D Mathematics',
            level: 'PhD',
            session: '2024/2025',
            semester: 'First Semester',
            applicationDate: '2024-01-15',
            status: 'Approved',
            email: 'sarah.mitchell@email.com',
            phone: '+234-803-333-4444',
            previousDegree: 'M.Sc Mathematics',
            previousInstitution: 'University of Ibadan',
            cgpa: '4.95',
            researchInterest: 'Applied Mathematics and Numerical Analysis',
            proposedSupervisor: 'Dr. Lisa Anderson',
            supervisorApproval: 'Highly Recommended',
            researchProposal: 'Advanced Numerical Methods for Partial Differential Equations',
            documents: ['Transcript', 'CV', 'Research Proposal', 'References', 'Publications'],
            gre: '335',
            workExperience: '2 years as Research Assistant',
            approvalDate: '2024-01-25',
            deanComments: 'Exceptional candidate with strong research background'
        },
        {
            id: 4,
            applicantName: 'David Rodriguez',
            applicationId: 'PG/APP/2024/004',
            programme: 'M.Sc Physics',
            level: 'Masters',
            session: '2024/2025',
            semester: 'First Semester',
            applicationDate: '2024-01-12',
            status: 'Supervisor Assignment',
            email: 'david.rodriguez@email.com',
            phone: '+234-804-444-5555',
            previousDegree: 'B.Sc Physics',
            previousInstitution: 'Ahmadu Bello University',
            cgpa: '3.68',
            researchInterest: 'Quantum Physics and Condensed Matter',
            proposedSupervisor: 'Dr. James Taylor',
            supervisorApproval: 'Pending',
            researchProposal: 'Quantum Entanglement in Solid State Systems',
            documents: ['Transcript', 'CV', 'Research Proposal', 'References'],
            gre: '315',
            workExperience: '1 year as Lab Assistant'
        },
        {
            id: 5,
            applicantName: 'Lisa Chen',
            applicationId: 'PG/APP/2024/005',
            programme: 'M.Sc Data Science',
            level: 'Masters',
            session: '2024/2025',
            semester: 'First Semester',
            applicationDate: '2024-01-10',
            status: 'Waitlisted',
            email: 'lisa.chen@email.com',
            phone: '+234-805-555-6666',
            previousDegree: 'B.Sc Computer Science',
            previousInstitution: 'University of Benin',
            cgpa: '3.45',
            researchInterest: 'Machine Learning and Big Data Analytics',
            proposedSupervisor: 'Prof. James Taylor',
            supervisorApproval: 'Conditional',
            researchProposal: 'Predictive Analytics for Healthcare Systems',
            documents: ['Transcript', 'CV', 'Research Proposal', 'References'],
            gre: '310',
            workExperience: '2 years as Data Analyst',
            waitlistReason: 'Limited capacity in program, strong candidate for next intake'
        },
        {
            id: 6,
            applicantName: 'Robert Kim',
            applicationId: 'PG/APP/2024/006',
            programme: 'Ph.D Computer Science',
            level: 'PhD',
            session: '2024/2025',
            semester: 'First Semester',
            applicationDate: '2024-01-08',
            status: 'Rejected',
            email: 'robert.kim@email.com',
            phone: '+234-806-666-7777',
            previousDegree: 'M.Sc Computer Science',
            previousInstitution: 'Federal University of Technology',
            cgpa: '3.25',
            researchInterest: 'Software Engineering and Systems Design',
            proposedSupervisor: 'Dr. Smith Johnson',
            supervisorApproval: 'Not Approved',
            researchProposal: 'Automated Software Testing Frameworks',
            documents: ['Transcript', 'CV', 'Research Proposal'],
            gre: '295',
            workExperience: '1 year as Junior Developer',
            rejectionDate: '2024-01-25',
            rejectionReason: 'Below minimum CGPA requirement and weak research proposal'
        }
    ];

    function init() {
        loadApplicants();
        renderPage();
        setupEventListeners();
    }

    function loadApplicants() {
        applicants = [...mockApplicants];
        filteredApplicants = [...applicants];
    }

    function renderPage() {
        const content = document.getElementById('current-applicants-page-content');
        if (!content) return;

        content.innerHTML = `
            <div class="page-header">
                <h2>Postgraduate School Applications</h2>
                <p>Review and manage current postgraduate admission applications across all programs</p>
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
                        <input type="text" id="search-input" placeholder="Search by name, ID, or email...">
                    </div>
                    
                    <div class="filter-actions">
                        <button class="btn btn-secondary" id="clear-filters">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                        <button class="btn btn-primary">
                            <i class="fas fa-download"></i> Export Applications
                        </button>
                        <button class="btn btn-success">
                            <i class="fas fa-chart-bar"></i> Admission Statistics
                        </button>
                    </div>
                </div>
            </div>

            <div class="results-summary">
                <p>Showing ${filteredApplicants.length} of ${applicants.length} PG applications</p>
                <div class="summary-stats">
                    <span class="stat-item light">
                        Submitted: ${applicants.filter(a => a.status === 'Submitted').length}
                    </span>
                    <span class="stat-item secondary">
                        Document Review: ${applicants.filter(a => a.status === 'Document Review').length}
                    </span>
                    <span class="stat-item info">
                        Supervisor Assignment: ${applicants.filter(a => a.status === 'Supervisor Assignment').length}
                    </span>
                    <span class="stat-item primary">
                        Interview Scheduled: ${applicants.filter(a => a.status === 'Interview Scheduled').length}
                    </span>
                    <span class="stat-item warning">
                        Dean Review: ${applicants.filter(a => a.status === 'Dean Review').length}
                    </span>
                    <span class="stat-item success">
                        Approved: ${applicants.filter(a => a.status === 'Approved').length}
                    </span>
                </div>
            </div>

            <div class="applicants-list" id="applicants-list"></div>
        `;

        renderApplicantsList();
    }

    function renderApplicantsList() {
        const listContainer = document.getElementById('applicants-list');
        if (!listContainer) return;

        if (filteredApplicants.length > 0) {
            listContainer.innerHTML = filteredApplicants.map(applicant => `
                <div class="applicant-card">
                    <div class="applicant-header">
                        <div class="applicant-info">
                            <h4>${applicant.applicantName}</h4>
                            <p class="applicant-meta">
                                <strong>${applicant.applicationId}</strong> • ${applicant.programme}
                            </p>
                            <p class="applicant-details">
                                ${applicant.level} • ${applicant.session} • ${applicant.semester}
                            </p>
                        </div>
                        <div class="applicant-status ${getStatusColor(applicant.status)}">
                            ${applicant.status}
                        </div>
                    </div>
                    
                    <div class="applicant-body">
                        <div class="academic-background">
                            <div class="degree-info">
                                <strong>Previous Degree:</strong> ${applicant.previousDegree}
                                <br />
                                <strong>Institution:</strong> ${applicant.previousInstitution}
                                <br />
                                <strong>CGPA:</strong> ${applicant.cgpa}
                            </div>
                            
                            <div class="test-scores">
                                ${applicant.gre ? `<span><strong>GRE:</strong> ${applicant.gre}</span>` : ''}
                                ${applicant.gmat ? `<span><strong>GMAT:</strong> ${applicant.gmat}</span>` : ''}
                                ${applicant.toefl ? `<span><strong>TOEFL:</strong> ${applicant.toefl}</span>` : ''}
                            </div>
                        </div>
                        
                        <div class="research-info">
                            <strong>Research Interest:</strong> ${applicant.researchInterest}
                            <br />
                            <strong>Research Proposal:</strong> ${applicant.researchProposal}
                            <br />
                            <strong>Proposed Supervisor:</strong> ${applicant.proposedSupervisor}
                        </div>
                        
                        <div class="supervisor-approval">
                            <strong>Supervisor Approval:</strong>
                            <span class="approval-badge ${getSupervisorApprovalColor(applicant.supervisorApproval)}">
                                ${applicant.supervisorApproval}
                            </span>
                        </div>
                        
                        ${applicant.workExperience ? `
                            <div class="work-experience">
                                <strong>Work Experience:</strong> ${applicant.workExperience}
                            </div>
                        ` : ''}
                        
                        <div class="contact-info">
                            <span><i class="fas fa-envelope"></i> ${applicant.email}</span>
                            <span><i class="fas fa-phone"></i> ${applicant.phone}</span>
                            <span><i class="fas fa-calendar"></i> Applied: ${applicant.applicationDate}</span>
                        </div>
                        
                        <div class="documents-info">
                            <strong>Submitted Documents:</strong>
                            <div class="documents-list">
                                ${applicant.documents.map(doc => 
                                    `<span class="document-badge">${doc}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        ${applicant.interviewDate ? `
                            <div class="interview-info">
                                <strong>Interview Scheduled:</strong> ${applicant.interviewDate} at ${applicant.interviewTime}
                            </div>
                        ` : ''}
                        
                        ${applicant.approvalDate ? `
                            <div class="approval-info">
                                <strong>Approved:</strong> ${applicant.approvalDate}
                                <br />
                                <strong>Dean Comments:</strong> ${applicant.deanComments}
                            </div>
                        ` : ''}
                        
                        ${applicant.waitlistReason ? `
                            <div class="waitlist-info">
                                <strong>Waitlist Reason:</strong> ${applicant.waitlistReason}
                            </div>
                        ` : ''}
                        
                        ${applicant.rejectionReason ? `
                            <div class="rejection-info">
                                <strong>Rejection Reason:</strong> ${applicant.rejectionReason}
                                <br />
                                <strong>Date:</strong> ${applicant.rejectionDate}
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="applicant-actions">
                        <button class="btn btn-primary">
                            <i class="fas fa-eye"></i> View Full Application
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-download"></i> Download Documents
                        </button>
                        ${applicant.status === 'Dean Review' ? `
                            <button class="btn btn-success">
                                <i class="fas fa-check"></i> Approve
                            </button>
                            <button class="btn btn-danger">
                                <i class="fas fa-times"></i> Reject
                            </button>
                            <button class="btn btn-warning">
                                <i class="fas fa-clock"></i> Waitlist
                            </button>
                        ` : ''}
                        <select class="status-select" data-applicant-id="${applicant.id}">
                            ${statuses.map(status => 
                                `<option value="${status}" ${status === applicant.status ? 'selected' : ''}>${status}</option>`
                            ).join('')}
                        </select>
                        <button class="btn btn-secondary">
                            <i class="fas fa-user-plus"></i> Assign Supervisor
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-calendar"></i> Schedule Interview
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            listContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No PG applicants found</h3>
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
                const applicantId = parseInt(e.target.dataset.applicantId);
                const newStatus = e.target.value;
                handleStatusChange(applicantId, newStatus);
            }
        });
    }

    function applyFilters() {
        let filtered = applicants;

        if (selectedSession) {
            filtered = filtered.filter(app => app.session === selectedSession);
        }
        if (selectedSemester) {
            filtered = filtered.filter(app => app.semester === selectedSemester);
        }
        if (selectedProgramme) {
            filtered = filtered.filter(app => app.programme === selectedProgramme);
        }
        if (selectedLevel) {
            filtered = filtered.filter(app => app.level === selectedLevel);
        }
        if (selectedStatus) {
            filtered = filtered.filter(app => app.status === selectedStatus);
        }
        if (searchTerm) {
            filtered = filtered.filter(app => 
                app.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.applicationId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filteredApplicants = filtered;
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

    function handleStatusChange(applicantId, newStatus) {
        applicants = applicants.map(app => 
            app.id === applicantId ? { ...app, status: newStatus } : app
        );
        applyFilters();
    }

    function getStatusColor(status) {
        switch (status) {
            case 'Approved': return 'success';
            case 'Interview Scheduled': return 'primary';
            case 'Dean Review': return 'warning';
            case 'Supervisor Assignment': return 'info';
            case 'Document Review': return 'secondary';
            case 'Waitlisted': return 'warning';
            case 'Rejected': return 'danger';
            case 'Submitted': return 'light';
            default: return 'primary';
        }
    }

    function getSupervisorApprovalColor(approval) {
        switch (approval) {
            case 'Highly Recommended': return 'success';
            case 'Approved': return 'success';
            case 'Conditional': return 'warning';
            case 'Not Approved': return 'danger';
            case 'Pending': return 'secondary';
            default: return 'secondary';
        }
    }

    // Initialize the page
    init();
});
