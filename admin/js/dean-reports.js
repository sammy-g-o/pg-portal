// Dean Reports Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let reports = [];
    let filteredReports = [];
    let selectedCategory = '';
    let selectedPeriod = '';
    let selectedDepartment = '';
    let searchTerm = '';
    let showGenerateModal = false;
    let newReportForm = {
        title: '',
        category: '',
        period: '',
        department: '',
        description: '',
        includeCharts: true,
        includeStatistics: true,
        format: 'PDF'
    };

    // Available options for filters
    const categories = ['Academic Performance', 'Enrollment Statistics', 'Faculty Reports', 'Financial Summary', 'Research Activities', 'Student Affairs', 'Department Overview'];
    const periods = ['Current Month', 'Current Semester', 'Current Session', 'Last 3 Months', 'Last 6 Months', 'Last Year', 'Custom Range'];
    const departments = ['All Departments', 'Computer Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology'];
    const formats = ['PDF', 'Excel', 'Word', 'PowerPoint'];

    function init() {
        loadReports();
        setupEventListeners();
    }

    function loadReports() {
        // Mock data for reports
        reports = [
            {
                id: 1,
                title: 'College Academic Performance Report',
                category: 'Academic Performance',
                period: 'Current Semester',
                department: 'All Departments',
                generatedDate: '2024-01-25',
                generatedBy: 'Dean Office',
                status: 'Completed',
                fileSize: '2.5 MB',
                format: 'PDF',
                description: 'Comprehensive analysis of student academic performance across all departments',
                downloadCount: 15,
                lastAccessed: '2024-01-26'
            },
            {
                id: 2,
                title: 'Computer Science Department Overview',
                category: 'Department Overview',
                period: 'Current Session',
                department: 'Computer Science',
                generatedDate: '2024-01-20',
                generatedBy: 'Dr. Smith Johnson',
                status: 'Completed',
                fileSize: '1.8 MB',
                format: 'PDF',
                description: 'Detailed overview of Computer Science department activities, achievements, and statistics',
                downloadCount: 8,
                lastAccessed: '2024-01-24'
            },
            {
                id: 3,
                title: 'Enrollment Statistics - First Semester',
                category: 'Enrollment Statistics',
                period: 'Current Semester',
                department: 'All Departments',
                generatedDate: '2024-01-18',
                generatedBy: 'Admissions Office',
                status: 'Completed',
                fileSize: '3.2 MB',
                format: 'Excel',
                description: 'Student enrollment data and trends for the first semester across all programmes',
                downloadCount: 22,
                lastAccessed: '2024-01-25'
            },
            {
                id: 4,
                title: 'Faculty Research Activities Report',
                category: 'Research Activities',
                period: 'Last 6 Months',
                department: 'All Departments',
                generatedDate: '2024-01-15',
                generatedBy: 'Research Office',
                status: 'Completed',
                fileSize: '4.1 MB',
                format: 'PDF',
                description: 'Summary of research projects, publications, and grants across all departments',
                downloadCount: 12,
                lastAccessed: '2024-01-23'
            },
            {
                id: 5,
                title: 'Mathematics Department Financial Summary',
                category: 'Financial Summary',
                period: 'Current Session',
                department: 'Mathematics',
                generatedDate: '2024-01-12',
                generatedBy: 'Finance Office',
                status: 'Completed',
                fileSize: '1.5 MB',
                format: 'Excel',
                description: 'Financial overview and budget analysis for Mathematics department',
                downloadCount: 6,
                lastAccessed: '2024-01-20'
            },
            {
                id: 6,
                title: 'Student Affairs Report - Q4 2023',
                category: 'Student Affairs',
                period: 'Last 3 Months',
                department: 'All Departments',
                generatedDate: '2024-01-10',
                generatedBy: 'Student Affairs Office',
                status: 'In Progress',
                fileSize: null,
                format: 'PDF',
                description: 'Quarterly report on student activities, events, and welfare programs',
                downloadCount: 0,
                lastAccessed: null
            },
            {
                id: 7,
                title: 'Faculty Performance Evaluation',
                category: 'Faculty Reports',
                period: 'Current Session',
                department: 'All Departments',
                generatedDate: '2024-01-08',
                generatedBy: 'HR Department',
                status: 'Scheduled',
                fileSize: null,
                format: 'PDF',
                description: 'Comprehensive evaluation of faculty performance and teaching effectiveness',
                downloadCount: 0,
                lastAccessed: null
            }
        ];

        filteredReports = [...reports];
        renderPage();
    }

    function renderPage() {
        const content = document.getElementById('reports-page-content');
        content.innerHTML = `
            <!-- Page Header -->
            <div class="page-header">
                <h2>College Reports</h2>
                <p>Generate, view, and manage comprehensive reports for your college</p>
            </div>

            <!-- Filters Section -->
            <div class="filters-section">
                <div class="filters-grid">
                    <div class="filter-group">
                        <label>Category:</label>
                        <select id="category-filter">
                            <option value="">All Categories</option>
                            ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Period:</label>
                        <select id="period-filter">
                            <option value="">All Periods</option>
                            ${periods.map(period => `<option value="${period}">${period}</option>`).join('')}
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
                        <label>Search:</label>
                        <input type="text" id="search-filter" placeholder="Search reports...">
                    </div>
                    
                    <div class="filter-actions">
                        <button class="btn btn-secondary" id="clear-filters">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                        <button class="btn btn-success" id="generate-report">
                            <i class="fas fa-plus"></i> Generate Report
                        </button>
                    </div>
                </div>
            </div>

            <!-- Results Summary -->
            <div class="results-summary">
                <p>Showing ${filteredReports.length} of ${reports.length} reports</p>
                <div class="summary-stats">
                    <span class="stat-item success">
                        Completed: ${reports.filter(r => r.status === 'Completed').length}
                    </span>
                    <span class="stat-item warning">
                        In Progress: ${reports.filter(r => r.status === 'In Progress').length}
                    </span>
                    <span class="stat-item info">
                        Scheduled: ${reports.filter(r => r.status === 'Scheduled').length}
                    </span>
                </div>
            </div>

            <!-- Reports List -->
            <div class="reports-list" id="reports-list">
                ${renderReportsList()}
            </div>

            <!-- Generate Report Modal -->
            <div id="generate-modal" class="modal-overlay" style="display: none;">
                <div class="modal-content generate-report-modal">
                    <div class="modal-header">
                        <h3>Generate New Report</h3>
                        <button id="close-generate-modal">&times;</button>
                    </div>
                    <form id="generate-report-form" class="modal-body">
                        <div class="form-group">
                            <label>Report Title:</label>
                            <input type="text" id="report-title" placeholder="Enter report title..." required>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Category:</label>
                                <select id="report-category" required>
                                    <option value="">Select Category</option>
                                    ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Period:</label>
                                <select id="report-period" required>
                                    <option value="">Select Period</option>
                                    ${periods.map(period => `<option value="${period}">${period}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-row">
                            <div class="form-group">
                                <label>Department:</label>
                                <select id="report-department" required>
                                    <option value="">Select Department</option>
                                    ${departments.map(department => `<option value="${department}">${department}</option>`).join('')}
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label>Format:</label>
                                <select id="report-format">
                                    ${formats.map(format => `<option value="${format}">${format}</option>`).join('')}
                                </select>
                            </div>
                        </div>
                        
                        <div class="form-group">
                            <label>Description:</label>
                            <textarea id="report-description" placeholder="Describe what this report should include..." rows="3" required></textarea>
                        </div>
                        
                        <div class="form-group">
                            <label>Report Options:</label>
                            <div class="checkbox-group">
                                <label class="checkbox-label">
                                    <input type="checkbox" id="include-charts" checked>
                                    Include Charts and Graphs
                                </label>
                                <label class="checkbox-label">
                                    <input type="checkbox" id="include-statistics" checked>
                                    Include Statistical Analysis
                                </label>
                            </div>
                        </div>
                        
                        <div class="modal-actions">
                            <button type="button" class="btn btn-secondary" id="cancel-generate">Cancel</button>
                            <button type="submit" class="btn btn-success">
                                <i class="fas fa-cog"></i> Generate Report
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        `;

        setupModalEventListeners();
    }

    function renderReportsList() {
        if (filteredReports.length === 0) {
            return `
                <div class="no-results">
                    <i class="fas fa-chart-bar"></i>
                    <h3>No reports found</h3>
                    <p>Try adjusting your filters or generate a new report</p>
                </div>
            `;
        }

        return filteredReports.map(report => `
            <div class="report-card" data-report-id="${report.id}">
                <div class="report-header">
                    <div class="report-info">
                        <h4>${report.title}</h4>
                        <p class="report-meta">
                            <strong>${report.category}</strong> • ${report.period} • ${report.department}
                        </p>
                        <p class="report-details">
                            Generated by ${report.generatedBy} on ${report.generatedDate}
                        </p>
                    </div>
                    <div class="report-status ${getStatusColor(report.status)}">
                        ${report.status}
                    </div>
                </div>
                
                <div class="report-body">
                    <p class="report-description">${report.description}</p>
                    
                    <div class="report-metadata">
                        <div class="metadata-grid">
                            <div class="metadata-item">
                                <span class="metadata-label">Format:</span>
                                <span class="metadata-value">${report.format}</span>
                            </div>
                            ${report.fileSize ? `
                                <div class="metadata-item">
                                    <span class="metadata-label">Size:</span>
                                    <span class="metadata-value">${report.fileSize}</span>
                                </div>
                            ` : ''}
                            <div class="metadata-item">
                                <span class="metadata-label">Downloads:</span>
                                <span class="metadata-value">${report.downloadCount}</span>
                            </div>
                            ${report.lastAccessed ? `
                                <div class="metadata-item">
                                    <span class="metadata-label">Last Accessed:</span>
                                    <span class="metadata-value">${report.lastAccessed}</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
                
                <div class="report-actions">
                    ${report.status === 'Completed' ? `
                        <button class="btn btn-primary">
                            <i class="fas fa-download"></i> Download
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-eye"></i> Preview
                        </button>
                    ` : ''}
                    <button class="btn btn-secondary">
                        <i class="fas fa-share"></i> Share
                    </button>
                    <button class="btn btn-warning">
                        <i class="fas fa-edit"></i> Regenerate
                    </button>
                    <button class="btn btn-danger">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
        `).join('');
    }

    function setupEventListeners() {
        // Category filter
        document.addEventListener('change', function(e) {
            if (e.target.id === 'category-filter') {
                selectedCategory = e.target.value;
                applyFilters();
            }
        });

        // Period filter
        document.addEventListener('change', function(e) {
            if (e.target.id === 'period-filter') {
                selectedPeriod = e.target.value;
                applyFilters();
            }
        });

        // Department filter
        document.addEventListener('change', function(e) {
            if (e.target.id === 'department-filter') {
                selectedDepartment = e.target.value;
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

        // Generate report button
        document.addEventListener('click', function(e) {
            if (e.target.id === 'generate-report') {
                showGenerateModal = true;
                document.getElementById('generate-modal').style.display = 'flex';
            }
        });

        // Generate report form submission
        document.addEventListener('submit', function(e) {
            if (e.target.id === 'generate-report-form') {
                e.preventDefault();
                handleGenerateReport();
            }
        });
    }

    function setupModalEventListeners() {
        const modal = document.getElementById('generate-modal');
        const closeBtn = document.getElementById('close-generate-modal');
        const cancelBtn = document.getElementById('cancel-generate');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
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
        filteredReports = reports.filter(report => {
            const matchesCategory = !selectedCategory || report.category === selectedCategory;
            const matchesPeriod = !selectedPeriod || report.period === selectedPeriod;
            const matchesDepartment = !selectedDepartment || report.department === selectedDepartment;
            const matchesSearch = !searchTerm || 
                report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.description.toLowerCase().includes(searchTerm.toLowerCase());
            
            return matchesCategory && matchesPeriod && matchesDepartment && matchesSearch;
        });

        renderPage();
    }

    function clearFilters() {
        selectedCategory = '';
        selectedPeriod = '';
        selectedDepartment = '';
        searchTerm = '';
        document.getElementById('category-filter').value = '';
        document.getElementById('period-filter').value = '';
        document.getElementById('department-filter').value = '';
        document.getElementById('search-filter').value = '';
        applyFilters();
    }

    function handleGenerateReport() {
        const title = document.getElementById('report-title').value;
        const category = document.getElementById('report-category').value;
        const period = document.getElementById('report-period').value;
        const department = document.getElementById('report-department').value;
        const format = document.getElementById('report-format').value;
        const description = document.getElementById('report-description').value;
        const includeCharts = document.getElementById('include-charts').checked;
        const includeStatistics = document.getElementById('include-statistics').checked;

        const newReport = {
            id: reports.length + 1,
            title: title,
            category: category,
            period: period,
            department: department,
            generatedDate: new Date().toISOString().split('T')[0],
            generatedBy: 'Dean Office',
            status: 'In Progress',
            fileSize: null,
            format: format,
            description: description,
            downloadCount: 0,
            lastAccessed: null
        };

        reports.unshift(newReport);
        filteredReports = [...reports];
        
        // Close modal and reset form
        document.getElementById('generate-modal').style.display = 'none';
        document.getElementById('generate-report-form').reset();
        document.getElementById('include-charts').checked = true;
        document.getElementById('include-statistics').checked = true;
        
        renderPage();
        
        // Show success message
        alert('Report generation started successfully!');
    }

    function getStatusColor(status) {
        switch (status) {
            case 'Completed': return 'success';
            case 'In Progress': return 'warning';
            case 'Scheduled': return 'info';
            case 'Failed': return 'danger';
            default: return 'secondary';
        }
    }

    // Initialize the page
    init();
});
