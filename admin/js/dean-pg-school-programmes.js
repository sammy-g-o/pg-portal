// Dean PG School Programmes Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let programmes = [];
    let filteredProgrammes = [];
    let selectedLevel = '';
    let selectedDepartment = '';
    let selectedStatus = '';
    let searchTerm = '';
    let showProgrammeModal = false;
    let selectedProgramme = null;
    const levels = ['Masters', 'PhD', 'Postgraduate Diploma'];
    const departments = ['Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'Engineering'];
    const statuses = ['Active', 'Under Review', 'Suspended', 'Discontinued'];

    // Mock data for postgraduate programmes
    const mockProgrammes = [
        {
            id: 1,
            name: 'M.Sc in Computer Science',
            code: 'MSC/COMPUTERSCIENCE',
            level: 'Masters',
            department: 'Computer Science',
            college: 'College Of Information & Communication Technology',
            collegeAbbreviation: 'CICT',
            status: 'Active',
            duration: '2 years',
            totalStudents: 45,
            currentCapacity: 120,
            admissionRequirements: 'First Class or Second Class Upper in Computer Science or related field',
            researchAreas: ['Artificial Intelligence', 'Machine Learning', 'Cybersecurity', 'Software Engineering', 'Data Science'],
            supervisors: ['Prof. Marouf Oyelakin', 'Dr. Smith Johnson', 'Prof. Mary Wilson', 'Dr. Patricia Moore'],
            coursework: 'Advanced Programming, Database Design, Network Security, Dissertation',
            fees: 350000,
            establishedYear: '2005',
            accreditation: 'NUC Accredited',
            graduatesCount: 120,
            employmentRate: '92%',
            averageCompletionTime: '20 months'
        },
        {
            id: 2,
            name: 'Ph.D in Business Administration',
            code: 'PHD/BUSINESSADMIN',
            level: 'PhD',
            department: 'Business Administration',
            college: 'Abeokuta Business school',
            collegeAbbreviation: 'ABS',
            status: 'Active',
            duration: '4 years',
            totalStudents: 28,
            currentCapacity: 50,
            admissionRequirements: 'Masters degree in Business Administration or related field with minimum 3.5 CGPA',
            researchAreas: ['Strategic Management', 'Financial Management', 'Marketing', 'Operations Management', 'Entrepreneurship'],
            supervisors: ['Prof. Ahmed Ibrahim', 'Dr. Sarah Wilson', 'Prof. Michael Brown', 'Dr. Lisa Anderson'],
            coursework: 'Advanced Research Methods, Strategic Leadership, Comprehensive Exam, Dissertation',
            fees: 450000,
            establishedYear: '2008',
            accreditation: 'NUC Accredited',
            graduatesCount: 35,
            employmentRate: '95%',
            averageCompletionTime: '4.2 years'
        },
        {
            id: 3,
            name: 'Postgraduate Diploma in Mass Communication',
            code: 'PGD/MASSCOMM',
            level: 'Postgraduate Diploma',
            department: 'Mass Communication',
            college: 'College of Arts Social, & Management Sciences',
            collegeAbbreviation: 'CASMS',
            status: 'Under Review',
            duration: '1 year',
            totalStudents: 65,
            currentCapacity: 80,
            admissionRequirements: 'First Class or Second Class Upper in Mass Communication or related field',
            researchAreas: ['Digital Media', 'Journalism Studies', 'Public Relations', 'Broadcasting', 'Media Ethics'],
            supervisors: ['Prof. Sarah Wilson', 'Dr. Michael Thompson', 'Prof. James Taylor', 'Dr. Patricia Moore'],
            coursework: 'Media Studies, Communication Theory, Journalism Basics, Project',
            fees: 250000,
            establishedYear: '2005',
            accreditation: 'NUC Accredited',
            graduatesCount: 85,
            employmentRate: '88%',
            averageCompletionTime: '12 months'
        },
        {
            id: 4,
            name: 'M.Sc in Biochemistry',
            code: 'MSC/BIOCHEMISTRY',
            level: 'Masters',
            department: 'Biochemistry',
            college: 'College of Natural and Applied Sciences',
            collegeAbbreviation: 'CNAS',
            status: 'Active',
            duration: '2 years',
            totalStudents: 32,
            currentCapacity: 60,
            admissionRequirements: 'First Class or Second Class Upper in Biochemistry or related field',
            researchAreas: ['Molecular Biology', 'Protein Chemistry', 'Enzymology', 'Metabolic Pathways', 'Structural Biology'],
            supervisors: ['Prof. Patricia Moore', 'Dr. Michael Brown', 'Prof. Lisa Anderson', 'Dr. Sarah Wilson'],
            coursework: 'Advanced Biochemistry, Research Methods, Laboratory Techniques, Dissertation',
            fees: 350000,
            establishedYear: '2005',
            accreditation: 'NUC Accredited',
            graduatesCount: 75,
            employmentRate: '90%',
            averageCompletionTime: '20 months'
        },
        {
            id: 5,
            name: 'Ph.D in Islamic Studies',
            code: 'PHD/ISLAMICSTUDIES',
            level: 'PhD',
            department: 'Islamic Studies',
            college: 'College of Arts Social, & Management Sciences',
            collegeAbbreviation: 'CASMS',
            status: 'Active',
            duration: '4 years',
            totalStudents: 18,
            currentCapacity: 30,
            admissionRequirements: 'Masters degree in Islamic Studies or related field with minimum 3.5 CGPA',
            researchAreas: ['Quranic Studies', 'Hadith Studies', 'Islamic Jurisprudence', 'Islamic History', 'Comparative Religion'],
            supervisors: ['Prof. Abdullah Rahman', 'Dr. Fatima Abdullahi', 'Prof. Ibrahim Musa', 'Dr. Aisha Mohammed'],
            coursework: 'Advanced Research Methods, Islamic Philosophy, Comprehensive Exam, Dissertation',
            fees: 450000,
            establishedYear: '2005',
            accreditation: 'NUC Accredited',
            graduatesCount: 25,
            employmentRate: '96%',
            averageCompletionTime: '4.2 years'
        }
    ];

    function init() {
        loadProgrammes();
        renderPage();
        setupEventListeners();
    }

    function loadProgrammes() {
        programmes = [...mockProgrammes];
        filteredProgrammes = [...programmes];
    }

    function renderPage() {
        const content = document.getElementById('programmes-page-content');
        if (!content) return;

        content.innerHTML = `
            <div class="page-header">
                <h2>Postgraduate School Programmes</h2>
                <p>Manage and oversee all postgraduate programmes across different departments</p>
            </div>

            <div class="filters-section">
                <div class="filters-grid">
                    <div class="filter-group">
                        <label>Level:</label>
                        <select id="level-filter">
                            <option value="">All Levels</option>
                            ${levels.map(level => `<option value="${level}">${level}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Department:</label>
                        <select id="department-filter">
                            <option value="">All Departments</option>
                            ${departments.map(department => `<option value="${department}">${department}</option>`).join('')}
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
                        <input type="text" id="search-input" placeholder="Search by name, code, or department...">
                    </div>
                    
                    <div class="filter-actions">
                        <button class="btn btn-secondary" id="clear-filters">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                        <button class="btn btn-success">
                            <i class="fas fa-plus"></i> Add Programme
                        </button>
                        <button class="btn btn-primary">
                            <i class="fas fa-download"></i> Export Report
                        </button>
                    </div>
                </div>
            </div>

            <div class="results-summary">
                <p>Showing ${filteredProgrammes.length} of ${programmes.length} PG programmes</p>
                <div class="summary-stats">
                    <span class="stat-item success">
                        Active: ${programmes.filter(p => p.status === 'Active').length}
                    </span>
                    <span class="stat-item warning">
                        Under Review: ${programmes.filter(p => p.status === 'Under Review').length}
                    </span>
                    <span class="stat-item danger">
                        Suspended: ${programmes.filter(p => p.status === 'Suspended').length}
                    </span>
                    <span class="stat-item secondary">
                        Discontinued: ${programmes.filter(p => p.status === 'Discontinued').length}
                    </span>
                </div>
            </div>

            <div class="programmes-list" id="programmes-list"></div>
        `;

        renderProgrammesList();
    }

    function renderProgrammesList() {
        const listContainer = document.getElementById('programmes-list');
        if (!listContainer) return;

        if (filteredProgrammes.length > 0) {
            listContainer.innerHTML = filteredProgrammes.map(programme => `
                <div class="programme-card">
                    <div class="programme-header">
                        <div class="programme-info">
                            <h4>${programme.name}</h4>
                            <p class="programme-meta">
                                <strong>${programme.code}</strong> • ${programme.department} Department
                            </p>
                            <p class="programme-details">
                                ${programme.level} • ${programme.duration} • Established ${programme.establishedYear}
                            </p>
                        </div>
                        <div class="programme-status ${getStatusColor(programme.status)}">
                            ${programme.status}
                        </div>
                    </div>
                    
                    <div class="programme-body">
                        <div class="programme-stats">
                            <div class="stat-grid">
                                <div class="stat-item">
                                    <span class="stat-number">${programme.totalStudents}</span>
                                    <span class="stat-label">Current Students</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">${programme.currentCapacity}</span>
                                    <span class="stat-label">Capacity</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">${programme.graduatesCount}</span>
                                    <span class="stat-label">Graduates</span>
                                </div>
                                <div class="stat-item">
                                    <span class="stat-number">${programme.employmentRate}</span>
                                    <span class="stat-label">Employment Rate</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="programme-details-section">
                            <div class="fees-info">
                                <strong>Annual Fees:</strong> ${formatCurrency(programme.fees)}
                            </div>
                            
                            <div class="completion-info">
                                <strong>Average Completion Time:</strong> ${programme.averageCompletionTime}
                            </div>
                            
                            <div class="accreditation-info">
                                <strong>Accreditation:</strong> ${programme.accreditation}
                            </div>
                        </div>
                        
                        <div class="research-areas">
                            <strong>Research Areas:</strong>
                            <div class="areas-list">
                                ${programme.researchAreas.slice(0, 3).map(area => 
                                    `<span class="area-badge">${area}</span>`
                                ).join('')}
                                ${programme.researchAreas.length > 3 ? 
                                    `<span class="area-badge more">+${programme.researchAreas.length - 3} more</span>` : ''
                                }
                            </div>
                        </div>
                        
                        <div class="supervisors-info">
                            <strong>Available Supervisors:</strong> ${programme.supervisors.length}
                        </div>
                    </div>
                    
                    <div class="programme-actions">
                        <button class="btn btn-primary view-programme" data-id="${programme.id}">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-users"></i> View Students
                        </button>
                        <button class="btn btn-success">
                            <i class="fas fa-user-plus"></i> Manage Admissions
                        </button>
                        <button class="btn btn-warning">
                            <i class="fas fa-edit"></i> Edit Programme
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-chart-bar"></i> Performance Report
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            listContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-search"></i>
                    <h3>No PG programmes found</h3>
                    <p>Try adjusting your filters or search criteria</p>
                </div>
            `;
        }
    }

    function setupEventListeners() {
        // Filter event listeners
        document.getElementById('level-filter')?.addEventListener('change', (e) => {
            selectedLevel = e.target.value;
            applyFilters();
        });

        document.getElementById('department-filter')?.addEventListener('change', (e) => {
            selectedDepartment = e.target.value;
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

        // Programme view event listeners
        document.addEventListener('click', (e) => {
            if (e.target.closest('.view-programme')) {
                const programmeId = parseInt(e.target.closest('.view-programme').dataset.id);
                const programme = programmes.find(p => p.id === programmeId);
                if (programme) {
                    handleViewProgramme(programme);
                }
            }
        });
    }

    function applyFilters() {
        let filtered = programmes;

        if (selectedLevel) {
            filtered = filtered.filter(prog => prog.level === selectedLevel);
        }
        if (selectedDepartment) {
            filtered = filtered.filter(prog => prog.department === selectedDepartment);
        }
        if (selectedStatus) {
            filtered = filtered.filter(prog => prog.status === selectedStatus);
        }
        if (searchTerm) {
            filtered = filtered.filter(prog => 
                prog.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prog.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                prog.department.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filteredProgrammes = filtered;
        renderPage();
    }

    function clearFilters() {
        selectedLevel = '';
        selectedDepartment = '';
        selectedStatus = '';
        searchTerm = '';
        
        // Reset form elements
        document.getElementById('level-filter').value = '';
        document.getElementById('department-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('search-input').value = '';
        
        applyFilters();
    }

    function handleViewProgramme(programme) {
        selectedProgramme = programme;
        showProgrammeModal = true;
        renderProgrammeModal();
    }

    function renderProgrammeModal() {
        if (!showProgrammeModal || !selectedProgramme) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content programme-modal">
                <div class="modal-header">
                    <h3>${selectedProgramme.name}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="programme-full-details">
                        <div class="detail-section">
                            <h4>Programme Information</h4>
                            <div class="detail-grid">
                                <div><strong>Code:</strong> ${selectedProgramme.code}</div>
                                <div><strong>Level:</strong> ${selectedProgramme.level}</div>
                                <div><strong>Department:</strong> ${selectedProgramme.department}</div>
                                <div><strong>Duration:</strong> ${selectedProgramme.duration}</div>
                                <div><strong>Status:</strong> 
                                    <span class="status-badge ${getStatusColor(selectedProgramme.status)}">
                                        ${selectedProgramme.status}
                                    </span>
                                </div>
                                <div><strong>Established:</strong> ${selectedProgramme.establishedYear}</div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Admission Requirements</h4>
                            <p>${selectedProgramme.admissionRequirements}</p>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Coursework</h4>
                            <p>${selectedProgramme.coursework}</p>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Research Areas</h4>
                            <div class="research-areas-full">
                                ${selectedProgramme.researchAreas.map(area => 
                                    `<span class="research-area-badge">${area}</span>`
                                ).join('')}
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Available Supervisors</h4>
                            <div class="supervisors-list">
                                ${selectedProgramme.supervisors.map(supervisor => 
                                    `<div class="supervisor-item">
                                        <i class="fas fa-user"></i> ${supervisor}
                                    </div>`
                                ).join('')}
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Programme Statistics</h4>
                            <div class="stats-grid">
                                <div class="stat-detail">
                                    <strong>Current Students:</strong> ${selectedProgramme.totalStudents}
                                </div>
                                <div class="stat-detail">
                                    <strong>Programme Capacity:</strong> ${selectedProgramme.currentCapacity}
                                </div>
                                <div class="stat-detail">
                                    <strong>Total Graduates:</strong> ${selectedProgramme.graduatesCount}
                                </div>
                                <div class="stat-detail">
                                    <strong>Employment Rate:</strong> ${selectedProgramme.employmentRate}
                                </div>
                                <div class="stat-detail">
                                    <strong>Average Completion:</strong> ${selectedProgramme.averageCompletionTime}
                                </div>
                                <div class="stat-detail">
                                    <strong>Annual Fees:</strong> ${formatCurrency(selectedProgramme.fees)}
                                </div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Accreditation</h4>
                            <p>${selectedProgramme.accreditation}</p>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Close modal event listeners
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-modal')) {
                closeProgrammeModal();
            }
        });

        // Prevent modal content clicks from closing modal
        modal.querySelector('.modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    function closeProgrammeModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
        showProgrammeModal = false;
        selectedProgramme = null;
    }

    function getStatusColor(status) {
        switch (status) {
            case 'Active': return 'success';
            case 'Under Review': return 'warning';
            case 'Suspended': return 'danger';
            case 'Discontinued': return 'secondary';
            default: return 'primary';
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
