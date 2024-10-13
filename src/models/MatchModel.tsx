export interface Match {
    team1: string;
    team1_logo_url: string;
    team2: string;
    team2_logo_url: string;
    team1_goals: number;
    team2_goals: number;
    stadium: string;
    start_time: string;  // Timestamp or date string
    stream_url?: string;
    registration_form_url: string;
    isActive: string;
}
