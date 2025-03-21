import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface OrdersFilterState {
  initialDate: string | undefined | null;
  endDate: string | undefined | null;
  page: number;
  limit: number;
}

const initialState: OrdersFilterState = {
  initialDate: undefined,
  endDate: undefined,
  page: 1,
  limit: 10,
};

export const ordersFilterSlice = createSlice({
  name: "ordersFilter",
  initialState,
  reducers: {
    setInitialDate(state, action: PayloadAction<string | undefined | null>) {
      if (typeof action.payload != "string") {
        state.initialDate = undefined;
      }
      state.initialDate = action.payload;
    },
    setEndDate(state, action: PayloadAction<string | undefined | null>) {
      state.endDate = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setLimit(state, action: PayloadAction<number>) {
      setPage(1);
      state.limit = action.payload;
    },
    setFilter(state, action: PayloadAction<Partial<OrdersFilterState>>) {
      return { ...state, ...action.payload };
    },
  },
  selectors: {
    selectInitialDate: (payload) => payload.initialDate,
    selectEndDate: (payload) => payload.endDate,
    selectPage: (payload) => payload.page,
    selectLimit: (payload) => payload.limit,
  },
});

export const { setInitialDate, setEndDate, setPage, setLimit, setFilter } =
  ordersFilterSlice.actions;

export const { selectInitialDate, selectEndDate, selectPage, selectLimit } =
  ordersFilterSlice.selectors;
