export default {
    is_dev: process.env.NODE_ENV == 'development',
    is_prod: process.env.NODE_ENV == 'production',
    base_api: process.env.NEXT_PUBLIC_BASE_API!.replace(/\/?\/$/, ''),
    base_storage: process.env.NEXT_PUBLIC_BASE_STORAGE,
    ga_id: process.env.NEXT_PUBLIC_GA_ID,
    clarity_id: process.env.NEXT_PUBLIC_CLARITY_ID,
}