// Finance Reports Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const reportsPageContent = document.getElementById('reports-page-content');
    
    if (reportsPageContent) {
        reportsPageContent.innerHTML = `
            <div class="reports-page">
                <div class="page-header">
                    <h2>Financial Reports</h2>
                    <p>Generate and view financial reports and analytics</p>
                </div>
                
                <div class="reports-list">
                    <div class="report-card">
                        <div class="report-header">
                            <h3>Revenue Report</h3>
                            <span class="report-status generated">Generated</span>
                        </div>
                        <div class="report-details">
                            <div class="report-item">
                                <span>Period</span>
                                <span>January 2024</span>
                            </div>
                            <div class="report-item">
                                <span>Total Revenue</span>
                                <span>₦45,750,000</span>
                            </div>
                            <div class="report-item">
                                <span>Format</span>
                                <span>PDF</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});
