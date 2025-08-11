// Registrar Graduation Page JavaScript
let graduationData = [];
let filteredData = [];
let selectedSession = '';
let selectedProgramme = '';
let selectedLevel = '';
let selectedStatus = '';
let searchTerm = '';
let loading = true;
let showGraduationModal = false;
let selectedGraduand = null;
let showCeremonyModal = false;
let ceremonyForm = {
    session: '',
    date: '',
    venue: '',
    time: '',
    theme: '',
    guestSpeaker: '',
    capacity: ''
};

const sessions = ['2023/2024', '2024/2025', '2025/2026'];
const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'MBA'];
const levels = ['Undergraduate', 'Masters', 'PhD', 'Postgraduate Diploma'];
const statuses = ['Eligible', 'Cleared', 'Graduated', 'Pending Clearance', 'Deferred'];
const degreeClasses = ['First Class', 'Second Class Upper', 'Second Class Lower', 'Third Class', 'Pass', 'Distinction', 'Merit'];

document.addEventListener('DOMContentLoaded', function() {
    init();
});

function init() {
    loadGraduationData();
    setupEventListeners();
}

function loadGraduationData() {
    graduationData = [
        {
            id: 1,
            studentName: 'Jennifer Adams',
            studentId: 'CS/2022/001',
            programme: 'Computer Science',
            level: 'Masters',
            session: '2024/2025',
            cgpa: '4.25',
            totalCredits: 45,
            completedCredits: 45,
            degreeClass: 'Distinction',
            status: 'Cleared',
            graduationDate: '2024-07-20',
            thesisTitle: 'Machine Learning Applications in Cybersecurity',
            supervisor: 'Dr. Smith Johnson',
            externalExaminer: 'Prof. External Expert',
            defenseDate: '2024-06-15',
            defenseResult: 'Passed',
            clearanceItems: {
                library: true,
                bursary: true,
                department: true,
                hostel: true,
                clinic: true
            },
            certificateNumber: 'CERT/CS/2024/001',
            convocationEligible: true,
            awards: ['Best Graduating Student', 'Academic Excellence Award'],
            contactEmail: 'jennifer.adams@student.edu.ng',
            contactPhone: '+234-801-111-2222'
        },
        {
            id: 2,
            studentName: 'Michael Thompson',
            studentId: 'MBA/2023/002',
            programme: 'MBA',
            level: 'Masters',
            session: '2024/2025',
            cgpa: '3.85',
            totalCredits: 60,
            completedCredits: 60,
            degreeClass: 'Merit',
            status: 'Eligible',
            graduationDate: null,
            thesisTitle: 'Strategic Management in Digital Transformation',
            supervisor: 'Prof. Mary Wilson',
            externalExaminer: 'Dr. Business Expert',
            defenseDate: '2024-06-20',
            defenseResult: 'Passed',
            clearanceItems: {
                library: true,
                bursary: false,
                department: true,
                hostel: true,
                clinic: true
            },
            certificateNumber: null,
            convocationEligible: false,
            awards: [],
            contactEmail: 'michael.thompson@student.edu.ng',
            contactPhone: '+234-802-222-3333'
        },
        {
            id: 3,
            studentName: 'Sarah Mitchell',
            studentId: 'MATH/2021/003',
            programme: 'Mathematics',
            level: 'PhD',
            session: '2024/2025',
            cgpa: '4.85',
            totalCredits: 90,
            completedCredits: 90,
            degreeClass: 'Distinction',
            status: 'Graduated',
            graduationDate: '2024-07-20',
            thesisTitle: 'Advanced Topics in Differential Equations and Their Applications',
            supervisor: 'Dr. Lisa Anderson',
            externalExaminer: 'Prof. Math Authority',
            defenseDate: '2024-05-30',
            defenseResult: 'Passed with Excellence',
            clearanceItems: {
                library: true,
                bursary: true,
                department: true,
                hostel: true,
                clinic: true
            },
            certificateNumber: 'CERT/MATH/2024/003',
            convocationEligible: true,
            awards: ['Outstanding PhD Research', 'Dean\'s List'],
            contactEmail: 'sarah.mitchell@student.edu.ng',
            contactPhone: '+234-803-333-4444'
        },
        {
            id: 4,
            studentName: 'David Rodriguez',
            studentId: 'PHY/2020/004',
            programme: 'Physics',
            level: 'Undergraduate',
            session: '2024/2025',
            cgpa: '3.15',
            totalCredits: 120,
            completedCredits: 118,
            degreeClass: 'Second Class Lower',
            status: 'Pending Clearance',
            graduationDate: null,
            thesisTitle: 'Quantum Mechanics in Modern Physics Applications',
            supervisor: 'Prof. James Taylor',
            externalExaminer: null,
            defenseDate: null,
            defenseResult: null,
            clearanceItems: {
                library: false,
                bursary: false,
                department: true,
                hostel: false,
                clinic: true
            },
            certificateNumber: null,
            convocationEligible: false,
            awards: [],
            outstandingCredits: 2,
            outstandingCourses: ['PHY401', 'PHY402'],
            contactEmail: 'david.rodriguez@student.edu.ng',
            contactPhone: '+234-804-444-5555'
        },
        {
            id: 5,
            studentName: 'Lisa Chen',
            studentId: 'DS/2022/005',
            programme: 'Data Science',
            level: 'Masters',
            session: '2024/2025',
            cgpa: '3.95',
            totalCredits: 45,
            completedCredits: 45,
            degreeClass: 'Merit',
            status: 'Deferred',
            graduationDate: null,
            thesisTitle: 'Big Data Analytics in Healthcare Systems',
            supervisor: 'Prof. James Taylor',
            externalExaminer: 'Dr. Data Expert',
            defenseDate: '2024-06-25',
            defenseResult: 'Passed',
            clearanceItems: {
                library: true,
                bursary: true,
                department: true,
                hostel: true,
                clinic: true
            },
            certificateNumber: null,
            convocationEligible: false,
            deferralReason: 'Personal circumstances',
            deferralSession: '2025/2026',
            awards: [],
            contactEmail: 'lisa.chen@student.edu.ng',
            contactPhone: '+234-805-555-6666'
        }
    ];
    filteredData = [...graduationData];
    loading = false;
    renderPage();
}

