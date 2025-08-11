// Finance Scholarships Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const scholarshipsPageContent = document.getElementById('scholarships-page-content');
    
    if (scholarshipsPageContent) {
        scholarshipsPageContent.innerHTML = `
            <div class="scholarships-page">
                <div class="page-header">
                    <h2>Scholarship Management</h2>
                    <p>Manage student scholarships and financial aid</p>
                </div>
                
                <div class="scholarships-list">
                    <div class="scholarship-card">
                        <div class="scholarship-header">
                            <h3>Merit Scholarship</h3>
                            <span class="scholarship-status active">Active</span>
                        </div>
                        <div class="scholarship-details">
                            <div class="scholarship-item">
                                <span>Amount</span>
                                <span>₦50,000</span>
                            </div>
                            <div class="scholarship-item">
                                <span>Recipients</span>
                                <span>25 students</span>
                            </div>
                            <div class="scholarship-item">
                                <span>Type</span>
                                <span>Merit-based</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});
