import Request from '@clik.asia/clik-shared-app/apis';

export default class TransactionsApi extends Request {

    constructor() {
        super()
        this.config.url = '/consumer-api/transactions';
    }

}