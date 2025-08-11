// HOD Old Students Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let oldStudents = [];
    let filteredStudents = [];
    let selectedSession = '';
    let selectedProgramme = '';
    let selectedStatus = '';
    let searchTerm = '';

    // Available options for filters
    const sessions = ['2020/2021', '2021/2022', '2022/2023', '2023/2024'];
    const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry'];
    const statuses = ['Graduated', 'Withdrawn', 'Suspended', 'Transferred'];

    // Initialize the page
    function init() {
        loadOldStudents();
        renderPage();
        setupEventListeners();
    }

    // Load old students data
    function loadOldStudents() {
        // Simulate API call to fetch old students
        const mockOldStudents = [
            {
                id: 1,
                studentName: 'John Doe',
                studentId: 'CS/2020/001',
                programme: 'Computer Science',
                session: '2020/2021',
                graduationDate: '2023-06-15',
                status: 'Graduated',
                gpa: '3.85',
                thesis: 'AI-Based Student Management System',
                supervisor: 'Dr. Smith Johnson',
                contactEmail: 'john.doe@email.com',
                contactPhone: '+234 801 234 5678'
            },
            {
                id: 2,
                studentName: 'Jane Smith',
                studentId: 'DS/2021/002',
                programme: 'Data Science',
                session: '2021/2022',
                graduationDate: '2024-06-20',
                status: 'Graduated',
                gpa: '3.92',
                thesis: 'Big Data Analytics in Healthcare',
                supervisor: 'Prof. Mary Wilson',
                contactEmail: 'jane.smith@email.com',
                contactPhone: '+234 802 345 6789'
            },
            {
                id: 3,
                studentName: 'Michael Brown',
                studentId: 'CS/2020/003',
                programme: 'Computer Science',
                session: '2020/2021',
                graduationDate: '2023-06-10',
                status: 'Graduated',
                gpa: '3.78',
                thesis: 'Blockchain-Based Voting System',
                supervisor: 'Dr. Robert Davis',
                contactEmail: 'michael.brown@email.com',
                contactPhone: '+234 803 456 7890'
            },
            {
                id: 4,
                studentName: 'Sarah Wilson',
                studentId: 'MATH/2021/004',
                programme: 'Mathematics',
                session: '2021/2022',
                graduationDate: '2024-06-25',
                status: 'Graduated',
                gpa: '3.95',
                thesis: 'Advanced Statistical Methods in Finance',
                supervisor: 'Dr. Lisa Anderson',
                contactEmail: 'sarah.wilson@email.com',
                contactPhone: '+234 804 567 8901'
            },
            {
                id: 5,
                studentName: 'David Lee',
                studentId: 'PHY/2020/005',
                programme: 'Physics',
                session: '2020/2021',
                graduationDate: null,
                status: 'Withdrawn',
                gpa: '2.85',
                thesis: 'Quantum Mechanics Experiments',
                supervisor: 'Prof. James Taylor',
                contactEmail: 'david.lee@email.com',
                contactPhone: '+234 805 678 9012'
            }
        ];
        
        oldStudents = mockOldStudents;
        filteredStudents = mockOldStudents;
    }

    // Render the page content
    function renderPage() {
        const content = document.getElementById('hod-old-students-content');
        content.innerHTML = `
            <div class="hod-old-students-container">
                <div class="hod-old-students-header">
                    <h2>Former Students</h2>
                    <p>View and manage records of former students from your department</p>
                </div>

                <!-- Filters Section -->
                <div class="hod-filters-section">
                    <div class="hod-filters-grid">
                        <div class="hod-filter-group">
                            <label for="session-filter">Session:</label>
                            <select id="session-filter" class="hod-filter-select">
                                <option value="">All Sessions</option>
                                ${sessions.map(session => `<option value="${session}">${session}</option>`).join('')}
                            </select>
                        </div>
                        <div class="hod-filter-group">
                            <label for="programme-filter">Programme:</label>
                            <select id="programme-filter" class="hod-filter-select">
                                <option value="">All Programmes</option>
                                ${programmes.map(programme => `<option value="${programme}">${programme}</option>`).join('')}
                            </select>
                        </div>
                        <div class="hod-filter-group">
                            <label for="status-filter">Status:</label>
                            <select id="status-filter" class="hod-filter-select">
                                <option value="">All Statuses</option>
                                ${statuses.map(status => `<option value="${status}">${status}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="hod-search-section">
                        <div class="hod-search-box">
                            <input type="text" id="search-input" placeholder="Search by student name, ID, or thesis..." class="hod-search-input">
                            <button class="hod-search-btn">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                        <button id="clear-filters-btn" class="hod-clear-filters-btn">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                    </div>
                </div>

                <!-- Statistics Summary -->
                <div class="hod-stats-summary">
                    <div class="hod-stat-item hod-stat-success">
                        <i class="fas fa-graduation-cap"></i>
                        <div>
                            <h3>${oldStudents.filter(s => s.status === 'Graduated').length}</h3>
                            <p>Graduated</p>
                        </div>
                    </div>
                    <div class="hod-stat-item hod-stat-warning">
                        <i class="fas fa-user-times"></i>
                        <div>
                            <h3>${oldStudents.filter(s => s.status === 'Withdrawn').length}</h3>
                            <p>Withdrawn</p>
                        </div>
                    </div>
                    <div class="hod-stat-item hod-stat-danger">
                        <i class="fas fa-ban"></i>
                        <div>
                            <h3>${oldStudents.filter(s => s.status === 'Suspended').length}</h3>
                            <p>Suspended</p>
                        </div>
                    </div>
                    <div class="hod-stat-item hod-stat-info">
                        <i class="fas fa-exchange-alt"></i>
                        <div>
                            <h3>${oldStudents.filter(s => s.status === 'Transferred').length}</h3>
                            <p>Transferred</p>
                        </div>
                    </div>
                </div>

                <!-- Students List -->
                <div class="hod-old-students-list" id="old-students-list">
                    ${renderOldStudentsList()}
                </div>
            </div>
        `;
    }

    // Render old students list
    function renderOldStudentsList() {
        if (filteredStudents.length === 0) {
            return `
                <div class="hod-no-students">
                    <i class="fas fa-users"></i>
                    <h3>No students found</h3>
                    <p>No former students match the current filters.</p>
                </div>
            `;
        }

        return filteredStudents.map(student => `
            <div class="hod-student-card" data-id="${student.id}">
                <div class="hod-student-header">
                    <div class="hod-student-info">
                        <h3>${student.studentName}</h3>
                        <span class="hod-student-id">${student.studentId}</span>
                    </div>
                    <div class="hod-student-status">
                        <span class="hod-status-badge hod-status-${student.status.toLowerCase()}">
                            ${student.status}
                        </span>
                    </div>
                </div>
                <div class="hod-student-details">
                    <div class="hod-student-academic">
                        <div class="hod-academic-row">
                            <span class="hod-academic-label">Programme:</span>
                            <span class="hod-academic-value">${student.programme}</span>
                        </div>
                        <div class="hod-academic-row">
                            <span class="hod-academic-label">Session:</span>
                            <span class="hod-academic-value">${student.session}</span>
                        </div>
                        <div class="hod-academic-row">
                            <span class="hod-academic-label">GPA:</span>
                            <span class="hod-academic-value hod-gpa-${getGPAClass(student.gpa)}">${student.gpa}</span>
                        </div>
                        <div class="hod-academic-row">
                            <span class="hod-academic-label">Supervisor:</span>
                            <span class="hod-academic-value">${student.supervisor}</span>
                        </div>
                        ${student.graduationDate ? `
                        <div class="hod-academic-row">
                            <span class="hod-academic-label">Graduation Date:</span>
                            <span class="hod-academic-value">${formatDate(student.graduationDate)}</span>
                        </div>
                        ` : ''}
                    </div>
                    <div class="hod-student-thesis">
                        <h4>Thesis/Project:</h4>
                        <p>${student.thesis}</p>
                    </div>
                    <div class="hod-student-contact">
                        <h4>Contact Information:</h4>
                        <div class="hod-contact-info">
                            <div class="hod-contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>${student.contactEmail}</span>
                            </div>
                            <div class="hod-contact-item">
                                <i class="fas fa-phone"></i>
                                <span>${student.contactPhone}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hod-student-actions">
                    <button class="hod-action-btn hod-view-btn" onclick="viewStudent(${student.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="hod-action-btn hod-download-btn" onclick="downloadTranscript(${student.id})">
                        <i class="fas fa-download"></i> Download Transcript
                    </button>
                    <button class="hod-action-btn hod-edit-btn" onclick="editStudent(${student.id})">
                        <i class="fas fa-edit"></i> Edit Record
                    </button>
                </div>
            </div>
        `).join('');
    }

    // Get GPA class for styling
    function getGPAClass(gpa) {
        const gpaNum = parseFloat(gpa);
        if (gpaNum >= 3.5) return 'excellent';
        if (gpaNum >= 3.0) return 'good';
        if (gpaNum >= 2.5) return 'average';
        return 'poor';
    }

    // Setup event listeners
    function setupEventListeners() {
        // Filter change events
        document.getElementById('session-filter').addEventListener('change', function(e) {
            selectedSession = e.target.value;
            applyFilters();
        });

        document.getElementById('programme-filter').addEventListener('change', function(e) {
            selectedProgramme = e.target.value;
            applyFilters();
        });

        document.getElementById('status-filter').addEventListener('change', function(e) {
            selectedStatus = e.target.value;
            applyFilters();
        });

        // Search functionality
        document.getElementById('search-input').addEventListener('input', function(e) {
            searchTerm = e.target.value;
            applyFilters();
        });

        // Clear filters
        document.getElementById('clear-filters-btn').addEventListener('click', clearFilters);
    }

    // Apply filters
    function applyFilters() {
        filteredStudents = oldStudents.filter(student => {
            const matchesSession = !selectedSession || student.session === selectedSession;
            const matchesProgramme = !selectedProgramme || student.programme === selectedProgramme;
            const matchesStatus = !selectedStatus || student.status === selectedStatus;
            const matchesSearch = !searchTerm || 
                student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                student.thesis.toLowerCase().includes(searchTerm.toLowerCase());

            return matchesSession && matchesProgramme && matchesStatus && matchesSearch;
        });

        document.getElementById('old-students-list').innerHTML = renderOldStudentsList();
    }

    // Clear all filters
    function clearFilters() {
        selectedSession = '';
        selectedProgramme = '';
        selectedStatus = '';
        searchTerm = '';

        document.getElementById('session-filter').value = '';
        document.getElementById('programme-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('search-input').value = '';

        filteredStudents = oldStudents;
        document.getElementById('old-students-list').innerHTML = renderOldStudentsList();
    }

    // Format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Global functions for button actions
    window.viewStudent = function(studentId) {
        const student = oldStudents.find(s => s.id === studentId);
        if (student) {
            alert(`Viewing student: ${student.studentName}\nStatus: ${student.status}\nGPA: ${student.gpa}`);
            // In a real application, this would open a modal or navigate to a detailed view
        }
    };

    window.downloadTranscript = function(studentId) {
        const student = oldStudents.find(s => s.id === studentId);
        if (student) {
            alert(`Downloading transcript for: ${student.studentName}`);
            // In a real application, this would trigger a file download
        }
    };

    window.editStudent = function(studentId) {
        const student = oldStudents.find(s => s.id === studentId);
        if (student) {
            alert(`Editing record for: ${student.studentName}`);
            // In a real application, this would open an edit form
        }
    };

    // Initialize the page
    init();
});

