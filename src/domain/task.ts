import { randomUUID } from "crypto";

export type Priority = "高" | "中" | "低";
export type Status = "未着手" | "進行中" | "完了";

export type TaskDetail = {
  title?: string;
  description?: string;
  dueDate?: Date;
  priority?: Priority;
};

export class Task {
  public id: string;
  public title: string;
  public description: string;
  public dueDate: Date;
  public priority: Priority;
  public status: Status;

  constructor(
    title: string,
    description: string,
    dueDate: Date,
    priority: Priority
  ) {
    this.id = randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.status = "未着手";

    this.validate();
  }

  // 属性のバリデーション
  private validate() {
    if (!this.title) {
      throw new Error("Title cannot be empty.");
    }
    if (!this.description) {
      throw new Error("Description cannot be empty.");
    }
    if (!this.dueDate || this.dueDate < new Date()) {
      throw new Error("Due date must be in the future.");
    }
    if (!["高", "中", "低"].includes(this.priority)) {
      throw new Error("Invalid priority.");
    }
  }

  // ステータスの更新
  public updateStatus(newStatus: Status): void {
    this.status = newStatus;
  }

  // タスクの更新
  // 編集項目があれば更新する
  public updateTask({
    title,
    description,
    dueDate,
    priority,
  }: TaskDetail): void {
    if (title !== undefined) {
      this.title = title;
    }
    if (description !== undefined) {
      this.description = description;
    }
    if (dueDate !== undefined) {
      this.dueDate = dueDate;
    }
    if (priority !== undefined) {
      this.priority = priority;
    }

    this.validate();
  }
}