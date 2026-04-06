import type {
  QueueBoardDto,
  QueueBoardSessionDto,
  QueueSessionDto,
  QueueTicketDto,
  StartVisitResultDto,
  TicketStatus,
} from "@/types/backend-types";

export type { TicketStatus };
export type IQueueTicket = QueueTicketDto;
export type IQueueSession = QueueSessionDto;
export type IQueueBoardSession = QueueBoardSessionDto;
export type IQueueBoard = QueueBoardDto;
export type ICreateTicketResponse = StartVisitResultDto;