function renderPage() {
    if (loading) {
        document.getElementById('graduation-page-content').innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Loading graduation data...</p>
            </div>
        `;
        return;
    }

    const content = `
        <div class="page-header">
            <h2>Graduation Management</h2>
            <p>Manage student graduation processes, clearances, and ceremony planning</p>
        </div>

        <div class="filters-section">
            <div class="filters-grid">
                <div class="filter-group">
                    <label>Session:</label>
                    <select id="session-filter">
                        <option value="">All Sessions</option>
                        ${sessions.map(session => `<option value="${session}" ${selectedSession === session ? 'selected' : ''}>${session}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Programme:</label>
                    <select id="programme-filter">
                        <option value="">All Programmes</option>
                        ${programmes.map(programme => `<option value="${programme}" ${selectedProgramme === programme ? 'selected' : ''}>${programme}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Level:</label>
                    <select id="level-filter">
                        <option value="">All Levels</option>
                        ${levels.map(level => `<option value="${level}" ${selectedLevel === level ? 'selected' : ''}>${level}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Status:</label>
                    <select id="status-filter">
                        <option value="">All Statuses</option>
                        ${statuses.map(status => `<option value="${status}" ${selectedStatus === status ? 'selected' : ''}>${status}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Search:</label>
                    <input type="text" id="search-filter" placeholder="Search by name, ID, or thesis..." value="${searchTerm}" />
                </div>
                
                <div class="filter-actions">
                    <button class="btn btn-secondary" id="clear-filters">
                        <i class="fas fa-times"></i> Clear Filters
                    </button>
                    <button class="btn btn-success" id="schedule-ceremony-btn">
                        <i class="fas fa-calendar-plus"></i> Schedule Ceremony
                    </button>
                    <button class="btn btn-primary">
                        <i class="fas fa-download"></i> Export Graduation List
                    </button>
                </div>
            </div>
        </div>

        <div class="results-summary">
            <p>Showing ${filteredData.length} of ${graduationData.length} graduation records</p>
            <div class="summary-stats">
                <span class="stat-item success">
                    Graduated: ${graduationData.filter(g => g.status === 'Graduated').length}
                </span>
                <span class="stat-item info">
                    Cleared: ${graduationData.filter(g => g.status === 'Cleared').length}
                </span>
                <span class="stat-item primary">
                    Eligible: ${graduationData.filter(g => g.status === 'Eligible').length}
                </span>
                <span class="stat-item warning">
                    Pending Clearance: ${graduationData.filter(g => g.status === 'Pending Clearance').length}
                </span>
                <span class="stat-item secondary">
                    Deferred: ${graduationData.filter(g => g.status === 'Deferred').length}
                </span>
            </div>
        </div>

        <div class="graduation-list">
            ${renderGraduationList()}
        </div>

        ${showGraduationModal ? renderGraduationModal() : ''}
        ${showCeremonyModal ? renderCeremonyModal() : ''}
    `;

    document.getElementById('graduation-page-content').innerHTML = content;
    setupModalEventListeners();
}

function renderGraduationList() {
    if (filteredData.length === 0) {
        return `
            <div class="no-results">
                <i class="fas fa-graduation-cap"></i>
                <h3>No graduation records found</h3>
                <p>Try adjusting your filters or search criteria</p>
            </div>
        `;
    }

    return filteredData.map(graduand => `
        <div class="graduation-card">
            <div class="graduation-header">
                <div class="graduation-info">
                    <h4>${graduand.studentName}</h4>
                    <p class="graduation-meta">
                        <strong>${graduand.studentId}</strong> • ${graduand.programme}
                    </p>
                    <p class="graduation-details">
                        ${graduand.level} • ${graduand.session} • CGPA: ${graduand.cgpa}
                    </p>
                </div>
                <div class="graduation-badges">
                    <div class="graduation-status ${getStatusColor(graduand.status)}">
                        ${graduand.status}
                    </div>
                    <div class="degree-class ${getDegreeClassColor(graduand.degreeClass)}">
                        ${graduand.degreeClass}
                    </div>
                </div>
            </div>
            
            <div class="graduation-body">
                <div class="thesis-info">
                    <strong>Thesis:</strong> ${graduand.thesisTitle}
                    <br />
                    <strong>Supervisor:</strong> ${graduand.supervisor}
                    ${graduand.defenseDate ? `
                        <br />
                        <strong>Defense:</strong> ${graduand.defenseDate} - ${graduand.defenseResult}
                    ` : ''}
                </div>
                
                <div class="clearance-progress">
                    <div class="clearance-header">
                        <strong>Clearance Progress: ${getClearanceProgress(graduand.clearanceItems)}%</strong>
                    </div>
                    <div class="clearance-checklist">
                        <div class="clearance-item ${graduand.clearanceItems.library ? 'completed' : 'pending'}">
                            <i class="fas ${graduand.clearanceItems.library ? 'fa-check-circle' : 'fa-circle'}"></i>
                            Library
                        </div>
                        <div class="clearance-item ${graduand.clearanceItems.bursary ? 'completed' : 'pending'}">
                            <i class="fas ${graduand.clearanceItems.bursary ? 'fa-check-circle' : 'fa-circle'}"></i>
                            Bursary
                        </div>
                        <div class="clearance-item ${graduand.clearanceItems.department ? 'completed' : 'pending'}">
                            <i class="fas ${graduand.clearanceItems.department ? 'fa-check-circle' : 'fa-circle'}"></i>
                            Department
                        </div>
                        <div class="clearance-item ${graduand.clearanceItems.hostel ? 'completed' : 'pending'}">
                            <i class="fas ${graduand.clearanceItems.hostel ? 'fa-check-circle' : 'fa-circle'}"></i>
                            Hostel
                        </div>
                        <div class="clearance-item ${graduand.clearanceItems.clinic ? 'completed' : 'pending'}">
                            <i class="fas ${graduand.clearanceItems.clinic ? 'fa-check-circle' : 'fa-circle'}"></i>
                            Clinic
                        </div>
                    </div>
                </div>
                
                <div class="academic-summary">
                    <div class="credits-info">
                        <strong>Credits:</strong> ${graduand.completedCredits}/${graduand.totalCredits}
                    </div>
                    ${graduand.outstandingCredits ? `
                        <div class="outstanding-info">
                            <strong>Outstanding:</strong> ${graduand.outstandingCredits} credits
                            <br />
                            <strong>Courses:</strong> ${graduand.outstandingCourses.join(', ')}
                        </div>
                    ` : ''}
                </div>
                
                ${graduand.awards && graduand.awards.length > 0 ? `
                    <div class="awards-section">
                        <strong>Awards:</strong>
                        <div class="awards-list">
                            ${graduand.awards.map(award => `<span class="award-badge">${award}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${graduand.certificateNumber ? `
                    <div class="certificate-info">
                        <strong>Certificate Number:</strong> ${graduand.certificateNumber}
                    </div>
                ` : ''}
                
                ${graduand.graduationDate ? `
                    <div class="graduation-date">
                        <strong>Graduation Date:</strong> ${graduand.graduationDate}
                    </div>
                ` : ''}
                
                ${graduand.deferralReason ? `
                    <div class="deferral-info">
                        <strong>Deferral Reason:</strong> ${graduand.deferralReason}
                        <br />
                        <strong>Deferred to:</strong> ${graduand.deferralSession}
                    </div>
                ` : ''}
                
                <div class="contact-info">
                    <span><i class="fas fa-envelope"></i> ${graduand.contactEmail}</span>
                    <span><i class="fas fa-phone"></i> ${graduand.contactPhone}</span>
                </div>
            </div>
            
            <div class="graduation-actions">
                <button class="btn btn-primary view-graduand-btn" data-graduand-id="${graduand.id}">
                    <i class="fas fa-eye"></i> View Details
                </button>
                <select class="status-select" data-graduand-id="${graduand.id}">
                    ${statuses.map(status => `<option value="${status}" ${graduand.status === status ? 'selected' : ''}>${status}</option>`).join('')}
                </select>
                <button class="btn btn-info">
                    <i class="fas fa-certificate"></i> Generate Certificate
                </button>
                <button class="btn btn-success">
                    <i class="fas fa-check"></i> Update Clearance
                </button>
                <button class="btn btn-warning">
                    <i class="fas fa-graduation-cap"></i> Convocation List
                </button>
            </div>
        </div>
    `).join('');
}

function renderGraduationModal() {
    if (!selectedGraduand) return '';
    
    return `
        <div class="modal-overlay" id="graduation-modal-overlay">
            <div class="modal-content graduation-modal">
                <div class="modal-header">
                    <h3>Graduation Details: ${selectedGraduand.studentName}</h3>
                    <button id="close-graduation-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="graduation-full-details">
                        <div class="detail-section">
                            <h4>Student Information</h4>
                            <div class="detail-grid">
                                <div><strong>Name:</strong> ${selectedGraduand.studentName}</div>
                                <div><strong>Student ID:</strong> ${selectedGraduand.studentId}</div>
                                <div><strong>Programme:</strong> ${selectedGraduand.programme}</div>
                                <div><strong>Level:</strong> ${selectedGraduand.level}</div>
                                <div><strong>Session:</strong> ${selectedGraduand.session}</div>
                                <div><strong>CGPA:</strong> ${selectedGraduand.cgpa}</div>
                                <div><strong>Degree Class:</strong> ${selectedGraduand.degreeClass}</div>
                                <div><strong>Status:</strong> ${selectedGraduand.status}</div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Academic Information</h4>
                            <div class="detail-grid">
                                <div><strong>Thesis Title:</strong> ${selectedGraduand.thesisTitle}</div>
                                <div><strong>Supervisor:</strong> ${selectedGraduand.supervisor}</div>
                                <div><strong>External Examiner:</strong> ${selectedGraduand.externalExaminer || 'N/A'}</div>
                                <div><strong>Defense Date:</strong> ${selectedGraduand.defenseDate || 'N/A'}</div>
                                <div><strong>Defense Result:</strong> ${selectedGraduand.defenseResult || 'N/A'}</div>
                                <div><strong>Credits:</strong> ${selectedGraduand.completedCredits}/${selectedGraduand.totalCredits}</div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Clearance Status</h4>
                            <div class="clearance-status-modal">
                                ${Object.entries(selectedGraduand.clearanceItems).map(([item, status]) => `
                                    <div class="clearance-item-modal ${status ? 'completed' : 'pending'}">
                                        <i class="fas ${status ? 'fa-check-circle' : 'fa-times-circle'}"></i>
                                        ${item.charAt(0).toUpperCase() + item.slice(1)}: ${status ? 'Cleared' : 'Pending'}
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        
                        ${selectedGraduand.awards && selectedGraduand.awards.length > 0 ? `
                            <div class="detail-section">
                                <h4>Awards and Recognition</h4>
                                <div class="awards-list-modal">
                                    ${selectedGraduand.awards.map(award => `<div class="award-item-modal">${award}</div>`).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderCeremonyModal() {
    return `
        <div class="modal-overlay" id="ceremony-modal-overlay">
            <div class="modal-content ceremony-modal">
                <div class="modal-header">
                    <h3>Schedule Graduation Ceremony</h3>
                    <button id="close-ceremony-modal">&times;</button>
                </div>
                <form id="ceremony-form" class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Session:</label>
                            <select id="ceremony-session" required>
                                <option value="">Select Session</option>
                                ${sessions.map(session => `<option value="${session}" ${ceremonyForm.session === session ? 'selected' : ''}>${session}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Date:</label>
                            <input type="date" id="ceremony-date" value="${ceremonyForm.date}" required />
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Venue:</label>
                            <input type="text" id="ceremony-venue" value="${ceremonyForm.venue}" placeholder="e.g., University Auditorium" required />
                        </div>
                        
                        <div class="form-group">
                            <label>Time:</label>
                            <input type="time" id="ceremony-time" value="${ceremonyForm.time}" required />
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Theme:</label>
                        <input type="text" id="ceremony-theme" value="${ceremonyForm.theme}" placeholder="Graduation ceremony theme" required />
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Guest Speaker:</label>
                            <input type="text" id="ceremony-speaker" value="${ceremonyForm.guestSpeaker}" placeholder="Name of guest speaker" />
                        </div>
                        
                        <div class="form-group">
                            <label>Capacity:</label>
                            <input type="number" id="ceremony-capacity" value="${ceremonyForm.capacity}" placeholder="Maximum attendees" required />
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" id="cancel-ceremony-btn">Cancel</button>
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-calendar-plus"></i> Schedule Ceremony
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function setupEventListeners() {
    document.addEventListener('change', function(e) {
        if (e.target.id === 'session-filter') {
            selectedSession = e.target.value;
            applyFilters();
        } else if (e.target.id === 'programme-filter') {
            selectedProgramme = e.target.value;
            applyFilters();
        } else if (e.target.id === 'level-filter') {
            selectedLevel = e.target.value;
            applyFilters();
        } else if (e.target.id === 'status-filter') {
            selectedStatus = e.target.value;
            applyFilters();
        } else if (e.target.classList.contains('status-select')) {
            const graduandId = parseInt(e.target.getAttribute('data-graduand-id'));
            const newStatus = e.target.value;
            handleStatusUpdate(graduandId, newStatus);
        }
    });

    document.addEventListener('input', function(e) {
        if (e.target.id === 'search-filter') {
            searchTerm = e.target.value;
            applyFilters();
        }
    });

    document.addEventListener('click', function(e) {
        if (e.target.id === 'clear-filters') {
            clearFilters();
        } else if (e.target.id === 'schedule-ceremony-btn') {
            handleScheduleCeremony();
        } else if (e.target.classList.contains('view-graduand-btn')) {
            const graduandId = parseInt(e.target.getAttribute('data-graduand-id'));
            handleViewGraduand(graduandId);
        }
    });
}

function setupModalEventListeners() {
    if (showGraduationModal) {
        const overlay = document.getElementById('graduation-modal-overlay');
        const closeBtn = document.getElementById('close-graduation-modal');
        
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) closeGraduationModal();
            });
        }
        if (closeBtn) closeBtn.addEventListener('click', closeGraduationModal);
    }
    
    if (showCeremonyModal) {
        const overlay = document.getElementById('ceremony-modal-overlay');
        const closeBtn = document.getElementById('close-ceremony-modal');
        const cancelBtn = document.getElementById('cancel-ceremony-btn');
        const form = document.getElementById('ceremony-form');
        
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) closeCeremonyModal();
            });
        }
        if (closeBtn) closeBtn.addEventListener('click', closeCeremonyModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeCeremonyModal);
        if (form) form.addEventListener('submit', handleSubmitCeremony);
    }
}

function applyFilters() {
    let filtered = graduationData;

    if (selectedSession) {
        filtered = filtered.filter(grad => grad.session === selectedSession);
    }
    if (selectedProgramme) {
        filtered = filtered.filter(grad => grad.programme === selectedProgramme);
    }
    if (selectedLevel) {
        filtered = filtered.filter(grad => grad.level === selectedLevel);
    }
    if (selectedStatus) {
        filtered = filtered.filter(grad => grad.status === selectedStatus);
    }
    if (searchTerm) {
        filtered = filtered.filter(grad => 
            grad.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            grad.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            grad.thesisTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    filteredData = filtered;
    renderPage();
}

function clearFilters() {
    selectedSession = '';
    selectedProgramme = '';
    selectedLevel = '';
    selectedStatus = '';
    searchTerm = '';
    
    const sessionFilter = document.getElementById('session-filter');
    const programmeFilter = document.getElementById('programme-filter');
    const levelFilter = document.getElementById('level-filter');
    const statusFilter = document.getElementById('status-filter');
    const searchFilter = document.getElementById('search-filter');
    
    if (sessionFilter) sessionFilter.value = '';
    if (programmeFilter) programmeFilter.value = '';
    if (levelFilter) levelFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    if (searchFilter) searchFilter.value = '';
    
    applyFilters();
}

function handleViewGraduand(graduandId) {
    selectedGraduand = graduationData.find(grad => grad.id === graduandId);
    showGraduationModal = true;
    renderPage();
}

function closeGraduationModal() {
    showGraduationModal = false;
    selectedGraduand = null;
    renderPage();
}

function handleStatusUpdate(graduandId, newStatus) {
    graduationData = graduationData.map(grad => 
        grad.id === graduandId 
            ? { 
                ...grad, 
                status: newStatus,
                graduationDate: newStatus === 'Graduated' 
                    ? new Date().toISOString().split('T')[0] 
                    : grad.graduationDate
            } 
            : grad
    );
    applyFilters();
}

function handleScheduleCeremony() {
    ceremonyForm = {
        session: '',
        date: '',
        venue: '',
        time: '',
        theme: '',
        guestSpeaker: '',
        capacity: ''
    };
    showCeremonyModal = true;
    renderPage();
}

function closeCeremonyModal() {
    showCeremonyModal = false;
    renderPage();
}

function handleSubmitCeremony(e) {
    e.preventDefault();
    
    const formData = {
        session: document.getElementById('ceremony-session').value,
        date: document.getElementById('ceremony-date').value,
        venue: document.getElementById('ceremony-venue').value,
        time: document.getElementById('ceremony-time').value,
        theme: document.getElementById('ceremony-theme').value,
        guestSpeaker: document.getElementById('ceremony-speaker').value,
        capacity: document.getElementById('ceremony-capacity').value
    };

    alert('Graduation ceremony scheduled successfully!');
    closeCeremonyModal();
}

function getStatusColor(status) {
    switch (status) {
        case 'Graduated': return 'success';
        case 'Cleared': return 'info';
        case 'Eligible': return 'primary';
        case 'Pending Clearance': return 'warning';
        case 'Deferred': return 'secondary';
        default: return 'primary';
    }
}

function getDegreeClassColor(degreeClass) {
    switch (degreeClass) {
        case 'First Class':
        case 'Distinction': return 'success';
        case 'Second Class Upper':
        case 'Merit': return 'info';
        case 'Second Class Lower': return 'warning';
        case 'Third Class':
        case 'Pass': return 'secondary';
        default: return 'primary';
    }
}

function getClearanceProgress(clearanceItems) {
    const total = Object.keys(clearanceItems).length;
    const completed = Object.values(clearanceItems).filter(Boolean).length;
    return Math.round((completed / total) * 100);
}
