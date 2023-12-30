import {userState} from "../atoms/userState"
import {selector} from "recoil"

export const userInfoState = selector({
    key : 'userInfoState',
    get : ({get}) => {
        const state = get(userState)
        return state.userInfo
    }
})