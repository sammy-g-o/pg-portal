// Registrar Courses Page JavaScript
let courses = [];
let filteredCourses = [];
let selectedSession = '';
let selectedSemester = '';
let selectedProgramme = '';
let selectedLevel = '';
let selectedStatus = '';
let searchTerm = '';
let showCourseModal = false;
let selectedCourse = null;
let isEditing = false;
let courseForm = {
    courseCode: '',
    courseTitle: '',
    creditUnits: '',
    programme: '',
    level: '',
    semester: '',
    session: '',
    instructor: '',
    venue: '',
    schedule: '',
    capacity: '',
    status: 'Active'
};

// Available options for filters
const sessions = ['2023/2024', '2024/2025', '2025/2026'];
const semesters = ['First Semester', 'Second Semester'];
const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'MBA'];
const levels = ['100 Level', '200 Level', '300 Level', '400 Level', 'Masters', 'PhD'];
const statuses = ['Active', 'Inactive', 'Completed', 'Cancelled'];
const instructors = ['Dr. Smith Johnson', 'Prof. Mary Wilson', 'Dr. Lisa Anderson', 'Prof. James Taylor', 'Dr. Patricia Moore'];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    init();
});

function init() {
    loadCourses();
    setupEventListeners();
}

function loadCourses() {
    // Mock course data
    courses = [
        {
            id: 1,
            courseCode: 'CSC501',
            courseTitle: 'Advanced Algorithms and Data Structures',
            creditUnits: 3,
            programme: 'Computer Science',
            level: 'Masters',
            semester: 'First Semester',
            session: '2024/2025',
            instructor: 'Dr. Smith Johnson',
            venue: 'Computer Lab 1',
            schedule: 'Monday 10:00-13:00, Wednesday 14:00-16:00',
            capacity: 30,
            enrolledStudents: 25,
            status: 'Active',
            description: 'Advanced study of algorithms, data structures, and their applications in software development',
            prerequisites: ['CSC301', 'CSC302'],
            learningOutcomes: [
                'Design and analyze complex algorithms',
                'Implement advanced data structures',
                'Optimize algorithm performance'
            ],
            assessmentMethods: ['Assignments (30%)', 'Mid-term Exam (30%)', 'Final Project (40%)'],
            textbooks: ['Introduction to Algorithms by Cormen', 'Algorithm Design by Kleinberg'],
            lastUpdated: '2024-01-15'
        },
        {
            id: 2,
            courseCode: 'MBA601',
            courseTitle: 'Strategic Management',
            creditUnits: 4,
            programme: 'MBA',
            level: 'Masters',
            semester: 'First Semester',
            session: '2024/2025',
            instructor: 'Prof. Mary Wilson',
            venue: 'Business Hall A',
            schedule: 'Tuesday 09:00-12:00, Thursday 14:00-17:00',
            capacity: 40,
            enrolledStudents: 38,
            status: 'Active',
            description: 'Comprehensive study of strategic management principles and practices in modern organizations',
            prerequisites: ['MBA501', 'MBA502'],
            learningOutcomes: [
                'Develop strategic thinking capabilities',
                'Analyze competitive environments',
                'Formulate and implement business strategies'
            ],
            assessmentMethods: ['Case Studies (25%)', 'Group Project (35%)', 'Final Exam (40%)'],
            textbooks: ['Strategic Management by Thompson', 'Competitive Strategy by Porter'],
            lastUpdated: '2024-01-20'
        },
        {
            id: 3,
            courseCode: 'MTH701',
            courseTitle: 'Advanced Mathematical Analysis',
            creditUnits: 3,
            programme: 'Mathematics',
            level: 'PhD',
            semester: 'First Semester',
            session: '2024/2025',
            instructor: 'Dr. Lisa Anderson',
            venue: 'Mathematics Seminar Room',
            schedule: 'Monday 14:00-17:00, Friday 10:00-12:00',
            capacity: 15,
            enrolledStudents: 12,
            status: 'Active',
            description: 'Advanced topics in mathematical analysis including measure theory and functional analysis',
            prerequisites: ['MTH601', 'MTH602'],
            learningOutcomes: [
                'Master advanced analysis techniques',
                'Understand measure theory concepts',
                'Apply functional analysis methods'
            ],
            assessmentMethods: ['Research Paper (50%)', 'Oral Presentation (25%)', 'Final Exam (25%)'],
            textbooks: ['Real Analysis by Royden', 'Functional Analysis by Rudin'],
            lastUpdated: '2024-01-10'
        },
        {
            id: 4,
            courseCode: 'PHY301',
            courseTitle: 'Quantum Mechanics I',
            creditUnits: 3,
            programme: 'Physics',
            level: '300 Level',
            semester: 'First Semester',
            session: '2024/2025',
            instructor: 'Prof. James Taylor',
            venue: 'Physics Lecture Hall',
            schedule: 'Monday 08:00-10:00, Wednesday 10:00-12:00, Friday 14:00-15:00',
            capacity: 50,
            enrolledStudents: 45,
            status: 'Active',
            description: 'Introduction to quantum mechanics principles and applications',
            prerequisites: ['PHY201', 'PHY202', 'MTH201'],
            learningOutcomes: [
                'Understand quantum mechanical principles',
                'Solve Schrödinger equation',
                'Apply quantum mechanics to physical systems'
            ],
            assessmentMethods: ['Assignments (20%)', 'Mid-term Exam (30%)', 'Final Exam (50%)'],
            textbooks: ['Introduction to Quantum Mechanics by Griffiths', 'Quantum Physics by Eisberg'],
            lastUpdated: '2024-01-12'
        },
        {
            id: 5,
            courseCode: 'DSC502',
            courseTitle: 'Machine Learning and AI',
            creditUnits: 4,
            programme: 'Data Science',
            level: 'Masters',
            semester: 'First Semester',
            session: '2024/2025',
            instructor: 'Dr. Patricia Moore',
            venue: 'Data Science Lab',
            schedule: 'Tuesday 10:00-13:00, Thursday 10:00-13:00',
            capacity: 25,
            enrolledStudents: 24,
            status: 'Active',
            description: 'Comprehensive study of machine learning algorithms and artificial intelligence techniques',
            prerequisites: ['DSC501', 'CSC301'],
            learningOutcomes: [
                'Implement machine learning algorithms',
                'Design AI systems',
                'Evaluate model performance'
            ],
            assessmentMethods: ['Programming Assignments (40%)', 'Project (35%)', 'Final Exam (25%)'],
            textbooks: ['Pattern Recognition and Machine Learning by Bishop', 'The Elements of Statistical Learning'],
            lastUpdated: '2024-01-18'
        },
        {
            id: 6,
            courseCode: 'CHM401',
            courseTitle: 'Advanced Organic Chemistry',
            creditUnits: 3,
            programme: 'Chemistry',
            level: '400 Level',
            semester: 'Second Semester',
            session: '2023/2024',
            instructor: 'Dr. Patricia Moore',
            venue: 'Chemistry Lab 2',
            schedule: 'Monday 14:00-17:00, Wednesday 14:00-16:00',
            capacity: 35,
            enrolledStudents: 32,
            status: 'Completed',
            description: 'Advanced topics in organic chemistry including synthesis and reaction mechanisms',
            prerequisites: ['CHM301', 'CHM302'],
            learningOutcomes: [
                'Master organic synthesis techniques',
                'Understand reaction mechanisms',
                'Design synthetic pathways'
            ],
            assessmentMethods: ['Lab Reports (30%)', 'Mid-term Exam (30%)', 'Final Exam (40%)'],
            textbooks: ['Advanced Organic Chemistry by March', 'Organic Chemistry by Clayden'],
            lastUpdated: '2023-12-15',
            completionDate: '2024-05-20',
            finalGrades: 'A: 8, B: 15, C: 7, D: 2'
        }
    ];
    
    filteredCourses = [...courses];
    renderPage();
}

