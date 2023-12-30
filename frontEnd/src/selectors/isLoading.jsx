import {userState} from "../atoms/userState"
import {selector} from "recoil"

export const isLoadingState = selector({
    key : 'isLoadingState',
    get : ({get}) => {
        const state = get(userState)
        return state.isLoading
    }
})