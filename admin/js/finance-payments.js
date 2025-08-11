// Finance Payments Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const paymentsPageContent = document.getElementById('payments-page-content');
    
    if (paymentsPageContent) {
        paymentsPageContent.innerHTML = `
            <div class="payments-page">
                <div class="page-header">
                    <h2>Payment Management</h2>
                    <p>Track and manage student payments and transactions</p>
                </div>
                
                <div class="payments-list">
                    <div class="payment-card">
                        <div class="payment-header">
                            <h3>John Doe</h3>
                            <span class="payment-status success">Completed</span>
                        </div>
                        <div class="payment-details">
                            <div class="payment-item">
                                <span>Amount</span>
                                <span>₦185,000</span>
                            </div>
                            <div class="payment-item">
                                <span>Type</span>
                                <span>Tuition Fee</span>
                            </div>
                            <div class="payment-item">
                                <span>Date</span>
                                <span>2 hours ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
});
