import type { Expense, ExpenseCategory, Project } from "../types";

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "materials",
  "labor",
  "permits",
  "equipment",
  "subcontractor",
  "transportation",
  "other",
];

export const EXPENSE_CATEGORY_LABEL: Record<ExpenseCategory, string> = {
  materials: "Materials",
  labor: "Labor",
  permits: "Permits",
  equipment: "Equipment",
  subcontractor: "Subcontractor",
  transportation: "Transportation",
  other: "Other",
};

export const EXPENSE_CATEGORY_STYLE: Record<ExpenseCategory, string> = {
  materials: "bg-sky-900 text-sky-100",
  labor: "bg-indigo-900 text-indigo-100",
  permits: "bg-amber-900 text-amber-100",
  equipment: "bg-teal-900 text-teal-100",
  subcontractor: "bg-fuchsia-900 text-fuchsia-100",
  transportation: "bg-slate-700 text-slate-100",
  other: "bg-slate-800 text-slate-200",
};

export function totalExpenses(expenses: Expense[]): number {
  return expenses.reduce((s, e) => s + e.amountPhp, 0);
}

export function expensesByCategory(
  expenses: Expense[]
): Record<ExpenseCategory, number> {
  const out: Record<ExpenseCategory, number> = {
    materials: 0,
    labor: 0,
    permits: 0,
    equipment: 0,
    subcontractor: 0,
    transportation: 0,
    other: 0,
  };
  for (const e of expenses) out[e.category] += e.amountPhp;
  return out;
}

export function projectMargin(project: Project) {
  const expenses = totalExpenses(project.expenses);
  const projectedMargin = project.contractValuePhp - expenses;
  const projectedMarginPercent =
    project.contractValuePhp === 0
      ? 0
      : (projectedMargin / project.contractValuePhp) * 100;
  return { expenses, projectedMargin, projectedMarginPercent };
}
