import { baseApi } from '@/shared/api';
import { API_ENDPOINTS } from '@/shared/model';
import { ICreateTaskCard, ITaskCardData } from '../model';


export const taskApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTasksByCategoryId: builder.query<ITaskCardData[], string>({
      query: (categoryId) => ({
        url: `${API_ENDPOINTS.TASKS.GET_ALL_BY_CATEGORY_ID}/${categoryId}`,
        method: 'GET',
      }),
      providesTags: (result) =>
        result
          ? [...result.map(({ id }) => ({ type: 'Task' as const, id })), 'Task']
          : ['Task'],
    }),
    createTask: builder.mutation<ITaskCardData, ICreateTaskCard>({
      query: (taskData) => ({
        url: API_ENDPOINTS.TASKS.CREATE,
        method: 'POST',
        body: taskData,
      }),
      invalidatesTags: ['Task']
    }),
    updateTask: builder.mutation<ITaskCardData, ITaskCardData>({
      query: (taskData) => ({
        url: API_ENDPOINTS.TASKS.UPDATE,
        method: 'PATCH',
        body: taskData,
      }),
    }),
    deleteTask: builder.mutation<{ message: string }, string>({
      query: (taskId) => ({
        url: `${API_ENDPOINTS.TASKS.DELETE}/${taskId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

// Экспортируем хуки для использования в компонентах
export const {
  useGetAllTasksByCategoryIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = taskApi;