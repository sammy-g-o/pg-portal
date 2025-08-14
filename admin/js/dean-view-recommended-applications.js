// Mock data for recommended applications
let applications = [
    {
        id: "APP001",
        studentName: "John Doe",
        department: "Computer Science",
        program: "MSc",
        status: "Recommended",
        submissionDate: "2024-01-15",
        hodRecommendation: "Recommended",
        email: "john.doe@email.com",
        phoneNumber: "+234 801 234 5678",
        applicationStatus: "Under Review",
        hodMessage: "Excellent academic background and research potential. Strong recommendation for admission.",
        documents: ["Transcript.pdf", "CV.pdf", "Research_Proposal.pdf", "Reference_Letter.pdf"],
        fullName: "John Michael Doe"
    },
    {
        id: "APP002",
        studentName: "Jane Smith",
        department: "Mathematics",
        program: "PhD",
        status: "Pending",
        submissionDate: "2024-01-20",
        hodRecommendation: "Recommended",
        email: "jane.smith@email.com",
        phoneNumber: "+234 802 345 6789",
        applicationStatus: "Under Review",
        hodMessage: "Outstanding mathematical skills and research experience. Highly recommended for PhD program.",
        documents: ["Transcript.pdf", "CV.pdf", "Research_Proposal.pdf", "Publications.pdf"],
        fullName: "Jane Elizabeth Smith"
    },
    {
        id: "APP003",
        studentName: "Michael Johnson",
        department: "Physics",
        program: "MSc",
        status: "Recommended",
        submissionDate: "2024-01-18",
        hodRecommendation: "Recommended",
        email: "michael.johnson@email.com",
        phoneNumber: "+234 803 456 7890",
        applicationStatus: "Under Review",
        hodMessage: "Strong physics background with excellent laboratory skills. Recommended for MSc program.",
        documents: ["Transcript.pdf", "CV.pdf", "Research_Proposal.pdf"],
        fullName: "Michael Robert Johnson"
    },
    {
        id: "APP004",
        studentName: "Sarah Wilson",
        department: "Chemistry",
        program: "PG Diploma",
        status: "Approved",
        submissionDate: "2024-01-10",
        hodRecommendation: "Recommended",
        email: "sarah.wilson@email.com",
        phoneNumber: "+234 804 567 8901",
        applicationStatus: "Approved",
        hodMessage: "Good academic record and practical skills. Recommended for PG Diploma.",
        documents: ["Transcript.pdf", "CV.pdf", "Certificate.pdf"],
        fullName: "Sarah Anne Wilson"
    },
    {
        id: "APP005",
        studentName: "David Brown",
        department: "Biology",
        program: "PhD",
        status: "Recommended",
        submissionDate: "2024-01-25",
        hodRecommendation: "Recommended",
        email: "david.brown@email.com",
        phoneNumber: "+234 805 678 9012",
        applicationStatus: "Under Review",
        hodMessage: "Excellent research proposal and academic credentials. Strongly recommended for PhD.",
        documents: ["Transcript.pdf", "CV.pdf", "Research_Proposal.pdf", "Publications.pdf", "Reference_Letters.pdf"],
        fullName: "David Christopher Brown"
    }
];

let filteredApplications = [...applications];
let currentPage = 1;
const itemsPerPage = 10;

// DOM elements
const applicationsTbody = document.getElementById('applications-tbody');
const searchInput = document.getElementById('search-input');
const departmentFilter = document.getElementById('department-filter');
const statusFilter = document.getElementById('status-filter');
const programFilter = document.getElementById('program-filter');
const selectAllCheckbox = document.getElementById('select-all');
const studentModal = document.getElementById('student-modal');
const approvalModal = document.getElementById('approval-modal');
const studentModalBody = document.getElementById('student-modal-body');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    setupSidebarAndUser();
    renderApplications();
    updateStatistics();
    setupEventListeners();
});

function setupSidebarAndUser() {
    // Set user email in header
    const adminUserEmailSpan = document.getElementById('admin-user-email');
    const user = JSON.parse(localStorage.getItem('adminUser'));
    if (user && adminUserEmailSpan) {
        adminUserEmailSpan.textContent = user.email || 'Dean User';
    }

    // Sidebar toggle functionality
    const adminToggleSidebarBtn = document.getElementById('admin-toggle-sidebar');
    const adminMainContent = document.getElementById('admin-main-content');
    
    if (adminToggleSidebarBtn) {
        adminToggleSidebarBtn.addEventListener('click', () => {
            const adminSidebar = document.getElementById('admin-sidebar');
            const overlay = document.getElementById('sidebar-overlay');
            
            if (window.innerWidth <= 768) {
                // Mobile behavior
                if (adminSidebar) {
                    adminSidebar.classList.toggle('mobile-open');
                }
                if (overlay) {
                    overlay.classList.toggle('active');
                }
                document.body.style.overflow = adminSidebar.classList.contains('mobile-open') ? 'hidden' : '';
            } else {
                // Desktop behavior
                if (adminSidebar) {
                    adminSidebar.classList.toggle('collapsed');
                }
                if (adminMainContent) {
                    adminMainContent.classList.toggle('expanded');
                }
            }
        });
    }
}

