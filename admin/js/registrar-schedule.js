// Registrar Schedule Page JavaScript
let schedules = [];
let filteredSchedules = [];
let selectedSession = '';
let selectedSemester = '';
let selectedProgramme = '';
let selectedLevel = '';
let selectedDay = '';
let searchTerm = '';
let loading = true;
let viewMode = 'list';
let showScheduleModal = false;
let selectedSchedule = null;
let isEditing = false;
let scheduleForm = {
    courseCode: '', courseTitle: '', instructor: '', venue: '', day: '',
    startTime: '', endTime: '', programme: '', level: '', session: '',
    semester: '', capacity: '', type: 'Lecture'
};

const sessions = ['2023/2024', '2024/2025', '2025/2026'];
const semesters = ['First Semester', 'Second Semester'];
const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'MBA'];
const levels = ['100 Level', '200 Level', '300 Level', '400 Level', 'Masters', 'PhD'];
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const venues = ['Computer Lab 1', 'Computer Lab 2', 'Physics Lab', 'Chemistry Lab', 'Mathematics Room', 'Business Hall A'];
const instructors = ['Dr. Smith Johnson', 'Prof. Mary Wilson', 'Dr. Lisa Anderson', 'Prof. James Taylor', 'Dr. Patricia Moore'];
const classTypes = ['Lecture', 'Laboratory', 'Tutorial', 'Seminar', 'Workshop'];

document.addEventListener('DOMContentLoaded', function() {
    init();
});

function init() {
    loadSchedules();
    setupEventListeners();
}

function loadSchedules() {
    schedules = [
        {
            id: 1, courseCode: 'CSC501', courseTitle: 'Advanced Algorithms and Data Structures',
            instructor: 'Dr. Smith Johnson', venue: 'Computer Lab 1', day: 'Monday',
            startTime: '10:00', endTime: '13:00', programme: 'Computer Science', level: 'Masters',
            session: '2024/2025', semester: 'First Semester', capacity: 30, enrolledStudents: 25,
            type: 'Lecture', duration: '3 hours', recurring: true, conflicts: [],
            notes: 'Bring laptops for practical sessions'
        },
        {
            id: 2, courseCode: 'MBA601', courseTitle: 'Strategic Management',
            instructor: 'Prof. Mary Wilson', venue: 'Business Hall A', day: 'Tuesday',
            startTime: '09:00', endTime: '12:00', programme: 'MBA', level: 'Masters',
            session: '2024/2025', semester: 'First Semester', capacity: 40, enrolledStudents: 38,
            type: 'Lecture', duration: '3 hours', recurring: true, conflicts: [],
            notes: 'Case study discussions'
        }
    ];

    filteredSchedules = [...schedules];
    loading = false;
    renderPage();
}

