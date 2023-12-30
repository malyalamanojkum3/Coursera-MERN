import { courseState } from "../atoms/coursestate"
import {selector} from "recoil"

export const isLoadingState = selector({
    key : 'isLoading',
    get : ({get}) => {
        const state = get(courseState)
        return state.isLoading
    }
})

export const titleState = selector({
    key : 'titleState',
    get : ({get}) => {
        const state = get(courseState)
        if(state.course){
            return state.course.title
        }
        else{
            return ""
        }
    }
})
export const descriptionState = selector({
    key : 'descriptionState',
    get : ({get}) => {
        const state = get(courseState)
        if(state.course){
            return state.course.description
        }
        else{
            return ""
        }
    }
})
export const imageLinkState = selector({
    key : 'imageLinkState',
    get : ({get}) => {
        const state = get(courseState)
        if(state.course){
            return state.course.imageLink
        }
        else{
            return ""
        }
    }
})
export const publishedState = selector({
    key : 'publishedState',
    get : ({get}) => {
        const state = get(courseState)
        if(state.course){
            return state.course.published
        }
        else{
            return ""
        }
    }
})