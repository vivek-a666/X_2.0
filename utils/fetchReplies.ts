import { Reply } from "@/typings"

export const fetchReplies = async (PostId: string) => {
    const res = await fetch(`/replies?postId=${PostId}`)
    const replies: Reply[] = await res.json()

    return replies

}