function renderPage() {
    if (loading) {
        document.getElementById('schedule-page-content').innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Loading schedules...</p>
            </div>
        `;
        return;
    }

    const content = `
        <div class="page-header">
            <h2>Academic Schedule Management</h2>
            <p>Manage class schedules, timetables, and venue allocations</p>
        </div>

        <div class="view-mode-toggle">
            <button class="btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'}" id="list-view-btn">
                <i class="fas fa-list"></i> List View
            </button>
            <button class="btn ${viewMode === 'calendar' ? 'btn-primary' : 'btn-secondary'}" id="calendar-view-btn">
                <i class="fas fa-calendar"></i> Calendar View
            </button>
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
                    <label>Search:</label>
                    <input type="text" id="search-filter" placeholder="Search by course, instructor, or venue..." value="${searchTerm}" />
                </div>
                
                <div class="filter-actions">
                    <button class="btn btn-secondary" id="clear-filters">
                        <i class="fas fa-times"></i> Clear Filters
                    </button>
                    <button class="btn btn-success" id="add-schedule-btn">
                        <i class="fas fa-plus"></i> Add Schedule
                    </button>
                </div>
            </div>
        </div>

        <div class="results-summary">
            <p>Showing ${filteredSchedules.length} of ${schedules.length} scheduled classes</p>
        </div>

        ${viewMode === 'list' ? renderSchedulesList() : renderCalendarView()}

        ${showScheduleModal ? renderScheduleModal() : ''}
    `;

    document.getElementById('schedule-page-content').innerHTML = content;
    setupModalEventListeners();
}

function renderSchedulesList() {
    if (filteredSchedules.length === 0) {
        return `
            <div class="no-results">
                <i class="fas fa-calendar-alt"></i>
                <h3>No schedules found</h3>
                <p>Try adjusting your filters or add a new schedule</p>
            </div>
        `;
    }

    return `
        <div class="schedules-list">
            ${filteredSchedules.map(schedule => `
                <div class="schedule-card">
                    <div class="schedule-header">
                        <div class="schedule-info">
                            <h4>${schedule.courseCode}: ${schedule.courseTitle}</h4>
                            <p class="schedule-meta">
                                <strong>${schedule.instructor}</strong> • ${schedule.programme} • ${schedule.level}
                            </p>
                        </div>
                        <div class="schedule-badges">
                            <div class="schedule-type ${getTypeColor(schedule.type)}">
                                ${schedule.type}
                            </div>
                        </div>
                    </div>
                    
                    <div class="schedule-body">
                        <div class="time-venue-info">
                            <div class="time-info">
                                <i class="fas fa-clock"></i>
                                <strong>${schedule.day}</strong> • ${schedule.startTime} - ${schedule.endTime}
                            </div>
                            <div class="venue-info">
                                <i class="fas fa-map-marker-alt"></i>
                                <strong>Venue:</strong> ${schedule.venue}
                            </div>
                        </div>
                        
                        <div class="enrollment-info">
                            <span>${schedule.enrolledStudents}/${schedule.capacity} students enrolled</span>
                        </div>
                        
                        ${schedule.notes ? `
                            <div class="schedule-notes">
                                <strong>Notes:</strong> ${schedule.notes}
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="schedule-actions">
                        <button class="btn btn-primary edit-schedule-btn" data-schedule-id="${schedule.id}">
                            <i class="fas fa-edit"></i> Edit Schedule
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-users"></i> View Students
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

function renderCalendarView() {
    const timeSlots = ['08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'];
    
    return `
        <div class="calendar-view">
            <div class="calendar-grid">
                <div class="calendar-header">
                    <div class="time-column-header">Time</div>
                    ${days.map(day => `<div class="day-header">${day}</div>`).join('')}
                </div>
                
                ${timeSlots.map(time => `
                    <div class="time-row">
                        <div class="time-slot">${time}</div>
                        ${days.map(day => {
                            const daySchedules = filteredSchedules.filter(s => 
                                s.day === day && s.startTime <= time && s.endTime > time
                            );
                            return `
                                <div class="day-slot">
                                    ${daySchedules.map(schedule => `
                                        <div class="calendar-event ${getTypeColor(schedule.type)}" data-schedule-id="${schedule.id}">
                                            <div class="event-title">${schedule.courseCode}</div>
                                            <div class="event-venue">${schedule.venue}</div>
                                        </div>
                                    `).join('')}
                                </div>
                            `;
                        }).join('')}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

function renderScheduleModal() {
    return `
        <div class="modal-overlay" id="schedule-modal-overlay">
            <div class="modal-content schedule-modal">
                <div class="modal-header">
                    <h3>${isEditing ? 'Edit' : 'Add'} Schedule</h3>
                    <button id="close-schedule-modal">&times;</button>
                </div>
                <form id="schedule-form" class="modal-body">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Course Code:</label>
                            <input type="text" id="course-code" value="${scheduleForm.courseCode}" placeholder="e.g., CSC501" required />
                        </div>
                        <div class="form-group">
                            <label>Class Type:</label>
                            <select id="class-type" required>
                                ${classTypes.map(type => `<option value="${type}" ${scheduleForm.type === type ? 'selected' : ''}>${type}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Course Title:</label>
                        <input type="text" id="course-title" value="${scheduleForm.courseTitle}" placeholder="Enter course title" required />
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Instructor:</label>
                            <select id="instructor-select" required>
                                <option value="">Select Instructor</option>
                                ${instructors.map(instructor => `<option value="${instructor}" ${scheduleForm.instructor === instructor ? 'selected' : ''}>${instructor}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Venue:</label>
                            <select id="venue-select" required>
                                <option value="">Select Venue</option>
                                ${venues.map(venue => `<option value="${venue}" ${scheduleForm.venue === venue ? 'selected' : ''}>${venue}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Day:</label>
                            <select id="day-select" required>
                                <option value="">Select Day</option>
                                ${days.map(day => `<option value="${day}" ${scheduleForm.day === day ? 'selected' : ''}>${day}</option>`).join('')}
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Start Time:</label>
                            <input type="time" id="start-time" value="${scheduleForm.startTime}" required />
                        </div>
                        <div class="form-group">
                            <label>End Time:</label>
                            <input type="time" id="end-time" value="${scheduleForm.endTime}" required />
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" id="cancel-schedule-btn">Cancel</button>
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-save"></i> ${isEditing ? 'Update' : 'Create'} Schedule
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
        } else if (e.target.id === 'add-schedule-btn') {
            handleAddSchedule();
        } else if (e.target.id === 'list-view-btn') {
            viewMode = 'list';
            renderPage();
        } else if (e.target.id === 'calendar-view-btn') {
            viewMode = 'calendar';
            renderPage();
        } else if (e.target.classList.contains('edit-schedule-btn') || e.target.classList.contains('calendar-event')) {
            const scheduleId = parseInt(e.target.getAttribute('data-schedule-id'));
            handleEditSchedule(scheduleId);
        }
    });
}

function setupModalEventListeners() {
    if (showScheduleModal) {
        const overlay = document.getElementById('schedule-modal-overlay');
        const closeBtn = document.getElementById('close-schedule-modal');
        const cancelBtn = document.getElementById('cancel-schedule-btn');
        const form = document.getElementById('schedule-form');

        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) closeScheduleModal();
            });
        }
        if (closeBtn) closeBtn.addEventListener('click', closeScheduleModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeScheduleModal);
        if (form) form.addEventListener('submit', handleSubmitSchedule);
    }
}

