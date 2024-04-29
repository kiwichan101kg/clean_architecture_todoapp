import { TaskScreen } from "@/screen/task";

export default function TaskPage({ params }: { params: { id: string } }) {
  return <TaskScreen id={params.id} />;
}
