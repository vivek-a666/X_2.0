import {
    createClient
} from 'next-sanity'

const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET||'production'
const projectId= process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '8a16rp6h'
const apiVersion='2023-05-03'

export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn:true,
})
    