function renderPage() {
    const content = `
        <!-- Page Header -->
        <div class="page-header">
            <h2>Course Management</h2>
            <p>Manage course offerings, schedules, and academic programs</p>
        </div>

        <!-- Filters Section -->
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
                    <label>Semester:</label>
                    <select id="semester-filter">
                        <option value="">All Semesters</option>
                        ${semesters.map(semester => `<option value="${semester}" ${selectedSemester === semester ? 'selected' : ''}>${semester}</option>`).join('')}
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
                    <input
                        type="text"
                        id="search-filter"
                        placeholder="Search by code, title, or instructor..."
                        value="${searchTerm}"
                    />
                </div>
                
                <div class="filter-actions">
                    <button class="btn btn-secondary" id="clear-filters">
                        <i class="fas fa-times"></i> Clear Filters
                    </button>
                    <button class="btn btn-success" id="add-course-btn">
                        <i class="fas fa-plus"></i> Add Course
                    </button>
                    <button class="btn btn-primary">
                        <i class="fas fa-download"></i> Export Courses
                    </button>
                </div>
            </div>
        </div>

        <!-- Results Summary -->
        <div class="results-summary">
            <p>Showing ${filteredCourses.length} of ${courses.length} courses</p>
            <div class="summary-stats">
                <span class="stat-item success">
                    Active: ${courses.filter(c => c.status === 'Active').length}
                </span>
                <span class="stat-item info">
                    Completed: ${courses.filter(c => c.status === 'Completed').length}
                </span>
                <span class="stat-item warning">
                    Inactive: ${courses.filter(c => c.status === 'Inactive').length}
                </span>
                <span class="stat-item danger">
                    Cancelled: ${courses.filter(c => c.status === 'Cancelled').length}
                </span>
            </div>
        </div>

        <!-- Courses List -->
        <div class="courses-list">
            ${renderCoursesList()}
        </div>

        <!-- Course Modal -->
        ${showCourseModal ? renderCourseModal() : ''}
    `;
    
    document.getElementById('courses-page-content').innerHTML = content;
    setupModalEventListeners();
}

