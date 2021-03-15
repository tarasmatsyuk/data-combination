export interface PlatformResponse {
  user_count: number;
  noisy_field: string;
  stuff_we_dont_need: string;
  times_this_annoyed_me: number;
  platforms: Platform[];
}

export interface Platform {
  platform_id: number;
  last_shared: Date;
  display_order: number;
  name: string
}
