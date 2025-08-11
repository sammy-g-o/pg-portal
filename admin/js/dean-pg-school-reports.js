// Dean PG School Reports Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let reports = [];
    let filteredReports = [];
    let selectedCategory = '';
    let selectedPeriod = '';
    let selectedProgramme = '';
    let searchTerm = '';
    let showGenerateModal = false;
    const categories = ['Research Performance', 'Student Progress', 'Graduation Statistics', 'Admission Analytics', 'Programme Evaluation', 'Supervisor Reports', 'Financial Summary', 'Quality Assurance'];
    const periods = ['Current Month', 'Current Semester', 'Current Session', 'Last 3 Months', 'Last 6 Months', 'Last Year', 'Custom Range'];
    const programmes = ['All Programmes', 'M.Sc Computer Science', 'Ph.D Computer Science', 'M.Sc Data Science', 'MBA', 'M.Sc Mathematics', 'Ph.D Mathematics', 'M.Sc Physics', 'Ph.D Physics'];
    const formats = ['PDF', 'Excel', 'Word', 'PowerPoint'];

    // Mock data for PG reports
    const mockReports = [
        {
            id: 1,
            title: 'Postgraduate Research Performance Analysis',
            category: 'Research Performance',
            period: 'Current Session',
            programme: 'All Programmes',
            generatedDate: '2024-01-25',
            generatedBy: 'Dean PG School Office',
            status: 'Completed',
            fileSize: '3.2 MB',
            format: 'PDF',
            description: 'Comprehensive analysis of research output, publications, and citations across all PG programmes',
            downloadCount: 18,
            lastAccessed: '2024-01-26',
            keyMetrics: ['45 Publications', '234 Citations', '12 Conference Presentations']
        },
        {
            id: 2,
            title: 'PhD Student Progress Tracking Report',
            category: 'Student Progress',
            period: 'Current Semester',
            programme: 'Ph.D Computer Science',
            generatedDate: '2024-01-20',
            generatedBy: 'Prof. Smith Johnson',
            status: 'Completed',
            fileSize: '2.1 MB',
            format: 'PDF',
            description: 'Detailed tracking of PhD student milestones, thesis progress, and completion timelines',
            downloadCount: 12,
            lastAccessed: '2024-01-24',
            keyMetrics: ['23 Active Students', '4.2 Years Avg Completion', '95% Progress Rate']
        },
        {
            id: 3,
            title: 'MBA Programme Graduation Statistics',
            category: 'Graduation Statistics',
            period: 'Last Year',
            programme: 'MBA',
            generatedDate: '2024-01-18',
            generatedBy: 'Prof. Mary Wilson',
            status: 'Completed',
            fileSize: '1.8 MB',
            format: 'Excel',
            description: 'Statistical analysis of MBA graduation rates, employment outcomes, and career progression',
            downloadCount: 25,
            lastAccessed: '2024-01-25',
            keyMetrics: ['88% Graduation Rate', '92% Employment Rate', '₦2.5M Avg Salary']
        },
        {
            id: 4,
            title: 'PG School Admission Analytics Dashboard',
            category: 'Admission Analytics',
            period: 'Current Session',
            programme: 'All Programmes',
            generatedDate: '2024-01-15',
            generatedBy: 'Admissions Office',
            status: 'Completed',
            fileSize: '4.5 MB',
            format: 'PDF',
            description: 'Analysis of admission trends, applicant demographics, and selection criteria effectiveness',
            downloadCount: 15,
            lastAccessed: '2024-01-23',
            keyMetrics: ['456 Applications', '234 Admitted', '51% Acceptance Rate']
        },
        {
            id: 5,
            title: 'Masters Programme Quality Evaluation',
            category: 'Programme Evaluation',
            period: 'Last 6 Months',
            programme: 'M.Sc Data Science',
            generatedDate: '2024-01-12',
            generatedBy: 'Quality Assurance Unit',
            status: 'Completed',
            fileSize: '2.7 MB',
            format: 'Word',
            description: 'Comprehensive evaluation of programme quality, curriculum effectiveness, and student satisfaction',
            downloadCount: 8,
            lastAccessed: '2024-01-22',
            keyMetrics: ['4.2/5 Student Satisfaction', '94% Course Completion', '89% Industry Relevance']
        },
        {
            id: 6,
            title: 'Supervisor Workload and Performance Report',
            category: 'Supervisor Reports',
            period: 'Current Session',
            programme: 'All Programmes',
            generatedDate: '2024-01-10',
            generatedBy: 'Academic Office',
            status: 'In Progress',
            fileSize: null,
            format: 'PDF',
            description: 'Analysis of supervisor workload distribution, student supervision ratios, and performance metrics',
            downloadCount: 0,
            lastAccessed: null,
            keyMetrics: ['45 Active Supervisors', '3.2 Students/Supervisor', '87% Satisfaction Rate']
        },
        {
            id: 7,
            title: 'PG School Financial Performance Summary',
            category: 'Financial Summary',
            period: 'Current Session',
            programme: 'All Programmes',
            generatedDate: '2024-01-08',
            generatedBy: 'Finance Office',
            status: 'Completed',
            fileSize: '1.9 MB',
            format: 'Excel',
            description: 'Financial analysis including revenue, expenditure, scholarships, and budget utilization',
            downloadCount: 22,
            lastAccessed: '2024-01-26',
            keyMetrics: ['₦125M Revenue', '₦98M Expenditure', '₦15M Scholarships']
        }
    ];

    function init() {
        loadReports();
        renderPage();
        setupEventListeners();
    }

    function loadReports() {
        reports = [...mockReports];
        filteredReports = [...reports];
    }

    function renderPage() {
        const content = document.getElementById('reports-page-content');
        if (!content) return;

        content.innerHTML = `
            <div class="page-header">
                <h2>Postgraduate School Reports</h2>
                <p>Generate, view, and manage comprehensive reports for postgraduate programs and activities</p>
            </div>

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
                        <label>Programme:</label>
                        <select id="programme-filter">
                            <option value="">All Programmes</option>
                            ${programmes.map(programme => `<option value="${programme}">${programme}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Search:</label>
                        <input type="text" id="search-input" placeholder="Search reports...">
                    </div>
                    
                    <div class="filter-actions">
                        <button class="btn btn-secondary" id="clear-filters">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                        <button class="btn btn-success" id="generate-report">
                            <i class="fas fa-plus"></i> Generate Report
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-chart-bar"></i> Analytics Dashboard
                        </button>
                    </div>
                </div>
            </div>

            <div class="results-summary">
                <p>Showing ${filteredReports.length} of ${reports.length} PG reports</p>
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

            <div class="reports-list" id="reports-list"></div>
        `;

        renderReportsList();
    }

    function renderReportsList() {
        const listContainer = document.getElementById('reports-list');
        if (!listContainer) return;

        if (filteredReports.length > 0) {
            listContainer.innerHTML = filteredReports.map(report => `
                <div class="report-card">
                    <div class="report-header">
                        <div class="report-info">
                            <h4>${report.title}</h4>
                            <p class="report-meta">
                                <strong>${report.category}</strong> • ${report.period} • ${report.programme}
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
                        
                        ${report.keyMetrics && report.keyMetrics.length > 0 ? `
                            <div class="key-metrics">
                                <strong>Key Metrics:</strong>
                                <div class="metrics-list">
                                    ${report.keyMetrics.map(metric => 
                                        `<span class="metric-badge">${metric}</span>`
                                    ).join('')}
                                </div>
                            </div>
                        ` : ''}
                        
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
                        <button class="btn btn-success">
                            <i class="fas fa-chart-line"></i> Analytics
                        </button>
                        <button class="btn btn-danger">
                            <i class="fas fa-trash"></i> Delete
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            listContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-chart-bar"></i>
                    <h3>No PG reports found</h3>
                    <p>Try adjusting your filters or generate a new report</p>
                </div>
            `;
        }
    }

    function setupEventListeners() {
        // Filter event listeners
        document.getElementById('category-filter')?.addEventListener('change', (e) => {
            selectedCategory = e.target.value;
            applyFilters();
        });

        document.getElementById('period-filter')?.addEventListener('change', (e) => {
            selectedPeriod = e.target.value;
            applyFilters();
        });

        document.getElementById('programme-filter')?.addEventListener('change', (e) => {
            selectedProgramme = e.target.value;
            applyFilters();
        });

        document.getElementById('search-input')?.addEventListener('input', (e) => {
            searchTerm = e.target.value;
            applyFilters();
        });

        document.getElementById('clear-filters')?.addEventListener('click', clearFilters);
        document.getElementById('generate-report')?.addEventListener('click', () => {
            showGenerateModal = true;
            renderGenerateModal();
        });
    }

    function applyFilters() {
        let filtered = reports;

        if (selectedCategory) {
            filtered = filtered.filter(report => report.category === selectedCategory);
        }
        if (selectedPeriod) {
            filtered = filtered.filter(report => report.period === selectedPeriod);
        }
        if (selectedProgramme && selectedProgramme !== 'All Programmes') {
            filtered = filtered.filter(report => report.programme === selectedProgramme);
        }
        if (searchTerm) {
            filtered = filtered.filter(report => 
                report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                report.generatedBy.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        filteredReports = filtered;
        renderPage();
    }

    function clearFilters() {
        selectedCategory = '';
        selectedPeriod = '';
        selectedProgramme = '';
        searchTerm = '';
        
        // Reset form elements
        document.getElementById('category-filter').value = '';
        document.getElementById('period-filter').value = '';
        document.getElementById('programme-filter').value = '';
        document.getElementById('search-input').value = '';
        
        applyFilters();
    }

    function renderGenerateModal() {
        if (!showGenerateModal) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content generate-report-modal">
                <div class="modal-header">
                    <h3>Generate New PG Report</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <form class="modal-body" id="generate-report-form">
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
                            <label>Programme:</label>
                            <select id="report-programme" required>
                                <option value="">Select Programme</option>
                                ${programmes.map(programme => `<option value="${programme}">${programme}</option>`).join('')}
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
                        <button type="button" class="btn btn-secondary" id="cancel-generate">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-cog"></i> Generate Report
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Modal event listeners
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('close-modal') || e.target.id === 'cancel-generate') {
                closeGenerateModal();
            }
        });

        modal.querySelector('.modal-content').addEventListener('click', (e) => {
            e.stopPropagation();
        });

        // Form submission
        modal.querySelector('#generate-report-form').addEventListener('submit', handleGenerateReport);
    }

    function closeGenerateModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
        showGenerateModal = false;
    }

    function handleGenerateReport(e) {
        e.preventDefault();
        
        const formData = {
            title: document.getElementById('report-title').value,
            category: document.getElementById('report-category').value,
            period: document.getElementById('report-period').value,
            programme: document.getElementById('report-programme').value,
            format: document.getElementById('report-format').value,
            description: document.getElementById('report-description').value,
            includeCharts: document.getElementById('include-charts').checked,
            includeStatistics: document.getElementById('include-statistics').checked
        };

        // Add new report to the list
        const newReport = {
            id: reports.length + 1,
            title: formData.title,
            category: formData.category,
            period: formData.period,
            programme: formData.programme,
            generatedDate: new Date().toISOString().split('T')[0],
            generatedBy: 'Dean PG School Office',
            status: 'In Progress',
            fileSize: null,
            format: formData.format,
            description: formData.description,
            downloadCount: 0,
            lastAccessed: null,
            keyMetrics: []
        };
        
        reports.unshift(newReport);
        closeGenerateModal();
        applyFilters();
        
        // Reset form
        document.getElementById('report-title').value = '';
        document.getElementById('report-category').value = '';
        document.getElementById('report-period').value = '';
        document.getElementById('report-programme').value = '';
        document.getElementById('report-description').value = '';
        document.getElementById('include-charts').checked = true;
        document.getElementById('include-statistics').checked = true;
    }

    function getStatusColor(status) {
        switch (status) {
            case 'Completed': return 'success';
            case 'In Progress': return 'warning';
            case 'Failed': return 'danger';
            case 'Scheduled': return 'info';
            default: return 'primary';
        }
    }

    // Initialize the page
    init();
});