function setupEventListeners() {
    // Search and filter events
    searchInput.addEventListener('input', applyFilters);
    departmentFilter.addEventListener('change', applyFilters);
    statusFilter.addEventListener('change', applyFilters);
    programFilter.addEventListener('change', applyFilters);
    
    // Pagination events
    document.getElementById('prev-page').addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderApplications();
        }
    });
    
    document.getElementById('next-page').addEventListener('click', () => {
        const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderApplications();
        }
    });
    
    // Select all checkbox
    selectAllCheckbox.addEventListener('change', function() {
        const checkboxes = document.querySelectorAll('.application-checkbox');
        checkboxes.forEach(checkbox => {
            checkbox.checked = this.checked;
        });
    });
    
    // Export button
    document.getElementById('export-btn').addEventListener('click', exportApplications);
    
    // Bulk approve button
    document.getElementById('bulk-approve-btn').addEventListener('click', bulkApprove);
    
    // Modal close events
    document.querySelectorAll('.close').forEach(closeBtn => {
        closeBtn.addEventListener('click', function() {
            studentModal.style.display = 'none';
            approvalModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        if (event.target === studentModal) {
            studentModal.style.display = 'none';
        }
        if (event.target === approvalModal) {
            approvalModal.style.display = 'none';
        }
    });
    
    // Approval form submission
    document.getElementById('approval-form').addEventListener('submit', handleApproval);
    document.getElementById('cancel-approval').addEventListener('click', function() {
        approvalModal.style.display = 'none';
    });
}

function applyFilters() {
    const searchTerm = searchInput.value.toLowerCase();
    const department = departmentFilter.value;
    const status = statusFilter.value;
    const program = programFilter.value;
    
    filteredApplications = applications.filter(app => {
        const matchesSearch = app.id.toLowerCase().includes(searchTerm) ||
                            app.studentName.toLowerCase().includes(searchTerm) ||
                            app.department.toLowerCase().includes(searchTerm);
        
        const matchesDepartment = !department || app.department === department;
        const matchesStatus = !status || app.status === status;
        const matchesProgram = !program || app.program === program;
        
        return matchesSearch && matchesDepartment && matchesStatus && matchesProgram;
    });
    
    currentPage = 1;
    renderApplications();
    updateStatistics();
}

function renderApplications() {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageApplications = filteredApplications.slice(startIndex, endIndex);
    
    applicationsTbody.innerHTML = pageApplications.map(app => `
        <tr>
            <td>
                <input type="checkbox" class="application-checkbox" value="${app.id}">
            </td>
            <td>${app.id}</td>
            <td>${app.studentName}</td>
            <td>${app.department}</td>
            <td>${app.program}</td>
            <td>
                <span class="status-badge status-${app.status.toLowerCase()}">
                    ${app.status}
                </span>
            </td>
            <td>${formatDate(app.submissionDate)}</td>
            <td>
                <span class="recommendation-badge">
                    ${app.hodRecommendation}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-primary" onclick="viewApplication('${app.id}')">
                        <i class="fas fa-eye"></i> View
                    </button>
                    <button class="btn btn-sm btn-success" onclick="approveApplication('${app.id}')">
                        <i class="fas fa-check"></i> Approve
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="rejectApplication('${app.id}')">
                        <i class="fas fa-times"></i> Cancel
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
    
    updatePagination();
}

function updatePagination() {
    const totalPages = Math.ceil(filteredApplications.length / itemsPerPage);
    document.getElementById('current-page').textContent = currentPage;
    document.getElementById('total-pages').textContent = totalPages;
    
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
}

function updateStatistics() {
    document.getElementById('total-applications').textContent = filteredApplications.length;
    document.getElementById('recommended-count').textContent = 
        filteredApplications.filter(app => app.status === 'Recommended').length;
    document.getElementById('pending-count').textContent = 
        filteredApplications.filter(app => app.status === 'Pending').length;
    document.getElementById('approved-count').textContent = 
        filteredApplications.filter(app => app.status === 'Approved').length;
}

function viewApplication(applicationId) {
    const application = applications.find(app => app.id === applicationId);
    if (!application) return;
    
    studentModalBody.innerHTML = `
        <div class="student-details-grid">
            <div class="detail-section">
                <h3>Basic Information</h3>
                <div class="detail-row">
                    <label>Application ID:</label>
                    <span>${application.id}</span>
                </div>
                <div class="detail-row">
                    <label>Full Name:</label>
                    <span>${application.fullName}</span>
                </div>
                <div class="detail-row">
                    <label>Email:</label>
                    <span>${application.email}</span>
                </div>
                <div class="detail-row">
                    <label>Phone Number:</label>
                    <span>${application.phoneNumber}</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Academic Information</h3>
                <div class="detail-row">
                    <label>Department:</label>
                    <span>${application.department}</span>
                </div>
                <div class="detail-row">
                    <label>Program:</label>
                    <span>${application.program}</span>
                </div>
                <div class="detail-row">
                    <label>Application Status:</label>
                    <span class="status-badge status-${application.applicationStatus.toLowerCase().replace(' ', '-')}">
                        ${application.applicationStatus}
                    </span>
                </div>
                <div class="detail-row">
                    <label>Submission Date:</label>
                    <span>${formatDate(application.submissionDate)}</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>HOD Recommendation</h3>
                <div class="detail-row">
                    <label>Recommendation Status:</label>
                    <span class="recommendation-badge">${application.hodRecommendation}</span>
                </div>
                <div class="detail-row">
                    <label>HOD Message:</label>
                    <span class="hod-message">${application.hodMessage}</span>
                </div>
            </div>
            
            <div class="detail-section">
                <h3>Uploaded Documents</h3>
                <div class="documents-list">
                    ${application.documents.map(doc => `
                        <div class="document-item">
                            <i class="fas fa-file-pdf"></i>
                            <span>${doc}</span>
                            <button class="btn btn-sm btn-secondary">
                                <i class="fas fa-download"></i> Download
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    studentModal.style.display = 'flex';
}

function approveApplication(applicationId) {
    const application = applications.find(app => app.id === applicationId);
    if (!application) return;
    
    document.getElementById('modal-application-id').value = application.id;
    document.getElementById('modal-student-name').value = application.studentName;
    document.getElementById('approval-decision').value = 'approved';
    document.getElementById('approval-comments').value = '';
    
    approvalModal.style.display = 'flex';
}

function rejectApplication(applicationId) {
    const application = applications.find(app => app.id === applicationId);
    if (!application) return;
    
    document.getElementById('modal-application-id').value = application.id;
    document.getElementById('modal-student-name').value = application.studentName;
    document.getElementById('approval-decision').value = 'rejected';
    document.getElementById('approval-comments').value = '';
    
    approvalModal.style.display = 'flex';
}

function handleApproval(event) {
    event.preventDefault();
    
    const applicationId = document.getElementById('modal-application-id').value;
    const decision = document.getElementById('approval-decision').value;
    const comments = document.getElementById('approval-comments').value;
    
    const application = applications.find(app => app.id === applicationId);
    if (application) {
        application.status = decision === 'approved' ? 'Approved' : 'Rejected';
        application.applicationStatus = decision === 'approved' ? 'Approved' : 'Rejected';
        
        // In a real application, you would send this to the server
        console.log(`Application ${applicationId} ${decision} with comments: ${comments}`);
        
        // Show success message
        alert(`Application ${applicationId} has been ${decision} successfully!`);
        
        // Update the display
        applyFilters();
        approvalModal.style.display = 'none';
    }
}

function bulkApprove() {
    const selectedCheckboxes = document.querySelectorAll('.application-checkbox:checked');
    const selectedIds = Array.from(selectedCheckboxes).map(cb => cb.value);
    
    if (selectedIds.length === 0) {
        alert('Please select at least one application to approve.');
        return;
    }
    
    if (confirm(`Are you sure you want to approve ${selectedIds.length} application(s)?`)) {
        selectedIds.forEach(id => {
            const application = applications.find(app => app.id === id);
            if (application) {
                application.status = 'Approved';
                application.applicationStatus = 'Approved';
            }
        });
        
        applyFilters();
        alert(`${selectedIds.length} application(s) have been approved successfully!`);
    }
}

function exportApplications() {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'recommended_applications.csv';
    a.click();
    window.URL.revokeObjectURL(url);
}

function generateCSV() {
    const headers = ['Application ID', 'Student Name', 'Department', 'Program', 'Status', 'Submission Date', 'HOD Recommendation'];
    const csvRows = [headers.join(',')];
    
    filteredApplications.forEach(app => {
        const row = [
            app.id,
            app.studentName,
            app.department,
            app.program,
            app.status,
            app.submissionDate,
            app.hodRecommendation
        ];
        csvRows.push(row.join(','));
    });
    
    return csvRows.join('\n');
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

// Global functions for onclick handlers
window.viewApplication = viewApplication;
window.approveApplication = approveApplication;
window.rejectApplication = rejectApplication;