function renderCoursesList() {
    if (filteredCourses.length === 0) {
        return `
            <div class="no-results">
                <i class="fas fa-book"></i>
                <h3>No courses found</h3>
                <p>Try adjusting your filters or add a new course</p>
            </div>
        `;
    }
    
    return filteredCourses.map(course => `
        <div class="course-card">
            <div class="course-header">
                <div class="course-info">
                    <h4>${course.courseCode}: ${course.courseTitle}</h4>
                    <p class="course-meta">
                        <strong>${course.programme}</strong> • ${course.level} • ${course.creditUnits} Credits
                    </p>
                    <p class="course-details">
                        ${course.session} • ${course.semester} • ${course.instructor}
                    </p>
                </div>
                <div class="course-badges">
                    <div class="course-status ${getStatusColor(course.status)}">
                        ${course.status}
                    </div>
                    <div class="enrollment-status ${getEnrollmentStatus(course.enrolledStudents, course.capacity)}">
                        ${course.enrolledStudents}/${course.capacity}
                    </div>
                </div>
            </div>
            
            <div class="course-body">
                <div class="course-schedule">
                    <div class="schedule-item">
                        <strong>Schedule:</strong> ${course.schedule}
                    </div>
                    <div class="schedule-item">
                        <strong>Venue:</strong> ${course.venue}
                    </div>
                </div>
                
                ${course.description ? `
                    <div class="course-description">
                        <strong>Description:</strong> ${course.description}
                    </div>
                ` : ''}
                
                ${course.prerequisites && course.prerequisites.length > 0 ? `
                    <div class="prerequisites">
                        <strong>Prerequisites:</strong>
                        <div class="prerequisites-list">
                            ${course.prerequisites.map(prereq => `<span class="prerequisite-badge">${prereq}</span>`).join('')}
                        </div>
                    </div>
                ` : ''}
                
                ${course.learningOutcomes && course.learningOutcomes.length > 0 ? `
                    <div class="learning-outcomes">
                        <strong>Learning Outcomes:</strong>
                        <ul>
                            ${course.learningOutcomes.slice(0, 3).map(outcome => `<li>${outcome}</li>`).join('')}
                        </ul>
                    </div>
                ` : ''}
                
                ${course.assessmentMethods && course.assessmentMethods.length > 0 ? `
                    <div class="assessment-methods">
                        <strong>Assessment:</strong> ${course.assessmentMethods.join(', ')}
                    </div>
                ` : ''}
                
                ${course.completionDate ? `
                    <div class="completion-info">
                        <strong>Completed:</strong> ${course.completionDate}
                        <br />
                        <strong>Final Grades:</strong> ${course.finalGrades}
                    </div>
                ` : ''}
                
                <div class="course-metadata">
                    <span><i class="fas fa-calendar"></i> Last Updated: ${course.lastUpdated}</span>
                </div>
            </div>
            
            <div class="course-actions">
                <button class="btn btn-primary edit-course-btn" data-course-id="${course.id}">
                    <i class="fas fa-edit"></i> Edit Course
                </button>
                <button class="btn btn-info">
                    <i class="fas fa-users"></i> View Students
                </button>
                <button class="btn btn-success">
                    <i class="fas fa-chart-line"></i> Course Analytics
                </button>
                <button class="btn btn-warning">
                    <i class="fas fa-copy"></i> Duplicate
                </button>
                <button class="btn btn-secondary">
                    <i class="fas fa-download"></i> Export Data
                </button>
            </div>
        </div>
    `).join('');
}

