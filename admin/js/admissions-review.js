// Admissions Review Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    let reviewQueue = [];
    let filteredQueue = [];
    let selectedProgramme = '';
    let selectedLevel = '';
    let selectedReviewStage = '';
    let selectedReviewer = '';
    let searchTerm = '';
    let showReviewModal = false;
    let selectedApplication = null;
    let reviewForm = {
        decision: '',
        score: '',
        comments: '',
        recommendations: '',
        nextStage: ''
    };
    
    const programmes = ['Computer Science', 'Data Science', 'Mathematics', 'Physics', 'Chemistry', 'Biology', 'MBA'];
    const levels = ['Undergraduate', 'Masters', 'PhD', 'Postgraduate Diploma'];
    const reviewStages = ['Initial Review', 'Document Verification', 'Academic Assessment', 'Interview Review', 'Final Decision'];
    const reviewers = ['Dr. Smith Johnson', 'Prof. Mary Wilson', 'Dr. Lisa Anderson', 'Prof. James Taylor', 'Dr. Patricia Moore'];
    const decisions = ['Approve', 'Reject', 'Request More Info', 'Schedule Interview', 'Waitlist'];
    const nextStages = ['Document Verification', 'Academic Assessment', 'Interview', 'Final Decision', 'Enrollment'];
    
    const mockQueue = [
        {
            id: 1,
            applicantName: 'Jennifer Adams',
            applicationId: 'APP/2024/001',
            programme: 'Computer Science',
            level: 'Masters',
            currentStage: 'Academic Assessment',
            assignedReviewer: 'Dr. Smith Johnson',
            submissionDate: '2024-01-20',
            daysInQueue: 5,
            priority: 'High',
            cgpa: '3.75',
            previousDegree: 'B.Sc Computer Science',
            previousInstitution: 'University of Lagos',
            documentsComplete: true,
            applicationFee: 'Paid',
            reviewHistory: [
                { stage: 'Initial Review', reviewer: 'Dr. Smith Johnson', decision: 'Approve', date: '2024-01-22', score: 85 },
                { stage: 'Document Verification', reviewer: 'Admin Staff', decision: 'Approve', date: '2024-01-23', score: null }
            ],
            currentReviewNotes: 'Strong academic background, good research potential',
            requiredDocuments: ['Transcript', 'CV', 'Statement of Purpose', 'References'],
            missingDocuments: [],
            interviewRequired: true
        },
        {
            id: 2,
            applicantName: 'Michael Thompson',
            applicationId: 'APP/2024/002',
            programme: 'MBA',
            level: 'Masters',
            currentStage: 'Interview Review',
            assignedReviewer: 'Prof. Mary Wilson',
            submissionDate: '2024-01-18',
            daysInQueue: 7,
            priority: 'Medium',
            cgpa: '3.82',
            previousDegree: 'B.Sc Business Administration',
            previousInstitution: 'Obafemi Awolowo University',
            documentsComplete: true,
            applicationFee: 'Paid',
            reviewHistory: [
                { stage: 'Initial Review', reviewer: 'Prof. Mary Wilson', decision: 'Approve', date: '2024-01-19', score: 78 },
                { stage: 'Document Verification', reviewer: 'Admin Staff', decision: 'Approve', date: '2024-01-20', score: null },
                { stage: 'Academic Assessment', reviewer: 'Prof. Mary Wilson', decision: 'Schedule Interview', date: '2024-01-22', score: 82 }
            ],
            currentReviewNotes: 'Excellent work experience, leadership potential',
            requiredDocuments: ['Transcript', 'CV', 'Essays', 'References', 'Work Experience Letter'],
            missingDocuments: [],
            interviewRequired: true,
            interviewDate: '2024-02-15',
            interviewScore: 88
        },
        {
            id: 3,
            applicantName: 'Sarah Mitchell',
            applicationId: 'APP/2024/003',
            programme: 'Mathematics',
            level: 'PhD',
            currentStage: 'Final Decision',
            assignedReviewer: 'Dr. Lisa Anderson',
            submissionDate: '2024-01-15',
            daysInQueue: 10,
            priority: 'High',
            cgpa: '3.95',
            previousDegree: 'M.Sc Mathematics',
            previousInstitution: 'University of Ibadan',
            documentsComplete: true,
            applicationFee: 'Paid',
            reviewHistory: [
                { stage: 'Initial Review', reviewer: 'Dr. Lisa Anderson', decision: 'Approve', date: '2024-01-16', score: 92 },
                { stage: 'Document Verification', reviewer: 'Admin Staff', decision: 'Approve', date: '2024-01-17', score: null },
                { stage: 'Academic Assessment', reviewer: 'Dr. Lisa Anderson', decision: 'Approve', date: '2024-01-20', score: 95 },
                { stage: 'Interview Review', reviewer: 'Prof. James Taylor', decision: 'Approve', date: '2024-01-25', score: 90 }
            ],
            currentReviewNotes: 'Outstanding research proposal, excellent academic record',
            requiredDocuments: ['Transcript', 'CV', 'Research Proposal', 'References', 'Publications'],
            missingDocuments: [],
            interviewRequired: false
        },
        {
            id: 4,
            applicantName: 'Robert Chen',
            applicationId: 'APP/2024/004',
            programme: 'Data Science',
            level: 'Masters',
            currentStage: 'Document Verification',
            assignedReviewer: 'Dr. Patricia Moore',
            submissionDate: '2024-01-22',
            daysInQueue: 3,
            priority: 'Medium',
            cgpa: '3.68',
            previousDegree: 'B.Sc Statistics',
            previousInstitution: 'University of Benin',
            documentsComplete: false,
            applicationFee: 'Paid',
            reviewHistory: [
                { stage: 'Initial Review', reviewer: 'Dr. Patricia Moore', decision: 'Request More Info', date: '2024-01-23', score: 72 }
            ],
            currentReviewNotes: 'Good academic background, needs additional documents',
            requiredDocuments: ['Transcript', 'CV', 'Statement of Purpose', 'References'],
            missingDocuments: ['Birth Certificate', 'Local Government Certificate'],
            interviewRequired: false
        },
        {
            id: 5,
            applicantName: 'Emily Rodriguez',
            applicationId: 'APP/2024/005',
            programme: 'Physics',
            level: 'PhD',
            currentStage: 'Initial Review',
            assignedReviewer: 'Prof. James Taylor',
            submissionDate: '2024-01-25',
            daysInQueue: 1,
            priority: 'Low',
            cgpa: '3.70',
            previousDegree: 'M.Sc Physics',
            previousInstitution: 'Ahmadu Bello University',
            documentsComplete: true,
            applicationFee: 'Paid',
            reviewHistory: [],
            currentReviewNotes: 'Application received, pending initial review',
            requiredDocuments: ['Transcript', 'CV', 'Research Proposal', 'References'],
            missingDocuments: [],
            interviewRequired: false
        }
    ];

    function init() {
        loadReviewQueue();
        renderPage();
        setupEventListeners();
    }

    function loadReviewQueue() {
        reviewQueue = [...mockQueue];
        filteredQueue = [...reviewQueue];
    }

    function renderPage() {
        const content = document.getElementById('review-page-content');
        if (!content) return;

        content.innerHTML = `
            <div class="page-header">
                <h2>Application Review Process</h2>
                <p>Manage and conduct reviews for admission applications at different stages</p>
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
                        <label>Review Stage:</label>
                        <select id="stage-filter">
                            <option value="">All Stages</option>
                            ${reviewStages.map(stage => `<option value="${stage}">${stage}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Reviewer:</label>
                        <select id="reviewer-filter">
                            <option value="">All Reviewers</option>
                            ${reviewers.map(reviewer => `<option value="${reviewer}">${reviewer}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="filter-group">
                        <label>Search:</label>
                        <input type="text" id="search-input" placeholder="Search by name or ID...">
                    </div>
                    
                    <div class="filter-actions">
                        <button class="btn btn-secondary" id="clear-filters">
                            <i class="fas fa-times"></i> Clear Filters
                        </button>
                        <button class="btn btn-primary">
                            <i class="fas fa-download"></i> Export Queue
                        </button>
                        <button class="btn btn-success">
                            <i class="fas fa-chart-line"></i> Review Analytics
                        </button>
                    </div>
                </div>
            </div>

            <div class="results-summary">
                <p>Showing ${filteredQueue.length} of ${reviewQueue.length} applications in review queue</p>
                <div class="summary-stats">
                    <span class="stat-item info">
                        Initial Review: ${reviewQueue.filter(a => a.currentStage === 'Initial Review').length}
                    </span>
                    <span class="stat-item warning">
                        Document Verification: ${reviewQueue.filter(a => a.currentStage === 'Document Verification').length}
                    </span>
                    <span class="stat-item primary">
                        Academic Assessment: ${reviewQueue.filter(a => a.currentStage === 'Academic Assessment').length}
                    </span>
                    <span class="stat-item secondary">
                        Interview Review: ${reviewQueue.filter(a => a.currentStage === 'Interview Review').length}
                    </span>
                    <span class="stat-item success">
                        Final Decision: ${reviewQueue.filter(a => a.currentStage === 'Final Decision').length}
                    </span>
                </div>
            </div>

            <div class="review-queue" id="review-queue-list"></div>
        `;

        renderReviewQueue();
    }

    function renderReviewQueue() {
        const listContainer = document.getElementById('review-queue-list');
        if (!listContainer) return;

        if (filteredQueue.length > 0) {
            listContainer.innerHTML = filteredQueue.map(application => `
                <div class="review-card" data-id="${application.id}">
                    <div class="review-header">
                        <div class="applicant-info">
                            <h3>${application.applicantName}</h3>
                            <p class="application-id">${application.applicationId}</p>
                            <p class="programme-info">${application.programme} - ${application.level}</p>
                        </div>
                        <div class="review-status">
                            <span class="stage-badge ${getStageColor(application.currentStage)}">${application.currentStage}</span>
                            <span class="priority-badge ${getPriorityColor(application.priority)}">${application.priority}</span>
                            <span class="days-badge ${getDaysInQueueColor(application.daysInQueue)}">${application.daysInQueue} days</span>
                        </div>
                    </div>
                    
                    <div class="review-details">
                        <div class="detail-row">
                            <div class="detail-item">
                                <strong>Assigned Reviewer:</strong> ${application.assignedReviewer}
                            </div>
                            <div class="detail-item">
                                <strong>CGPA:</strong> ${application.cgpa}
                            </div>
                            <div class="detail-item">
                                <strong>Documents:</strong> 
                                <span class="documents-status ${application.documentsComplete ? 'complete' : 'incomplete'}">
                                    ${application.documentsComplete ? 'Complete' : 'Incomplete'}
                                </span>
                            </div>
                        </div>
                        
                        <div class="detail-row">
                            <div class="detail-item">
                                <strong>Previous Degree:</strong> ${application.previousDegree}
                            </div>
                            <div class="detail-item">
                                <strong>Institution:</strong> ${application.previousInstitution}
                            </div>
                            <div class="detail-item">
                                <strong>Fee Status:</strong> ${application.applicationFee}
                            </div>
                        </div>
                        
                        ${application.currentReviewNotes ? `
                            <div class="review-notes">
                                <strong>Current Notes:</strong> ${application.currentReviewNotes}
                            </div>
                        ` : ''}
                        
                        ${application.reviewHistory.length > 0 ? `
                            <div class="review-history">
                                <strong>Review History:</strong>
                                <div class="history-list">
                                    ${application.reviewHistory.map(review => `
                                        <div class="history-item">
                                            <span class="history-stage">${review.stage}</span>
                                            <span class="history-reviewer">${review.reviewer}</span>
                                            <span class="history-decision ${review.decision.toLowerCase().replace(' ', '-')}">${review.decision}</span>
                                            <span class="history-date">${review.date}</span>
                                            ${review.score ? `<span class="history-score">Score: ${review.score}</span>` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    
                    <div class="review-actions">
                        <button class="btn btn-primary start-review" data-id="${application.id}">
                            <i class="fas fa-edit"></i> Start Review
                        </button>
                        <button class="btn btn-secondary">
                            <i class="fas fa-eye"></i> View Details
                        </button>
                        <button class="btn btn-info">
                            <i class="fas fa-history"></i> Review History
                        </button>
                    </div>
                </div>
            `).join('');
        } else {
            listContainer.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>No applications in review queue</h3>
                    <p>Try adjusting your filters or check back later</p>
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

        document.getElementById('stage-filter')?.addEventListener('change', (e) => {
            selectedReviewStage = e.target.value;
            applyFilters();
        });

        document.getElementById('reviewer-filter')?.addEventListener('change', (e) => {
            selectedReviewer = e.target.value;
            applyFilters();
        });

        document.getElementById('search-input')?.addEventListener('input', (e) => {
            searchTerm = e.target.value;
            applyFilters();
        });

        document.getElementById('clear-filters')?.addEventListener('click', clearFilters);

        // Review card event listeners
        document.addEventListener('click', (e) => {
            if (e.target.closest('.start-review')) {
                const applicationId = parseInt(e.target.closest('.start-review').dataset.id);
                const application = reviewQueue.find(app => app.id === applicationId);
                if (application) {
                    handleStartReview(application);
                }
            }
        });
    }

    function applyFilters() {
        filteredQueue = reviewQueue.filter(application => {
            const programmeMatch = !selectedProgramme || application.programme === selectedProgramme;
            const levelMatch = !selectedLevel || application.level === selectedLevel;
            const stageMatch = !selectedReviewStage || application.currentStage === selectedReviewStage;
            const reviewerMatch = !selectedReviewer || application.assignedReviewer === selectedReviewer;
            
            const searchMatch = !searchTerm || 
                application.applicantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                application.applicationId.toLowerCase().includes(searchTerm.toLowerCase());

            return programmeMatch && levelMatch && stageMatch && reviewerMatch && searchMatch;
        });

        renderPage();
    }

    function clearFilters() {
        selectedProgramme = '';
        selectedLevel = '';
        selectedReviewStage = '';
        selectedReviewer = '';
        searchTerm = '';
        
        // Reset form values
        document.getElementById('programme-filter').value = '';
        document.getElementById('level-filter').value = '';
        document.getElementById('stage-filter').value = '';
        document.getElementById('reviewer-filter').value = '';
        document.getElementById('search-input').value = '';
        
        applyFilters();
    }

    function handleStartReview(application) {
        selectedApplication = application;
        showReviewModal = true;
        renderReviewModal();
    }

    function renderReviewModal() {
        if (!showReviewModal || !selectedApplication) return;

        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content review-modal">
                <div class="modal-header">
                    <h3>Review Application: ${selectedApplication.applicantName}</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <form class="modal-body" id="review-form">
                    <div class="application-summary">
                        <h4>Application Summary</h4>
                        <div class="summary-grid">
                            <div><strong>Programme:</strong> ${selectedApplication.programme}</div>
                            <div><strong>Level:</strong> ${selectedApplication.level}</div>
                            <div><strong>Current Stage:</strong> ${selectedApplication.currentStage}</div>
                            <div><strong>CGPA:</strong> ${selectedApplication.cgpa}</div>
                        </div>
                    </div>
                    
                    <div class="form-row">
                        <div class="form-group">
                            <label>Decision:</label>
                            <select id="decision-select" required>
                                <option value="">Select Decision</option>
                                ${decisions.map(decision => `<option value="${decision}">${decision}</option>`).join('')}
                            </select>
                        </div>
                        
                        <div class="form-group">
                            <label>Score (0-100):</label>
                            <input type="number" id="score-input" min="0" max="100" placeholder="Enter score...">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label>Next Stage:</label>
                        <select id="next-stage-select">
                            <option value="">Keep Current Stage</option>
                            ${nextStages.map(stage => `<option value="${stage}">${stage}</option>`).join('')}
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label>Review Comments:</label>
                        <textarea id="comments-textarea" placeholder="Enter your review comments..." rows="4" required></textarea>
                    </div>
                    
                    <div class="form-group">
                        <label>Recommendations:</label>
                        <textarea id="recommendations-textarea" placeholder="Enter recommendations for next reviewer or final decision..." rows="3"></textarea>
                    </div>
                    
                    <div class="modal-actions">
                        <button type="button" class="btn btn-secondary" id="cancel-review">Cancel</button>
                        <button type="submit" class="btn btn-success">
                            <i class="fas fa-check"></i> Submit Review
                        </button>
                    </div>
                </form>
            </div>
        `;

        document.body.appendChild(modal);

        // Modal event listeners
        modal.querySelector('.close-modal').addEventListener('click', closeReviewModal);
        modal.querySelector('#cancel-review').addEventListener('click', closeReviewModal);
        modal.querySelector('#review-form').addEventListener('submit', handleSubmitReview);
    }

    function handleSubmitReview(e) {
        e.preventDefault();
        
        const formData = {
            decision: document.getElementById('decision-select').value,
            score: document.getElementById('score-input').value,
            comments: document.getElementById('comments-textarea').value,
            recommendations: document.getElementById('recommendations-textarea').value,
            nextStage: document.getElementById('next-stage-select').value
        };

        // Here you would typically send the review data to the server
        console.log('Review submitted:', formData);
        
        // Update the application in the queue (simulate)
        if (selectedApplication) {
            const reviewEntry = {
                stage: selectedApplication.currentStage,
                reviewer: 'Current User',
                decision: formData.decision,
                date: new Date().toISOString().split('T')[0],
                score: formData.score ? parseInt(formData.score) : null
            };
            
            selectedApplication.reviewHistory.push(reviewEntry);
            selectedApplication.currentReviewNotes = formData.comments;
            
            if (formData.nextStage) {
                selectedApplication.currentStage = formData.nextStage;
            }
        }

        closeReviewModal();
        renderPage();
        
        // Show success message
        alert('Review submitted successfully!');
    }

    function closeReviewModal() {
        const modal = document.querySelector('.modal-overlay');
        if (modal) {
            modal.remove();
        }
        showReviewModal = false;
        selectedApplication = null;
    }

    function getStageColor(stage) {
        const colors = {
            'Initial Review': 'info',
            'Document Verification': 'warning',
            'Academic Assessment': 'primary',
            'Interview Review': 'secondary',
            'Final Decision': 'success'
        };
        return colors[stage] || 'secondary';
    }

    function getPriorityColor(priority) {
        const colors = {
            'High': 'danger',
            'Medium': 'warning',
            'Low': 'success',
            'Urgent': 'danger'
        };
        return colors[priority] || 'secondary';
    }

    function getDaysInQueueColor(days) {
        if (days <= 3) return 'success';
        if (days <= 7) return 'warning';
        return 'danger';
    }

    // Initialize the page
    init();
});
