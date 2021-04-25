import {createSlice, nanoid} from '@reduxjs/toolkit'
import {sub} from 'date-fns'

const initialState = [
    {
        id: '1',
        date: sub(new Date(), { minutes: 10 }).toISOString(),
        title: 'First Post!',
        content: 'Hello!',
        user: '0',
        reactions: {thumbsUp: 1, hooray: 1, heart: 0, rocket: 0, eyes: 0}
    },
    {
        id: '2',
        date: '2021-04-25T05:48:00.000Z',
        title: 'Second Post',
        content: 'More text',
        user: '1',
        reactions: {thumbsUp: 0, hooray: 0, heart: 5, rocket: 0, eyes: 0}
    }
]

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action) {
                state.push(action.payload)
            },
            prepare(title, content, userID) {
                return {
                    payload: {
                        id: nanoid(),
                        date: new Date().toISOString(),
                        title,
                        content,
                        user: userID
                    }
                }
            }
        },
        // postAdded(state, action) {
        //     state.push(action.payload)
        // },
        postUpdated(state, action) {
            const { id, title, content } = action.payload
            const existingPost = state.find(post => post.id === id)
            if (existingPost) {
                existingPost.title = title
                existingPost.content = content
            }
        },
        reactionAdded(state, action) {
            const { postId, reaction } = action.payload
            const existingPost = state.find(post => post.id === postId)
            if (existingPost) {
                existingPost.reactions[reaction]++
            }
        }
    }
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