function applyFilters() {
    let filtered = schedules;
    if (selectedSession) filtered = filtered.filter(schedule => schedule.session === selectedSession);
    if (selectedProgramme) filtered = filtered.filter(schedule => schedule.programme === selectedProgramme);
    if (searchTerm) {
        filtered = filtered.filter(schedule =>
            schedule.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            schedule.courseTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
            schedule.instructor.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    filteredSchedules = filtered;
    renderPage();
}

function clearFilters() {
    selectedSession = '';
    selectedProgramme = '';
    searchTerm = '';
    const sessionFilter = document.getElementById('session-filter');
    const programmeFilter = document.getElementById('programme-filter');
    const searchFilter = document.getElementById('search-filter');
    if (sessionFilter) sessionFilter.value = '';
    if (programmeFilter) programmeFilter.value = '';
    if (searchFilter) searchFilter.value = '';
    applyFilters();
}

function handleAddSchedule() {
    selectedSchedule = null;
    isEditing = false;
    scheduleForm = {
        courseCode: '', courseTitle: '', instructor: '', venue: '', day: '',
        startTime: '', endTime: '', programme: '', level: '', session: '',
        semester: '', capacity: '', type: 'Lecture'
    };
    showScheduleModal = true;
    renderPage();
}

function handleEditSchedule(scheduleId) {
    selectedSchedule = schedules.find(schedule => schedule.id === scheduleId);
    isEditing = true;
    scheduleForm = {
        courseCode: selectedSchedule.courseCode,
        courseTitle: selectedSchedule.courseTitle,
        instructor: selectedSchedule.instructor,
        venue: selectedSchedule.venue,
        day: selectedSchedule.day,
        startTime: selectedSchedule.startTime,
        endTime: selectedSchedule.endTime,
        programme: selectedSchedule.programme,
        level: selectedSchedule.level,
        session: selectedSchedule.session,
        semester: selectedSchedule.semester,
        capacity: selectedSchedule.capacity.toString(),
        type: selectedSchedule.type
    };
    showScheduleModal = true;
    renderPage();
}

function handleSubmitSchedule(e) {
    e.preventDefault();
    const formData = {
        courseCode: document.getElementById('course-code').value,
        courseTitle: document.getElementById('course-title').value,
        instructor: document.getElementById('instructor-select').value,
        venue: document.getElementById('venue-select').value,
        day: document.getElementById('day-select').value,
        startTime: document.getElementById('start-time').value,
        endTime: document.getElementById('end-time').value,
        programme: 'Computer Science',
        level: 'Masters',
        session: '2024/2025',
        semester: 'First Semester',
        capacity: '30',
        type: document.getElementById('class-type').value
    };

    if (isEditing) {
        schedules = schedules.map(schedule =>
            schedule.id === selectedSchedule.id
                ? { ...schedule, ...formData, capacity: parseInt(formData.capacity) }
                : schedule
        );
        alert('Schedule updated successfully!');
    } else {
        const newSchedule = {
            id: schedules.length + 1,
            ...formData,
            capacity: parseInt(formData.capacity),
            enrolledStudents: 0,
            duration: '3 hours',
            recurring: true,
            conflicts: [],
            notes: ''
        };
        schedules = [newSchedule, ...schedules];
        alert('Schedule created successfully!');
    }
    closeScheduleModal();
}

function closeScheduleModal() {
    showScheduleModal = false;
    selectedSchedule = null;
    renderPage();
}

function getTypeColor(type) {
    switch (type) {
        case 'Lecture': return 'primary';
        case 'Laboratory': return 'success';
        case 'Tutorial': return 'info';
        case 'Seminar': return 'warning';
        case 'Workshop': return 'secondary';
        default: return 'primary';
    }
}
