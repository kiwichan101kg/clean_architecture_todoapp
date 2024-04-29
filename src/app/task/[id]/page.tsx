import { TaskScreen } from "@/screen/task";

export default function TaskDetailPage({ params }: { params: { id: string } }) {
  return <TaskScreen id={params.id} />;
}
