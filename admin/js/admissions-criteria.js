// Admissions Criteria Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let criteria = [];
    let filteredCriteria = [];
    let selectedProgramme = '';
    let selectedLevel = '';
    let selectedStatus = '';
    let searchTerm = '';
    let showCriteriaModal = false;
    let selectedCriteria = null;
    let isEditing = false;
    let criteriaForm = {
        programme: '',
        level: '',
        minimumCGPA: '',
        requiredDocuments: [],
        additionalRequirements: '',
        applicationFee: '',
        interviewRequired: false,
        entranceExamRequired: false,
        workExperienceRequired: '',
        ageLimit: '',
        status: 'Active',
        effectiveDate: '',
        notes: ''
    };
    
    const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'MBA'];
    const levels = ['PGD', 'Masters', 'MPhil/PhD', 'PhD'];
    const statuses = ['Active', 'Draft', 'Under Review', 'Archived'];
    const documentOptions = [
        'SSCE/WAEC Result', 'JAMB Result', 'Birth Certificate', 'Local Government Certificate',
        'Medical Certificate', 'Transcript', 'CV/Resume', 'Statement of Purpose',
        'Research Proposal', 'References/Recommendation Letters', 'Work Experience Letter',
        'Publications', 'Portfolio', 'English Proficiency Test', 'Passport Photograph'
    ];
    
    const mockCriteria = [
        {
            id: 1,
            programme: 'Computer Science',
            level: 'Masters',
            minimumCGPA: '3.50',
            requiredDocuments: ['Transcript', 'CV/Resume', 'Statement of Purpose', 'References/Recommendation Letters'],
            additionalRequirements: 'Bachelor\'s degree in Computer Science or related field',
            applicationFee: 25000,
            interviewRequired: true,
            entranceExamRequired: false,
            workExperienceRequired: 'Not Required',
            ageLimit: 'No age limit',
            status: 'Active',
            effectiveDate: '2024-01-01',
            lastUpdated: '2024-01-15',
            updatedBy: 'Dr. Smith Johnson',
            notes: 'Updated requirements for 2024/2025 session',
            applicationsCount: 45
        },
        {
            id: 2,
            programme: 'MBA',
            level: 'Masters',
            minimumCGPA: '3.00',
            requiredDocuments: ['Transcript', 'CV/Resume', 'Essays', 'References/Recommendation Letters', 'Work Experience Letter'],
            additionalRequirements: 'Bachelor\'s degree in any field with minimum 2 years work experience',
            applicationFee: 30000,
            interviewRequired: true,
            entranceExamRequired: true,
            workExperienceRequired: 'Minimum 2 years',
            ageLimit: 'Maximum 45 years',
            status: 'Active',
            effectiveDate: '2024-01-01',
            lastUpdated: '2024-01-20',
            updatedBy: 'Prof. Mary Wilson',
            notes: 'GMAT/GRE scores preferred but not mandatory',
            applicationsCount: 78
        },
        {
            id: 3,
            programme: 'Mathematics',
            level: 'PhD',
            minimumCGPA: '4.50',
            requiredDocuments: ['Transcript', 'CV/Resume', 'Research Proposal', 'References/Recommendation Letters', 'Publications'],
            additionalRequirements: 'Master\'s degree in Mathematics or related field with strong research background',
            applicationFee: 35000,
            interviewRequired: true,
            entranceExamRequired: false,
            workExperienceRequired: 'Not Required',
            ageLimit: 'No age limit',
            status: 'Active',
            effectiveDate: '2024-01-01',
            lastUpdated: '2024-01-10',
            updatedBy: 'Dr. Lisa Anderson',
            notes: 'Strong emphasis on research publications and proposal quality',
            applicationsCount: 23
        },
        {
            id: 4,
            programme: 'Data Science',
            level: 'Masters',
            minimumCGPA: '3.25',
            requiredDocuments: ['Transcript', 'CV/Resume', 'Statement of Purpose', 'References/Recommendation Letters'],
            additionalRequirements: 'Bachelor\'s degree in Computer Science, Statistics, or related field',
            applicationFee: 28000,
            interviewRequired: false,
            entranceExamRequired: true,
            workExperienceRequired: 'Preferred but not required',
            ageLimit: 'No age limit',
            status: 'Draft',
            effectiveDate: '2024-02-01',
            lastUpdated: '2024-01-25',
            updatedBy: 'Prof. James Taylor',
            notes: 'New programme criteria under review',
            applicationsCount: 12
        },
        {
            id: 5,
            programme: 'Physics',
            level: 'PhD',
            minimumCGPA: '4.00',
            requiredDocuments: ['Transcript', 'CV/Resume', 'Research Proposal', 'References/Recommendation Letters'],
            additionalRequirements: 'Master\'s degree in Physics or related field',
            applicationFee: 32000,
            interviewRequired: true,
            entranceExamRequired: false,
            workExperienceRequired: 'Not Required',
            ageLimit: 'No age limit',
            status: 'Under Review',
            effectiveDate: '2024-01-01',
            lastUpdated: '2024-01-30',
            updatedBy: 'Dr. Patricia Moore',
            notes: 'Criteria being updated for 2024/2025 session',
            applicationsCount: 8
        }
    ];

    function init() {
        loadCriteria();
        renderPage();
        setupEventListeners();
    }

    function loadCriteria() {
        criteria = [...mockCriteria];
        filteredCriteria = [...criteria];
    }

    function renderPage() {
        const content = document.getElementById('criteria-page-content');
        if (!content) return;

        content.innerHTML = `
            <div class="page-header">
                <h2>Admission Criteria Management</h2>
                <p>Define and manage admission requirements for different programs and levels</p>
            </div>

            <div class="filters-section">
                <div class="filters-grid">
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
                        <input type="text" id="search-input" placeholder="Search criteria...">
                    </div>
                    
                    <div class="filter-actions">
                        <button class="btn btn-secondary" id="clear-filters">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                        <button class="btn btn-success" id="add-criteria">
                            <i class="fas fa-plus"></i> Add Criteria
                        </button>
                        <button class="btn btn-primary">
                            <i class="fas fa-download"></i> Export Criteria
                        </button>
                    </div>
                </div>
            </div>

            <div class="results-summary">
                <p>Showing ${filteredCriteria.length} of ${criteria.length} admission criteria</p>
                <div class="summary-stats">
                    <span class="stat-item success">
                        Active: ${criteria.filter(c => c.status === 'Active').length}
                    </span>
                    <span class="stat-item warning">
                        Draft: ${criteria.filter(c => c.status === 'Draft').length}
                    </span>
                    <span class="stat-item info">
                        Under Review: ${criteria.filter(c => c.status === 'Under Review').length}
                    </span>
                    <span class="stat-item secondary">
                        Archived: ${criteria.filter(c => c.status === 'Archived').length}
                    </span>
                </div>
            </div>

            <div class="criteria-list" id="criteria-list"></div>
        `;

        renderCriteriaList();
    }

    function renderCriteriaList() {
        const listContainer = document.getElementById('criteria-list');
        if (!listContainer) return;

        if (filteredCriteria.length > 0) {
            listContainer.innerHTML = filteredCriteria.map(criteriaItem => `
                <div class="criteria-card" data-id="${criteriaItem.id}">
                    <div class="criteria-header">
                        <div class="criteria-info">
                            <h3>${criteriaItem.programme} - ${criteriaItem.level}</h3>
                            <p class="criteria-status">
                                <span class="status-badge ${getStatusColor(criteriaItem.status)}">${criteriaItem.status}</span>
                                <span class="applications-count">${criteriaItem.applicationsCount} applications</span>
                            </p>
                        </div>
                        <div class="criteria-actions">
                            <button class="btn btn-primary edit-criteria" data-id="${criteriaItem.id}">
                                <i class="fas fa-edit"></i> Edit
                            </button>
                            <button class="btn btn-secondary">
                                <i class="fas fa-eye"></i> View
                            </button>
                        </div>
                    </div>
                    
                    <div class="criteria-details">
                        <div class="detail-row">
                            <div class="detail-item">
                                <strong>Minimum CGPA:</strong> ${criteriaItem.minimumCGPA}
                            </div>
                            <div class="detail-item">
                                <strong>Application Fee:</strong> ₦${criteriaItem.applicationFee.toLocaleString()}
                            </div>
                            <div class="detail-item">
                                <strong>Effective Date:</strong> ${criteriaItem.effectiveDate}
                            </div>
                        </div>
                        
                        <div class="detail-row">
                            <div class="detail-item">
                                <strong>Interview Required:</strong> 
                                <span class="${criteriaItem.interviewRequired ? 'yes' : 'no'}">
                                    ${criteriaItem.interviewRequired ? 'Yes' : 'No'}
                                </span>
                            </div>
                            <div class="detail-item">
                                <strong>Entrance Exam:</strong> 
                                <span class="${criteriaItem.entranceExamRequired ? 'yes' : 'no'}">
                                    ${criteriaItem.entranceExamRequired ? 'Yes' : 'No'}
                                </span>
                            </div>
                            <div class="detail-item">
                                <strong>Work Experience:</strong> ${criteriaItem.workExperienceRequired}
                            </div>
                        </div>
                        
                        <div class="detail-row">
                            <div class="detail-item">
                                <strong>Age Limit:</strong> ${criteriaItem.ageLimit}
                            </div>
                            <div class="detail-item">
                                <strong>Documents Required:</strong> ${criteriaItem.requiredDocuments.length} items
                            </div>
                            <div class="detail-item">
                                <strong>Last Updated:</strong> ${criteriaItem.lastUpdated} by ${criteriaItem.updatedBy}
                            </div>
                        </div>
                        
                        <div class="additional-requirements">
                            <strong>Additional Requirements:</strong>
                            <p>${criteriaItem.additionalRequirements}</p>
                        </div>
                        
                        ${criteriaItem.notes ? `
                            <div class="criteria-notes">
                                <strong>Notes:</strong>
                                <p>${criteriaItem.notes}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            `).join('');
        } else {
            listContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>No admission criteria found</h3>
                    <p>Try adjusting your filters or add new criteria</p>
                </div>
            `;
        }
    }

    function setupEventListeners() {
        // Filter event listeners
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
        document.getElementById('add-criteria')?.addEventListener('click', handleAddCriteria);

        // Criteria card event listeners
        document.addEventListener('click', (e) => {
            if (e.target.closest('.edit-criteria')) {
                const criteriaId = parseInt(e.target.closest('.edit-criteria').dataset.id);
                const criteriaItem = criteria.find(c => c.id === criteriaId);
                if (criteriaItem) {
                    handleEditCriteria(criteriaItem);
                }
            }
        });
    }

    function applyFilters() {
        filteredCriteria = criteria.filter(criteriaItem => {
            const programmeMatch = !selectedProgramme || criteriaItem.programme === selectedProgramme;
            const levelMatch = !selectedLevel || criteriaItem.level === selectedLevel;
            const statusMatch = !selectedStatus || criteriaItem.status === selectedStatus;
            
            const searchMatch = !searchTerm || 
                criteriaItem.programme.toLowerCase().includes(searchTerm.toLowerCase()) ||
                criteriaItem.level.toLowerCase().includes(searchTerm.toLowerCase()) ||
                criteriaItem.additionalRequirements.toLowerCase().includes(searchTerm.toLowerCase());

            return programmeMatch && levelMatch && statusMatch && searchMatch;
        });

        renderPage();
    }

    function clearFilters() {
        selectedProgramme = '';
        selectedLevel = '';
        selectedStatus = '';
        searchTerm = '';
        
        // Reset form values
        document.getElementById('programme-filter').value = '';
        document.getElementById('level-filter').value = '';
        document.getElementById('status-filter').value = '';
        document.getElementById('search-input').value = '';
        
        applyFilters();
    }

    function handleAddCriteria() {
        isEditing = false;
        selectedCriteria = null;
        criteriaForm = {
            programme: '',
            level: '',
            minimumCGPA: '',
            requiredDocuments: [],
            additionalRequirements: '',
            applicationFee: '',
            interviewRequired: false,
            entranceExamRequired: false,
            workExperienceRequired: '',
            ageLimit: '',
            status: 'Active',
            effectiveDate: '',
            notes: ''
        };
        showCriteriaModal = true;
        renderCriteriaModal();
    }

    function handleEditCriteria(criteriaItem) {
        isEditing = true;
        selectedCriteria = criteriaItem;
        criteriaForm = {
            programme: criteriaItem.programme,
            level: criteriaItem.level,
            minimumCGPA: criteriaItem.minimumCGPA,
            requiredDocuments: [...criteriaItem.requiredDocuments],
            additionalRequirements: criteriaItem.additionalRequirements,
            applicationFee: criteriaItem.applicationFee,
            interviewRequired: criteriaItem.interviewRequired,
            entranceExamRequired: criteriaItem.entranceExamRequired,
            workExperienceRequired: criteriaItem.workExperienceRequired,
            ageLimit: criteriaItem.ageLimit,
            status: criteriaItem.status,
            effectiveDate: criteriaItem.effectiveDate,
            notes: criteriaItem.notes || ''
        };
        showCriteriaModal = true;
        renderCriteriaModal();
    }

    function renderCriteriaModal() {
        if (!showCriteriaModal) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content criteria-modal">
                <div class="modal-header">
                    <h3>${isEditing ? 'Edit' : 'Add'} Admission Criteria</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <form class="modal-body" id="criteria-form">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Programme:</label>
                            <select id="programme-select" required>
                                <option value="">Select Programme</option>
                                ${programmes.map(programme => `<option value="${programme}" ${criteriaForm.programme === programme ? 'selected' : ''}>${programme}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Level:</label>
                            <select id="level-select" required>
                                <option value="">Select Level</option>
                                ${levels.map(level => `<option value="${level}" ${criteriaForm.level === level ? 'selected' : ''}>${level}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Minimum CGPA:</label>
                            <input type="text" id="cgpa-input" value="${criteriaForm.minimumCGPA}" placeholder="e.g., 3.50 or N/A (5.0 scale)" required>
                        </div>
                        
                        <div class="form-group">
                            <label>Application Fee (₦):</label>
                            <input type="number" id="fee-input" value="${criteriaForm.applicationFee}" placeholder="Enter amount" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Additional Requirements:</label>
                        <textarea id="requirements-textarea" placeholder="Describe additional requirements..." rows="3" required>${criteriaForm.additionalRequirements}</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Required Documents:</label>
                        <div class="documents-checklist">
                            ${documentOptions.map(doc => `
                                <label class="checkbox-label">
                                    <input type="checkbox" value="${doc}" ${criteriaForm.requiredDocuments.includes(doc) ? 'checked' : ''}>
                                    ${doc}
                                </label>
                            `).join('')}
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Work Experience Required:</label>
                            <input type="text" id="work-exp-input" value="${criteriaForm.workExperienceRequired}" placeholder="e.g., Minimum 2 years or Not Required">
                        </div>
                        
                        <div class="form-group">
                            <label>Age Limit:</label>
                            <input type="text" id="age-limit-input" value="${criteriaForm.ageLimit}" placeholder="e.g., Maximum 45 years or No age limit">
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Status:</label>
                            <select id="status-select">
                                ${statuses.map(status => `<option value="${status}" ${criteriaForm.status === status ? 'selected' : ''}>${status}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Effective Date:</label>
                            <input type="date" id="effective-date-input" value="${criteriaForm.effectiveDate}" required>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Requirements:</label>
                        <div class="checkbox-group">
                            <label class="checkbox-label">
                                <input type="checkbox" id="interview-checkbox" ${criteriaForm.interviewRequired ? 'checked' : ''}>
                                Interview Required
                            </label>
                            <label class="checkbox-label">
                                <input type="checkbox" id="exam-checkbox" ${criteriaForm.entranceExamRequired ? 'checked' : ''}>
                                Entrance Exam Required
                            </label>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Notes:</label>
                        <textarea id="notes-textarea" placeholder="Additional notes or comments..." rows="2">${criteriaForm.notes}</textarea>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" id="cancel-criteria">Cancel</button>
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-save"></i> ${isEditing ? 'Update' : 'Create'} Criteria
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Modal event listeners
        modal.querySelector('.close-modal').addEventListener('click', closeCriteriaModal);
        modal.querySelector('#cancel-criteria').addEventListener('click', closeCriteriaModal);
        modal.querySelector('#criteria-form').addEventListener('submit', handleSubmitCriteria);
    }

    function handleSubmitCriteria(e) {
        e.preventDefault();
        
        const formData = {
            programme: document.getElementById('programme-select').value,
            level: document.getElementById('level-select').value,
            minimumCGPA: document.getElementById('cgpa-input').value,
            applicationFee: parseInt(document.getElementById('fee-input').value),
            additionalRequirements: document.getElementById('requirements-textarea').value,
            requiredDocuments: Array.from(document.querySelectorAll('.documents-checklist input:checked')).map(cb => cb.value),
            workExperienceRequired: document.getElementById('work-exp-input').value,
            ageLimit: document.getElementById('age-limit-input').value,
            status: document.getElementById('status-select').value,
            effectiveDate: document.getElementById('effective-date-input').value,
            interviewRequired: document.getElementById('interview-checkbox').checked,
            entranceExamRequired: document.getElementById('exam-checkbox').checked,
            notes: document.getElementById('notes-textarea').value
        };

        if (isEditing && selectedCriteria) {
            // Update existing criteria
            Object.assign(selectedCriteria, formData);
            selectedCriteria.lastUpdated = new Date().toISOString().split('T')[0];
            selectedCriteria.updatedBy = 'Current User';
        } else {
            // Add new criteria
            const newCriteria = {
                id: criteria.length + 1,
                ...formData,
                lastUpdated: new Date().toISOString().split('T')[0],
                updatedBy: 'Current User',
                applicationsCount: 0
            };
            criteria.push(newCriteria);
        }

        closeCriteriaModal();
        applyFilters();
        
        // Show success message
        alert(`${isEditing ? 'Updated' : 'Created'} criteria successfully!`);
    }

    function closeCriteriaModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
        showCriteriaModal = false;
        selectedCriteria = null;
        isEditing = false;
    }

    function getStatusColor(status) {
        const colors = {
            'Active': 'success',
            'Draft': 'warning',
            'Under Review': 'info',
            'Archived': 'secondary'
        };
        return colors[status] || 'secondary';
    }

    // Initialize the page
    init();
});
