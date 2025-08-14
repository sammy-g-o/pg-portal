// Dean All Students Management JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let allStudents = [];
    let filteredStudents = [];
    let currentPage = 1;
    const studentsPerPage = 10;
    let currentView = 'table';

    // Initialize the page
    function init() {
        setupEventListeners();
        loadAllStudents();
        updateStatistics();
        setupFilters();
    }

    // Set up event listeners
    function setupEventListeners() {
        // Sidebar toggle
        const adminToggleSidebarBtn = document.getElementById('admin-toggle-sidebar');
        const adminMainContent = document.getElementById('admin-main-content');
        const adminUserEmailSpan = document.getElementById('admin-user-email');

        // Set user email in header
        const user = JSON.parse(localStorage.getItem('adminUser'));
        if (user && adminUserEmailSpan) {
            adminUserEmailSpan.textContent = user.email || 'Dean User';
        }

        // Sidebar toggle logic
        if (adminToggleSidebarBtn) {
            adminToggleSidebarBtn.addEventListener('click', () => {
                const adminSidebar = document.getElementById('admin-sidebar');
                if (adminSidebar) {
                    adminSidebar.classList.toggle('collapsed');
                }
                if (adminMainContent) {
                    adminMainContent.classList.toggle('expanded');
                }
            });
        }

        // Filter event listeners
        document.getElementById('college-filter').addEventListener('change', applyFilters);
        document.getElementById('department-filter').addEventListener('change', applyFilters);
        document.getElementById('programme-filter').addEventListener('change', applyFilters);
        document.getElementById('status-filter').addEventListener('change', applyFilters);
        document.getElementById('session-filter').addEventListener('change', applyFilters);
        document.getElementById('search-filter').addEventListener('input', applyFilters);
        
        // Clear filters
        document.getElementById('clear-filters').addEventListener('click', clearAllFilters);
        
        // View toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const view = e.target.closest('.view-btn').dataset.view;
                switchView(view);
            });
        });
        
        // Export buttons
        document.getElementById('export-csv').addEventListener('click', exportToCSV);
        document.getElementById('export-pdf').addEventListener('click', exportToPDF);
        
        // Pagination
        document.getElementById('prev-page').addEventListener('click', () => changePage(currentPage - 1));
        document.getElementById('next-page').addEventListener('click', () => changePage(currentPage + 1));
        
        // Modal close
        document.getElementById('close-student-modal').addEventListener('click', closeStudentModal);
        document.getElementById('student-details-modal').addEventListener('click', (e) => {
            if (e.target.id === 'student-details-modal') {
                closeStudentModal();
            }
        });
    }

    // Load all students data
    function loadAllStudents() {
        // Mock data combining admitted, old, and current students across all departments
        allStudents = [
            // Admitted Students
            {
                id: 1,
                studentName: 'Jennifer Adams',
                studentId: 'CS/2024/001',
                email: 'jennifer.adams@email.com',
                phone: '+234-801-111-2222',
                department: 'Computer Science',
                college: 'College of Natural Sciences',
                programme: 'M.Sc Computer Science',
                status: 'Enrolled',
                session: '2024/2025',
                admissionDate: '2024-02-01',
                enrollmentDate: '2024-02-15',
                cgpa: '3.75',
                researchArea: 'Artificial Intelligence',
                supervisor: 'Dr. Smith Johnson',
                feesStatus: 'Paid',
                type: 'Admitted'
            },
            {
                id: 2,
                studentName: 'Michael Thompson',
                studentId: 'MATH/2024/002',
                email: 'michael.thompson@email.com',
                phone: '+234-802-222-3333',
                department: 'Mathematics',
                college: 'College of Natural Sciences',
                programme: 'M.Sc Mathematics',
                status: 'Enrolled',
                session: '2024/2025',
                admissionDate: '2024-02-03',
                enrollmentDate: '2024-02-18',
                cgpa: '3.82',
                researchArea: 'Statistical Methods',
                supervisor: 'Prof. Lisa Anderson',
                feesStatus: 'Paid',
                type: 'Admitted'
            },
            {
                id: 3,
                studentName: 'Sarah Mitchell',
                studentId: 'PHY/2024/003',
                email: 'sarah.mitchell@email.com',
                phone: '+234-803-333-4444',
                department: 'Physics',
                college: 'College of Natural Sciences',
                programme: 'M.Sc Physics',
                status: 'Admitted',
                session: '2024/2025',
                admissionDate: '2024-02-05',
                enrollmentDate: null,
                cgpa: '3.95',
                researchArea: 'Quantum Physics',
                supervisor: 'Dr. James Taylor',
                feesStatus: 'Pending',
                type: 'Admitted'
            },
            // Old Students (Graduated/Withdrawn)
            {
                id: 4,
                studentName: 'Alice Johnson',
                studentId: 'CS/2020/001',
                email: 'alice.johnson@email.com',
                phone: '+234-801-234-5678',
                department: 'Computer Science',
                college: 'College of Natural Sciences',
                programme: 'M.Sc Computer Science',
                status: 'Graduated',
                session: '2020/2021',
                admissionDate: '2020-09-01',
                graduationDate: '2023-07-15',
                cgpa: '3.85',
                finalGrade: 'First Class',
                researchArea: 'Machine Learning',
                supervisor: 'Dr. Smith Johnson',
                currentEmployment: 'Software Engineer at TechCorp',
                type: 'Graduated'
            },
            {
                id: 5,
                studentName: 'Robert Williams',
                studentId: 'MATH/2021/002',
                email: 'robert.williams@email.com',
                phone: '+234-802-345-6789',
                department: 'Mathematics',
                college: 'College of Natural Sciences',
                programme: 'M.Sc Mathematics',
                status: 'Graduated',
                session: '2021/2022',
                admissionDate: '2021-09-01',
                graduationDate: '2024-07-15',
                cgpa: '3.92',
                finalGrade: 'First Class',
                researchArea: 'Statistical Methods',
                supervisor: 'Prof. Lisa Anderson',
                currentEmployment: 'Data Scientist at Analytics Inc',
                type: 'Graduated'
            },
            {
                id: 6,
                studentName: 'James Wilson',
                studentId: 'CHEM/2021/004',
                email: 'james.wilson@email.com',
                phone: '+234-804-567-8901',
                department: 'Chemistry',
                college: 'College of Natural Sciences',
                programme: 'M.Sc Chemistry',
                status: 'Withdrawn',
                session: '2021/2022',
                admissionDate: '2021-09-01',
                withdrawalDate: '2023-03-15',
                cgpa: '2.45',
                researchArea: 'Organic Chemistry',
                supervisor: 'Dr. Patricia Moore',
                withdrawalReason: 'Personal reasons',
                type: 'Withdrawn'
            },
            // Current Applicants
            {
                id: 7,
                studentName: 'Emily Davis',
                studentId: 'APP/2024/007',
                email: 'emily.davis@email.com',
                phone: '+234-805-678-9012',
                department: 'Biology',
                college: 'College of Natural Sciences',
                programme: 'M.Sc Biology',
                status: 'Under Review',
                session: '2024/2025',
                applicationDate: '2024-01-15',
                previousDegree: 'B.Sc Biology',
                previousInstitution: 'University of Ibadan',
                cgpa: '3.78',
                researchArea: 'Molecular Biology',
                type: 'Applicant'
            },
            {
                id: 8,
                studentName: 'David Rodriguez',
                studentId: 'APP/2024/008',
                email: 'david.rodriguez@email.com',
                phone: '+234-806-789-0123',
                department: 'Computer Science',
                college: 'College of Natural Sciences',
                programme: 'M.Sc Computer Science',
                status: 'Recommended',
                session: '2024/2025',
                applicationDate: '2024-01-20',
                previousDegree: 'B.Sc Computer Science',
                previousInstitution: 'Ahmadu Bello University',
                cgpa: '3.68',
                researchArea: 'Software Engineering',
                hodRecommendation: 'Recommended',
                type: 'Applicant'
            },
            // Engineering Students
            {
                id: 9,
                studentName: 'Lisa Chen',
                studentId: 'ENG/2024/009',
                email: 'lisa.chen@email.com',
                phone: '+234-807-890-1234',
                department: 'Electrical Engineering',
                college: 'College of Engineering',
                programme: 'M.Eng Electrical Engineering',
                status: 'Enrolled',
                session: '2024/2025',
                admissionDate: '2024-02-10',
                enrollmentDate: '2024-02-25',
                cgpa: '3.88',
                researchArea: 'Power Systems',
                supervisor: 'Dr. Robert Brown',
                feesStatus: 'Paid',
                type: 'Admitted'
            },
            {
                id: 10,
                studentName: 'Thomas Anderson',
                studentId: 'MECH/2024/010',
                email: 'thomas.anderson@email.com',
                phone: '+234-808-901-2345',
                department: 'Mechanical Engineering',
                college: 'College of Engineering',
                programme: 'M.Eng Mechanical Engineering',
                status: 'Admitted',
                session: '2024/2025',
                admissionDate: '2024-02-12',
                enrollmentDate: null,
                cgpa: '3.72',
                researchArea: 'Robotics',
                supervisor: 'Dr. Maria Garcia',
                feesStatus: 'Pending',
                type: 'Admitted'
            },
            // Business Students
            {
                id: 11,
                studentName: 'Amanda Wilson',
                studentId: 'BUS/2024/011',
                email: 'amanda.wilson@email.com',
                phone: '+234-809-012-3456',
                department: 'Business Administration',
                college: 'College of Business',
                programme: 'MBA',
                status: 'Enrolled',
                session: '2024/2025',
                admissionDate: '2024-02-15',
                enrollmentDate: '2024-03-01',
                cgpa: '3.65',
                researchArea: 'Strategic Management',
                supervisor: 'Prof. John Davis',
                feesStatus: 'Paid',
                type: 'Admitted'
            },
            {
                id: 12,
                studentName: 'Kevin Martinez',
                studentId: 'FIN/2024/012',
                email: 'kevin.martinez@email.com',
                phone: '+234-810-123-4567',
                department: 'Finance',
                college: 'College of Business',
                programme: 'M.Sc Finance',
                status: 'Under Review',
                session: '2024/2025',
                applicationDate: '2024-01-25',
                previousDegree: 'B.Sc Economics',
                previousInstitution: 'University of Lagos',
                cgpa: '3.81',
                researchArea: 'Financial Markets',
                type: 'Applicant'
            }
        ];

        filteredStudents = [...allStudents];
        renderStudents();
        updatePagination();
    }

    // Update statistics
    function updateStatistics() {
        const totalStudents = allStudents.length;
        const departments = [...new Set(allStudents.map(s => s.department))];
        const colleges = [...new Set(allStudents.map(s => s.college))];
        const activeStudents = allStudents.filter(s => ['Enrolled', 'Admitted'].includes(s.status)).length;

        document.getElementById('total-students').textContent = totalStudents;
        document.getElementById('total-departments').textContent = departments.length;
        document.getElementById('total-colleges').textContent = colleges.length;
        document.getElementById('active-students').textContent = activeStudents;
    }

    // Setup filters
    function setupFilters() {
        const colleges = [...new Set(allStudents.map(s => s.college))].sort();
        const departments = [...new Set(allStudents.map(s => s.department))].sort();
        const programmes = [...new Set(allStudents.map(s => s.programme))].sort();
        const sessions = [...new Set(allStudents.map(s => s.session))].sort();

        populateSelect('college-filter', colleges);
        populateSelect('department-filter', departments);
        populateSelect('programme-filter', programmes);
        populateSelect('session-filter', sessions);
    }

    function populateSelect(selectId, options) {
        const select = document.getElementById(selectId);
        options.forEach(option => {
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            select.appendChild(optionElement);
        });
    }

    // Apply filters
    function applyFilters() {
        const collegeFilter = document.getElementById('college-filter').value;
        const departmentFilter = document.getElementById('department-filter').value;
        const programmeFilter = document.getElementById('programme-filter').value;
        const statusFilter = document.getElementById('status-filter').value;
        const sessionFilter = document.getElementById('session-filter').value;
        const searchFilter = document.getElementById('search-filter').value.toLowerCase();

        filteredStudents = allStudents.filter(student => {
            const matchesCollege = !collegeFilter || student.college === collegeFilter;
            const matchesDepartment = !departmentFilter || student.department === departmentFilter;
            const matchesProgramme = !programmeFilter || student.programme === programmeFilter;
            const matchesStatus = !statusFilter || student.status === statusFilter;
            const matchesSession = !sessionFilter || student.session === sessionFilter;
            const matchesSearch = !searchFilter || 
                student.studentName.toLowerCase().includes(searchFilter) ||
                student.studentId.toLowerCase().includes(searchFilter) ||
                student.email.toLowerCase().includes(searchFilter);

            return matchesCollege && matchesDepartment && matchesProgramme && 
                   matchesStatus && matchesSession && matchesSearch;
        });

        currentPage = 1;
        renderStudents();
        updatePagination();
    }

    // Clear all filters
    function clearAllFilters() {
        document.getElementById('college-filter').value = '';
        document.getElementById('department-filter').value = '';
        document.getElementById('programme-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('session-filter').value = '';
        document.getElementById('search-filter').value = '';
        
        filteredStudents = [...allStudents];
        currentPage = 1;
        renderStudents();
        updatePagination();
    }

    // Switch view between table and cards
    function switchView(view) {
        currentView = view;
        
        // Update button states
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-view="${view}"]`).classList.add('active');
        
        // Show/hide views
        document.getElementById('table-view').classList.toggle('hidden', view !== 'table');
        document.getElementById('cards-view').classList.toggle('hidden', view !== 'cards');
        
        renderStudents();
    }

    // Render students based on current view
    function renderStudents() {
        const startIndex = (currentPage - 1) * studentsPerPage;
        const endIndex = startIndex + studentsPerPage;
        const studentsToShow = filteredStudents.slice(startIndex, endIndex);

        if (currentView === 'table') {
            renderTableView(studentsToShow);
        } else {
            renderCardsView(studentsToShow);
        }
    }

    // Render table view
    function renderTableView(students) {
        const tbody = document.getElementById('students-table-body');
        tbody.innerHTML = '';

        students.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${student.studentId}</td>
                <td>${student.studentName}</td>
                <td>${student.email}</td>
                <td>${student.department}</td>
                <td>${student.college}</td>
                <td>${student.programme}</td>
                <td><span class="status-badge ${student.status.toLowerCase().replace(' ', '-')}">${student.status}</span></td>
                <td>${student.session}</td>
                <td>
                    <button class="action-btn view-btn" onclick="viewStudentDetails(${student.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit-btn" onclick="editStudent(${student.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    // Render cards view
    function renderCardsView(students) {
        const grid = document.getElementById('students-grid');
        grid.innerHTML = '';

        students.forEach(student => {
            const card = document.createElement('div');
            card.className = 'student-card';
            card.innerHTML = `
                <div class="student-card-header">
                    <div class="student-avatar">
                        <i class="fas fa-user-graduate"></i>
                    </div>
                    <div class="student-info">
                        <h4>${student.studentName}</h4>
                        <p class="student-id">${student.studentId}</p>
                        <span class="status-badge ${student.status.toLowerCase().replace(' ', '-')}">${student.status}</span>
                    </div>
                </div>
                <div class="student-card-body">
                    <div class="info-row">
                        <span class="label">Email:</span>
                        <span class="value">${student.email}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Department:</span>
                        <span class="value">${student.department}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">College:</span>
                        <span class="value">${student.college}</span>
                    </div>
                    <div class="info-row">
                        <span class="label">Programme:</span>
                        <span class="value">${student.programme}</span>
                        </div>
                    <div class="info-row">
                        <span class="label">Session:</span>
                        <span class="value">${student.session}</span>
                    </div>
                </div>
                <div class="student-card-actions">
                    <button class="action-btn view-btn" onclick="viewStudentDetails(${student.id})">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="action-btn edit-btn" onclick="editStudent(${student.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                </div>
            `;
            grid.appendChild(card);
        });
    }

    // Update pagination
    function updatePagination() {
        const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
        const startIndex = (currentPage - 1) * studentsPerPage + 1;
        const endIndex = Math.min(currentPage * studentsPerPage, filteredStudents.length);

        // Update pagination info
        document.getElementById('pagination-info').textContent = 
            `Showing ${startIndex} to ${endIndex} of ${filteredStudents.length} students`;

        // Update pagination buttons
        document.getElementById('prev-page').disabled = currentPage === 1;
        document.getElementById('next-page').disabled = currentPage === totalPages;

        // Generate page numbers
        const pageNumbers = document.getElementById('page-numbers');
        pageNumbers.innerHTML = '';

        const maxVisiblePages = 5;
        let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
        let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

        if (endPage - startPage + 1 < maxVisiblePages) {
            startPage = Math.max(1, endPage - maxVisiblePages + 1);
        }

        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.className = `page-btn ${i === currentPage ? 'active' : ''}`;
            pageBtn.textContent = i;
            pageBtn.addEventListener('click', () => changePage(i));
            pageNumbers.appendChild(pageBtn);
        }
    }

    // Change page
    function changePage(page) {
        const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);
        if (page >= 1 && page <= totalPages) {
            currentPage = page;
            renderStudents();
            updatePagination();
        }
    }

    // View student details
    window.viewStudentDetails = function(studentId) {
        const student = allStudents.find(s => s.id === studentId);
        if (!student) return;

        const modal = document.getElementById('student-details-modal');
        const content = document.getElementById('student-details-content');

        content.innerHTML = `
            <div class="student-details-grid">
                <div class="detail-section">
                    <h3><i class="fas fa-user"></i> Personal Information</h3>
                    <div class="detail-row">
                        <span class="label">Full Name:</span>
                        <span class="value">${student.studentName}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Student ID:</span>
                        <span class="value">${student.studentId}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Email:</span>
                        <span class="value">${student.email}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Phone:</span>
                        <span class="value">${student.phone}</span>
                    </div>
                </div>

                <div class="detail-section">
                    <h3><i class="fas fa-graduation-cap"></i> Academic Information</h3>
                    <div class="detail-row">
                        <span class="label">Department:</span>
                        <span class="value">${student.department}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">College:</span>
                        <span class="value">${student.college}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Programme:</span>
                        <span class="value">${student.programme}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Session:</span>
                        <span class="value">${student.session}</span>
                    </div>
                    <div class="detail-row">
                        <span class="label">Status:</span>
                        <span class="value"><span class="status-badge ${student.status.toLowerCase().replace(' ', '-')}">${student.status}</span></span>
                    </div>
                    ${student.cgpa ? `<div class="detail-row">
                        <span class="label">CGPA:</span>
                        <span class="value">${student.cgpa}</span>
                    </div>` : ''}
                </div>

                <div class="detail-section">
                    <h3><i class="fas fa-calendar"></i> Timeline</h3>
                    ${student.admissionDate ? `<div class="detail-row">
                        <span class="label">Admission Date:</span>
                        <span class="value">${student.admissionDate}</span>
                    </div>` : ''}
                    ${student.enrollmentDate ? `<div class="detail-row">
                        <span class="label">Enrollment Date:</span>
                        <span class="value">${student.enrollmentDate}</span>
                    </div>` : ''}
                    ${student.graduationDate ? `<div class="detail-row">
                        <span class="label">Graduation Date:</span>
                        <span class="value">${student.graduationDate}</span>
                    </div>` : ''}
                    ${student.withdrawalDate ? `<div class="detail-row">
                        <span class="label">Withdrawal Date:</span>
                        <span class="value">${student.withdrawalDate}</span>
                    </div>` : ''}
                </div>

                ${student.researchArea ? `<div class="detail-section">
                    <h3><i class="fas fa-microscope"></i> Research Information</h3>
                    <div class="detail-row">
                        <span class="label">Research Area:</span>
                        <span class="value">${student.researchArea}</span>
                    </div>
                    ${student.supervisor ? `<div class="detail-row">
                        <span class="label">Supervisor:</span>
                        <span class="value">${student.supervisor}</span>
                    </div>` : ''}
                </div>` : ''}

                ${student.currentEmployment ? `<div class="detail-section">
                    <h3><i class="fas fa-briefcase"></i> Current Employment</h3>
                    <div class="detail-row">
                        <span class="label">Position:</span>
                        <span class="value">${student.currentEmployment}</span>
                    </div>
                </div>` : ''}
            </div>
        `;

        modal.style.display = 'flex';
    };

    // Close student modal
    function closeStudentModal() {
        document.getElementById('student-details-modal').style.display = 'none';
    }

    // Edit student (placeholder)
    window.editStudent = function(studentId) {
        alert(`Edit functionality for student ${studentId} would be implemented here.`);
    };

    // Export to CSV
    function exportToCSV() {
        const headers = ['Student ID', 'Name', 'Email', 'Department', 'College', 'Programme', 'Status', 'Session'];
        const csvContent = [
            headers.join(','),
            ...filteredStudents.map(student => [
                student.studentId,
                student.studentName,
                student.email,
                student.department,
                student.college,
                student.programme,
                student.status,
                student.session
            ].join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `students_export_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    // Export to PDF (placeholder)
    function exportToPDF() {
        alert('PDF export functionality would be implemented here using a library like jsPDF.');
    }

    // Initialize the page
    init();
});