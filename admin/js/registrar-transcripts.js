// Registrar Transcripts Page JavaScript
let transcriptRequests = [];
let filteredRequests = [];
let selectedStatus = '';
let selectedProgramme = '';
let selectedType = '';
let selectedPriority = '';
let searchTerm = '';
let loading = true;
let showTranscriptModal = false;
let selectedRequest = null;
let showGenerateModal = false;
let generateForm = {
    studentId: '',
    transcriptType: '',
    purpose: '',
    deliveryMethod: '',
    urgency: 'Normal'
};

// Available options for filters
const statuses = ['Pending', 'In Progress', 'Ready for Collection', 'Collected', 'Dispatched', 'Cancelled'];
const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'MBA'];
const transcriptTypes = ['Official Transcript', 'Unofficial Transcript', 'Academic Statement', 'Course Verification', 'Degree Verification'];
const priorities = ['Normal', 'Urgent', 'Express'];
const deliveryMethods = ['Collection', 'Email', 'Postal Mail', 'Courier'];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    init();
});

function init() {
    loadTranscriptRequests();
    setupEventListeners();
}

function loadTranscriptRequests() {
    // Mock transcript request data
    transcriptRequests = [
        {
            id: 1,
            requestId: 'TR/2024/001',
            studentName: 'Jennifer Adams',
            studentId: 'CS/2022/001',
            programme: 'Computer Science',
            level: 'Masters',
            transcriptType: 'Official Transcript',
            purpose: 'Job Application',
            requestDate: '2024-01-20',
            status: 'Ready for Collection',
            priority: 'Normal',
            deliveryMethod: 'Collection',
            processingTime: '5 days',
            fee: 5000,
            feeStatus: 'Paid',
            processedBy: 'Mrs. Sarah Admin',
            completionDate: '2024-01-25',
            collectionCode: 'TC001',
            notes: 'All academic records verified and complete',
            contactEmail: 'jennifer.adams@student.edu.ng',
            contactPhone: '+234-801-111-2222'
        },
        {
            id: 2,
            requestId: 'TR/2024/002',
            studentName: 'Michael Thompson',
            studentId: 'MBA/2023/002',
            programme: 'MBA',
            level: 'Masters',
            transcriptType: 'Official Transcript',
            purpose: 'Further Studies',
            requestDate: '2024-01-18',
            status: 'In Progress',
            priority: 'Urgent',
            deliveryMethod: 'Email',
            processingTime: '3 days',
            fee: 7500,
            feeStatus: 'Paid',
            processedBy: 'Mr. John Registrar',
            completionDate: null,
            collectionCode: null,
            notes: 'Urgent processing for scholarship application deadline',
            contactEmail: 'michael.thompson@student.edu.ng',
            contactPhone: '+234-802-222-3333'
        },
        {
            id: 3,
            requestId: 'TR/2024/003',
            studentName: 'Sarah Mitchell',
            studentId: 'MATH/2021/003',
            programme: 'Mathematics',
            level: 'PhD',
            transcriptType: 'Academic Statement',
            purpose: 'Conference Presentation',
            requestDate: '2024-01-15',
            status: 'Collected',
            priority: 'Normal',
            deliveryMethod: 'Collection',
            processingTime: '4 days',
            fee: 3000,
            feeStatus: 'Paid',
            processedBy: 'Mrs. Sarah Admin',
            completionDate: '2024-01-19',
            collectionDate: '2024-01-22',
            collectionCode: 'TC003',
            notes: 'Student collected transcript personally with valid ID',
            contactEmail: 'sarah.mitchell@student.edu.ng',
            contactPhone: '+234-803-333-4444'
        },
        {
            id: 4,
            requestId: 'TR/2024/004',
            studentName: 'David Rodriguez',
            studentId: 'PHY/2020/004',
            programme: 'Physics',
            level: '400 Level',
            transcriptType: 'Course Verification',
            purpose: 'Transfer Application',
            requestDate: '2024-01-12',
            status: 'Pending',
            priority: 'Normal',
            deliveryMethod: 'Postal Mail',
            processingTime: '7 days',
            fee: 4000,
            feeStatus: 'Pending',
            processedBy: null,
            completionDate: null,
            collectionCode: null,
            notes: 'Awaiting fee payment before processing',
            contactEmail: 'david.rodriguez@student.edu.ng',
            contactPhone: '+234-804-444-5555'
        },
        {
            id: 5,
            requestId: 'TR/2024/005',
            studentName: 'Lisa Chen',
            studentId: 'DS/2022/005',
            programme: 'Data Science',
            level: 'Masters',
            transcriptType: 'Unofficial Transcript',
            purpose: 'Personal Records',
            requestDate: '2024-01-10',
            status: 'Dispatched',
            priority: 'Express',
            deliveryMethod: 'Courier',
            processingTime: '1 day',
            fee: 10000,
            feeStatus: 'Paid',
            processedBy: 'Mr. John Registrar',
            completionDate: '2024-01-11',
            dispatchDate: '2024-01-12',
            trackingNumber: 'EXP123456789',
            collectionCode: null,
            notes: 'Express delivery via DHL courier service',
            contactEmail: 'lisa.chen@student.edu.ng',
            contactPhone: '+234-805-555-6666'
        },
        {
            id: 6,
            requestId: 'TR/2024/006',
            studentName: 'Robert Kim',
            studentId: 'CHEM/2019/006',
            programme: 'Chemistry',
            level: 'Masters',
            transcriptType: 'Degree Verification',
            purpose: 'Employment Verification',
            requestDate: '2024-01-08',
            status: 'Cancelled',
            priority: 'Normal',
            deliveryMethod: 'Email',
            processingTime: 'N/A',
            fee: 2500,
            feeStatus: 'Refunded',
            processedBy: null,
            completionDate: null,
            collectionCode: null,
            cancellationReason: 'Student requested cancellation',
            cancellationDate: '2024-01-15',
            notes: 'Cancelled by student request, fee refunded',
            contactEmail: 'robert.kim@alumni.edu.ng',
            contactPhone: '+234-806-666-7777'
        }
    ];

    filteredRequests = [...transcriptRequests];
    loading = false;
    renderPage();
}

