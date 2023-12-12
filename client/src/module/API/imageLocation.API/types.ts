

export type Type_Respo_UnsplashPhoto_links = {
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
};


export type Type_Respo_UnsplashPhoto = {
    id: string;
    slug: string;
    created_at: string;
    updated_at: string;
    promoted_at: string | null;
    width: number;
    height: number;
    color: string;
    blur_hash: string;
    description: string;
    alt_description: string;
    breadcrumbs: any[];
    urls: {
        raw: string;
        full: string;
        regular: string;
        small: string;
        thumb: string;
        small_s3: string;
    };
    links: {
        self: string;
        html: string;
        download: string;
        download_location: string;
    };
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[];
    sponsorship: null;
    topic_submissions: Record<string, any>;
    user: {
        id: string;
        updated_at: string;
        username: string;
        name: string;
        first_name: string;
        last_name: string;
        twitter_username: string;
        portfolio_url: string;
        bio: string;
        location: string;
        links: {
            self: string;
            html: string;
            photos: string;
            likes: string;
            portfolio: string;
            following: string;
            followers: string;
        };
        profile_image: {
            small: string;
            medium: string;
            large: string;
        };
        instagram_username: null;
        total_collections: number;
        total_likes: number;
        total_photos: number;
        total_promoted_photos: number;
        accepted_tos: boolean;
        for_hire: boolean;
        social: {
            instagram_username: null;
            portfolio_url: string;
            twitter_username: string;
            paypal_email: null;
        };
    };
    tags: {
        type: string;
        title: string;
    }[];
};