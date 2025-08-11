document.addEventListener('DOMContentLoaded', () => {
    const financeDashboardContent = document.getElementById('finance-dashboard-content');
    const adminMainContent = document.getElementById('admin-main-content');
    const adminToggleSidebarBtn = document.getElementById('admin-toggle-sidebar');
    const adminUserEmailSpan = document.getElementById('admin-user-email');

    // Simulate fetching user data (from localStorage, similar to admin-common.js)
    const user = JSON.parse(localStorage.getItem('adminUser'));
    if (user) {
        adminUserEmailSpan.textContent = user.email || 'Admin User';
    }

    // Sidebar toggle logic
    adminToggleSidebarBtn.addEventListener('click', () => {
        const adminSidebar = document.getElementById('admin-sidebar');
        adminSidebar.classList.toggle('collapsed');
        adminMainContent.classList.toggle('expanded');
    });

    let dashboardData = {
        totalRevenue: 0,
        pendingPayments: 0,
        scholarshipsAwarded: 0,
        outstandingFees: 0,
        recentTransactions: [],
        paymentStats: {},
        scholarshipData: {},
        feeStructure: [],
        monthlyRevenue: []
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-NG', {
            style: 'currency',
            currency: 'NGN',
            minimumFractionDigits: 0
        }).format(amount);
    };

    // Simulate API call to fetch dashboard data
    const fetchDashboardData = async () => {
        const mockData = {
            totalRevenue: 45750000,
            pendingPayments: 2340000,
            scholarshipsAwarded: 8950000,
            outstandingFees: 1250000,
            paymentStats: {
                collectionRate: '94.2%',
                onTimePayments: '87.5%',
                averageFeePerStudent: 185000,
                refundsProcessed: 450000,
                totalStudentsOwing: 67
            },
            scholarshipData: {
                totalAwarded: 8950000,
                studentsReceiving: 234,
                averageAmount: 38248,
                meritBased: 5670000,
                needBased: 3280000
            },
            recentTransactions: [
                { id: 1, student: 'John Doe', amount: 185000, type: 'tuition', status: 'completed', date: '2 hours ago' },
                { id: 2, student: 'Jane Smith', amount: 92500, type: 'partial_payment', status: 'completed', date: '4 hours ago' },
                { id: 3, student: 'Mike Johnson', amount: 25000, type: 'late_fee', status: 'pending', date: '6 hours ago' },
                { id: 4, student: 'Sarah Wilson', amount: 185000, type: 'tuition', status: 'completed', date: '8 hours ago' }
            ],
            feeStructure: [
                { program: 'Computer Science', tuition: 185000, lab: 15000, library: 5000, total: 205000 },
                { program: 'Data Science', tuition: 195000, lab: 20000, library: 5000, total: 220000 },
                { program: 'Mathematics', tuition: 165000, lab: 8000, library: 5000, total: 178000 },
                { program: 'Physics', tuition: 175000, lab: 18000, library: 5000, total: 198000 },
                { program: 'Chemistry', tuition: 175000, lab: 22000, library: 5000, total: 202000 }
            ],
            monthlyRevenue: [
                { month: 'Jan', revenue: 3800000, target: 4000000 },
                { month: 'Feb', revenue: 4200000, target: 4000000 },
                { month: 'Mar', revenue: 3950000, target: 4000000 },
                { month: 'Apr', revenue: 4100000, target: 4000000 },
                { month: 'May', revenue: 3750000, target: 4000000 },
                { month: 'Jun', revenue: 4300000, target: 4000000 }
            ]
        };
        dashboardData = mockData; // Update the global dashboardData
        renderDashboard(); // Re-render after data is fetched
    };

    // Function to render StatCard
    const renderStatCard = (title, value, icon, subtitle, color = 'primary') => `
        <div class="finance-stat-card ${color}">
            <div class="stat-icon">
                <i class="${icon}"></i>
            </div>
            <div class="stat-content">
                <h3>${value}</h3>
                <p>${title}</p>
                ${subtitle ? `<span class="stat-subtitle">${subtitle}</span>` : ''}
            </div>
        </div>
    `;

    // Function to render TransactionItem
    const renderTransactionItem = (transaction) => `
        <div class="transaction-item">
            <div class="transaction-content">
                <h4>${transaction.student}</h4>
                <p>${formatCurrency(transaction.amount)} - ${transaction.type.replace('_', ' ')}</p>
                <span class="transaction-date">${transaction.date}</span>
            </div>
            <div class="transaction-status ${transaction.status}">
                ${transaction.status}
            </div>
        </div>
    `;

    // Function to render FeeStructureItem
    const renderFeeStructureItem = (fee) => `
        <div class="fee-structure-item">
            <div class="fee-program">
                <h4>${fee.program}</h4>
            </div>
            <div class="fee-breakdown">
                <div class="fee-item">
                    <span>Tuition</span>
                    <span>${formatCurrency(fee.tuition)}</span>
                </div>
                <div class="fee-item">
                    <span>Lab Fee</span>
                    <span>${formatCurrency(fee.lab)}</span>
                </div>
                <div class="fee-item">
                    <span>Library</span>
                    <span>${formatCurrency(fee.library)}</span>
                </div>
                <div class="fee-total">
                    <span>Total</span>
                    <span>${formatCurrency(fee.total)}</span>
                </div>
            </div>
        </div>
    `;

    // Function to render RevenueChart
    const renderRevenueChart = (data) => `
        <div class="revenue-chart">
            ${data.map((item, index) => {
                const percentage = (item.revenue / item.target) * 100;
                return `
                    <div class="revenue-bar">
                        <div class="revenue-month">${item.month}</div>
                        <div class="revenue-bar-container">
                            <div 
                                class="revenue-bar-fill" 
                                style="height: ${percentage}%;"
                            ></div>
                        </div>
                        <div class="revenue-amount">${formatCurrency(item.revenue / 1000000)}M</div>
                    </div>
                `;
            }).join('')}
        </div>
    `;

    const renderDashboard = () => {
        financeDashboardContent.innerHTML = `
            <div class="finance-welcome">
                <h2>Welcome back, Finance Director</h2>
                <p>Financial Management and Revenue Tracking</p>
            </div>

            <div class="finance-stats-grid">
                ${renderStatCard("Total Revenue", formatCurrency(dashboardData.totalRevenue), "fas fa-chart-line", "This academic year", "success")}
                ${renderStatCard("Pending Payments", formatCurrency(dashboardData.pendingPayments), "fas fa-clock", `${dashboardData.paymentStats.totalStudentsOwing} students`, "warning")}
                ${renderStatCard("Scholarships Awarded", formatCurrency(dashboardData.scholarshipsAwarded), "fas fa-award", `${dashboardData.scholarshipData.studentsReceiving} recipients`, "info")}
                ${renderStatCard("Outstanding Fees", formatCurrency(dashboardData.outstandingFees), "fas fa-exclamation-triangle", "Requires follow-up", "danger")}
            </div>

            <div class="finance-overview-grid">
                <div class="finance-card">
                    <div class="card-header">
                        <h3>Payment Statistics</h3>
                        <i class="fas fa-chart-pie"></i>
                    </div>
                    <div class="payment-stats">
                        <div class="payment-stat-item">
                            <span class="stat-label">Collection Rate</span>
                            <span class="stat-value success">${dashboardData.paymentStats.collectionRate}</span>
                        </div>
                        <div class="payment-stat-item">
                            <span class="stat-label">On-time Payments</span>
                            <span class="stat-value info">${dashboardData.paymentStats.onTimePayments}</span>
                        </div>
                        <div class="payment-stat-item">
                            <span class="stat-label">Average Fee/Student</span>
                            <span class="stat-value primary">${formatCurrency(dashboardData.paymentStats.averageFeePerStudent)}</span>
                        </div>
                        <div class="payment-stat-item">
                            <span class="stat-label">Refunds Processed</span>
                            <span class="stat-value warning">${formatCurrency(dashboardData.paymentStats.refundsProcessed)}</span>
                        </div>
                    </div>
                </div>

                <div class="finance-card">
                    <div class="card-header">
                        <h3>Scholarship Overview</h3>
                        <i class="fas fa-graduation-cap"></i>
                    </div>
                    <div class="scholarship-overview">
                        <div class="scholarship-summary">
                            <h4>${formatCurrency(dashboardData.scholarshipData.totalAwarded)}</h4>
                            <p>Total Awarded</p>
                        </div>
                        <div class="scholarship-breakdown">
                            <div class="scholarship-item">
                                <span>Merit-based</span>
                                <span>${formatCurrency(dashboardData.scholarshipData.meritBased)}</span>
                            </div>
                            <div class="scholarship-item">
                                <span>Need-based</span>
                                <span>${formatCurrency(dashboardData.scholarshipData.needBased)}</span>
                            </div>
                            <div class="scholarship-item">
                                <span>Average Amount</span>
                                <span>${formatCurrency(dashboardData.scholarshipData.averageAmount)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="finance-card">
                <div class="card-header">
                    <h3>Quick Actions</h3>
                    <i class="fas fa-bolt"></i>
                </div>
                <div class="quick-actions">
                    <button class="action-btn primary">
                        <i class="fas fa-plus"></i>
                        Process Payment
                    </button>
                    <button class="action-btn success">
                        <i class="fas fa-award"></i>
                        Award Scholarship
                    </button>
                    <button class="action-btn info">
                        <i class="fas fa-file-invoice"></i>
                        Generate Invoice
                    </button>
                    <button class="action-btn warning">
                        <i class="fas fa-undo"></i>
                        Process Refund
                    </button>
                    <button class="action-btn secondary">
                        <i class="fas fa-envelope"></i>
                        Send Reminder
                    </button>
                    <button class="action-btn danger">
                        <i class="fas fa-chart-bar"></i>
                        Financial Report
                    </button>
                </div>
            </div>

            <div class="finance-content-grid">
                <div class="finance-card">
                    <div class="card-header">
                        <h3>Monthly Revenue Trend</h3>
                        <a href="#revenue-details" class="view-all">View Details</a>
                    </div>
                    <div class="revenue-chart-container">
                        ${renderRevenueChart(dashboardData.monthlyRevenue)}
                    </div>
                </div>

                <div class="finance-card">
                    <div class="card-header">
                        <h3>Recent Transactions</h3>
                        <a href="#all-transactions" class="view-all">View All</a>
                    </div>
                    <div class="transactions-list">
                        ${dashboardData.recentTransactions.map(renderTransactionItem).join('')}
                    </div>
                </div>
            </div>

            <div class="finance-card">
                <div class="card-header">
                    <h3>Current Fee Structure</h3>
                    <a href="#edit-fees" class="view-all">Edit Fees</a>
                </div>
                <div class="fee-structure-list">
                    ${dashboardData.feeStructure.map(renderFeeStructureItem).join('')}
                </div>
            </div>
        `;
    };

    fetchDashboardData(); // Initial data fetch and render
});
