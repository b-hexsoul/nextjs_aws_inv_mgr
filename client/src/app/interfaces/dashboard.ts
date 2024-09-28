export interface IDashboardMetrics {
  popularProducts: Product[]
  salesSummary: SalesSummary[]
  purchaseSummary: PurchaseSummary[]
  expenseSummary: ExpenseSummary[]
  expenseByCategory: ExpenseByCategory[]
};

interface Product {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

interface SalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage: number;
  date: string;
}

interface PurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage: number;
  date: string;
}

interface ExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

interface ExpenseByCategory {
  expenseByCategoryId: string;
  expenseSummaryId: string;
  category: string;
  amount: string;
  date: string;
}