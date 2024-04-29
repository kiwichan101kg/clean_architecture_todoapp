import { TaskDetailScreen } from "@/screen/taskDetail";

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  return <TaskDetailScreen id={params.id} />;
}
