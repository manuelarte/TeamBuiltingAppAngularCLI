/**
 * Created by manuel.doncel.martos on 30-4-2017.
 */
export class Rewards {

    static readonly rewards: {[name: string]: Reward} = {
        BEST_PLAYER: {name: "Best Player", icon: "best-player"},
        TOP_SCORER: {name: "Top Scorer", icon: "top-scorer"},
        WORST_ONE: {name: "Worst one", icon: "worst-one"},
        BEST_GOAL: {name: "Best Goal", icon: "best-goal"},
        WHO_IS_HE: {name: "Who are you?", icon: "who-are-you"},
        BEST_COACH: {name: "Best Coach", icon: "best-coach"},
        THE_INJURY: {name: "Always Injury!", icon: "most-injury"}
    };

}

export class Reward {
    name: string;
    icon: string;
}
