// Dean Departments Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let departments = [];
    let filteredDepartments = [];
    let selectedStatus = '';
    let searchTerm = '';
    let showDepartmentModal = false;
    let selectedDepartment = null;

    const statuses = ['Active', 'Under Review', 'Restructuring', 'Inactive'];

    function init() {
        loadDepartments();
        setupEventListeners();
    }

    function loadDepartments() {
        // Mock data for departments
        departments = [
            {
                id: 1,
                name: 'Computer Science',
                code: 'COHES_CS',
                status: 'Active',
                hodName: 'Dr. Marouf Oyelakin',
                hodEmail: 'hod.computerscience@crescentuniversity.edu.ng',
                totalStudents: 156,
                totalFaculty: 12,
                totalProgrammes: 3,
                establishedYear: '2005',
                location: 'COHES Building',
                budget: 2500000,
                researchAreas: ['Artificial Intelligence', 'Data Science', 'Software Engineering', 'Cybersecurity'],
                programmes: ['B.Sc Computer Science', 'M.Sc Computer Science', 'Ph.D Computer Science'],
                recentAchievements: ['Best Department Award 2023', 'Research Grant of ₦5M', 'Industry Partnership with Google'],
                facilities: ['Computer Lab A', 'Research Lab', 'Conference Room', 'Faculty Offices'],
                college: 'College of Health and Environmental Sciences',
                collegeAbbreviation: 'COHES'
            },
            {
                id: 2,
                name: 'Mass Communication',
                code: 'COHES_MC',
                status: 'Active',
                hodName: 'Prof. Sarah Wilson',
                hodEmail: 'hod.masscommunication@crescentuniversity.edu.ng',
                totalStudents: 142,
                totalFaculty: 10,
                totalProgrammes: 2,
                establishedYear: '2005',
                location: 'COHES Building',
                budget: 1800000,
                researchAreas: ['Digital Media', 'Journalism', 'Public Relations', 'Broadcasting'],
                programmes: ['B.Sc Mass Communication', 'M.Sc Mass Communication'],
                recentAchievements: ['Media Excellence Award', 'Industry Collaboration with CNN', 'Student Internship Program'],
                facilities: ['Media Studio', 'Newsroom', 'Editing Suite', 'Faculty Offices'],
                college: 'College of Health and Environmental Sciences',
                collegeAbbreviation: 'COHES'
            },
            {
                id: 3,
                name: 'Business Administration',
                code: 'COB_BUS',
                status: 'Active',
                hodName: 'Prof. Ahmed Ibrahim',
                hodEmail: 'hod.businessadministration@crescentuniversity.edu.ng',
                totalStudents: 203,
                totalFaculty: 15,
                totalProgrammes: 4,
                establishedYear: '2005',
                location: 'COB Building',
                budget: 3200000,
                researchAreas: ['Strategic Management', 'Finance', 'Marketing', 'Human Resources'],
                programmes: ['B.Sc Business Administration', 'MBA', 'M.Sc Business Administration', 'Ph.D Business Administration'],
                recentAchievements: ['AACSB Accreditation', 'Business Case Competition Winners', 'Corporate Partnership Program'],
                facilities: ['Business Lab', 'Conference Center', 'Faculty Offices', 'Student Lounge'],
                college: 'College of Business',
                collegeAbbreviation: 'COB'
            },
            {
                id: 4,
                name: 'Architecture',
                code: 'COE_ARC',
                status: 'Under Review',
                hodName: 'Arch. Michael Thompson',
                hodEmail: 'hod.architecture@crescentuniversity.edu.ng',
                totalStudents: 89,
                totalFaculty: 8,
                totalProgrammes: 2,
                establishedYear: '2010',
                location: 'COE Building',
                budget: 1500000,
                researchAreas: ['Sustainable Design', 'Urban Planning', 'Building Technology', 'Architectural History'],
                programmes: ['B.Sc Architecture', 'M.Sc Architecture'],
                recentAchievements: ['Design Competition Winners', 'Sustainable Architecture Award', 'International Collaboration'],
                facilities: ['Design Studio', 'Model Making Lab', 'Computer Lab', 'Faculty Offices'],
                college: 'College of Engineering',
                collegeAbbreviation: 'COE'
            },
            {
                id: 5,
                name: 'Nursing Science',
                code: 'COHES_NUR',
                status: 'Active',
                hodName: 'Prof. Fatima Abdullahi',
                hodEmail: 'hod.nursingscience@crescentuniversity.edu.ng',
                totalStudents: 178,
                totalFaculty: 14,
                totalProgrammes: 3,
                establishedYear: '2005',
                location: 'COHES Building',
                budget: 2800000,
                researchAreas: ['Community Health', 'Mental Health Nursing', 'Pediatric Nursing', 'Geriatric Care'],
                programmes: ['B.Sc Nursing Science', 'M.Sc Nursing Science', 'Ph.D Nursing Science'],
                recentAchievements: ['Nursing Excellence Award', 'Clinical Partnership Program', 'Research Grant'],
                facilities: ['Nursing Lab', 'Clinical Skills Center', 'Simulation Lab', 'Faculty Offices'],
                college: 'College of Health and Environmental Sciences',
                collegeAbbreviation: 'COHES'
            }
        ];

        filteredDepartments = [...departments];
        renderPage();
    }

    function renderPage() {
        const content = document.getElementById('departments-page-content');
        content.innerHTML = `
            <!-- Page Header -->
            <div class="page-header">
                <h2>College Departments</h2>
                <p>Manage and oversee all departments within your college</p>
            </div>

            <!-- Filters Section -->
            <div class="filters-section">
                <div class="filters-grid">
                    <div class="filter-group">
                        <label>Status:</label>
                        <select id="status-filter">
                            <option value="">All Statuses</option>
                            ${statuses.map(status => `<option value="${status}">${status}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Search:</label>
                        <input type="text" id="search-filter" placeholder="Search by name, code, or HOD...">
                    </div>
                    
                    <div class="filter-actions">
                        <button class="btn btn-secondary" id="clear-filters">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                        <button class="btn btn-primary" id="add-department">
                            <i class="fas fa-plus"></i> Add Department
                        </button>
                        <button class="btn btn-info" id="export-report">
                            <i class="fas fa-download"></i> Export Report
                        </button>
                    </div>
                </div>
            </div>

            <!-- Results Summary -->
            <div class="results-summary">
                <p>Showing ${filteredDepartments.length} of ${departments.length} departments</p>
                <div class="summary-stats">
                    <span class="stat-item success">
                        Active: ${departments.filter(d => d.status === 'Active').length}
                    </span>
                    <span class="stat-item warning">
                        Under Review: ${departments.filter(d => d.status === 'Under Review').length}
                    </span>
                    <span class="stat-item info">
                        Restructuring: ${departments.filter(d => d.status === 'Restructuring').length}
                    </span>
                </div>
            </div>

            <!-- Departments List -->
            <div class="departments-list" id="departments-list">
                ${renderDepartmentsList()}
            </div>

            <!-- Department Modal -->
            <div id="department-modal" class="modal-overlay" style="display: none;">
                <div class="modal-content department-modal">
                    <div class="modal-header">
                        <h3 id="modal-title">Department Details</h3>
                        <button id="close-modal">&times;</button>
                    </div>
                    <div class="modal-body" id="modal-body">
                        <!-- Modal content will be populated dynamically -->
                    </div>
                </div>
            </div>
        `;

        setupModalEventListeners();
    }

    function renderDepartmentsList() {
        if (filteredDepartments.length === 0) {
            return `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No departments found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                </div>
            `;
        }

        return filteredDepartments.map(department => `
            <div class="department-card" data-department-id="${department.id}">
                <div class="department-header">
                    <div class="department-info">
                        <h4>${department.name}</h4>
                        <p class="department-meta">
                            <strong>${department.code}</strong> • Established ${department.establishedYear}
                        </p>
                        <p class="department-location">
                            <i class="fas fa-map-marker-alt"></i> ${department.location}
                        </p>
                    </div>
                    <div class="department-status ${getStatusColor(department.status)}">
                        ${department.status}
                    </div>
                </div>
                
                <div class="department-body">
                    <div class="hod-info">
                        <h5>Head of Department</h5>
                        <p><strong>${department.hodName}</strong></p>
                        <p><i class="fas fa-envelope"></i> ${department.hodEmail}</p>
                    </div>
                    
                    <div class="department-stats">
                        <div class="stat-grid">
                            <div class="stat-item">
                                <span class="stat-number">${department.totalStudents}</span>
                                <span class="stat-label">Students</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">${department.totalFaculty}</span>
                                <span class="stat-label">Faculty</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">${department.totalProgrammes}</span>
                                <span class="stat-label">Programmes</span>
                            </div>
                            <div class="stat-item">
                                <span class="stat-number">${formatCurrency(department.budget)}</span>
                                <span class="stat-label">Budget</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="research-areas">
                        <strong>Research Areas:</strong>
                        <div class="areas-list">
                            ${department.researchAreas.slice(0, 3).map(area => 
                                `<span class="area-badge">${area}</span>`
                            ).join('')}
                            ${department.researchAreas.length > 3 ? 
                                `<span class="area-badge more">+${department.researchAreas.length - 3} more</span>` : ''
                            }
                        </div>
                    </div>
                </div>
                
                <div class="department-actions">
                    <button class="btn btn-primary view-details" data-department-id="${department.id}">
                        <i class="fas fa-eye"></i> View Details
                    </button>
                    <button class="btn btn-info">
                        <i class="fas fa-chart-bar"></i> Performance Report
                    </button>
                    <button class="btn btn-success">
                        <i class="fas fa-users"></i> Faculty Management
                    </button>
                    <button class="btn btn-warning">
                        <i class="fas fa-cog"></i> Department Settings
                    </button>
                </div>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        // Status filter
        document.addEventListener('change', function(e) {
            if (e.target.id === 'status-filter') {
                selectedStatus = e.target.value;
                applyFilters();
            }
        });

        // Search filter
        document.addEventListener('input', function(e) {
            if (e.target.id === 'search-filter') {
                searchTerm = e.target.value;
                applyFilters();
            }
        });

        // Clear filters
        document.addEventListener('click', function(e) {
            if (e.target.id === 'clear-filters') {
                clearFilters();
            }
        });

        // View details buttons
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('view-details') || e.target.closest('.view-details')) {
                const button = e.target.classList.contains('view-details') ? e.target : e.target.closest('.view-details');
                const departmentId = parseInt(button.dataset.departmentId);
                handleViewDepartment(departmentId);
            }
        });
    }

    function setupModalEventListeners() {
        const modal = document.getElementById('department-modal');
        const closeBtn = document.getElementById('close-modal');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    }

    function applyFilters() {
        filteredDepartments = departments.filter(department => {
            const matchesStatus = !selectedStatus || department.status === selectedStatus;
            const matchesSearch = !searchTerm || 
                department.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                department.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                department.hodName.toLowerCase().includes(searchTerm.toLowerCase());
            
            return matchesStatus && matchesSearch;
        });

        renderPage();
    }

    function clearFilters() {
        selectedStatus = '';
        searchTerm = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('search-filter').value = '';
        applyFilters();
    }

    function handleViewDepartment(departmentId) {
        selectedDepartment = departments.find(d => d.id === departmentId);
        if (selectedDepartment) {
            showDepartmentModal = true;
            renderDepartmentModal();
        }
    }

    function renderDepartmentModal() {
        const modal = document.getElementById('department-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalBody = document.getElementById('modal-body');

        modalTitle.textContent = `${selectedDepartment.name} Department`;
        modalBody.innerHTML = `
            <div class="department-details">
                <div class="detail-section">
                    <h4>Basic Information</h4>
                    <div class="detail-grid">
                        <div><strong>Code:</strong> ${selectedDepartment.code}</div>
                        <div><strong>Established:</strong> ${selectedDepartment.establishedYear}</div>
                        <div><strong>Location:</strong> ${selectedDepartment.location}</div>
                        <div><strong>Status:</strong> 
                            <span class="status-badge ${getStatusColor(selectedDepartment.status)}">
                                ${selectedDepartment.status}
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Head of Department</h4>
                    <div class="hod-details">
                        <p><strong>Name:</strong> ${selectedDepartment.hodName}</p>
                        <p><strong>Email:</strong> ${selectedDepartment.hodEmail}</p>
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Programmes Offered</h4>
                    <div class="programmes-list">
                        ${selectedDepartment.programmes.map(programme => 
                            `<span class="programme-badge">${programme}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Research Areas</h4>
                    <div class="research-list">
                        ${selectedDepartment.researchAreas.map(area => 
                            `<span class="research-badge">${area}</span>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Facilities</h4>
                    <div class="facilities-list">
                        ${selectedDepartment.facilities.map(facility => 
                            `<div class="facility-item">
                                <i class="fas fa-building"></i> ${facility}
                            </div>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="detail-section">
                    <h4>Recent Achievements</h4>
                    <div class="achievements-list">
                        ${selectedDepartment.recentAchievements.map(achievement => 
                            `<div class="achievement-item">
                                <i class="fas fa-trophy"></i> ${achievement}
                            </div>`
                        ).join('')}
                    </div>
                </div>
            </div>
        `;

        modal.style.display = 'flex';
    }

    function getStatusColor(status) {
        switch (status) {
            case 'Active': return 'success';
            case 'Under Review': return 'warning';
            case 'Restructuring': return 'info';
            case 'Inactive': return 'danger';
            default: return 'secondary';
        }
    }

    function formatCurrency(amount) {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(amount);
    }

    // Initialize the page
    init();
});
