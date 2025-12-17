export class Datas {
    static isUserMobile() {
        if (navigator.userAgentData) {
            return navigator.userAgentData.mobile;
        }
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}