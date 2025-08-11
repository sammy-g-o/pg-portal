// HOD Recommend Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let students = [];
    let filteredStudents = [];
    let selectedSession = '';
    let selectedSemester = '';
    let selectedProgramme = '';
    let selectedRecommendationType = '';
    let searchTerm = '';
    let showRecommendationModal = false;
    let selectedStudent = null;
    let recommendationForm = {
        type: '',
        reason: '',
        details: '',
        priority: 'Medium',
        additionalNotes: ''
    };

    const sessions = ['2023/2024', '2024/2025', '2025/2026'];
    const semesters = ['First Semester', 'Second Semester'];
    const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry'];
    const recommendationTypes = ['Academic Excellence', 'Research Potential', 'Leadership', 'Special Consideration', 'Scholarship', 'Award'];
    const priorities = ['Low', 'Medium', 'High', 'Urgent'];

    function init() {
        loadStudents();
        setupEventListeners();
    }

    function loadStudents() {
        // Mock data for students eligible for recommendation
        students = [
            {
                id: 1,
                studentName: 'Jennifer Adams',
                studentId: 'CS/2024/001',
                programme: 'Computer Science',
                session: '2024/2025',
                semester: 'First Semester',
                currentLevel: '200 Level',
                cgpa: '3.85',
                email: 'jennifer.adams@email.com',
                phone: '+234-801-111-2222',
                supervisor: 'Dr. Smith Johnson',
                researchArea: 'Artificial Intelligence',
                achievements: ['Best Student Award 2023', 'Published Research Paper', 'Conference Presentation'],
                previousRecommendations: [
                    { type: 'Academic Excellence', date: '2023-12-15', status: 'Approved' }
                ]
            },
            {
                id: 2,
                studentName: 'Michael Thompson',
                studentId: 'DS/2024/002',
                programme: 'Data Science',
                session: '2024/2025',
                semester: 'First Semester',
                currentLevel: '300 Level',
                cgpa: '3.92',
                email: 'michael.thompson@email.com',
                phone: '+234-802-222-3333',
                supervisor: 'Prof. Mary Wilson',
                researchArea: 'Big Data Analytics',
                achievements: ['Outstanding Project Award', 'Research Grant Recipient', 'Student Representative'],
                previousRecommendations: [
                    { type: 'Research Potential', date: '2023-11-20', status: 'Approved' },
                    { type: 'Leadership', date: '2024-01-10', status: 'Pending' }
                ]
            },
            {
                id: 3,
                studentName: 'Sarah Mitchell',
                studentId: 'MATH/2024/003',
                programme: 'Mathematics',
                session: '2024/2025',
                semester: 'First Semester',
                currentLevel: '400 Level',
                cgpa: '3.95',
                email: 'sarah.mitchell@email.com',
                phone: '+234-803-333-4444',
                supervisor: 'Dr. Lisa Anderson',
                researchArea: 'Applied Mathematics',
                achievements: ['Valedictorian Candidate', 'Mathematics Olympiad Winner', 'Teaching Assistant'],
                previousRecommendations: [
                    { type: 'Academic Excellence', date: '2023-10-05', status: 'Approved' },
                    { type: 'Scholarship', date: '2024-01-15', status: 'Approved' }
                ]
            },
            {
                id: 4,
                studentName: 'David Rodriguez',
                studentId: 'PHY/2024/004',
                programme: 'Physics',
                session: '2024/2025',
                semester: 'First Semester',
                currentLevel: '300 Level',
                cgpa: '3.68',
                email: 'david.rodriguez@email.com',
                phone: '+234-804-444-5555',
                supervisor: 'Prof. James Taylor',
                researchArea: 'Quantum Physics',
                achievements: ['Physics Society President', 'Lab Equipment Innovation', 'Peer Tutor'],
                previousRecommendations: [
                    { type: 'Leadership', date: '2023-09-12', status: 'Approved' }
                ]
            },
            {
                id: 5,
                studentName: 'Amanda Foster',
                studentId: 'CHEM/2024/005',
                programme: 'Chemistry',
                session: '2024/2025',
                semester: 'First Semester',
                currentLevel: '200 Level',
                cgpa: '3.71',
                email: 'amanda.foster@email.com',
                phone: '+234-805-666-7777',
                supervisor: 'Dr. Patricia Moore',
                researchArea: 'Organic Chemistry',
                achievements: ['Chemistry Lab Excellence Award', 'Safety Committee Member'],
                previousRecommendations: []
            }
        ];
        
        filteredStudents = [...students];
        renderPage();
    }

    function renderPage() {
        const container = document.getElementById('hod-recommend-content');
        container.innerHTML = `
            <div class="recommend-page">
                <div class="page-header">
                    <h2>Student Recommendations</h2>
                    <p>Recommend students for awards, scholarships, special recognition, or other opportunities</p>
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
                            <label>Search:</label>
                            <input type="text" id="search-input" placeholder="Search by name or ID...">
                        </div>
                        
                        <div class="filter-actions">
                            <button class="btn btn-secondary" onclick="clearFilters()">
                                <i class="fas fa-times"></i> Clear Filters
                            </button>
                            <button class="btn btn-primary" onclick="exportList()">
                                <i class="fas fa-download"></i> Export List
                            </button>
                        </div>
                    </div>
                </div>

                <div class="results-summary">
                    <p>Showing ${filteredStudents.length} of ${students.length} students eligible for recommendation</p>
                </div>

                <div class="students-list">
                    ${renderStudentsList()}
                </div>

                ${showRecommendationModal ? renderRecommendationModal() : ''}
            </div>
        `;
    }

    function renderStudentsList() {
        if (filteredStudents.length === 0) {
            return `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No students found</h3>
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
                            ${student.currentLevel} • CGPA: ${student.cgpa} • ${student.session}
                        </p>
                    </div>
                    <div class="cgpa-badge">
                        CGPA: ${student.cgpa}
                    </div>
                </div>
                
                <div class="student-body">
                    <div class="academic-info">
                        <div class="supervisor-info">
                            <strong>Supervisor:</strong> ${student.supervisor}<br>
                            <strong>Research Area:</strong> ${student.researchArea}
                        </div>
                    </div>
                    
                    <div class="achievements-section">
                        <strong>Achievements:</strong>
                        <div class="achievements-list">
                            ${student.achievements.map(achievement => `
                                <span class="achievement-badge">${achievement}</span>
                            `).join('')}
                        </div>
                    </div>
                    
                    ${student.previousRecommendations.length > 0 ? `
                        <div class="previous-recommendations">
                            <strong>Previous Recommendations:</strong>
                            <div class="recommendations-list">
                                ${student.previousRecommendations.map(rec => `
                                    <div class="recommendation-item">
                                        <span class="rec-type">${rec.type}</span>
                                        <span class="rec-date">${rec.date}</span>
                                        <span class="rec-status ${getRecommendationStatusColor(rec.status)}">
                                            ${rec.status}
                                        </span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    ` : ''}
                    
                    <div class="contact-info">
                        <span><i class="fas fa-envelope"></i> ${student.email}</span>
                        <span><i class="fas fa-phone"></i> ${student.phone}</span>
                    </div>
                </div>
                
                <div class="student-actions">
                    <button class="btn btn-primary" onclick="viewProfile(${student.id})">
                        <i class="fas fa-eye"></i> View Profile
                    </button>
                    <button class="btn btn-info" onclick="viewAcademicRecords(${student.id})">
                        <i class="fas fa-file-alt"></i> Academic Records
                    </button>
                    <button class="btn btn-success" onclick="openRecommendationModal(${student.id})">
                        <i class="fas fa-thumbs-up"></i> Recommend
                    </button>
                    <button class="btn btn-warning" onclick="viewRecommendationHistory(${student.id})">
                        <i class="fas fa-history"></i> Recommendation History
                    </button>
                </div>
            </div>
        `).join('');
    }

    function renderRecommendationModal() {
        if (!selectedStudent) return '';
        
        return `
            <div class="modal-overlay" onclick="closeRecommendationModal()">
                <div class="modal-content recommendation-modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h3>Recommend Student: ${selectedStudent.studentName}</h3>
                        <button onclick="closeRecommendationModal()">&times;</button>
                    </div>
                    <form onsubmit="submitRecommendation(event)" class="modal-body">
                        <div class="form-group">
                            <label>Recommendation Type:</label>
                            <select id="rec-type" required>
                                <option value="">Select Type</option>
                                ${recommendationTypes.map(type => `<option value="${type}">${type}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Priority:</label>
                            <select id="rec-priority">
                                ${priorities.map(priority => `<option value="${priority}">${priority}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Reason for Recommendation:</label>
                            <textarea
                                id="rec-reason"
                                placeholder="Provide the main reason for this recommendation..."
                                rows="3"
                                required
                            ></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>Detailed Justification:</label>
                            <textarea
                                id="rec-details"
                                placeholder="Provide detailed justification and supporting evidence..."
                                rows="4"
                                required
                            ></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>Additional Notes (Optional):</label>
                            <textarea
                                id="rec-notes"
                                placeholder="Any additional notes or comments..."
                                rows="2"
                            ></textarea>
                        </div>
                        
                        <div class="modal-actions">
                            <button type="button" class="btn btn-secondary" onclick="closeRecommendationModal()">
                                Cancel
                            </button>
                            <button type="submit" class="btn btn-success">
                                <i class="fas fa-paper-plane"></i> Submit Recommendation
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
            } else if (e.target.id === 'semester-filter') {
                selectedSemester = e.target.value;
                applyFilters();
            } else if (e.target.id === 'programme-filter') {
                selectedProgramme = e.target.value;
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
            filtered = filtered.filter(student => student.session === selectedSession);
        }
        if (selectedSemester) {
            filtered = filtered.filter(student => student.semester === selectedSemester);
        }
        if (selectedProgramme) {
            filtered = filtered.filter(student => student.programme === selectedProgramme);
        }
        if (searchTerm) {
            filtered = filtered.filter(student => 
                student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.studentId.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filteredStudents = filtered;
        renderPage();
    }

    function getRecommendationStatusColor(status) {
        switch (status) {
            case 'Approved': return 'success';
            case 'Pending': return 'warning';
            case 'Rejected': return 'danger';
            default: return 'primary';
        }
    }

    // Global functions for button actions
    window.clearFilters = function() {
        selectedSession = '';
        selectedSemester = '';
        selectedProgramme = '';
        selectedRecommendationType = '';
        searchTerm = '';
        
        document.getElementById('session-filter').value = '';
        document.getElementById('semester-filter').value = '';
        document.getElementById('programme-filter').value = '';
        document.getElementById('search-input').value = '';
        
        applyFilters();
    };

    window.exportList = function() {
        alert('Export functionality will be implemented here');
    };

    window.viewProfile = function(studentId) {
        alert(`View profile for student ID: ${studentId}`);
    };

    window.viewAcademicRecords = function(studentId) {
        alert(`View academic records for student ID: ${studentId}`);
    };

    window.openRecommendationModal = function(studentId) {
        selectedStudent = students.find(s => s.id === studentId);
        showRecommendationModal = true;
        renderPage();
    };

    window.closeRecommendationModal = function() {
        showRecommendationModal = false;
        selectedStudent = null;
        renderPage();
    };

    window.submitRecommendation = function(event) {
        event.preventDefault();
        
        const formData = {
            type: document.getElementById('rec-type').value,
            priority: document.getElementById('rec-priority').value,
            reason: document.getElementById('rec-reason').value,
            details: document.getElementById('rec-details').value,
            additionalNotes: document.getElementById('rec-notes').value
        };

        // Update the student's recommendations locally
        students = students.map(student => 
            student.id === selectedStudent.id 
                ? {
                    ...student,
                    previousRecommendations: [
                        ...student.previousRecommendations,
                        {
                            type: formData.type,
                            date: new Date().toISOString().split('T')[0],
                            status: 'Pending'
                        }
                    ]
                }
                : student
        );

        alert(`Recommendation submitted for ${selectedStudent.studentName}`);
        closeRecommendationModal();
        applyFilters();
    };

    window.viewRecommendationHistory = function(studentId) {
        alert(`View recommendation history for student ID: ${studentId}`);
    };

    init();
});

