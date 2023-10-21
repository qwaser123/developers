import { configureStore, createSlice } from '@reduxjs/toolkit'

let query = createSlice({
  name: 'query',
  initialState:'',
  reducers: {
    changeQuery(state){
      return state
    }
  }
})

export default configureStore({
  reducer: { 
    query: query.reducer
  }
}) 