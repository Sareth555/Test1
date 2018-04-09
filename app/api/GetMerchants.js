import Request from '@clik.asia/clik-shared-app/apis';

export default class GetMerchants extends Request {

    constructor() {
        super()
        this.config.timeout = 15000;
        this.config.url = '/consumer-api/merchants';
    }

}