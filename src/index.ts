import puppeteer from 'puppeteer-extra';
import { Page } from 'puppeteer-extra-plugin/dist/puppeteer';
import stealthPlugin from 'puppeteer-extra-plugin-stealth';
import { URLSearchParams } from 'url';

puppeteer.use(stealthPlugin());

export class KickNodeJS {
    
    private _page: Page | null = null;

    public async init() {
        if (this._page)
            return;

        const browser = await puppeteer.launch();
        this._page = await browser.newPage();
        await this._page.setViewport({ width: 1920, height: 1080 });
        await this._page.goto('https://kick.com');
    }

    public async stop() {
        await this._page?.browser().close();
    }

    private async getPage() {
        await this.init();
        return this._page!;
    }

    private getURLSearchParams(filter: Record<string, string | number | boolean>) {
        const formattedFilter = Object.assign({}, filter);
        Object.keys(formattedFilter).map(key => {
            switch (typeof key) {
                case 'number':
                case 'boolean':
                    return filter[key] = filter[key].toString();
            }
        });
        return new URLSearchParams(Object.entries(formattedFilter as Record<string, string>));
    }

    public async getLivestreams(filter: {
        page: number;
        limit: number;
        subcategory?: string;
        sort?: 'desc' | 'asc' // TODO: check for featured?
    }) {
        const params = this.getURLSearchParams(filter);

        const page = await this.getPage();
        const responseData = await page.evaluate(params => {
            return fetch(`/stream/livestreams/en?${params}`)
                .then(response => response.json() as Promise<PaginatedResponse<Livestream>>);
        }, params.toString());

        return responseData;
    }
}

export interface PaginatedResponse<T> {
    current_page: number;
    data: Array<T>;
    from: number;
    next_page_url: string;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
};

export interface Livestream {
    id: number;
    slug: string;
    channel_id: number;
    created_at: string;
    session_title: string;
    is_live: boolean;
    //risk_level_id: null;
    //source: null;
    //twitch_channel: null;
    //duration: 0;
    language: Language;
    is_mature: boolean;
    viewer_count: number;
    //order: 2;
    //thumbnail: [Object];
    viewers: number;
    channel: Channel;
    //categories: [Object];
};

export type Language = 'English' | 'French' | 'Polish' | 'German' | 'Arabic';

export interface Channel {
    id: number;
    user_id: number;
    slug: string;
    is_banned: boolean;
    playback_url: string;
    //name_updated_at: null;
    vod_enabled: boolean;
    subscription_enabled: boolean;
    can_host: boolean;
    user: User;
}

export interface User {
    id: number;
    username: string;
    agreed_to_terms: boolean;
    email_verified_at: string;
    bio: string;
    country: string | null;
    state: string | null;
    city: string | null;
    instagram: string | null;
    twitter: string | null;
    youtube: string | null;
    discord: string | null;
    tiktok: string | null;
    facebook: string | null;
    profilepic: string;
}