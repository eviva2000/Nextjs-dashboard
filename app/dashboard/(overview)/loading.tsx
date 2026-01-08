 // By moving page.tsx and loading.tsx in overview folder the loading.tsx file will only apply to dashboard overview page
 import DashboardSkeleton from '@/app/ui/skeletons';

export default function Loading() {
  return <DashboardSkeleton />;
}