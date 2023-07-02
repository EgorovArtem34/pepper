import axios, { AxiosResponse } from 'axios';
import * as _ from 'lodash';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { createUrl } from '../utils/utils';
import { SortTodosType, StatusFiltersTodosType, TodosFilterSortStateType } from '../types';

export type TodoType = {
  userId: number;
  id: number;
  title: string;
  completed?: boolean;
};
type BodyType = {
  title: string;
  completed: boolean,
  userId?: number;
  id?: number;
};
export type StatusSortTodosType = {
  sortBy: SortTodosType,
};
type TodosAccType = {
  completed: TodoType[], unCompleted: TodoType[],
};
export type TodosArrayType = {
  todos: TodoType[];
};
type TodoApiResponse = {
  body: {
    title: string;
    userId: number;
    completed: boolean;
  };
  id: number;
};
type changeTodoType = {
  completed: boolean | undefined;
  title?: string | undefined;
  userId?: number | undefined;
  id?: number | undefined;
};
export type TodoStateType = TodosArrayType & {
  filteredTodos: TodoType[];
  errors: {
    fetchTodosErr: string | null;
    changeTodoErr: string | null;
    addTodoErr: string | null;
  };
  isLoadings: {
    fetchTodosLoading: boolean,
    changeTodoLoading: boolean,
    addTodoLoading: boolean,
  };
  todosPerPage: number;
  currentTodo: TodoType | null;
  filtersAndSort: TodosFilterSortStateType;
};

export const fetchTodos = createAsyncThunk<TodoType[]>('todos/fetchTodos', async () => {
  const createdUrl: string = createUrl('todos');
  const { data }: AxiosResponse<TodoType[]> = await axios.get(createdUrl);
  return data;
});

