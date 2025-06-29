'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DashboardStats({
  totalPosts,
  latestPostDate,
}: {
  totalPosts: number;
  latestPostDate: string;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Total Posts</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-bold">{totalPosts}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Latest Post Date</CardTitle>
        </CardHeader>
        <CardContent className="text-md text-muted-foreground">
          {new Date(latestPostDate).toLocaleString()}
        </CardContent>
      </Card>
    </div>
  );
}
