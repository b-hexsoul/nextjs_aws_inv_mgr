export interface IDashboardMetrics {
  popularProducts: IProduct[]
  salesSummary: ISalesSummary[]
  purchaseSummary: IPurchaseSummary[]
  expenseSummary: IExpenseSummary[]
  expenseByCategorySummary: IExpenseByCategory[]
};

export interface IProduct {
  productId: string;
  name: string;
  price: number;
  rating?: number;
  stockQuantity: number;
}

export interface ISalesSummary {
  salesSummaryId: string;
  totalValue: number;
  changePercentage: number;
  date: string;
}

export interface IPurchaseSummary {
  purchaseSummaryId: string;
  totalPurchased: number;
  changePercentage: number;
  date: string;
}

export interface IExpenseSummary {
  expenseSummaryId: string;
  totalExpenses: number;
  date: string;
}

export interface IExpenseByCategory {
  expenseByCategoryId: string;
  expenseSummaryId: string;
  category: string;
  amount: string;
  date: string;
}