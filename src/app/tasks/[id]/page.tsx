import { Task } from "@/domain/task";
import { TaskScreen } from "@/screen/task";

const getTaskById = async (taskId: string): Promise<Task | undefined> => {
  try {
    const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
      cache: "no-cache",
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const resJson = await response.json();
    return resJson.data;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
  }
};

export default async function TaskPage({ params }: { params: { id: string } }) {
  const task = await getTaskById(params.id);

  return <TaskScreen task={task as Task} />;
}