function renderPage() {
    if (loading) {
        const content = `
            <div class="loading-container">
                <div class="loading-spinner"></div>
                <p>Loading transcript requests...</p>
            </div>
        `;
        document.getElementById('transcripts-page-content').innerHTML = content;
        return;
    }

    const content = `
        <!-- Page Header -->
        <div class="page-header">
            <h2>Transcript Management</h2>
            <p>Process and manage student transcript requests and academic document generation</p>
        </div>

        <!-- Filters Section -->
        <div class="filters-section">
            <div class="filters-grid">
                <div class="filter-group">
                    <label>Status:</label>
                    <select id="status-filter">
                        <option value="">All Statuses</option>
                        ${statuses.map(status => `<option value="${status}" ${selectedStatus === status ? 'selected' : ''}>${status}</option>`).join('')}
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
                    <label>Transcript Type:</label>
                    <select id="type-filter">
                        <option value="">All Types</option>
                        ${transcriptTypes.map(type => `<option value="${type}" ${selectedType === type ? 'selected' : ''}>${type}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Priority:</label>
                    <select id="priority-filter">
                        <option value="">All Priorities</option>
                        ${priorities.map(priority => `<option value="${priority}" ${selectedPriority === priority ? 'selected' : ''}>${priority}</option>`).join('')}
                    </select>
                </div>
                
                <div class="filter-group">
                    <label>Search:</label>
                    <input
                        type="text"
                        id="search-filter"
                        placeholder="Search by name, ID, or request ID..."
                        value="${searchTerm}"
                    />
                </div>
                
                <div class="filter-actions">
                    <button class="btn btn-secondary" id="clear-filters">
                        <i class="fas fa-times"></i> Clear Filters
                    </button>
                    <button class="btn btn-success" id="generate-request-btn">
                        <i class="fas fa-plus"></i> Generate Request
                    </button>
                    <button class="btn btn-primary">
                        <i class="fas fa-download"></i> Export Requests
                    </button>
                </div>
            </div>
        </div>

        <!-- Results Summary -->
        <div class="results-summary">
            <p>Showing ${filteredRequests.length} of ${transcriptRequests.length} transcript requests</p>
            <div class="summary-stats">
                <span class="stat-item warning">
                    Pending: ${transcriptRequests.filter(r => r.status === 'Pending').length}
                </span>
                <span class="stat-item info">
                    In Progress: ${transcriptRequests.filter(r => r.status === 'In Progress').length}
                </span>
                <span class="stat-item success">
                    Ready: ${transcriptRequests.filter(r => r.status === 'Ready for Collection').length}
                </span>
                <span class="stat-item primary">
                    Collected: ${transcriptRequests.filter(r => r.status === 'Collected').length}
                </span>
                <span class="stat-item success">
                    Dispatched: ${transcriptRequests.filter(r => r.status === 'Dispatched').length}
                </span>
            </div>
        </div>

        <!-- Transcript Requests List -->
        <div class="transcripts-list">
            ${renderTranscriptsList()}
        </div>

        <!-- Transcript Modal -->
        ${showTranscriptModal ? renderTranscriptModal() : ''}

        <!-- Generate Modal -->
        ${showGenerateModal ? renderGenerateModal() : ''}
    `;

    document.getElementById('transcripts-page-content').innerHTML = content;
    setupModalEventListeners();
}

function renderTranscriptsList() {
    if (filteredRequests.length === 0) {
        return `
            <div class="no-results">
                <i class="fas fa-file-alt"></i>
                <h3>No transcript requests found</h3>
                <p>Try adjusting your filters or generate a new request</p>
            </div>
        `;
    }

    return filteredRequests.map(request => `
        <div class="transcript-card">
            <div class="transcript-header">
                <div class="transcript-info">
                    <h4>${request.studentName}</h4>
                    <p class="transcript-meta">
                        <strong>${request.requestId}</strong> • ${request.studentId}
                    </p>
                    <p class="transcript-details">
                        ${request.programme} • ${request.level} • ${request.transcriptType}
                    </p>
                </div>
                <div class="transcript-badges">
                    <div class="transcript-status ${getStatusColor(request.status)}">
                        ${request.status}
                    </div>
                    <div class="transcript-priority ${getPriorityColor(request.priority)}">
                        ${request.priority}
                    </div>
                </div>
            </div>
            
            <div class="transcript-body">
                <div class="request-details">
                    <div class="detail-item">
                        <strong>Purpose:</strong> ${request.purpose}
                    </div>
                    <div class="detail-item">
                        <strong>Request Date:</strong> ${request.requestDate}
                    </div>
                    <div class="detail-item">
                        <strong>Processing Time:</strong> ${request.processingTime}
                    </div>
                    <div class="detail-item">
                        <strong>Delivery Method:</strong> ${request.deliveryMethod}
                    </div>
                </div>
                
                <div class="fee-info">
                    <div class="fee-amount">
                        <strong>Fee:</strong> ₦${request.fee.toLocaleString()}
                    </div>
                    <div class="fee-status ${getFeeStatusColor(request.feeStatus)}">
                        ${request.feeStatus}
                    </div>
                </div>
                
                ${request.processedBy ? `
                    <div class="processing-info">
                        <strong>Processed by:</strong> ${request.processedBy}
                    </div>
                ` : ''}
                
                ${request.completionDate ? `
                    <div class="completion-info">
                        <strong>Completed:</strong> ${request.completionDate}
                    </div>
                ` : ''}
                
                ${request.collectionCode ? `
                    <div class="collection-info">
                        <strong>Collection Code:</strong> <span class="collection-code">${request.collectionCode}</span>
                    </div>
                ` : ''}
                
                ${request.trackingNumber ? `
                    <div class="tracking-info">
                        <strong>Tracking Number:</strong> <span class="tracking-number">${request.trackingNumber}</span>
                    </div>
                ` : ''}
                
                ${request.collectionDate ? `
                    <div class="collection-date">
                        <strong>Collected on:</strong> ${request.collectionDate}
                    </div>
                ` : ''}
                
                ${request.dispatchDate ? `
                    <div class="dispatch-date">
                        <strong>Dispatched on:</strong> ${request.dispatchDate}
                    </div>
                ` : ''}
                
                ${request.cancellationReason ? `
                    <div class="cancellation-info">
                        <strong>Cancellation Reason:</strong> ${request.cancellationReason}
                        <br />
                        <strong>Cancelled on:</strong> ${request.cancellationDate}
                    </div>
                ` : ''}
                
                <div class="contact-info">
                    <span><i class="fas fa-envelope"></i> ${request.contactEmail}</span>
                    <span><i class="fas fa-phone"></i> ${request.contactPhone}</span>
                </div>
                
                ${request.notes ? `
                    <div class="transcript-notes">
                        <strong>Notes:</strong> ${request.notes}
                    </div>
                ` : ''}
            </div>
            
            <div class="transcript-actions">
                <button class="btn btn-primary view-request-btn" data-request-id="${request.id}">
                    <i class="fas fa-eye"></i> View Details
                </button>
                <select class="status-select" data-request-id="${request.id}">
                    ${statuses.map(status => `<option value="${status}" ${request.status === status ? 'selected' : ''}>${status}</option>`).join('')}
                </select>
                <button class="btn btn-info">
                    <i class="fas fa-download"></i> Download
                </button>
                <button class="btn btn-success">
                    <i class="fas fa-envelope"></i> Send Notification
                </button>
                <button class="btn btn-warning">
                    <i class="fas fa-print"></i> Print
                </button>
            </div>
        </div>
    `).join('');
}

function renderTranscriptModal() {
    if (!selectedRequest) return '';

    return `
        <div class="modal-overlay" id="transcript-modal-overlay">
            <div class="modal-content transcript-modal">
                <div class="modal-header">
                    <h3>Transcript Request Details: ${selectedRequest.requestId}</h3>
                    <button id="close-transcript-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="transcript-full-details">
                        <div class="detail-section">
                            <h4>Student Information</h4>
                            <div class="detail-grid">
                                <div><strong>Name:</strong> ${selectedRequest.studentName}</div>
                                <div><strong>Student ID:</strong> ${selectedRequest.studentId}</div>
                                <div><strong>Programme:</strong> ${selectedRequest.programme}</div>
                                <div><strong>Level:</strong> ${selectedRequest.level}</div>
                                <div><strong>Email:</strong> ${selectedRequest.contactEmail}</div>
                                <div><strong>Phone:</strong> ${selectedRequest.contactPhone}</div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Request Information</h4>
                            <div class="detail-grid">
                                <div><strong>Request ID:</strong> ${selectedRequest.requestId}</div>
                                <div><strong>Transcript Type:</strong> ${selectedRequest.transcriptType}</div>
                                <div><strong>Purpose:</strong> ${selectedRequest.purpose}</div>
                                <div><strong>Request Date:</strong> ${selectedRequest.requestDate}</div>
                                <div><strong>Priority:</strong> ${selectedRequest.priority}</div>
                                <div><strong>Delivery Method:</strong> ${selectedRequest.deliveryMethod}</div>
                            </div>
                        </div>
                        
                        <div class="detail-section">
                            <h4>Processing Information</h4>
                            <div class="detail-grid">
                                <div><strong>Status:</strong> 
                                    <span class="status-badge ${getStatusColor(selectedRequest.status)}">
                                        ${selectedRequest.status}
                                    </span>
                                </div>
                                <div><strong>Processing Time:</strong> ${selectedRequest.processingTime}</div>
                                <div><strong>Fee:</strong> ₦${selectedRequest.fee.toLocaleString()}</div>
                                <div><strong>Fee Status:</strong> 
                                    <span class="status-badge ${getFeeStatusColor(selectedRequest.feeStatus)}">
                                        ${selectedRequest.feeStatus}
                                    </span>
                                </div>
                                ${selectedRequest.processedBy ? `<div><strong>Processed By:</strong> ${selectedRequest.processedBy}</div>` : ''}
                                ${selectedRequest.completionDate ? `<div><strong>Completion Date:</strong> ${selectedRequest.completionDate}</div>` : ''}
                            </div>
                        </div>
                        
                        ${selectedRequest.notes ? `
                            <div class="detail-section">
                                <h4>Notes</h4>
                                <p>${selectedRequest.notes}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function renderGenerateModal() {
    return `
        <div class="modal-overlay" id="generate-modal-overlay">
            <div class="modal-content generate-modal">
                <div class="modal-header">
                    <h3>Generate New Transcript Request</h3>
                    <button id="close-generate-modal">&times;</button>
                </div>
                <form id="generate-form" class="modal-body">
                    <div class="form-group">
                        <label>Student ID:</label>
                        <input
                            type="text"
                            id="student-id"
                            value="${generateForm.studentId}"
                            placeholder="Enter student ID"
                            required
                        />
                    </div>
                    
                    <div class="form-group">
                        <label>Transcript Type:</label>
                        <select id="transcript-type" required>
                            <option value="">Select Type</option>
                            ${transcriptTypes.map(type => `<option value="${type}" ${generateForm.transcriptType === type ? 'selected' : ''}>${type}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Purpose:</label>
                        <input
                            type="text"
                            id="purpose"
                            value="${generateForm.purpose}"
                            placeholder="e.g., Job Application, Further Studies"
                            required
                        />
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Delivery Method:</label>
                            <select id="delivery-method" required>
                                <option value="">Select Method</option>
                                ${deliveryMethods.map(method => `<option value="${method}" ${generateForm.deliveryMethod === method ? 'selected' : ''}>${method}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Urgency:</label>
                            <select id="urgency">
                                ${priorities.map(priority => `<option value="${priority}" ${generateForm.urgency === priority ? 'selected' : ''}>${priority}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" id="cancel-generate-btn">
                            Cancel
                        </button>
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-plus"></i> Generate Request
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
        if (e.target.id === 'status-filter') {
            selectedStatus = e.target.value;
            applyFilters();
        } else if (e.target.id === 'programme-filter') {
            selectedProgramme = e.target.value;
            applyFilters();
        } else if (e.target.id === 'type-filter') {
            selectedType = e.target.value;
            applyFilters();
        } else if (e.target.id === 'priority-filter') {
            selectedPriority = e.target.value;
            applyFilters();
        } else if (e.target.classList.contains('status-select')) {
            const requestId = parseInt(e.target.getAttribute('data-request-id'));
            const newStatus = e.target.value;
            handleStatusUpdate(requestId, newStatus);
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
        } else if (e.target.id === 'generate-request-btn') {
            handleGenerateRequest();
        } else if (e.target.classList.contains('view-request-btn')) {
            const requestId = parseInt(e.target.getAttribute('data-request-id'));
            handleViewRequest(requestId);
        }
    });
}

function setupModalEventListeners() {
    if (showTranscriptModal) {
        const overlay = document.getElementById('transcript-modal-overlay');
        const closeBtn = document.getElementById('close-transcript-modal');

        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeTranscriptModal();
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeTranscriptModal);
        }
    }

    if (showGenerateModal) {
        const overlay = document.getElementById('generate-modal-overlay');
        const closeBtn = document.getElementById('close-generate-modal');
        const cancelBtn = document.getElementById('cancel-generate-btn');
        const form = document.getElementById('generate-form');

        if (overlay) {
            overlay.addEventListener('click', function(e) {
                if (e.target === overlay) {
                    closeGenerateModal();
                }
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeGenerateModal);
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', closeGenerateModal);
        }

        if (form) {
            form.addEventListener('submit', handleGenerateTranscript);
        }
    }
}

function applyFilters() {
    let filtered = transcriptRequests;

    if (selectedStatus) {
        filtered = filtered.filter(request => request.status === selectedStatus);
    }
    if (selectedProgramme) {
        filtered = filtered.filter(request => request.programme === selectedProgramme);
    }
    if (selectedType) {
        filtered = filtered.filter(request => request.transcriptType === selectedType);
    }
    if (selectedPriority) {
        filtered = filtered.filter(request => request.priority === selectedPriority);
    }
    if (searchTerm) {
        filtered = filtered.filter(request =>
            request.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
            request.requestId.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    filteredRequests = filtered;
    renderPage();
}

function clearFilters() {
    selectedStatus = '';
    selectedProgramme = '';
    selectedType = '';
    selectedPriority = '';
    searchTerm = '';

    // Reset form values
    const statusFilter = document.getElementById('status-filter');
    const programmeFilter = document.getElementById('programme-filter');
    const typeFilter = document.getElementById('type-filter');
    const priorityFilter = document.getElementById('priority-filter');
    const searchFilter = document.getElementById('search-filter');

    if (statusFilter) statusFilter.value = '';
    if (programmeFilter) programmeFilter.value = '';
    if (typeFilter) typeFilter.value = '';
    if (priorityFilter) priorityFilter.value = '';
    if (searchFilter) searchFilter.value = '';

    applyFilters();
}

function handleViewRequest(requestId) {
    selectedRequest = transcriptRequests.find(request => request.id === requestId);
    showTranscriptModal = true;
    renderPage();
}

function closeTranscriptModal() {
    showTranscriptModal = false;
    selectedRequest = null;
    renderPage();
}

function handleGenerateRequest() {
    showGenerateModal = true;
    renderPage();
}

function closeGenerateModal() {
    showGenerateModal = false;
    generateForm = {
        studentId: '',
        transcriptType: '',
        purpose: '',
        deliveryMethod: '',
        urgency: 'Normal'
    };
    renderPage();
}

function handleGenerateTranscript(e) {
    e.preventDefault();

    // Collect form data
    const formData = {
        studentId: document.getElementById('student-id').value,
        transcriptType: document.getElementById('transcript-type').value,
        purpose: document.getElementById('purpose').value,
        deliveryMethod: document.getElementById('delivery-method').value,
        urgency: document.getElementById('urgency').value
    };

    // Create new request
    const newRequest = {
        id: transcriptRequests.length + 1,
        requestId: `TR/2024/${String(transcriptRequests.length + 1).padStart(3, '0')}`,
        studentName: 'Student Name', // Would be fetched based on studentId
        studentId: formData.studentId,
        programme: 'Computer Science', // Would be fetched based on studentId
        level: 'Masters', // Would be fetched based on studentId
        transcriptType: formData.transcriptType,
        purpose: formData.purpose,
        requestDate: new Date().toISOString().split('T')[0],
        status: 'Pending',
        priority: formData.urgency,
        deliveryMethod: formData.deliveryMethod,
        processingTime: formData.urgency === 'Express' ? '1 day' : formData.urgency === 'Urgent' ? '3 days' : '7 days',
        fee: formData.urgency === 'Express' ? 10000 : formData.urgency === 'Urgent' ? 7500 : 5000,
        feeStatus: 'Pending',
        processedBy: null,
        completionDate: null,
        collectionCode: null,
        notes: 'Generated by registrar office',
        contactEmail: 'student@email.com', // Would be fetched
        contactPhone: '+234-800-000-0000' // Would be fetched
    };

    transcriptRequests = [newRequest, ...transcriptRequests];
    alert('Transcript request generated successfully!');
    closeGenerateModal();
}

function handleStatusUpdate(requestId, newStatus) {
    transcriptRequests = transcriptRequests.map(request =>
        request.id === requestId
            ? {
                ...request,
                status: newStatus,
                completionDate: newStatus === 'Ready for Collection' || newStatus === 'Dispatched'
                    ? new Date().toISOString().split('T')[0]
                    : request.completionDate
              }
            : request
    );
    renderPage();
}

function getStatusColor(status) {
    switch (status) {
        case 'Pending': return 'warning';
        case 'In Progress': return 'info';
        case 'Ready for Collection': return 'success';
        case 'Collected': return 'primary';
        case 'Dispatched': return 'success';
        case 'Cancelled': return 'danger';
        default: return 'secondary';
    }
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'Express': return 'danger';
        case 'Urgent': return 'warning';
        case 'Normal': return 'info';
        default: return 'secondary';
    }
}

function getFeeStatusColor(status) {
    switch (status) {
        case 'Paid': return 'success';
        case 'Pending': return 'warning';
        case 'Refunded': return 'info';
        default: return 'secondary';
    }
}
