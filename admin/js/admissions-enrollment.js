// Admissions Enrollment Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let enrollments = [];
    let filteredEnrollments = [];
    let selectedSession = '';
    let selectedSemester = '';
    let selectedProgramme = '';
    let selectedLevel = '';
    let selectedStatus = '';
    let searchTerm = '';
    let showEnrollmentModal = false;
    let selectedEnrollment = null;
    let enrollmentForm = {
        studentId: '',
        enrollmentDate: '',
        orientation: false,
        medicalClearance: false,
        feesPayment: false,
        courseRegistration: false,
        notes: ''
    };
    
    const sessions = ['2024/2025', '2025/2026'];
    const semesters = ['First Semester', 'Second Semester'];
    const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'MBA'];
    const levels = ['Undergraduate', 'Masters', 'PhD', 'Postgraduate Diploma'];
    const statuses = ['Pending Enrollment', 'Partially Enrolled', 'Fully Enrolled', 'Enrollment Expired', 'Deferred'];
    
    const mockEnrollments = [
        {
            id: 1,
            applicantName: 'Jennifer Adams',
            applicationId: 'APP/2024/001',
            studentId: 'CS/2024/001',
            email: 'jennifer.adams@email.com',
            phone: '+234-801-111-2222',
            programme: 'Computer Science',
            level: 'Masters',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2024-02-01',
            enrollmentDeadline: '2024-02-28',
            status: 'Partially Enrolled',
            enrollmentProgress: {
                orientation: true,
                medicalClearance: true,
                feesPayment: true,
                courseRegistration: false,
                idCardCollection: false,
                hostelAllocation: false
            },
            enrollmentDate: '2024-02-15',
            assignedAdvisor: 'Dr. Smith Johnson',
            feesAmount: 350000,
            feesStatus: 'Paid',
            medicalStatus: 'Cleared',
            orientationDate: '2024-02-10',
            notes: 'Student completed orientation and medical clearance'
        },
        {
            id: 2,
            applicantName: 'Michael Thompson',
            applicationId: 'APP/2024/002',
            studentId: 'MBA/2024/002',
            email: 'michael.thompson@email.com',
            phone: '+234-802-222-3333',
            programme: 'MBA',
            level: 'Masters',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2024-02-03',
            enrollmentDeadline: '2024-03-03',
            status: 'Fully Enrolled',
            enrollmentProgress: {
                orientation: true,
                medicalClearance: true,
                feesPayment: true,
                courseRegistration: true,
                idCardCollection: true,
                hostelAllocation: false
            },
            enrollmentDate: '2024-02-18',
            assignedAdvisor: 'Prof. Mary Wilson',
            feesAmount: 500000,
            feesStatus: 'Paid',
            medicalStatus: 'Cleared',
            orientationDate: '2024-02-12',
            notes: 'Fully enrolled, ready for classes'
        },
        {
            id: 3,
            applicantName: 'Sarah Mitchell',
            applicationId: 'APP/2024/003',
            studentId: 'MATH/2024/003',
            email: 'sarah.mitchell@email.com',
            phone: '+234-803-333-4444',
            programme: 'Mathematics',
            level: 'PhD',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2024-02-05',
            enrollmentDeadline: '2024-03-05',
            status: 'Fully Enrolled',
            enrollmentProgress: {
                orientation: true,
                medicalClearance: true,
                feesPayment: true,
                courseRegistration: true,
                idCardCollection: true,
                hostelAllocation: true
            },
            enrollmentDate: '2024-02-20',
            assignedAdvisor: 'Dr. Lisa Anderson',
            feesAmount: 400000,
            feesStatus: 'Paid',
            medicalStatus: 'Cleared',
            orientationDate: '2024-02-14',
            notes: 'Research student, fully enrolled with hostel allocation'
        },
        {
            id: 4,
            applicantName: 'Robert Chen',
            applicationId: 'APP/2024/004',
            studentId: 'DS/2024/004',
            email: 'robert.chen@email.com',
            phone: '+234-804-444-5555',
            programme: 'Data Science',
            level: 'Masters',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2024-02-08',
            enrollmentDeadline: '2024-03-08',
            status: 'Pending Enrollment',
            enrollmentProgress: {
                orientation: false,
                medicalClearance: false,
                feesPayment: false,
                courseRegistration: false,
                idCardCollection: false,
                hostelAllocation: false
            },
            enrollmentDate: null,
            assignedAdvisor: 'Dr. Patricia Moore',
            feesAmount: 380000,
            feesStatus: 'Pending',
            medicalStatus: 'Pending',
            orientationDate: null,
            notes: 'Admitted but not yet started enrollment process'
        },
        {
            id: 5,
            applicantName: 'Emily Rodriguez',
            applicationId: 'APP/2024/005',
            studentId: 'PHY/2024/005',
            email: 'emily.rodriguez@email.com',
            phone: '+234-805-555-6666',
            programme: 'Physics',
            level: 'PhD',
            session: '2024/2025',
            semester: 'First Semester',
            admissionDate: '2024-02-10',
            enrollmentDeadline: '2024-03-10',
            status: 'Enrollment Expired',
            enrollmentProgress: {
                orientation: false,
                medicalClearance: false,
                feesPayment: false,
                courseRegistration: false,
                idCardCollection: false,
                hostelAllocation: false
            },
            enrollmentDate: null,
            assignedAdvisor: 'Prof. James Taylor',
            feesAmount: 420000,
            feesStatus: 'Not Paid',
            medicalStatus: 'Pending',
            orientationDate: null,
            notes: 'Enrollment deadline passed, student needs to reapply'
        }
    ];

    function init() {
        loadEnrollments();
        renderPage();
        setupEventListeners();
    }

    function loadEnrollments() {
        enrollments = [...mockEnrollments];
        filteredEnrollments = [...enrollments];
    }

    function renderPage() {
        const content = document.getElementById('enrollment-page-content');
        if (!content) return;

        content.innerHTML = `
            <div class="page-header">
                <h2>Student Enrollment Management</h2>
                <p>Track and manage student enrollment process for admitted applicants</p>
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
                            <i class="fas fa-download"></i> Export Enrollments
                        </button>
                        <button class="btn btn-success">
                            <i class="fas fa-chart-bar"></i> Enrollment Statistics
                        </button>
                    </div>
                </div>
            </div>

            <div class="results-summary">
                <p>Showing ${filteredEnrollments.length} of ${enrollments.length} enrollments</p>
                <div class="summary-stats">
                    <span class="stat-item warning">
                        Pending: ${enrollments.filter(e => e.status === 'Pending Enrollment').length}
                    </span>
                    <span class="stat-item info">
                        Partial: ${enrollments.filter(e => e.status === 'Partially Enrolled').length}
                    </span>
                    <span class="stat-item success">
                        Full: ${enrollments.filter(e => e.status === 'Fully Enrolled').length}
                    </span>
                    <span class="stat-item danger">
                        Expired: ${enrollments.filter(e => e.status === 'Enrollment Expired').length}
                    </span>
                </div>
            </div>

            <div class="enrollments-list" id="enrollments-list"></div>
        `;

        renderEnrollmentsList();
    }

    function renderEnrollmentsList() {
        const listContainer = document.getElementById('enrollments-list');
        if (!listContainer) return;

        if (filteredEnrollments.length > 0) {
            listContainer.innerHTML = filteredEnrollments.map(enrollment => {
                const progress = calculateEnrollmentProgress(enrollment.enrollmentProgress);
                return `
                    <div class="enrollment-card" data-id="${enrollment.id}">
                        <div class="enrollment-header">
                            <div class="enrollment-info">
                                <h3>${enrollment.applicantName}</h3>
                                <p class="student-id">${enrollment.studentId}</p>
                                <p class="programme-info">${enrollment.programme} - ${enrollment.level}</p>
                            </div>
                            <div class="enrollment-status">
                                <span class="status-badge ${getStatusColor(enrollment.status)}">${enrollment.status}</span>
                                <div class="progress-bar">
                                    <div class="progress-fill" style="width: ${progress}%"></div>
                                </div>
                                <span class="progress-text">${progress}% Complete</span>
                            </div>
                        </div>
                        
                        <div class="enrollment-details">
                            <div class="detail-row">
                                <div class="detail-item">
                                    <strong>Session:</strong> ${enrollment.session}
                                </div>
                                <div class="detail-item">
                                    <strong>Semester:</strong> ${enrollment.semester}
                                </div>
                                <div class="detail-item">
                                    <strong>Admission Date:</strong> ${enrollment.admissionDate}
                                </div>
                            </div>
                            
                            <div class="detail-row">
                                <div class="detail-item">
                                    <strong>Enrollment Deadline:</strong> ${enrollment.enrollmentDeadline}
                                </div>
                                <div class="detail-item">
                                    <strong>Assigned Advisor:</strong> ${enrollment.assignedAdvisor}
                                </div>
                                <div class="detail-item">
                                    <strong>Fees Amount:</strong> ₦${enrollment.feesAmount.toLocaleString()}
                                </div>
                            </div>
                            
                            <div class="detail-row">
                                <div class="detail-item">
                                    <strong>Fees Status:</strong> 
                                    <span class="fees-status ${getFeesStatusColor(enrollment.feesStatus)}">
                                        ${enrollment.feesStatus}
                                    </span>
                                </div>
                                <div class="detail-item">
                                    <strong>Medical Status:</strong> 
                                    <span class="medical-status ${getMedicalStatusColor(enrollment.medicalStatus)}">
                                        ${enrollment.medicalStatus}
                                    </span>
                                </div>
                                <div class="detail-item">
                                    <strong>Enrollment Date:</strong> ${enrollment.enrollmentDate || 'Not enrolled'}
                                </div>
                            </div>
                            
                            <div class="enrollment-checklist">
                                <h4>Enrollment Checklist:</h4>
                                <div class="checklist-grid">
                                    <div class="checklist-item ${enrollment.enrollmentProgress.orientation ? 'completed' : 'pending'}">
                                        <i class="fas ${enrollment.enrollmentProgress.orientation ? 'fa-check-circle' : 'fa-circle'}"></i>
                                        Orientation
                                    </div>
                                    <div class="checklist-item ${enrollment.enrollmentProgress.medicalClearance ? 'completed' : 'pending'}">
                                        <i class="fas ${enrollment.enrollmentProgress.medicalClearance ? 'fa-check-circle' : 'fa-circle'}"></i>
                                        Medical Clearance
                                    </div>
                                    <div class="checklist-item ${enrollment.enrollmentProgress.feesPayment ? 'completed' : 'pending'}">
                                        <i class="fas ${enrollment.enrollmentProgress.feesPayment ? 'fa-check-circle' : 'fa-circle'}"></i>
                                        Fees Payment
                                    </div>
                                    <div class="checklist-item ${enrollment.enrollmentProgress.courseRegistration ? 'completed' : 'pending'}">
                                        <i class="fas ${enrollment.enrollmentProgress.courseRegistration ? 'fa-check-circle' : 'fa-circle'}"></i>
                                        Course Registration
                                    </div>
                                    <div class="checklist-item ${enrollment.enrollmentProgress.idCardCollection ? 'completed' : 'pending'}">
                                        <i class="fas ${enrollment.enrollmentProgress.idCardCollection ? 'fa-check-circle' : 'fa-circle'}"></i>
                                        ID Card Collection
                                    </div>
                                    <div class="checklist-item ${enrollment.enrollmentProgress.hostelAllocation ? 'completed' : 'pending'}">
                                        <i class="fas ${enrollment.enrollmentProgress.hostelAllocation ? 'fa-check-circle' : 'fa-circle'}"></i>
                                        Hostel Allocation
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="enrollment-actions">
                            <button class="btn btn-primary manage-enrollment" data-id="${enrollment.id}">
                                <i class="fas fa-edit"></i> Manage Enrollment
                            </button>
                            <button class="btn btn-secondary">
                                <i class="fas fa-eye"></i> View Details
                            </button>
                            <button class="btn btn-info">
                                <i class="fas fa-print"></i> Print Documents
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        } else {
            listContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-user-graduate"></i>
                    <h3>No enrollments found</h3>
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

        // Enrollment card event listeners
        document.addEventListener('click', (e) => {
            if (e.target.closest('.manage-enrollment')) {
                const enrollmentId = parseInt(e.target.closest('.manage-enrollment').dataset.id);
                const enrollment = enrollments.find(env => env.id === enrollmentId);
                if (enrollment) {
                    handleManageEnrollment(enrollment);
                }
            }
        });
    }

    function applyFilters() {
        filteredEnrollments = enrollments.filter(enrollment => {
            const sessionMatch = !selectedSession || enrollment.session === selectedSession;
            const semesterMatch = !selectedSemester || enrollment.semester === selectedSemester;
            const programmeMatch = !selectedProgramme || enrollment.programme === selectedProgramme;
            const levelMatch = !selectedLevel || enrollment.level === selectedLevel;
            const statusMatch = !selectedStatus || enrollment.status === selectedStatus;
            
            const searchMatch = !searchTerm || 
                enrollment.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                enrollment.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                enrollment.email.toLowerCase().includes(searchTerm.toLowerCase());

            return sessionMatch && semesterMatch && programmeMatch && levelMatch && statusMatch && searchMatch;
        });

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
        document.getElementById('session-filter').value = '';
        document.getElementById('semester-filter').value = '';
        document.getElementById('programme-filter').value = '';
        document.getElementById('level-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('search-input').value = '';
        
        applyFilters();
    }

    function handleManageEnrollment(enrollment) {
        selectedEnrollment = enrollment;
        enrollmentForm = {
            studentId: enrollment.studentId,
            enrollmentDate: enrollment.enrollmentDate || '',
            orientation: enrollment.enrollmentProgress.orientation,
            medicalClearance: enrollment.enrollmentProgress.medicalClearance,
            feesPayment: enrollment.enrollmentProgress.feesPayment,
            courseRegistration: enrollment.enrollmentProgress.courseRegistration,
            notes: enrollment.notes || ''
        };
        showEnrollmentModal = true;
        renderEnrollmentModal();
    }

    function renderEnrollmentModal() {
        if (!showEnrollmentModal || !selectedEnrollment) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content enrollment-modal">
                <div class="modal-header">
                    <h3>Manage Enrollment: ${selectedEnrollment.applicantName}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <form class="modal-body" id="enrollment-form">
                    <div class="enrollment-summary">
                        <h4>Enrollment Summary</h4>
                        <div class="summary-grid">
                            <div><strong>Student ID:</strong> ${selectedEnrollment.studentId}</div>
                            <div><strong>Programme:</strong> ${selectedEnrollment.programme}</div>
                            <div><strong>Level:</strong> ${selectedEnrollment.level}</div>
                            <div><strong>Session:</strong> ${selectedEnrollment.session}</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Enrollment Date:</label>
                            <input type="date" id="enrollment-date" value="${enrollmentForm.enrollmentDate}">
                        </div>
                        
                        <div class="form-group">
                            <label>Fees Status:</label>
                            <select id="fees-status">
                                <option value="Paid" ${selectedEnrollment.feesStatus === 'Paid' ? 'selected' : ''}>Paid</option>
                                <option value="Pending" ${selectedEnrollment.feesStatus === 'Pending' ? 'selected' : ''}>Pending</option>
                                <option value="Not Paid" ${selectedEnrollment.feesStatus === 'Not Paid' ? 'selected' : ''}>Not Paid</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Medical Status:</label>
                        <select id="medical-status">
                            <option value="Cleared" ${selectedEnrollment.medicalStatus === 'Cleared' ? 'selected' : ''}>Cleared</option>
                            <option value="Pending" ${selectedEnrollment.medicalStatus === 'Pending' ? 'selected' : ''}>Pending</option>
                            <option value="Not Cleared" ${selectedEnrollment.medicalStatus === 'Not Cleared' ? 'selected' : ''}>Not Cleared</option>
                        </select>
                    </div>
                    
                    <div class="enrollment-checklist-modal">
                        <h4>Enrollment Checklist:</h4>
                        <div class="checklist-form">
                            <label class="checkbox-label">
                                <input type="checkbox" id="orientation-check" ${enrollmentForm.orientation ? 'checked' : ''}>
                                Orientation Completed
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" id="medical-check" ${enrollmentForm.medicalClearance ? 'checked' : ''}>
                                Medical Clearance
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" id="fees-check" ${enrollmentForm.feesPayment ? 'checked' : ''}>
                                Fees Payment
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" id="course-reg-check" ${enrollmentForm.courseRegistration ? 'checked' : ''}>
                                Course Registration
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" id="id-card-check" ${selectedEnrollment.enrollmentProgress.idCardCollection ? 'checked' : ''}>
                                ID Card Collection
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" id="hostel-check" ${selectedEnrollment.enrollmentProgress.hostelAllocation ? 'checked' : ''}>
                                Hostel Allocation
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Notes:</label>
                        <textarea id="enrollment-notes" placeholder="Enter enrollment notes..." rows="3">${enrollmentForm.notes}</textarea>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" id="cancel-enrollment">Cancel</button>
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-save"></i> Update Enrollment
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Modal event listeners
        modal.querySelector('.close-modal').addEventListener('click', closeEnrollmentModal);
        modal.querySelector('#cancel-enrollment').addEventListener('click', closeEnrollmentModal);
        modal.querySelector('#enrollment-form').addEventListener('submit', handleUpdateEnrollment);
    }

    function handleUpdateEnrollment(e) {
        e.preventDefault();
        
        const formData = {
            enrollmentDate: document.getElementById('enrollment-date').value,
            feesStatus: document.getElementById('fees-status').value,
            medicalStatus: document.getElementById('medical-status').value,
            orientation: document.getElementById('orientation-check').checked,
            medicalClearance: document.getElementById('medical-check').checked,
            feesPayment: document.getElementById('fees-check').checked,
            courseRegistration: document.getElementById('course-reg-check').checked,
            idCardCollection: document.getElementById('id-card-check').checked,
            hostelAllocation: document.getElementById('hostel-check').checked,
            notes: document.getElementById('enrollment-notes').value
        };

        // Update the enrollment data
        if (selectedEnrollment) {
            selectedEnrollment.enrollmentDate = formData.enrollmentDate;
            selectedEnrollment.feesStatus = formData.feesStatus;
            selectedEnrollment.medicalStatus = formData.medicalStatus;
            selectedEnrollment.enrollmentProgress = {
                orientation: formData.orientation,
                medicalClearance: formData.medicalClearance,
                feesPayment: formData.feesPayment,
                courseRegistration: formData.courseRegistration,
                idCardCollection: formData.idCardCollection,
                hostelAllocation: formData.hostelAllocation
            };
            selectedEnrollment.notes = formData.notes;
            
            // Update status based on progress
            const progress = calculateEnrollmentProgress(selectedEnrollment.enrollmentProgress);
            if (progress === 100) {
                selectedEnrollment.status = 'Fully Enrolled';
            } else if (progress > 0) {
                selectedEnrollment.status = 'Partially Enrolled';
            } else {
                selectedEnrollment.status = 'Pending Enrollment';
            }
        }

        closeEnrollmentModal();
        renderPage();
        
        // Show success message
        alert('Enrollment updated successfully!');
    }

    function closeEnrollmentModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
        showEnrollmentModal = false;
        selectedEnrollment = null;
    }

    function getStatusColor(status) {
        const colors = {
            'Pending Enrollment': 'warning',
            'Partially Enrolled': 'info',
            'Fully Enrolled': 'success',
            'Enrollment Expired': 'danger',
            'Deferred': 'secondary'
        };
        return colors[status] || 'secondary';
    }

    function getFeesStatusColor(status) {
        const colors = {
            'Paid': 'success',
            'Pending': 'warning',
            'Not Paid': 'danger'
        };
        return colors[status] || 'secondary';
    }

    function getMedicalStatusColor(status) {
        const colors = {
            'Cleared': 'success',
            'Pending': 'warning',
            'Not Cleared': 'danger'
        };
        return colors[status] || 'secondary';
    }

    function calculateEnrollmentProgress(progress) {
        const totalSteps = 6;
        const completedSteps = Object.values(progress).filter(Boolean).length;
        return Math.round((completedSteps / totalSteps) * 100);
    }

    // Initialize the page
    init();
});
