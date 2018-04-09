import Request from '@clik.asia/clik-shared-app/apis';

export default class PayBillApi extends Request {

    constructor() {
        super()
        this.config.method = 'post';
        this.config.url = '/consumer-api/pay-bill';
    }

}