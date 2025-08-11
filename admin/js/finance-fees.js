// Finance Fees Management Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const feesPageContent = document.getElementById('fees-page-content');
    
    if (feesPageContent) {
        feesPageContent.innerHTML = `
            <div class="fees-page">
                <div class="page-header">
                    <h2>Fee Structure Management</h2>
                    <p>Manage and configure fee structures for different programs and levels</p>
                </div>
                
                <div class="fee-structures-list">
                    <div class="fee-structure-card">
                        <div class="fee-header">
                            <h3>Computer Science - M.Sc</h3>
                            <span class="status-badge success">Active</span>
                        </div>
                        <div class="fee-breakdown">
                            <div class="fee-item">
                                <span>Tuition Fee</span>
                                <span>₦185,000</span>
                            </div>
                            <div class="fee-item">
                                <span>Laboratory Fee</span>
                                <span>₦15,000</span>
                            </div>
                            <div class="fee-item">
                                <span>Library Fee</span>
                                <span>₦5,000</span>
                            </div>
                            <div class="fee-total">
                                <span>Total</span>
                                <span>₦205,000</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});
