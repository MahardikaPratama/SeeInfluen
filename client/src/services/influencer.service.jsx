import http from "../http-common";

class InfluencerService {   
    getDashboard(influencer_id) {
        return http.get(`/dashboard?influencer_id=${influencer_id}`);
    }

    getRanking(limit) {
        return http.get(`/ranking?limit=${limit}`);
    }

    filterRanking(limit, country_id) {
        return http.get(`/ranking/filter/?limit=${limit}&country_id=${country_id}`);
    }

    searchRanking(username) {
        return http.get(`/ranking/search/?username=${username}`);
    }
}

export default new InfluencerService();