// Registrar Reports Page JavaScript
let reports = [];
let filteredReports = [];
let selectedCategory = '';
let selectedPeriod = '';
let selectedProgramme = '';
let selectedStatus = '';
let searchTerm = '';
let loading = true;
let showGenerateModal = false;
let generateForm = {
    title: '',
    category: '',
    period: '',
    programme: '',
    level: '',
    format: 'PDF',
    includeCharts: true,
    includeStatistics: true,
    description: ''
};

const categories = ['Academic Records', 'Student Enrollment', 'Course Statistics', 'Graduation Reports', 'Transcript Analytics', 'Schedule Reports', 'Performance Analysis', 'Compliance Reports'];
const periods = ['Current Month', 'Current Semester', 'Current Session', 'Last 3 Months', 'Last 6 Months', 'Last Year', 'Custom Range'];
const programmes = ['All Programmes', 'Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'MBA'];
const statuses = ['Generated', 'In Progress', 'Scheduled', 'Failed'];
const formats = ['PDF', 'Excel', 'Word', 'CSV'];

document.addEventListener('DOMContentLoaded', function() {
    init();
});

function init() {
    loadReports();
    setupEventListeners();
}

function loadReports() {
    reports = [
        {
            id: 1,
            title: 'Student Enrollment Analysis Report',
            category: 'Student Enrollment',
            period: 'Current Session',
            programme: 'All Programmes',
            generatedDate: '2024-01-25',
            generatedBy: 'Registrar Office',
            status: 'Generated',
            fileSize: '2.8 MB',
            format: 'PDF',
            description: 'Comprehensive analysis of student enrollment trends across all programs',
            downloadCount: 15,
            lastAccessed: '2024-01-26',
            keyMetrics: ['1,245 Total Students', '89% Enrollment Rate', '234 New Admissions'],
            level: 'All Levels',
            session: '2024/2025'
        },
        {
            id: 2,
            title: 'Academic Performance Statistics',
            category: 'Performance Analysis',
            period: 'Current Semester',
            programme: 'Computer Science',
            generatedDate: '2024-01-22',
            generatedBy: 'Dr. Smith Johnson',
            status: 'Generated',
            fileSize: '3.5 MB',
            format: 'Excel',
            description: 'Detailed academic performance analysis for Computer Science students',
            downloadCount: 8,
            lastAccessed: '2024-01-25',
            keyMetrics: ['3.45 Average CGPA', '92% Pass Rate', '156 Students Analyzed'],
            level: 'All Levels',
            session: '2024/2025'
        },
        {
            id: 3,
            title: 'Course Registration Summary',
            category: 'Course Statistics',
            period: 'Current Semester',
            programme: 'All Programmes',
            generatedDate: '2024-01-20',
            generatedBy: 'Course Coordinator',
            status: 'Generated',
            fileSize: '1.9 MB',
            format: 'PDF',
            description: 'Summary of course registration statistics and enrollment patterns',
            downloadCount: 22,
            lastAccessed: '2024-01-24',
            keyMetrics: ['145 Courses Offered', '95% Registration Rate', '2,890 Total Registrations'],
            level: 'All Levels',
            session: '2024/2025'
        },
        {
            id: 4,
            title: 'Graduation Clearance Status Report',
            category: 'Graduation Reports',
            period: 'Current Session',
            programme: 'All Programmes',
            generatedDate: '2024-01-18',
            generatedBy: 'Graduation Committee',
            status: 'Generated',
            fileSize: '2.2 MB',
            format: 'Excel',
            description: 'Status report on graduation clearances and pending requirements',
            downloadCount: 12,
            lastAccessed: '2024-01-23',
            keyMetrics: ['89 Graduating Students', '76% Cleared', '13 Pending Clearance'],
            level: 'All Levels',
            session: '2024/2025'
        },
        {
            id: 5,
            title: 'Transcript Request Analytics',
            category: 'Transcript Analytics',
            period: 'Last 3 Months',
            programme: 'All Programmes',
            generatedDate: '2024-01-15',
            generatedBy: 'Records Office',
            status: 'Generated',
            fileSize: '1.6 MB',
            format: 'PDF',
            description: 'Analysis of transcript requests, processing times, and delivery methods',
            downloadCount: 18,
            lastAccessed: '2024-01-22',
            keyMetrics: ['156 Requests', '4.2 Days Avg Processing', '94% Completion Rate'],
            level: 'All Levels',
            session: 'Multiple Sessions'
        },
        {
            id: 6,
            title: 'Class Schedule Optimization Report',
            category: 'Schedule Reports',
            period: 'Current Semester',
            programme: 'All Programmes',
            generatedDate: '2024-01-12',
            generatedBy: 'Academic Planning',
            status: 'Generated',
            fileSize: '3.1 MB',
            format: 'Word',
            description: 'Analysis of class schedules, venue utilization, and conflict resolution',
            downloadCount: 6,
            lastAccessed: '2024-01-20',
            keyMetrics: ['89% Venue Utilization', '12 Schedule Conflicts', '245 Class Sessions'],
            level: 'All Levels',
            session: '2024/2025'
        },
        {
            id: 7,
            title: 'Student Records Compliance Audit',
            category: 'Compliance Reports',
            period: 'Last Year',
            programme: 'All Programmes',
            generatedDate: '2024-01-10',
            generatedBy: 'Quality Assurance',
            status: 'In Progress',
            fileSize: null,
            format: 'PDF',
            description: 'Comprehensive audit of student records for compliance with university policies',
            downloadCount: 0,
            lastAccessed: null,
            keyMetrics: ['1,890 Records Audited', '98% Compliance Rate', '34 Issues Identified'],
            level: 'All Levels',
            session: 'Multiple Sessions'
        },
        {
            id: 8,
            title: 'MBA Program Performance Review',
            category: 'Academic Records',
            period: 'Current Session',
            programme: 'MBA',
            generatedDate: '2024-01-08',
            generatedBy: 'MBA Coordinator',
            status: 'Generated',
            fileSize: '2.7 MB',
            format: 'Excel',
            description: 'Detailed performance review of MBA program students and outcomes',
            downloadCount: 9,
            lastAccessed: '2024-01-21',
            keyMetrics: ['78 MBA Students', '3.68 Average CGPA', '89% Employment Rate'],
            level: 'Masters',
            session: '2024/2025'
        }
    ];
    filteredReports = [...reports];
    loading = false;
    renderPage();
}

function renderPage() {
    if (loading) {
        document.getElementById('reports-page-content').innerHTML = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Loading registrar reports...</p>
            </div>
        `;
        return;
    }

    const content = `
        <div class="page-header">
            <h2>Registrar Reports</h2>
            <p>Generate and manage comprehensive academic and administrative reports</p>
        </div>

        <div class="filters-section">
            <div class="filters-grid">
                <div class="filter-group">
                    <label>Category:</label>
                    <select id="category-filter">
                        <option value="">All Categories</option>
                        ${categories.map(category => `<option value="${category}" ${selectedCategory === category ? 'selected' : ''}>${category}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Period:</label>
                    <select id="period-filter">
                        <option value="">All Periods</option>
                        ${periods.map(period => `<option value="${period}" ${selectedPeriod === period ? 'selected' : ''}>${period}</option>`).join('')}
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
                    <label>Status:</label>
                    <select id="status-filter">
                        <option value="">All Statuses</option>
                        ${statuses.map(status => `<option value="${status}" ${selectedStatus === status ? 'selected' : ''}>${status}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Search:</label>
                    <input type="text" id="search-filter" placeholder="Search reports..." value="${searchTerm}" />
                </div>
                
                <div class="filter-actions">
                    <button class="btn btn-secondary" id="clear-filters">
                        <i class="fas fa-times"></i> Clear Filters
                    </button>
                    <button class="btn btn-success" id="generate-report-btn">
                        <i class="fas fa-plus"></i> Generate Report
                    </button>
                    <button class="btn btn-info">
                        <i class="fas fa-chart-bar"></i> Analytics Dashboard
                    </button>
                </div>
            </div>
        </div>

        <div class="results-summary">
            <p>Showing ${filteredReports.length} of ${reports.length} registrar reports</p>
            <div class="summary-stats">
                <span class="stat-item success">
                    Generated: ${reports.filter(r => r.status === 'Generated').length}
                </span>
                <span class="stat-item warning">
                    In Progress: ${reports.filter(r => r.status === 'In Progress').length}
                </span>
                <span class="stat-item info">
                    Scheduled: ${reports.filter(r => r.status === 'Scheduled').length}
                </span>
                <span class="stat-item danger">
                    Failed: ${reports.filter(r => r.status === 'Failed').length}
                </span>
            </div>
        </div>

        <div class="reports-list">
            ${renderReportsList()}
        </div>

        ${showGenerateModal ? renderGenerateModal() : ''}
    `;

    document.getElementById('reports-page-content').innerHTML = content;
    setupModalEventListeners();
}

function renderReportsList() {
    if (filteredReports.length === 0) {
        return `
            <div class="no-results">
                <i class="fas fa-chart-bar"></i>
                <h3>No registrar reports found</h3>
                <p>Try adjusting your filters or generate a new report</p>
            </div>
        `;
    }

    return filteredReports.map(report => `
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
                            ${report.keyMetrics.map(metric => `<span class="metric-badge">${metric}</span>`).join('')}
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
                        <div class="metadata-item">
                            <span class="metadata-label">Level:</span>
                            <span class="metadata-value">${report.level}</span>
                        </div>
                        <div class="metadata-item">
                            <span class="metadata-label">Session:</span>
                            <span class="metadata-value">${report.session}</span>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="report-actions">
                ${report.status === 'Generated' ? `
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
}

function renderGenerateModal() {
    return `
        <div class="modal-overlay" id="generate-modal-overlay">
            <div class="modal-content generate-report-modal">
                <div class="modal-header">
                    <h3>Generate New Registrar Report</h3>
                    <button id="close-generate-modal">&times;</button>
                </div>
                <form id="generate-form" class="modal-body">
                    <div class="form-group">
                        <label>Report Title:</label>
                        <input type="text" id="report-title" value="${generateForm.title}" placeholder="Enter report title..." required />
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Category:</label>
                            <select id="report-category" required>
                                <option value="">Select Category</option>
                                ${categories.map(category => `<option value="${category}" ${generateForm.category === category ? 'selected' : ''}>${category}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Period:</label>
                            <select id="report-period" required>
                                <option value="">Select Period</option>
                                ${periods.map(period => `<option value="${period}" ${generateForm.period === period ? 'selected' : ''}>${period}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Programme:</label>
                            <select id="report-programme" required>
                                <option value="">Select Programme</option>
                                ${programmes.map(programme => `<option value="${programme}" ${generateForm.programme === programme ? 'selected' : ''}>${programme}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Level:</label>
                            <select id="report-level" required>
                                <option value="">Select Level</option>
                                <option value="All Levels" ${generateForm.level === 'All Levels' ? 'selected' : ''}>All Levels</option>
                                <option value="Undergraduate" ${generateForm.level === 'Undergraduate' ? 'selected' : ''}>Undergraduate</option>
                                <option value="Masters" ${generateForm.level === 'Masters' ? 'selected' : ''}>Masters</option>
                                <option value="PhD" ${generateForm.level === 'PhD' ? 'selected' : ''}>PhD</option>
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Format:</label>
                        <select id="report-format">
                            ${formats.map(format => `<option value="${format}" ${generateForm.format === format ? 'selected' : ''}>${format}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Description:</label>
                        <textarea id="report-description" placeholder="Describe what this report should include..." rows="3" required>${generateForm.description}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Report Options:</label>
                        <div class="checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="include-charts" ${generateForm.includeCharts ? 'checked' : ''} />
                                Include Charts and Graphs
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" id="include-statistics" ${generateForm.includeStatistics ? 'checked' : ''} />
                                Include Statistical Analysis
                            </label>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" id="cancel-generate-btn">Cancel</button>
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-cog"></i> Generate Report
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
}

function setupEventListeners() {
    document.addEventListener('change', function(e) {
        if (e.target.id === 'category-filter') {
            selectedCategory = e.target.value;
            applyFilters();
        } else if (e.target.id === 'period-filter') {
            selectedPeriod = e.target.value;
            applyFilters();
        } else if (e.target.id === 'programme-filter') {
            selectedProgramme = e.target.value;
            applyFilters();
        } else if (e.target.id === 'status-filter') {
            selectedStatus = e.target.value;
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
        } else if (e.target.id === 'generate-report-btn') {
            handleGenerateReport();
        }
    });
}

function setupModalEventListeners() {
    if (showGenerateModal) {
        const overlay = document.getElementById('generate-modal-overlay');
        const closeBtn = document.getElementById('close-generate-modal');
        const cancelBtn = document.getElementById('cancel-generate-btn');
        const form = document.getElementById('generate-form');

        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) closeGenerateModal();
            });
        }
        if (closeBtn) closeBtn.addEventListener('click', closeGenerateModal);
        if (cancelBtn) cancelBtn.addEventListener('click', closeGenerateModal);
        if (form) form.addEventListener('submit', handleSubmitGenerate);
    }
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
    if (selectedStatus) {
        filtered = filtered.filter(report => report.status === selectedStatus);
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
    selectedStatus = '';
    searchTerm = '';
    
    const categoryFilter = document.getElementById('category-filter');
    const periodFilter = document.getElementById('period-filter');
    const programmeFilter = document.getElementById('programme-filter');
    const statusFilter = document.getElementById('status-filter');
    const searchFilter = document.getElementById('search-filter');
    
    if (categoryFilter) categoryFilter.value = '';
    if (periodFilter) periodFilter.value = '';
    if (programmeFilter) programmeFilter.value = '';
    if (statusFilter) statusFilter.value = '';
    if (searchFilter) searchFilter.value = '';
    
    applyFilters();
}

function handleGenerateReport() {
    generateForm = {
        title: '',
        category: '',
        period: '',
        programme: '',
        level: '',
        format: 'PDF',
        includeCharts: true,
        includeStatistics: true,
        description: ''
    };
    showGenerateModal = true;
    renderPage();
}

function closeGenerateModal() {
    showGenerateModal = false;
    renderPage();
}

function handleSubmitGenerate(e) {
    e.preventDefault();
    
    const formData = {
        title: document.getElementById('report-title').value,
        category: document.getElementById('report-category').value,
        period: document.getElementById('report-period').value,
        programme: document.getElementById('report-programme').value,
        level: document.getElementById('report-level').value,
        format: document.getElementById('report-format').value,
        includeCharts: document.getElementById('include-charts').checked,
        includeStatistics: document.getElementById('include-statistics').checked,
        description: document.getElementById('report-description').value
    };

    const newReport = {
        id: reports.length + 1,
        title: formData.title,
        category: formData.category,
        period: formData.period,
        programme: formData.programme,
        generatedDate: new Date().toISOString().split('T')[0],
        generatedBy: 'Registrar Office',
        status: 'In Progress',
        fileSize: null,
        format: formData.format,
        description: formData.description,
        downloadCount: 0,
        lastAccessed: null,
        keyMetrics: [],
        level: formData.level,
        session: '2024/2025'
    };
    
    reports = [newReport, ...reports];
    alert('Report generation started successfully!');
    closeGenerateModal();
}

function getStatusColor(status) {
    switch (status) {
        case 'Generated': return 'success';
        case 'In Progress': return 'warning';
        case 'Scheduled': return 'info';
        case 'Failed': return 'danger';
        default: return 'primary';
    }
}
