import http from "../http-common";

class InfluencerService {   
    getDashboard(influencer_id) {
        return http.get(`/dashboard?influencer_id=${influencer_id}`);
    }

    getRanking(limit, offset) {
        return http.get(`/rankings?limit=${limit}&offset=${offset}`);
    }

    getTrending(limit, offset) {
        return http.get(`/trends?limit=${limit}&offset=${offset}`);
    }

    filterRanking(limit, country_id, offset) {
        return http.get(`/rankings/filter/?limit=${limit}&country_id=${country_id}&offset=${offset}`);
    }

    searchRanking(username, limit, offset) {
        return http.get(`/rankings/search/?username=${username}&limit=${limit}&offset=${offset}`);
    }

    getCountries() {
        return http.get("/rankings/countries");
    }

    get_adsense(influencer_id, date_start, date_end) {
        return http.get(`/adsense?influencer_id=${influencer_id}&date_start=${date_start}&date_end=${date_end}`);
    }
}

export default new InfluencerService();