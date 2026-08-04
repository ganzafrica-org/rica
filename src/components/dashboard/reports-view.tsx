"use client";

import { PageTransition } from "@/components/motion/page-transition";
import { PageTitle } from "@/components/layout/page-title";
import { Card, Table } from "@/components/ui";

const reports = [
  {
    name: "Weekly inspection summary",
    period: "28 Jul – 3 Aug 2026",
    status: "Ready",
  },
  {
    name: "Compliance by stream",
    period: "July 2026",
    status: "Ready",
  },
  {
    name: "Pending field visits",
    period: "Current",
    status: "Draft",
  },
];

export function ReportsView() {
  return (
    <PageTransition className="space-y-6">
      <PageTitle
        title="Reports"
        description="Export and review inspection summaries across regulatory streams."
      />

      <Card className="border-border/70 bg-surface shadow-sm">
        <Card.Header>
          <Card.Title className="rica-title">Available reports</Card.Title>
          <Card.Description className="rica-body text-muted">
            Generated from your assigned inspection activity
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Reports list">
                <Table.Header>
                  <Table.Column isRowHeader>Report</Table.Column>
                  <Table.Column>Period</Table.Column>
                  <Table.Column>Status</Table.Column>
                </Table.Header>
                <Table.Body>
                  {reports.map((report) => (
                    <Table.Row key={report.name}>
                      <Table.Cell className="font-medium">{report.name}</Table.Cell>
                      <Table.Cell>{report.period}</Table.Cell>
                      <Table.Cell>{report.status}</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        </Card.Content>
      </Card>
    </PageTransition>
  );
}