export const addTodo = createAsyncThunk(
  'todos/addTodo',
  async (body: BodyType) => {
    const createdUrl = createUrl('todos');
    const { data }: AxiosResponse<TodoApiResponse> = await axios.post(createdUrl, {
      body,
    }, {
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    return data;
  },
);

export const changeTodo = createAsyncThunk<TodoType, changeTodoType>('todos/changeTodo', async (todo) => {
  const createdUrl: string = createUrl('todos', todo.id);
  const { data: { body } }: { data: { body: TodoType } } = await axios.patch(createdUrl, {
    body: todo,
  }, {
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  console.log('body', body);
  return body;
});

const initialState: TodoStateType = {
  todos: [],
  filteredTodos: [],
  errors: {
    fetchTodosErr: null,
    changeTodoErr: null,
    addTodoErr: null,
  },
  isLoadings: {
    fetchTodosLoading: false,
    changeTodoLoading: false,
    addTodoLoading: false,
  },
  todosPerPage: 10,
  currentTodo: null,
  filtersAndSort: {
    status: {
      isFilterByTitleActive: false,
      isFilterByByCompleted: false,
      isFilterByWorking: false,
      sortBy: true,
    },
    queryParams: {
      queryParamsByTitle: null,
      sortOrder: 'unCompleted',
    },
  },
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodosPerPage: (state, { payload }: PayloadAction<number>) => {
      state.todosPerPage = payload;
    },
    setCurrentTodo: (state, { payload }: PayloadAction<TodoType>) => {
      state.currentTodo = payload;
    },
    clearCurrentTodo: (state) => {
      state.currentTodo = null;
    },
    setFilterByTitle: (state, { payload }: PayloadAction<string>) => {
      state.filtersAndSort.queryParams.queryParamsByTitle = payload;
      state.filtersAndSort.status.isFilterByTitleActive = true;
    },
    setFilterByByCompleted: (state) => {
      state.filtersAndSort.status.isFilterByByCompleted = true;
    },
    setFilterByByWorking: (state) => {
      state.filtersAndSort.status.isFilterByByCompleted = true;
    },
    setSortBy: (state, { payload }: PayloadAction<SortTodosType>) => {
      state.filtersAndSort.queryParams.sortOrder = payload;
      state.filtersAndSort.status.sortBy = true;
    },
    unsetSort: (state) => {
      state.filtersAndSort.queryParams.sortOrder = null;
    },
    unsetFilterBy: (state, { payload }: PayloadAction<keyof StatusFiltersTodosType>) => {
      state.filtersAndSort.status[payload] = false;
      if (payload === 'isFilterByTitleActive') {
        state.filtersAndSort.queryParams.queryParamsByTitle = null;
      }
    },
    makeFiltersAndSortTodos: (state) => {
      let filteredTodos = state.todos;

      if (state.filtersAndSort.status.isFilterByTitleActive) {
        filteredTodos = filteredTodos
          .filter((todo) => todo.title.includes(state.filtersAndSort.queryParams.queryParamsByTitle as string));
      }
      if (state.filtersAndSort.status.isFilterByByCompleted) {
        filteredTodos = filteredTodos.filter((todo) => todo.completed);
      }
      if (state.filtersAndSort.status.isFilterByWorking) {
        filteredTodos = filteredTodos.filter((todo) => !todo.completed);
      }
      if (state.filtersAndSort.status.sortBy) {
        const sortedTodos = filteredTodos.reduce((acc: TodosAccType, todo) => {
          if (todo.completed) {
            acc.completed.push(todo);
          } else {
            acc.unCompleted.push(todo);
          }
          return acc;
        }, { completed: [], unCompleted: [] });

        if (state.filtersAndSort.queryParams.sortOrder === 'completed') {
          filteredTodos = [...sortedTodos.completed, ...sortedTodos.unCompleted];
        } else {
          filteredTodos = [...sortedTodos.unCompleted, ...sortedTodos.completed];
        }
      }

      state.filteredTodos = filteredTodos;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.errors.fetchTodosErr = null;
        state.isLoadings.fetchTodosLoading = true;
      })
      .addCase(fetchTodos.rejected, (state, { payload }: PayloadAction<any>) => {
        state.errors.fetchTodosErr = payload;
        state.isLoadings.fetchTodosLoading = false;
      })
      .addCase(fetchTodos.fulfilled, (state, { payload }: PayloadAction<TodoType[]>) => {
        state.errors.fetchTodosErr = null;
        state.todos = payload;
        state.isLoadings.fetchTodosLoading = false;
      })

      .addCase(addTodo.pending, (state) => {
        state.errors.addTodoErr = null;
        state.isLoadings.addTodoLoading = true;
      })
      .addCase(addTodo.rejected, (state, { payload }: PayloadAction<any>) => {
        state.errors.addTodoErr = payload;
        state.isLoadings.addTodoLoading = false;
      })
      .addCase(addTodo.fulfilled, (state, { payload }: PayloadAction<TodoApiResponse>) => {
        const newTodo: TodoType = {
          ...payload.body,
          id: 200 + +_.uniqueId(),
        };
        state.errors.addTodoErr = null;
        state.todos = [...state.todos, newTodo];
        state.isLoadings.addTodoLoading = false;
      })

      .addCase(changeTodo.pending, (state) => {
        state.isLoadings.changeTodoLoading = true;
        state.errors.changeTodoErr = null;
      })
      .addCase(changeTodo.rejected, (state, { payload }: PayloadAction<any>) => {
        state.errors.changeTodoErr = payload;
        state.isLoadings.changeTodoLoading = false;
      })
      .addCase(changeTodo.fulfilled, (state, { payload }: PayloadAction<TodoType>) => {
        const currentIndex = state.todos.findIndex((todo) => todo.id === payload.id);
        if (currentIndex !== -1) {
          state.todos[currentIndex] = payload;
        }
        state.errors.changeTodoErr = null;
        state.isLoadings.changeTodoLoading = false;
      });
  },
});

export const {
  setTodosPerPage,
  setCurrentTodo,
  clearCurrentTodo,
  setFilterByTitle,
  setFilterByByCompleted,
  setFilterByByWorking,
  setSortBy,
  unsetFilterBy,
  unsetSort,
  makeFiltersAndSortTodos,
} = todosSlice.actions;
export default todosSlice.reducer;
