import http from "../http-common";

class InfluencerService {   
    getDashboard(influencer_id) {
        return http.get(`/dashboard?influencer_id=${influencer_id}`);
    }
}

export default new InfluencerService();