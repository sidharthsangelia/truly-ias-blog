'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function DashboardStats({
  totalPosts,
  latestPostDate,
}: {
  totalPosts: number;
  latestPostDate?: string | Date;
}) {
  return (
    <>
      {/* Total Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📦 Total Posts</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold text-foreground">{totalPosts}</p>
          <p className="text-sm text-muted-foreground">Published till now</p>
        </CardContent>
      </Card>

      {/* Latest Post Date */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">📅 Latest Post Date</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-base font-medium text-foreground">
            {latestPostDate
              ? new Date(latestPostDate).toLocaleDateString(undefined, {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                })
              : 'N/A'}
          </p>
          <p className="text-sm text-muted-foreground">Most recent update</p>
        </CardContent>
      </Card>
    </>
  );
}