function renderCourseModal() {
    return `
        <div class="modal-overlay" id="course-modal-overlay">
            <div class="modal-content course-modal">
                <div class="modal-header">
                    <h3>${isEditing ? 'Edit' : 'Add'} Course</h3>
                    <button id="close-course-modal">&times;</button>
                </div>
                <form id="course-form" class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Course Code:</label>
                            <input
                                type="text"
                                id="course-code"
                                value="${courseForm.courseCode}"
                                placeholder="e.g., CSC501"
                                required
                            />
                        </div>
                        
                        <div class="form-group">
                            <label>Credit Units:</label>
                            <input
                                type="number"
                                id="credit-units"
                                min="1"
                                max="6"
                                value="${courseForm.creditUnits}"
                                required
                            />
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Course Title:</label>
                        <input
                            type="text"
                            id="course-title"
                            value="${courseForm.courseTitle}"
                            placeholder="Enter course title"
                            required
                        />
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Programme:</label>
                            <select id="programme-select" required>
                                <option value="">Select Programme</option>
                                ${programmes.map(programme => `<option value="${programme}" ${courseForm.programme === programme ? 'selected' : ''}>${programme}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Level:</label>
                            <select id="level-select" required>
                                <option value="">Select Level</option>
                                ${levels.map(level => `<option value="${level}" ${courseForm.level === level ? 'selected' : ''}>${level}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Session:</label>
                            <select id="session-select" required>
                                <option value="">Select Session</option>
                                ${sessions.map(session => `<option value="${session}" ${courseForm.session === session ? 'selected' : ''}>${session}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Semester:</label>
                            <select id="semester-select" required>
                                <option value="">Select Semester</option>
                                ${semesters.map(semester => `<option value="${semester}" ${courseForm.semester === semester ? 'selected' : ''}>${semester}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Instructor:</label>
                            <select id="instructor-select" required>
                                <option value="">Select Instructor</option>
                                ${instructors.map(instructor => `<option value="${instructor}" ${courseForm.instructor === instructor ? 'selected' : ''}>${instructor}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Capacity:</label>
                            <input
                                type="number"
                                id="capacity"
                                min="1"
                                value="${courseForm.capacity}"
                                placeholder="Maximum students"
                                required
                            />
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Venue:</label>
                        <input
                            type="text"
                            id="venue"
                            value="${courseForm.venue}"
                            placeholder="e.g., Computer Lab 1"
                            required
                        />
                    </div>
                    
                    <div class="form-group">
                        <label>Schedule:</label>
                        <input
                            type="text"
                            id="schedule"
                            value="${courseForm.schedule}"
                            placeholder="e.g., Monday 10:00-13:00, Wednesday 14:00-16:00"
                            required
                        />
                    </div>
                    
                    <div class="form-group">
                        <label>Status:</label>
                        <select id="status-select">
                            ${statuses.map(status => `<option value="${status}" ${courseForm.status === status ? 'selected' : ''}>${status}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" id="cancel-course-btn">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-save"></i> ${isEditing ? 'Update' : 'Create'} Course
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function setupEventListeners() {
    // Filter event listeners
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
        } else if (e.target.id === 'level-filter') {
            selectedLevel = e.target.value;
            applyFilters();
        } else if (e.target.id === 'status-filter') {
            selectedStatus = e.target.value;
            applyFilters();
        }
    });

    // Search event listener
    document.addEventListener('input', function(e) {
        if (e.target.id === 'search-filter') {
            searchTerm = e.target.value;
            applyFilters();
        }
    });

    // Button event listeners
    document.addEventListener('click', function(e) {
        if (e.target.id === 'clear-filters') {
            clearFilters();
        } else if (e.target.id === 'add-course-btn') {
            handleAddCourse();
        } else if (e.target.classList.contains('edit-course-btn')) {
            const courseId = parseInt(e.target.getAttribute('data-course-id'));
            handleEditCourse(courseId);
        }
    });
}

function setupModalEventListeners() {
    if (showCourseModal) {
        const overlay = document.getElementById('course-modal-overlay');
        const closeBtn = document.getElementById('close-course-modal');
        const cancelBtn = document.getElementById('cancel-course-btn');
        const form = document.getElementById('course-form');
        
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeCourseModal();
                }
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', closeCourseModal);
        }
        
        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeCourseModal);
        }
        
        if (form) {
            form.addEventListener('submit', handleSubmitCourse);
        }
    }
}

function applyFilters() {
    let filtered = courses;

    if (selectedSession) {
        filtered = filtered.filter(course => course.session === selectedSession);
    }
    if (selectedSemester) {
        filtered = filtered.filter(course => course.semester === selectedSemester);
    }
    if (selectedProgramme) {
        filtered = filtered.filter(course => course.programme === selectedProgramme);
    }
    if (selectedLevel) {
        filtered = filtered.filter(course => course.level === selectedLevel);
    }
    if (selectedStatus) {
        filtered = filtered.filter(course => course.status === selectedStatus);
    }
    if (searchTerm) {
        filtered = filtered.filter(course => 
            course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    filteredCourses = filtered;
    renderPage();
}

function clearFilters() {
    selectedSession = '';
    selectedSemester = '';
    selectedProgramme = '';
    selectedLevel = '';
    selectedStatus = '';
    searchTerm = '';
    
    // Reset form values
    const sessionFilter = document.getElementById('session-filter');
    const semesterFilter = document.getElementById('semester-filter');
    const programmeFilter = document.getElementById('programme-filter');
    const levelFilter = document.getElementById('level-filter');
    const statusFilter = document.getElementById('status-filter');
    const searchFilter = document.getElementById('search-filter');
    
    if (sessionFilter) sessionFilter.value = '';
    if (semesterFilter) semesterFilter.value = '';
    if (programmeFilter) programmeFilter.value = '';
    if (levelFilter) levelFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    if (searchFilter) searchFilter.value = '';
    
    applyFilters();
}

function handleAddCourse() {
    selectedCourse = null;
    isEditing = false;
    courseForm = {
        courseCode: '',
        courseTitle: '',
        creditUnits: '',
        programme: '',
        level: '',
        semester: '',
        session: '',
        instructor: '',
        venue: '',
        schedule: '',
        capacity: '',
        status: 'Active'
    };
    showCourseModal = true;
    renderPage();
}

function handleEditCourse(courseId) {
    selectedCourse = courses.find(course => course.id === courseId);
    isEditing = true;
    courseForm = {
        courseCode: selectedCourse.courseCode,
        courseTitle: selectedCourse.courseTitle,
        creditUnits: selectedCourse.creditUnits.toString(),
        programme: selectedCourse.programme,
        level: selectedCourse.level,
        semester: selectedCourse.semester,
        session: selectedCourse.session,
        instructor: selectedCourse.instructor,
        venue: selectedCourse.venue,
        schedule: selectedCourse.schedule,
        capacity: selectedCourse.capacity.toString(),
        status: selectedCourse.status
    };
    showCourseModal = true;
    renderPage();
}

function handleSubmitCourse(e) {
    e.preventDefault();
    
    // Collect form data
    const formData = {
        courseCode: document.getElementById('course-code').value,
        courseTitle: document.getElementById('course-title').value,
        creditUnits: document.getElementById('credit-units').value,
        programme: document.getElementById('programme-select').value,
        level: document.getElementById('level-select').value,
        semester: document.getElementById('semester-select').value,
        session: document.getElementById('session-select').value,
        instructor: document.getElementById('instructor-select').value,
        venue: document.getElementById('venue').value,
        schedule: document.getElementById('schedule').value,
        capacity: document.getElementById('capacity').value,
        status: document.getElementById('status-select').value
    };
    
    if (isEditing) {
        // Update existing course
        courses = courses.map(course => 
            course.id === selectedCourse.id 
                ? {
                    ...course,
                    ...formData,
                    creditUnits: parseInt(formData.creditUnits),
                    capacity: parseInt(formData.capacity),
                    lastUpdated: new Date().toISOString().split('T')[0]
                  }
                : course
        );
        alert('Course updated successfully!');
    } else {
        // Add new course
        const newCourse = {
            id: courses.length + 1,
            ...formData,
            creditUnits: parseInt(formData.creditUnits),
            capacity: parseInt(formData.capacity),
            enrolledStudents: 0,
            description: '',
            prerequisites: [],
            learningOutcomes: [],
            assessmentMethods: [],
            textbooks: [],
            lastUpdated: new Date().toISOString().split('T')[0]
        };
        courses = [newCourse, ...courses];
        alert('Course created successfully!');
    }
    
    closeCourseModal();
}

function closeCourseModal() {
    showCourseModal = false;
    selectedCourse = null;
    renderPage();
}

function getStatusColor(status) {
    switch (status) {
        case 'Active': return 'success';
        case 'Completed': return 'info';
        case 'Inactive': return 'warning';
        case 'Cancelled': return 'danger';
        default: return 'primary';
    }
}

function getEnrollmentStatus(enrolled, capacity) {
    const percentage = (enrolled / capacity) * 100;
    if (percentage >= 90) return 'danger';
    if (percentage >= 75) return 'warning';
    return 'success';
}
