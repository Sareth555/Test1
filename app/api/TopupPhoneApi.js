import Request from '@clik.asia/clik-shared-app/apis';

export default class TopupPhoneApi extends Request {

    constructor() {
        super()
        this.config.method = 'post';
        this.config.url = '/consumer-api/top-up-phone';
    }

}