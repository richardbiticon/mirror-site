import type { Lead, Project } from "../types";

function escapeCell(value: unknown): string {
  if (value === null || value === undefined) return "";
  const str = String(value);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function toCsv(headers: string[], rows: unknown[][]): string {
  const lines = [headers.map(escapeCell).join(",")];
  for (const row of rows) {
    lines.push(row.map(escapeCell).join(","));
  }
  return lines.join("\r\n");
}

export function leadsToCsv(leads: Lead[]): string {
  const headers = [
    "id",
    "name",
    "phone",
    "email",
    "source",
    "projectType",
    "estimatedValuePhp",
    "stage",
    "notes",
    "createdAt",
    "updatedAt",
  ];
  const rows = leads.map((l) => [
    l.id,
    l.name,
    l.phone,
    l.email ?? "",
    l.source,
    l.projectType,
    l.estimatedValuePhp,
    l.stage,
    l.notes ?? "",
    l.createdAt,
    l.updatedAt,
  ]);
  return toCsv(headers, rows);
}

export function projectsToCsv(projects: Project[]): string {
  const headers = [
    "id",
    "leadId",
    "clientName",
    "siteAddress",
    "contractValuePhp",
    "status",
    "startDate",
    "targetEndDate",
    "progressPercent",
    "milestoneCount",
    "totalPaidPhp",
    "totalExpensesPhp",
    "createdAt",
    "updatedAt",
  ];
  const rows = projects.map((p) => {
    const totalPaid = p.milestones
      .filter((m) => m.status === "paid")
      .reduce((s, m) => s + m.amountPhp, 0);
    const totalExpenses = p.expenses.reduce((s, e) => s + e.amountPhp, 0);
    return [
      p.id,
      p.leadId ?? "",
      p.clientName,
      p.siteAddress,
      p.contractValuePhp,
      p.status,
      p.startDate,
      p.targetEndDate,
      p.progressPercent,
      p.milestones.length,
      totalPaid,
      totalExpenses,
      p.createdAt,
      p.updatedAt,
    ];
  });
  return toCsv(headers, rows);
}

export function milestonesToCsv(projects: Project[]): string {
  const headers = [
    "projectId",
    "clientName",
    "milestoneId",
    "name",
    "percentOfContract",
    "amountPhp",
    "status",
    "dueDate",
    "paidDate",
  ];
  const rows: unknown[][] = [];
  for (const p of projects) {
    for (const m of p.milestones) {
      rows.push([
        p.id,
        p.clientName,
        m.id,
        m.name,
        m.percentOfContract,
        m.amountPhp,
        m.status,
        m.dueDate,
        m.paidDate ?? "",
      ]);
    }
  }
  return toCsv(headers, rows);
}

export function expensesToCsv(projects: Project[]): string {
  const headers = [
    "projectId",
    "clientName",
    "expenseId",
    "date",
    "category",
    "description",
    "vendor",
    "amountPhp",
  ];
  const rows: unknown[][] = [];
  for (const p of projects) {
    for (const e of p.expenses) {
      rows.push([
        p.id,
        p.clientName,
        e.id,
        e.date,
        e.category,
        e.description,
        e.vendor ?? "",
        e.amountPhp,
      ]);
    }
  }
  return toCsv(headers, rows);
}

export function downloadCsv(filename: string, csv: string): void {
  const blob = new Blob(["﻿" + csv], {
    type: "text/csv;charset=utf-8",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
