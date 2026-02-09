# Conveyance Assessment Accounting

The management company was treating the Developer’s "loan repayment" as contra-revenue rather than a liability repayment.

Because the original "loan" from the Developer (for start-up costs/legal fees) was never booked as a Liability on the Balance Sheet, the management company could not debit a liability account when they cut the checks. Instead, they debited the Revenue account (GL 300150) directly.

This caused the "Conveyance Assessment" income to net against the "Developer Payouts" on the Income Statement, effectively making both the revenue and the outflow invisible on summary reports.

---

### The Technical Breakdown

Here is the step-by-step accounting flow based on the General Ledgers (specifically focusing on the transactions in GL 300150):

1. The Inflow (Standard Revenue Recognition) When a home was sold, the title company sent the $500 Conveyance Assessment to the HOA.
- Dr Cash (100100)
- Cr Income: Transfer Fee - Capital Contribution (300150)
- Result: The Income Statement shows healthy revenue in the 30000 series.
2. The Outflow (The "Sweep") Periodically, the management company cleared this account by cutting a check to Lotus House Development Corp.
- Dr Income: Transfer Fee - Capital Contribution (300150)
- Cr Cash (100100)
- Result: This entry acts as contra-revenue, reducing the reported income for that line item, often to near zero.

3. The Reporting Distortion Because the payout was booked to a 30000-series account (Revenue) rather than a 40000-series account (Expense) or 20000-series account (Liability), it creates two major distortions:

- Income Statement: The "Conveyance Assessment" line item is understated. If the HOA collected $12,000 and paid the Developer $12,000, the P&L simply shows $0 for that line. It looks like no activity occurred, hiding the fact that significant cash moved through the entity.

- Balance Sheet: Since the "Loan" was off-balance-sheet (never booked as a "Due to Developer" liability), the repayment didn't reduce a liability. It simply vanished from equity.

### Specific Examples from the Ledger

- March 2021: The ledger shows a Debit of $12,000 to GL 300150 described as "Payment per Agreement" to Lotus House. This directly offset the accumulated Credits from home sales.

- September 2025: A Debit of $7,500 was applied to GL 300150, wiping out the revenue collected from the previous 15 home sales.

### The "Fund Accounting" Violation

- Restricted Funds: The CC&Rs mandate these funds be used "exclusively" for Common Area Maintenance (Operational or Reserve Expense).
- Actual Use: They were used for Debt Service (Financing Activity) to repay an unrecorded loan.
- Conclusion: By netting the debt service against the restricted revenue, the financial statements obscured the fact that restricted funds were being diverted for unauthorized purposes.
